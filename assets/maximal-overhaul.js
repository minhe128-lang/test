(() => {
  const DECOR = {
    weather:'<div class="weather-radar"></div><div class="weather-bolt">⚡</div><div class="signature-label">서울 상공 기상 통제망</div>',
    button:'<div class="button-siren"></div><div class="signature-label">최종 승인 격리 구역</div>',
    todo:'<div class="crossed-swords">⚔️</div><div class="signature-label">왕립 길드 의뢰 게시판</div>',
    timer:'<div class="bunker-door"></div><div class="signature-label">제7 종말 대비 집중 벙커</div>',
    password:'<div class="code-rain"></div><div class="signature-label">비인가 보안 단말</div>',
    dice:'<div class="cosmic-orbit"></div><div class="signature-label">확률 관측 천체 제단</div>',
    rps:'<div class="tactical-map"></div><div class="signature-label">전 지구 전략 시뮬레이션</div>',
    currency:'<div class="market-ticker"></div><div class="signature-label">시장 붕괴 실시간 중계</div>',
    counter:'<div class="interrogation-lamp"></div><div class="signature-label">취조실 7-B / 녹화 중</div>',
    lunch:'<div class="shrine-smoke"></div><div class="signature-label">공복 신탁 제3제단</div>',
    qr:'<div class="robot-arm"></div><div class="signature-label">정밀 레이저 각인 공정</div>',
    nickname:'<div class="gene-helix"></div><div class="signature-label">별칭 유전자 각성실</div>',
    spell:'<div class="judge-gavel">🔨</div><div class="signature-label">대한 맞춤법 최고법정</div>',
    download:'<div class="launch-plume"></div><div class="signature-label">파일 발사 관제 1번대</div>',
    random:'<div class="target-reticle"></div><div class="signature-label">난수 확보 극비 작전</div>',
    quiz:'<div class="dragon-fire">🐉</div><div class="signature-label">고대 수학룡 보스전</div>',
    compress:'<div class="press-piston"></div><div class="signature-label">고압 이미지 압착 공장</div>',
    compat:'<div class="constellation-field"></div><div class="signature-label">쌍성 관계 관측소</div>',
    volume:'<div class="arena-beams"></div><div class="signature-label">십만 관객 음향 조종석</div>',
    refresh:'<div class="time-rings"></div><div class="signature-label">시간선 복원 관문</div>'
  };

  const STORAGE='overkill_max_records_v1';
  const load=()=>{try{return JSON.parse(localStorage.getItem(STORAGE)||'{}')}catch{return {}}};
  const save=(v)=>{try{localStorage.setItem(STORAGE,JSON.stringify(v))}catch{}};
  let records=load();

  function addDecor(id, root){
    const frame=root.querySelector('.app-frame'); if(!frame || frame.querySelector('.signature-stage')) return;
    const stage=document.createElement('div'); stage.className='signature-stage'; stage.innerHTML=DECOR[id]||''; frame.prepend(stage);
  }

  function addRecord(root,id){
    const bar=root.querySelector('.app-toolbar'); if(!bar||bar.querySelector('.max-record')) return;
    const rec=document.createElement('span'); rec.className='max-record badge'; rec.textContent=`누적 가동 ${records[id]||0}회`; bar.querySelector('.meta')?.appendChild(rec);
  }
  function bump(id,root){ records[id]=(records[id]||0)+1; save(records); const e=root.querySelector('.max-record'); if(e)e.textContent=`누적 가동 ${records[id]}회`; }

  function armConfirm(root){
    const core=root.querySelector('#confirmCore'); if(!core||root.querySelector('.safety-bank')) return;
    core.disabled=true; core.textContent='봉인됨';
    const bank=document.createElement('div'); bank.className='safety-bank'; bank.innerHTML=['전력','책임','현실'].map((x,i)=>`<button class="safety-key" data-key="${i}">${x} 잠금</button>`).join('');
    core.closest('.panel')?.insertBefore(bank,core.closest('.panel').lastElementChild);
    const armed=new Set(); bank.addEventListener('click',e=>{const b=e.target.closest('.safety-key');if(!b)return;const k=b.dataset.key;b.classList.toggle('armed');b.textContent=b.classList.contains('armed')?b.textContent.replace('잠금','승인'):b.textContent.replace('승인','잠금');b.classList.contains('armed')?armed.add(k):armed.delete(k);core.disabled=armed.size<3;core.textContent=armed.size===3?'최종 확인':'봉인됨';});
  }

  function timerBehavior(root){
    root.querySelector('#timerStart')?.addEventListener('click',()=>root.classList.add('timer-running'));
    root.querySelector('#timerPause')?.addEventListener('click',()=>root.classList.remove('timer-running'));
    root.querySelector('#timerReset')?.addEventListener('click',()=>root.classList.remove('timer-running'));
  }

  function scramble(el,final,duration=700){
    if(!el)return; const chars='0123456789가나다라마바사ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%'; const start=performance.now();
    const tick=(now)=>{const p=Math.min(1,(now-start)/duration); el.textContent=[...final].map((c,i)=>i<final.length*p?c:chars[Math.floor(Math.random()*chars.length)]).join(''); if(p<1)requestAnimationFrame(tick);else el.textContent=final}; requestAnimationFrame(tick);
  }

  function specialBehavior(id,root){
    if(id==='button') armConfirm(root);
    if(id==='timer') timerBehavior(root);
    if(id==='password'){
      const out=root.querySelector('#pwOutput'); root.querySelector('#pwGen')?.addEventListener('click',()=>setTimeout(()=>scramble(out,out.textContent,900),0));
    }
    if(id==='dice'){
      root.querySelector('#diceRoll')?.addEventListener('click',()=>{const v=root.querySelector('#diceValue');v?.animate([{transform:'rotateX(0) rotateY(0) scale(1)'},{transform:'rotateX(720deg) rotateY(540deg) scale(.4)'},{transform:'rotateX(1080deg) rotateY(900deg) scale(1.15)'},{transform:'none'}],{duration:1050,easing:'cubic-bezier(.2,.8,.2,1)'});});
    }
    if(id==='rps'){
      root.querySelectorAll('[data-rps]').forEach(b=>b.addEventListener('click',()=>{root.querySelectorAll('[data-rps]').forEach(x=>x.classList.remove('chosen'));b.classList.add('chosen');root.querySelector('#rpsResult')?.animate([{filter:'blur(12px)',transform:'scale(2)'},{filter:'blur(0)',transform:'scale(1)'}],{duration:650});}));
    }
    if(id==='currency'){
      root.querySelector('#curConvert')?.addEventListener('click',()=>{root.classList.add('market-shock');setTimeout(()=>root.classList.remove('market-shock'),1600)});
    }
    if(id==='counter'){
      const ta=root.querySelector('#countText'),lamp=root.querySelector('.interrogation-lamp');ta?.addEventListener('input',()=>{if(lamp)lamp.style.opacity=String(Math.min(.95,.25+ta.value.length/500));});
    }
    if(id==='lunch'){
      root.querySelector('#lunchOracle')?.addEventListener('click',()=>{root.querySelector('.food-buttons')?.animate([{transform:'rotate(0) scale(1)'},{transform:'rotate(360deg) scale(.75)'},{transform:'rotate(720deg) scale(1)'}],{duration:1500,easing:'cubic-bezier(.1,.8,.2,1)'});});
    }
    if(id==='qr'){
      const result=root.querySelector('#qrResult'); if(result&&!root.querySelector('#qrSave')){const b=document.createElement('button');b.id='qrSave';b.className='btn-ghost';b.textContent='QR 이미지 내려받기';result.insertAdjacentElement('afterend',b);b.onclick=()=>{const canvas=root.querySelector('#qrOutput canvas'),img=root.querySelector('#qrOutput img');const url=canvas?.toDataURL?.('image/png')||img?.src;if(url){const a=document.createElement('a');a.href=url;a.download='qr-code.png';a.click();}};}
    }
    if(id==='nickname'){
      const field=root.querySelector('#nickSeed'); if(field&&!root.querySelector('.archetype-bank')){const bank=document.createElement('div');bank.className='archetype-bank orbit-buttons';bank.innerHTML=['암흑형','영웅형','신비형'].map(x=>`<button class="btn-ghost" data-arch="${x}">${x}</button>`).join('');field.insertAdjacentElement('afterend',bank);bank.onclick=e=>{const b=e.target.closest('[data-arch]');if(b){field.value=`${b.dataset.arch}_${field.value}`;bank.querySelectorAll('button').forEach(x=>x.classList.toggle('chosen',x===b));}};}
    }
    if(id==='spell'){
      root.querySelector('#spellJudge')?.addEventListener('click',()=>{const v=root.querySelector('#spellVerdict');setTimeout(()=>v?.animate([{transform:'scale(4) rotate(-18deg)',opacity:0},{transform:'scale(1) rotate(-4deg)',opacity:1}],{duration:500,easing:'cubic-bezier(.2,1.4,.2,1)',fill:'both'}),250)});
    }
    if(id==='download'){
      const launch=root.querySelector('#dlLaunch'); if(launch){launch.textContent='발사 덮개 열기';let armed=false;launch.addEventListener('click',e=>{if(!armed){e.stopImmediatePropagation();armed=true;launch.textContent='점화';launch.classList.add('armed');root.querySelector('#dlLog').textContent='발사 덮개 개방\n점화 명령을 기다리는 중';setTimeout(()=>{armed=false;launch.textContent='발사 덮개 열기';launch.classList.remove('armed')},8000);} },true);}
    }
    if(id==='random'){
      root.querySelector('#randGo')?.addEventListener('click',()=>setTimeout(()=>{const o=root.querySelector('#randOut');scramble(o,o.textContent,850)},0));
    }
    if(id==='quiz'){
      let combo=0; const cast=root.querySelector('#quizCast');cast?.addEventListener('click',()=>setTimeout(()=>{const result=root.querySelector('#quizResult')?.textContent||'';combo=result.includes('치명타')?combo+1:0;cast.textContent=combo>1?`정답 마법 발사 ×${combo}`:'정답 마법 발사';},20));
    }
    if(id==='compress'){
      root.querySelector('#cmpRun')?.addEventListener('click',()=>{root.querySelector('.app-frame')?.animate([{transform:'translate(0)'},{transform:'translate(-5px,4px)'},{transform:'translate(5px,-4px)'},{transform:'translate(0)'}],{duration:420,iterations:2});});
    }
    if(id==='compat'){
      root.querySelector('#compGo')?.addEventListener('click',()=>setTimeout(()=>{const s=root.querySelector('#compScore');s?.animate([{opacity:0,filter:'blur(20px)',transform:'scale(.3)'},{opacity:1,filter:'blur(0)',transform:'scale(1.2)'},{transform:'scale(1)'}],{duration:900});},0));
    }
    if(id==='volume'){
      root.addEventListener('input',e=>{if(e.target.matches('[data-fader]')){const v=+e.target.value;root.querySelector('.arena-beams')?.style.setProperty('opacity',String(.15+v/120));}});
    }
    if(id==='refresh'){
      root.querySelector('#refGo')?.addEventListener('click',()=>root.querySelector('.time-rings')?.animate([{transform:'translate(-50%,-50%) scale(1)'},{transform:'translate(-50%,-50%) scale(2.8)',filter:'brightness(3)'},{opacity:0}],{duration:1500,easing:'cubic-bezier(.2,.8,.2,1)'}));
    }
  }

  const actionIds={weather:'wSimulate',button:'confirmCore',todo:null,timer:'timerStart',password:'pwGen',dice:'diceRoll',rps:null,currency:'curConvert',counter:'countInterrogate',lunch:'lunchOracle',qr:'qrGenerate',nickname:'nickAwaken',spell:'spellJudge',download:'dlLaunch',random:'randGo',quiz:'quizCast',compress:'cmpRun',compat:'compGo',volume:'volBlast',refresh:'refGo'};

  function upgrade(root){
    if(!root||root.dataset.maximal==='1')return; root.dataset.maximal='1'; const id=root.id.replace('app-',''); addDecor(id,root);addRecord(root,id);specialBehavior(id,root);
    root.addEventListener('click',e=>{const target=actionIds[id];if((target&&e.target.id===target)||(id==='todo'&&e.target.matches('[data-done]'))||(id==='rps'&&e.target.matches('[data-rps]'))){bump(id,root);}},true);
  }

  function enhanceHome(){
    document.querySelectorAll('.launch-card').forEach(card=>{
      if(card.dataset.maxHome==='1')return; card.dataset.maxHome='1';
      const id=card.dataset.app;
      const badge=document.createElement('span');badge.className='home-record';badge.textContent=`가동 ${records[id]||0}회`;card.appendChild(badge);
      card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.transform=`translateY(-8px) rotateX(${-y*7}deg) rotateY(${x*9}deg) scale(1.018)`;card.style.setProperty('--mx',`${e.clientX-r.left}px`);card.style.setProperty('--my',`${e.clientY-r.top}px`);});
      card.addEventListener('pointerleave',()=>{card.style.transform='';});
    });
  }
  const mount=document.getElementById('appMount');
  new MutationObserver(()=>mount?.querySelectorAll('.app-screen').forEach(upgrade)).observe(mount,{childList:true,subtree:true});
  document.querySelectorAll('.app-screen').forEach(upgrade);
  enhanceHome();
})();
