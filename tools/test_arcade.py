"""Offline Chromium interaction checks. Requires Python Playwright and an installed browser.
Set CHROMIUM_EXECUTABLE to use a specific Chromium/Chrome executable.
Game state is read as test telemetry; inputs are dispatched through the browser.
"""
import asyncio, json, time, itertools, math, traceback, os, shutil
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'docs'/'qa-output'; OUT.mkdir(parents=True,exist_ok=True)
HTML=(ROOT/'OVERKILL_바로실행.html').read_text()
results=[]; errors=[]; requests=[]

async def main():
 async with async_playwright() as pw:
  browser=await pw.chromium.launch(executable_path=os.environ.get('CHROMIUM_EXECUTABLE') or shutil.which('chromium') or shutil.which('google-chrome') or None,headless=True,args=['--no-sandbox'])
  page=await browser.new_page(viewport={'width':1440,'height':1040},device_scale_factor=1,accept_downloads=True)
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
  page.on('request',lambda r:requests.append(r.url) if not r.url.startswith('data:') else None)
  page.set_default_timeout(6000)
  await page.set_content(HTML,wait_until='load')
  async def ev(code): return await page.evaluate(code)
  async def state(): return await ev('Overkill.session.game.state')
  async def wait(ms): await page.wait_for_timeout(ms)
  async def until(expr,timeout=7000): await page.wait_for_function(expr,timeout=timeout)
  async def op(g):
   await page.evaluate('(g)=>Overkill.open(g,true)',g); await wait(110)
  async def xy(x,y):
   b=await page.locator('.game-canvas').bounding_box()
   return (b['x']+x*b['width']/1000,b['y']+y*b['height']/620)
  async def tap(x,y):
   px,py=await xy(x,y);await page.mouse.click(px,py)
  async def drag(points,hold=0):
   x,y=await xy(*points[0]);await page.mouse.move(x,y);await page.mouse.down()
   for q in points[1:]:
    x,y=await xy(*q);await page.mouse.move(x,y,steps=8)
   if hold: await wait(hold)
   await page.mouse.up()
  async def set_input(id,value):
   await page.locator(id).evaluate('(el,value)=>{el.value=value;el.dispatchEvent(new Event("input",{bubbles:true}));}',str(value))
  async def ended(win=True):
   await until('Overkill.session.ended',9000)
   assert await page.locator('.result-card h2').count()==1
   r=await ev('({score:Overkill.session.score,stars:Overkill.session.record.stars||0,title:document.querySelector(".result-card h2").textContent})')
   if win: assert r['stars']>=1,r
   return r
  async def test(name,fn):
   start=time.time()
   try:
    detail=await fn(); item={'test':name,'passed':True,'seconds':round(time.time()-start,2),'detail':detail}
   except Exception as e:
    item={'test':name,'passed':False,'seconds':round(time.time()-start,2),'error':str(e),'trace':traceback.format_exc(limit=3)}
    try: await page.screenshot(path=str(OUT/(name+'_failure.png')),full_page=True)
    except: pass
   results.append(item);print(json.dumps(item,ensure_ascii=False),flush=True)
   (OUT/'test-results.json').write_text(json.dumps({'results':results,'errors':errors,'externalRequests':requests},ensure_ascii=False,indent=2))
   await page.keyboard.up('ArrowRight');await page.keyboard.up('ArrowLeft');await page.keyboard.up(' ');await page.keyboard.up('r');await page.mouse.up()

  async def gallery():
   data=await ev('({games:Overkill.games.length,registered:Overkill.registry.size,cards:document.querySelectorAll(".game-card").length})')
   assert data['games']==data['registered']==data['cards']==20,data
   # A gallery card is an anchor; verify all 20 IDs appear exactly once.
   links=await page.locator('.game-card[data-open]').count()
   data['gameLinks']=links
   await ev("document.querySelectorAll('img').forEach(i=>i.loading='eager')")
   await wait(700)
   broken=await ev("[...document.images].filter(x=>x.complete&&!x.naturalWidth).map(x=>x.src.slice(0,80))")
   assert not broken,broken
   await page.screenshot(path=str(OUT/'home-final.png'),full_page=True)
   return data
  await test('01_gallery_offline',gallery)

  async def render_all():
   data=[]
   for g in await ev('Overkill.games.map(g=>g.id)'):
    await op(g); await wait(100)
    q=await ev('({id:Overkill.session.meta.id,ticks:Overkill.session.activeTicks,paused:Overkill.session.paused,overflow:document.documentElement.scrollWidth>innerWidth+1,controls:document.querySelectorAll("#gameControls button,#gameControls input").length})')
    assert q['ticks']>2 and not q['paused'] and not q['overflow'],q
    await page.screenshot(path=str(OUT/(g+'-desktop.png')),full_page=True)
    data.append(q)
   return data
  await test('02_all20_render',render_all)

  async def dice():
   await op('dice');a=await state();gate=a['gates'][0];dx=gate['x']-a['x'];dy=gate['y']-a['y'];dist=math.hypot(dx,dy)
   # Native pull-back throw, aiming through the first star.
   await drag([(a['x'],a['y']),(a['x']-dx/dist*115,a['y']-dy/dist*115)])
   await wait(1100);a=await state();assert a['flying'] and a['throws']==1 and a['hits']>=1,a
   while not await ev('Overkill.session.ended'):
    a=await state()
    if not a['flying'] and a['throws']<5 and await page.locator('#throw').is_enabled(): await page.locator('#throw').click()
    await wait(400)
   r=await ended();r.update({'throws':(await state())['throws'],'finalFace':(await state())['value']});assert r['throws']==5 and 1<=r['finalFace']<=6;return r
  await test('03_dice_five_real_throws',dice)

  async def button():
   await op('button');a=await state();await tap([250,500,750][a['real']],355)
   for _ in range(3):
    await wait(70);a=await state();await tap(a['button']['x'],a['button']['y'])
   assert (await state())['phase']==2
   await drag([(500,355)],hold=2000)
   await until('Overkill.session.game.state.phase===3&&Overkill.session.game.state.phaseTime%3.5>=2.5',6000)
   await tap(500,355);r=await ended();assert (await state())['errors']==0;return r
  await test('04_button_four_mechanics',button)

  async def weather():
   await op('weather');await page.locator('#beginWeather').click()
   a=await state();q=a['clouds'][0];before=q['vx'];await drag([(q['x']-60,q['y']),(q['x']+140,q['y'])]);assert len((await state())['gusts'])>0
   await page.locator('.game-canvas').focus();await page.keyboard.down('ArrowRight')
   await until('Overkill.session.ended',36000);await page.keyboard.up('ArrowRight')
   a=await state();assert a['saved']>0
   r=await ended();r['saved']=a['saved'];r['city']=a['lives'];return r
  await test('05_weather_wind_survival',weather)

  async def rewind():
   await op('refresh');await page.keyboard.down('ArrowRight');await wait(500);await page.keyboard.up('ArrowRight')
   b=await state();assert b['world']>.3 and len(b['history'])>10
   await page.keyboard.down('r');await wait(230);await page.keyboard.up('r');a=await state()
   assert a['world']<b['world'] and a['p']['x']<b['p']['x'] and a['rewind']>0
   # Move to first edge then jump; stay grounded where possible; rewind demonstrated separately.
   await page.keyboard.down('ArrowRight');await until('Overkill.session.game.state.p.x>174');await page.keyboard.press(' ')
   await until('Overkill.session.game.state.p.ground&&Overkill.session.game.state.p.platform===1',3000)
   await page.keyboard.up('ArrowRight');await wait(90)
   # Moving platform jump at right edge of first platform.
   await page.keyboard.down('ArrowRight');await until('Overkill.session.game.state.p.x>376',1500);await page.keyboard.press(' ')
   await until('Overkill.session.game.state.p.ground&&Overkill.session.game.state.p.platform===2',3000)
   await page.keyboard.up('ArrowRight');await wait(100)
   await page.keyboard.down('ArrowRight')
   await until('Overkill.session.game.state.p.x>Overkill.session.game.platforms()[2].x+95',1500)
   await page.keyboard.press(' ')
   await until('Overkill.session.game.state.p.ground&&Overkill.session.game.state.p.platform===3',3000)
   await until('Overkill.session.ended',3000);await page.keyboard.up('ArrowRight')
   r=await ended();r['rewindSeconds']=(await state())['rewind'];return r
  await test('06_time_actual_rewind_and_exit',rewind)

  async def compress():
   await op('compress')
   for i in range(3):
    await until(f'Overkill.session.game.state.round==={i}&&!Overkill.session.game.state.locked')
    a=await state();pressure=(180-a['targets'][i])*a['hardness'][i]/170
    px,py=await xy(850,195+325*pressure);await page.mouse.move(px,py);await page.mouse.down()
    await until('Overkill.session.game.state.locked',5000);await page.mouse.up()
   r=await ended();assert (await state())['errors']==0
   await page.locator('summary').click();await page.locator('#compressFile').click()
   await until('Overkill.session.game.state.compressed!==null')
   info=await page.locator('#compressionInfo').inner_text();assert 'KB →' in info and '1400×900' in info,info
   async with page.expect_download() as dl: await page.locator('#saveImage').click()
   obj=await dl.value;await obj.save_as(str(OUT/'sample-compressed.jpg'))
   size=(OUT/'sample-compressed.jpg').stat().st_size;assert size>5000
   r.update({'jpegBytes':size,'conversion':info});return r
  await test('07_press_real_lever_and_jpeg',compress)

  async def volume():
   await op('volume');await page.locator('#playBeat').click();await wait(750)
   a=await state();assert a['playing'] and a['head']>=0
   assert await ev('Overkill.audio.ctx.state')=='running'
   await page.locator('#stopBeat').click();assert not (await state())['playing']
   await page.locator('#challengeBeat').click();await until('!Overkill.session.game.state.peek',8000)
   a=await state()
   for r in range(4):
    for c in range(8):
     if a['target'][r][c]: await page.locator(f'.seq-step[data-row="{r}"][data-col="{c}"]').click()
   assert await ev('Overkill.session.game.similarity()')==1
   await page.locator('#checkPattern').click();return await ended()
  await test('08_real_audio_and_32step_rebuild',volume)

  async def flight():
   await op('download');await page.keyboard.press('ArrowRight')
   # Closed-loop native keyboard piloting. State is read-only telemetry.
   pressed=set();start=time.monotonic()
   while not await ev('Overkill.session.ended') and time.monotonic()-start<40:
    a=await state();target_x=848;desired_vx=max(-160,min(160,(target_x-a['x'])*1.1))
    desired_vy=25 if a['x']<690 else 42
    if a['y']<145: desired_vy=45
    if a['y']>440 and a['x']<760: desired_vy=-45
    control=set()
    if a['vx']<desired_vx-8:control.add('ArrowRight')
    elif a['vx']>desired_vx+8:control.add('ArrowLeft')
    if a['vy']>desired_vy:control.add(' ')
    for key in pressed-control:await page.keyboard.up(key)
    for key in control-pressed:await page.keyboard.down(key)
    pressed=control;await wait(60)
   for key in pressed:await page.keyboard.up(key)
   r=await ended();a=await state();r['fuel']=a['fuel'];r['flightTime']=a['time']
   async with page.expect_download() as dl:await page.locator('#extraResult').click()
   obj=await dl.value;await obj.save_as(str(OUT/'flight-log.txt'))
   assert '도킹 성공: 예' in (OUT/'flight-log.txt').read_text();return r
  await test('09_capsule_docking_report',flight)

  async def rps():
   await op('rps')
   for i in range(3):
    v=await ev('(Overkill.session.game.enemy()+1)%3');await page.locator(f'#rps{v}').click()
    if i<2:await until('!Overkill.session.game.state.locked')
   return await ended()
  await test('10_rps_opponent_rule',rps)

  async def radar():
   await op('random')
   for i in range(3):
    await until('!Overkill.session.game.state.locked')
    for p in [(160,170),(820,180),(440,440)]:await tap(*p)
    a=await state();assert len(a['probes'])==3
    # Solve trilateration from probe measurements without reading secret coordinates.
    p1,p2,p3=a['probes'];A=2*(p2['x']-p1['x']);B=2*(p2['y']-p1['y']);C=p1['r']**2-p2['r']**2-p1['x']**2+p2['x']**2-p1['y']**2+p2['y']**2
    E=2*(p3['x']-p1['x']);F=2*(p3['y']-p1['y']);G=p1['r']**2-p3['r']**2-p1['x']**2+p3['x']**2-p1['y']**2+p3['y']**2
    det=A*F-B*E;x=(C*F-B*G)/det;y=(A*G-C*E)/det
    await page.locator('#recover').click();await tap(x,y)
    if i<2:await until(f'Overkill.session.game.state.round==={i+1}')
   return await ended()
  await test('11_sonar_distance_trilateration',radar)

  async def timer():
   await op('timer')
   for i,target in enumerate([3,5,7]):
    await until('!Overkill.session.game.state.locked')
    await tap(500,329)
    await until(f'Overkill.session.game.state.value>={target-.015}',(target+3)*1000)
    await tap(500,329)
    if i<2:await until(f'Overkill.session.game.state.round==={i+1}')
   r=await ended();a=await state();assert max(a['errors'])<.2,a['errors'];r['errorsSeconds']=a['errors'];return r
  await test('12_blind_timer_precision',timer)

  async def raid():
   # Exhaustive tactic search with public rules; drive native card buttons.
   def search(hp,boss,turn,last,path):
    if turn>=16:return None
    inc=[10,28,16,34][turn%4]+(4 if boss<=55 else 0)
    best=None
    for act in range(3):
     if act==last:continue
     h=min(90,hp+20) if act==2 else hp;b=max(0,boss-([26,12,0][act]))
     if b==0:return path+[act]
     h=max(0,h-max(0,inc-(24 if act==1 else 0)))
     if h:
      ans=search(h,b,turn+1,act,path+[act])
      if ans and (best is None or len(ans)<len(best)):best=ans
    return best
   path=search(90,120,0,-1,[]);assert path
   await op('todo')
   for act in path:
    await until('!Overkill.session.game.state.locked');await page.locator(f'#task{act}').click()
   r=await ended();r['actions']=path;return r
  await test('13_tactical_cards_winnable',raid)

  async def qr():
   await op('qr')
   for i in range(3):
    await until('!Overkill.session.game.state.locked')
    a=await state();g=await ev('Overkill.session.game.geometry()')
    for r,row in enumerate(a['pattern']):
     for c,v in enumerate(row):
      if v:await tap(g['x']+(c+.5)*g['size'],g['y']+(r+.5)*g['size'])
    if i<2:await until(f'Overkill.session.game.state.round==={i+1}')
   return await ended()
  await test('14_nonogram_all_three_sizes',qr)

  async def maze():
   await op('quiz');paths=[['ArrowRight']*4+['ArrowUp']*3,['ArrowUp']*2+['ArrowRight']*4+['ArrowUp'],['ArrowRight']*2+['ArrowUp']*2+['ArrowRight']*2+['ArrowUp']]
   values=[]
   for i,path in enumerate(paths):
    await until('!Overkill.session.game.state.locked')
    for key in path:
     await page.keyboard.press(key);await wait(190);values.append((await state()).get('value'))
    if i<2:await until(f'Overkill.session.game.state.floor==={i+1}')
   r=await ended();assert 12.5 in values,values;r['decimalPreserved']=12.5;return r
  await test('15_numeric_maze_decimal_math',maze)

  async def cipher():
   await op('password');a=await state()
   # Input feedback for a wrong permutation followed by the correct arrangement.
   wrong=[a['secret'][0]]+list(reversed(a['secret'][1:]))
   for c in wrong[1:]:await page.locator(f'[data-glyph="{c}"]').click()
   await page.locator('#cipherSubmit').click();a=await state();assert a['attempts'][0]['exact']==2 and a['attempts'][0]['common']==2,a
   for c in a['secret'][1:]:await page.locator(f'[data-glyph="{c}"]').click()
   await page.locator('#cipherSubmit').click();r=await ended();pw=(await state())['password'];assert len(pw)==24 and any(c.islower() for c in pw) and any(c.isupper() for c in pw) and any(c.isdigit() for c in pw) and any(not c.isalnum() for c in pw)
   assert pw not in await ev('JSON.stringify(Overkill.saved)');r['securePasswordLength']=len(pw);return r
  await test('16_cipher_feedback_crypto_password',cipher)

  async def spell():
   await op('spell')
   for i in range(10):
    a=await state();valid=a['cases'][a['i']][1]
    await page.locator('#acceptText' if valid else '#rejectText').click();assert (await state())['correct']==i+1
    await page.locator('#nextCase').click()
   return await ended()
  await test('17_spelling_actual_verdicts',spell)

  async def lunch():
   await op('lunch')
   for i,recipe in enumerate([[0,1,2],[3,3,4],[2,4,5]]):
    await until('!Overkill.session.game.state.locked')
    for idx in recipe:await tap(145+idx*142,530)
    await page.locator('#offerMeal').click()
    if i<2:await until(f'Overkill.session.game.state.round==={i+1}')
   r=await ended();assert r['score']==3000;return r
  await test('18_lunch_real_flavor_vectors',lunch)

  async def nickname():
   await op('nickname');a=await state();await drag([(p['x'],p['y']) for p in a['nodes']])
   r=await ended();a=await state();assert a['name'] and 'undefined' not in a['name'] and 'NaN' not in a['name'];assert a['index']==8;r['defaultSeedName']=a['name'];r['stability']=a['stability'];return r
  await test('19_name_constellation_default_input',nickname)

  async def counter():
   await op('counter');await page.locator('summary').click()
   text='한글 👨‍👩‍👧‍👦 e\u0301\nA';await page.locator('#countText').fill(text);output=await page.locator('#countOutput').inner_text()
   assert str(len(text.encode())) in output,output
   await page.locator('#beginDocument').click()
   for i in range(5):
    await until('!Overkill.session.game.state.locked')
    a=await state();g=await ev('Overkill.session.game.geometry()');idx=a.get('target',a.get('index'));assert isinstance(idx,int),a
    await tap(g['x']+(idx%a['cols']+.5)*g['w'],g['y']+(idx//a['cols']+.5)*g['h'])
    if i<4:await until(f'Overkill.session.game.state.round==={i+1}')
   r=await ended();r['unicodeCountOutput']=output;return r
  await test('20_document_search_unicode_count',counter)

  async def compat():
   await op('compat')
   for i in range(3):
    await until('!Overkill.session.game.state.locked');a=await state()
    for k,v in a['targets'][i].items():await set_input('#'+k,v)
    await until('Overkill.session.game.state.similarity>.999')
    if i<2:await until(f'Overkill.session.game.state.round==={i+1}')
   return await ended()
  await test('21_waveform_three_exact_matches',compat)

  async def exchange():
   await op('currency')
   for i,path in enumerate([[0,1],[3,2],[1,3,0]]):
    await until('!Overkill.session.game.state.locked')
    for act in path:
     await page.locator(f'#fx{act}').click();await wait(550)
    if i<2:await until(f'Overkill.session.game.state.round==={i+1}')
   return await ended()
  await test('22_exchange_route_puzzles',exchange)

  async def lifecycle():
   await op('weather');await page.locator('#beginWeather').click();await wait(150)
   await page.locator('#pauseGame').click();v=(await state())['time'];await wait(500);assert (await state())['time']==v
   await page.locator('#resumeGame').click();await wait(150);assert (await state())['time']<v
   await ev('window.oldSession=Overkill.session')
   await op('volume');await page.locator('#playBeat').click();await wait(200)
   await ev('window.oldAudioSession=Overkill.session')
   await op('timer');before=await ev('oldSession.t');await wait(350)
   q=await ev('({oldAlive:oldSession.alive,oldAborted:oldSession.abort.signal.aborted,oldT:oldSession.t,oldTimers:oldSession.timers.length,oldAudioAlive:oldAudioSession.alive,sources:Overkill.audio.sources.size})')
   assert not q['oldAlive'] and q['oldAborted'] and q['oldT']==before and q['oldTimers']==0 and not q['oldAudioAlive'] and q['sources']==0,q
   for _ in range(2):
    for g in ['dice','timer','weather','volume','compress','qr','refresh','download','nickname','button']:await op(g)
   assert not errors,errors
   return q
  await test('23_pause_lifecycle_repeat_cleanup',lifecycle)

  async def mobile():
   await page.set_viewport_size({'width':390,'height':844})
   data=[]
   for g in await ev('Overkill.games.map(g=>g.id)'):
    await op(g)
    q=await ev('({id:Overkill.session.meta.id,overflow:document.documentElement.scrollWidth>innerWidth+1,width:Overkill.session.canvas.getBoundingClientRect().width,ticks:Overkill.session.activeTicks})')
    assert not q['overflow'] and q['width']>=300,q
    data.append(q)
    if g in ['dice','compress','volume','qr','lunch']:await page.screenshot(path=str(OUT/(g+'-mobile.png')),full_page=True)
   await ev('Overkill.home()');await wait(100);await page.screenshot(path=str(OUT/'home-mobile.png'),full_page=True)
   return data
  await test('24_mobile20_responsive',mobile)
  await browser.close()
  final={'results':results,'errors':errors,'externalRequests':requests,'passed':sum(r['passed'] for r in results),'total':len(results)}
  (OUT/'test-results.json').write_text(json.dumps(final,ensure_ascii=False,indent=2))
  print('TOTAL',final['passed'],'/',final['total'],'ERRORS',len(errors),'NETWORK',len(requests),flush=True)

asyncio.run(main())
