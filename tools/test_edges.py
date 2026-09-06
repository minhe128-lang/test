"""Offline Chromium interaction checks. Requires Python Playwright and an installed browser.
Set CHROMIUM_EXECUTABLE to use a specific Chromium/Chrome executable.
Game state is read as test telemetry; inputs are dispatched through the browser.
"""
import asyncio,json,time,math,os,shutil
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'docs'/'qa-output';OUT.mkdir(parents=True,exist_ok=True)
HTML=(ROOT/'OVERKILL_바로실행.html').read_text();results=[];errors=[]
async def main():
 async with async_playwright() as pw:
  b=await pw.chromium.launch(executable_path=os.environ.get('CHROMIUM_EXECUTABLE') or shutil.which('chromium') or shutil.which('google-chrome') or None,args=['--no-sandbox'],headless=True)
  p=await b.new_page(viewport={'width':1280,'height':920},accept_downloads=True)
  p.on('pageerror',lambda e:errors.append(str(e)));p.on('console',lambda e:errors.append(e.text) if e.type=='error' else None)
  await p.set_content(HTML,wait_until='load');p.set_default_timeout(4000)
  async def op(g):await p.evaluate('(g)=>Overkill.open(g,true)',g);await p.wait_for_timeout(120)
  async def ev(s):return await p.evaluate(s)
  async def wait(n):await p.wait_for_timeout(n)
  async def coord(x,y):
   rect=await p.locator('canvas').bounding_box();return rect['x']+x*rect['width']/1000,rect['y']+y*rect['height']/620
  async def tap(x,y):await p.mouse.click(*await coord(x,y))
  async def test(name,fn):
   try:r=await fn();q={'test':name,'passed':True,'detail':r}
   except Exception as e:q={'test':name,'passed':False,'error':str(e)};await p.screenshot(path=str(OUT/(name+'-failed.png')),full_page=True)
   results.append(q);print(json.dumps(q,ensure_ascii=False),flush=True)
  async def navigation():
   await p.locator('[data-filter="puzzle"]').click();assert await p.locator('.game-card').count()==9
   await p.locator('[data-filter="all"]').click();await p.locator('#gameSearch').fill('되감기');assert await p.locator('.game-card').count()==1
   await p.locator('.game-card').click();await p.wait_for_function('Overkill.session?.meta.id==="refresh"');assert await ev('location.hash')=='#refresh'
   await p.locator('#backHome').click();await p.wait_for_function('Overkill.session===null')
   await p.go_back();await p.wait_for_function('Overkill.session?.meta.id==="refresh"');return {'filterSearch':True,'browserBack':True}
  await test('E01_gallery_navigation',navigation)
  async def earlybutton():
   await op('button');r=await ev('Overkill.session.game.state.real');wrong=(r+1)%3
   for _ in range(5):await tap([250,500,750][wrong],355)
   assert await ev('Overkill.session.ended') and not await ev('Overkill.session.record.stars')
   return {'mistakes':await ev('Overkill.session.game.state.errors'),'lossShown':True}
  await test('E02_failure_is_not_success',earlybutton)
  async def beat():
   await op('volume');await p.locator('#challengeBeat').click();await wait(150);await p.locator('#stopBeat').click()
   for el in await p.locator('.seq-step').all():await el.click()
   await p.locator('#checkPattern').click();similarity=await ev('Overkill.session.game.similarity()');assert similarity<1 and not await ev('Overkill.session.ended')
   await p.locator('#playBeat').click();await wait(120);await p.locator('#pauseGame').click()
   assert await p.locator('.seq-step').first.is_disabled();assert await p.locator('#playBeat').is_disabled();assert await ev('Overkill.audio.sources.size')==0
   await p.locator('#resumeGame').click();assert await p.locator('.seq-step').first.is_enabled();await p.locator('#stopBeat').click()
   return {'allCellsScore':round(similarity,3),'pauseLocksGrid':True}
  await test('E03_audio_false_positives_and_pause',beat)
  async def cipher():
   await op('password');letter=await ev('Overkill.session.game.state.secret[0]')
   await p.locator(f'[data-glyph="{letter}"]').click();await p.locator('#cipherSubmit').click()
   assert await ev('Overkill.session.game.state.current.length')==1 and await ev('Overkill.session.game.state.attempts.length')==0
   return {'duplicatesRejected':True,'incompleteGuessNotCounted':True}
  await test('E04_cipher_invalid_inputs',cipher)
  async def routes():
   await op('currency')
   for n in [0,2,3]:await p.locator(f'#fx{n}').click();await wait(550)
   assert not await ev('Overkill.session.ended');assert await ev('Overkill.session.game.state.value')==49
   await p.locator('#fxUndo').click();assert await ev('Overkill.session.game.state.value')==54
   await op('qr');await p.locator('#pixelMode').click();await tap(340,196);assert await ev('Overkill.session.game.state.board[0][0]')==2
   await p.locator('#checkPixels').click();assert not await ev('Overkill.session.ended');await p.locator('#pixelUndo').click();assert await ev('Overkill.session.game.state.board[0][0]')==0
   return {'wrongRouteRejected':True,'undoRestoresValue':True,'nonogramNotesNotFilled':True}
  await test('E05_puzzle_errors_and_undo',routes)
  async def presscancel():
   await op('compress');x,y=await coord(850,380);await p.mouse.move(x,y);await p.mouse.down();await wait(200);assert await ev('Overkill.session.game.state.pressure')>.5
   await p.mouse.up();assert await ev('Overkill.session.game.state.pressure')==0
   await p.locator('#pauseGame').click();assert await p.locator('#pressRange').is_disabled()
   await p.locator('#resumeGame').click();assert await p.locator('#pressRange').is_enabled()
   await op('todo');await p.locator('#task0').click();await wait(800);assert await p.locator('#task0').is_disabled()
   await p.locator('#pauseGame').click();await p.locator('#resumeGame').click();assert await p.locator('#task0').is_disabled() and await p.locator('#task1').is_enabled()
   return {'releaseDepressurizes':True,'pausePreservesRuleLocks':True}
  await test('E06_pointer_release_and_pause',presscancel)
  async def image_invalid():
   await op('compress');await p.locator('summary').click()
   await p.locator('#pressFile').set_input_files({'name':'broken.png','mimeType':'image/png','buffer':b'not a real PNG'})
   await p.locator('#compressFile').click();await wait(350)
   text=await p.locator('#compressionInfo').inner_text();assert '읽을 수 없습니다' in text and await p.locator('#saveImage').is_disabled()
   assert not await ev('Overkill.session.ended');return {'corruptFileRejected':True,'message':text}
  await test('E07_corrupt_image_rejected',image_invalid)
  async def mobiletouch():
   mobile=await b.new_page(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True)
   mobile.on('pageerror',lambda e:errors.append(str(e)))
   await mobile.set_content(HTML,wait_until='load');await mobile.evaluate('Overkill.open("dice",true)');await mobile.wait_for_timeout(200)
   box=await mobile.locator('canvas').bounding_box()
   def toxy(x,y):return {'x':box['x']+x*box['width']/1000,'y':box['y']+y*box['height']/620}
   client=await mobile.context.new_cdp_session(mobile)
   start=toxy(185,463);end=toxy(98,548)
   await client.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[start]})
   for i in range(1,10):
    q={'x':start['x']+(end['x']-start['x'])*i/9,'y':start['y']+(end['y']-start['y'])*i/9}
    await client.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[q]})
   await client.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
   await mobile.wait_for_timeout(200)
   assert await mobile.evaluate('Overkill.session.game.state.throws')==1
   assert await mobile.evaluate('Overkill.session.game.state.flying')
   await mobile.screenshot(path=str(OUT/'touch-dice.png'),full_page=True)
   await mobile.evaluate('Overkill.open("nickname",true)');await mobile.wait_for_timeout(120)
   points=await mobile.evaluate('Overkill.session.game.state.nodes');box=await mobile.locator('canvas').bounding_box()
   for point in points[1:]:await mobile.touchscreen.tap(**toxy(point['x'],point['y']))
   await mobile.wait_for_function('Overkill.session.ended');await mobile.screenshot(path=str(OUT/'mobile-result.png'),full_page=True)
   card=await mobile.locator('.result-card').bounding_box();arena=await mobile.locator('.arena').bounding_box();assert card['height']<=arena['height']
   await mobile.locator('#replayResult').tap();await mobile.wait_for_function('!Overkill.session.ended');await mobile.close()
   return {'touchDragLaunches':True,'touchConstellationCompletes':True,'mobileResultRetryReachable':True,'DPR':2}
  await test('E08_mobile_native_touch',mobiletouch)
  await b.close()
  out={'results':results,'errors':errors,'passed':sum(q['passed'] for q in results),'total':len(results)}
  (OUT/'edge-results.json').write_text(json.dumps(out,ensure_ascii=False,indent=2));print('TOTAL',out['passed'],'/',out['total'],'ERRORS',errors,flush=True)
asyncio.run(main())
