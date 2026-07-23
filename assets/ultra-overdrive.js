(()=>{
  const IDS=['weather','button','todo','timer','password','dice','rps','currency','counter','lunch','qr','nickname','spell','download','random','quiz','compress','compat','volume','refresh'];
  const CARD_HTML={
    weather:'<div class="card-ring"></div><div class="card-rain"></div><div class="card-shock"></div>',
    button:'<div class="card-symbol">🔴</div><div class="card-shock"></div><div class="card-ring r2"></div>',
    todo:'<div class="card-paper"></div><div class="card-sword">⚔️</div>',
    timer:'<div class="card-digit">25:00</div><div class="card-scan"></div>',
    password:'<div class="card-scan"></div><div class="card-symbol">🔓</div><div class="card-rain"></div>',
    dice:'<div class="card-ring"></div><div class="card-ring r2"></div><div class="card-symbol">🎲</div>',
    rps:'<div class="card-symbol">✊ ✋ ✌️</div><div class="card-shock"></div>',
    currency:'<div class="card-bars">'+('<i></i>'.repeat(12))+'</div><div class="card-coin">₩</div>',
    counter:'<div class="card-paper"></div><div class="card-scan"></div>',
    lunch:'<div class="card-ring"></div><div class="card-symbol">🍲</div><div class="card-flame"></div>',
    qr:'<div class="card-ring r2"></div><div class="card-symbol">▦</div><div class="card-scan"></div>',
    nickname:'<div class="card-ring"></div><div class="card-ring r2"></div><div class="card-symbol">🧬</div>',
    spell:'<div class="card-paper"></div><div class="card-symbol">⚖️</div><div class="card-shock"></div>',
    download:'<div class="card-symbol">🚀</div><div class="card-flame"></div>',
    random:'<div class="card-digit">742391</div><div class="card-ring r2"></div><div class="card-scan"></div>',
    quiz:'<div class="card-symbol">🐉</div><div class="card-shock"></div><div class="card-flame"></div>',
    compress:'<div class="card-symbol">🗜️</div><div class="card-bars">'+('<i></i>'.repeat(8))+'</div>',
    compat:'<div class="card-ring"></div><div class="card-ring r2"></div><div class="card-heart">♡</div>',
    volume:'<div class="card-bars">'+('<i></i>'.repeat(16))+'</div><div class="card-beam"></div>',
    refresh:'<div class="card-ring"></div><div class="card-ring r2"></div><div class="card-shock"></div>'
  };
  const TITLES={weather:'폭풍 관제 가동',button:'최종 봉인 해제',todo:'마왕에게 일격',timer:'집중 벙커 가동',password:'보안망 강제 돌파',dice:'운명 궤도 회전',rps:'전략 병기 충돌',currency:'시장 충격 발생',counter:'진술 강제 분석',lunch:'신탁 강림',qr:'레이저 각인 개시',nickname:'유전자 각성',spell:'유죄 판결 집행',download:'궤도 발사',random:'기밀 숫자 확보',quiz:'수학 마법 발사',compress:'고압 압착',compat:'쌍성 충돌',volume:'십만 관객 폭주',refresh:'시간선 붕괴'};
  const CAPTIONS={weather:'대기 흐름을 강제로 읽는 중',button:'되돌릴 수 없는 승인 절차',todo:'퀘스트 완료 · 보스 체력 파괴',timer:'외부 세계 차단 · 집중만 허용',password:'엔트로피 폭주 · 암호 생성',dice:'확률 우주를 재배열하는 중',rps:'세 전략 병기의 최종 충돌',currency:'환율 변환과 동시에 시장이 흔들림',counter:'문장 구조와 진술 신뢰도를 추궁',lunch:'배고픔을 운명으로 포장하는 중',qr:'데이터를 광자로 새기는 중',nickname:'이름의 잠재 유전자를 깨우는 중',spell:'오타 피고인에게 판결을 선고',download:'파일 화물을 로컬 궤도에 투입',random:'위성 엔트로피로 숫자 확보',quiz:'정답을 공격력으로 변환',compress:'이미지 용량을 물리적으로 짓누름',compat:'두 이름의 별자리를 충돌 분석',volume:'출력과 관객 에너지를 동시에 증폭',refresh:'현재 페이지를 시간선에서 제거'};
  const ACTIONS={weather:['#wSimulate'],button:['#confirmCore'],todo:['[data-done]'],timer:['#timerStart'],password:['#pwGen'],dice:['#diceRoll'],rps:['[data-rps]'],currency:['#curConvert'],counter:['#countInterrogate'],lunch:['#lunchOracle'],qr:['#qrGenerate'],nickname:['#nickAwaken'],spell:['#spellJudge'],download:['#dlLaunch'],random:['#randGo'],quiz:['#quizCast'],compress:['#cmpRun'],compat:['#compGo'],volume:['#volBlast','[data-fader]'],refresh:['#refGo']};
  const DUR={weather:2500,button:1900,todo:1400,timer:999999,password:1900,dice:1800,rps:1500,currency:1900,counter:1500,lunch:2100,qr:2300,nickname:2300,spell:1600,download:3600,random:1900,quiz:1500,compress:2300,compat:2200,volume:1600,refresh:2100};

  function enhanceCards(){
    document.querySelectorAll('.launch-card').forEach(card=>{
      if(card.querySelector('.card-livefx')) return;
      const id=card.dataset.app; if(!CARD_HTML[id]) return;
      const fx=document.createElement('div');fx.className=`card-livefx card-fx-${id}`;fx.innerHTML=CARD_HTML[id];
      card.prepend(fx);
    });
  }

  function debrisHTML(){
    return Array.from({length:32},(_,i)=>`<i style="--dx:${Math.random()*720-360}px;--dy:${Math.random()*440-220}px;--rot:${Math.random()*900-450}deg;--delay:${(Math.random()*.25).toFixed(2)}s"></i>`).join('');
  }
  function layerHTML(id){return `<div class="ultra-layer"><div class="ultra-grid"></div><div class="ultra-orb o1"></div><div class="ultra-orb o2"></div><div class="ultra-orb o3"></div><div class="ultra-sweep"></div><div class="ultra-shockwave"></div><div class="ultra-flare"></div><div class="ultra-debris">${debrisHTML()}</div><div class="ultra-title">${TITLES[id]}</div><div class="ultra-caption">${CAPTIONS[id]}</div><div class="ultra-vignette"></div></div>`}

  function addLayer(root,id){
    const stage=root.querySelector('.operation-stage'); if(!stage||stage.querySelector('.ultra-layer')) return;
    stage.insertAdjacentHTML('afterbegin',layerHTML(id));
  }
  function run(root,id,soft=false){
    const stage=root.querySelector('.operation-stage'); if(!stage) return;
    if(id==='button' && root.querySelector('#confirmCore')?.disabled) return;
    stage.classList.remove('ultra-running','ultra-finish');root.classList.remove('ultra-root-running');
    void stage.offsetWidth;
    stage.classList.add('ultra-running');root.classList.add('ultra-root-running');
    const read=stage.querySelector('.op-readout span');if(read) read.textContent=CAPTIONS[id];
    clearTimeout(stage._ultraDone);
    if(id!=='timer') stage._ultraDone=setTimeout(()=>{stage.classList.remove('ultra-running');stage.classList.add('ultra-finish');root.classList.remove('ultra-root-running');setTimeout(()=>stage.classList.remove('ultra-finish'),900)},soft?650:DUR[id]);
  }
  function stop(root){root.querySelector('.operation-stage')?.classList.remove('ultra-running');root.classList.remove('ultra-root-running')}
  function wire(root){
    if(root.dataset.ultra==='1')return;root.dataset.ultra='1';const id=root.id.replace('app-','');addLayer(root,id);
    root.addEventListener('click',e=>{
      const sels=ACTIONS[id]||[];if(!sels.some(s=>e.target.matches(s)||e.target.closest(s)))return;
      if(id==='download'&&!root.querySelector('#dlLaunch')?.classList.contains('armed')){const st=root.querySelector('.operation-stage');st?.classList.add('ultra-arming');setTimeout(()=>st?.classList.remove('ultra-arming'),1000);return;}
      run(root,id);
    },true);
    if(id==='counter') root.querySelector('#countText')?.addEventListener('input',()=>run(root,id,true));
    if(id==='volume') root.addEventListener('input',e=>{if(e.target.matches('[data-fader]'))run(root,id,true)});
    if(id==='timer'){
      root.querySelector('#timerPause')?.addEventListener('click',()=>stop(root));
      root.querySelector('#timerReset')?.addEventListener('click',()=>stop(root));
    }
  }
  enhanceCards();
  const grid=document.getElementById('toolGrid');if(grid)new MutationObserver(enhanceCards).observe(grid,{childList:true,subtree:true});
  const mount=document.getElementById('appMount');if(mount)new MutationObserver(()=>mount.querySelectorAll('.app-screen').forEach(wire)).observe(mount,{childList:true,subtree:true});
  document.querySelectorAll('.app-screen').forEach(wire);
})();
