(() => {
  const STAGES = {
    weather: `
      <div class="op-weather-grid"></div><div class="op-weather-radar"><i></i><b></b><em></em><span class="storm-cell c1"></span><span class="storm-cell c2"></span><span class="storm-cell c3"></span></div>
      <div class="op-weather-clouds"><span></span><span></span><span></span></div><div class="op-weather-rain"></div><div class="op-weather-lightning">⚡</div>
      <div class="op-readout"><strong>서울 상공 관측망</strong><span data-op-value>기상 자료 대기</span></div>`,
    button: `
      <div class="op-vault"><div class="vault-door left"></div><div class="vault-door right"></div><div class="vault-core"><span>확인</span><i></i></div><div class="vault-lock l1">전력</div><div class="vault-lock l2">책임</div><div class="vault-lock l3">현실</div><div class="vault-shock s1"></div><div class="vault-shock s2"></div></div>
      <div class="op-readout"><strong>최종 승인 격리실</strong><span data-op-value>3중 봉인 대기</span></div>`,
    todo: `
      <div class="op-guild-board"><div class="op-quest q1"><b>미루기 드래곤 토벌</b><i>의뢰</i></div><div class="op-quest q2"><b>저주받은 바탕화면 정리</b><i>의뢰</i></div><div class="op-quest q3"><b>마감 기한 구출</b><i>의뢰</i></div><div class="op-sword left">⚔</div><div class="op-sword right">⚔</div><div class="op-dragon">🐉</div><div class="op-hit">-1250</div></div>
      <div class="op-readout"><strong>길드 의뢰 게시판</strong><span data-op-value>보스 체력 10000</span></div>`,
    timer: `
      <div class="op-bunker"><div class="bunker-gate g1"></div><div class="bunker-gate g2"></div><div class="op-timer-digits" data-op-value>25:00</div><div class="reactor-column r1"><i></i></div><div class="reactor-column r2"><i></i></div><div class="reactor-column r3"><i></i></div><div class="hazard-light h1"></div><div class="hazard-light h2"></div></div>
      <div class="op-readout"><strong>제7 집중 벙커</strong><span>동력로 대기</span></div>`,
    password: `
      <div class="op-terminal"><div class="code-stream a"></div><div class="code-stream b"></div><div class="code-stream c"></div><div class="op-lock"><div class="shackle"></div><div class="body">🔒</div></div><div class="op-password-line" data-op-value>••••••••••••••••</div><div class="terminal-scan"></div></div>
      <div class="op-readout"><strong>비인가 보안 단말</strong><span>난수 재료 대기</span></div>`,
    dice: `
      <div class="op-cosmos"><div class="orbit o1"></div><div class="orbit o2"></div><div class="orbit o3"></div><div class="op-die"><span class="front">6</span><span class="back">1</span><span class="right">3</span><span class="left">4</span><span class="top">2</span><span class="bottom">5</span></div><div class="cosmic-dust"></div></div>
      <div class="op-readout"><strong>확률 관측 제단</strong><span data-op-value>20면체 대기</span></div>`,
    rps: `
      <div class="op-war-map"><div class="map-grid"></div><button class="war-unit rock">✊</button><button class="war-unit paper">✋</button><button class="war-unit scissors">✌️</button><div class="war-target"></div><div class="war-explosion">💥</div><div class="war-result" data-op-value>전략 대기</div></div>
      <div class="op-readout"><strong>전 지구 전략 시뮬레이션</strong><span>병기 선택 대기</span></div>`,
    currency: `
      <div class="op-market"><div class="market-chart"><svg viewBox="0 0 500 180" preserveAspectRatio="none"><polyline points="0,30 65,45 110,38 165,75 220,62 275,115 335,92 400,150 500,130"/></svg></div><div class="candle-field"></div><div class="currency-coin won">₩</div><div class="currency-coin dollar">$</div><div class="currency-arrow">⇄</div><div class="market-crash">급락</div></div>
      <div class="op-readout"><strong>시장 붕괴 환전소</strong><span data-op-value>환율 자료 대기</span></div>`,
    counter: `
      <div class="op-interrogation"><div class="lamp-wire"></div><div class="lamp-shade"></div><div class="lamp-cone"></div><div class="evidence-paper"><span>진술서</span><i></i><i></i><i></i><i></i></div><div class="scanner-line"></div><div class="evidence-counter"><b data-op-value>0</b><span>글자 압수</span></div></div>
      <div class="op-readout"><strong>취조실 7-B</strong><span>진술서 투입 대기</span></div>`,
    lunch: `
      <div class="op-shrine"><div class="food-ring"><span>🍜</span><span>🍔</span><span>🍕</span><span>🥟</span><span>🍣</span><span>🌮</span></div><div class="cauldron"><i></i><b>🍲</b></div><div class="incense-smoke s1"></div><div class="incense-smoke s2"></div><div class="oracle-choice" data-op-value>메뉴 신탁 대기</div></div>
      <div class="op-readout"><strong>공복 신탁 제3제단</strong><span>별들이 배고파하는 중</span></div>`,
    qr: `
      <div class="op-qr-lab"><div class="laser-rail"><div class="laser-head"></div></div><div class="laser-beam"></div><div class="qr-plate">${'<i></i>'.repeat(81)}</div><div class="robot-claw left"><i></i></div><div class="robot-claw right"><i></i></div><div class="qr-smoke"></div></div>
      <div class="op-readout"><strong>레이저 QR 각인 공정</strong><span data-op-value>격자 정렬 대기</span></div>`,
    nickname: `
      <div class="op-gene-lab"><div class="gene-tube"><div class="dna"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div><div class="gene-pod p1">암흑</div><div class="gene-pod p2">영웅</div><div class="gene-pod p3">신비</div><div class="gene-energy"></div><div class="name-manifest" data-op-value>별칭 미발현</div></div>
      <div class="op-readout"><strong>별칭 유전자 각성실</strong><span>각성 원본 분석 대기</span></div>`,
    spell: `
      <div class="op-court"><div class="court-columns"></div><div class="court-paper"><span class="bad-word">오타</span><span class="bad-word">문법</span><span class="bad-word">띄어쓰기</span></div><div class="court-gavel"><i></i><b></b></div><div class="court-stamp" data-op-value>심리 중</div><div class="court-impact"></div></div>
      <div class="op-readout"><strong>대한 맞춤법 최고법정</strong><span>증거 문서 심리 대기</span></div>`,
    download: `
      <div class="op-launchpad"><div class="launch-tower left"></div><div class="launch-tower right"></div><div class="rocket"><i></i><b></b><em></em></div><div class="rocket-flame"></div><div class="launch-smoke"></div><div class="countdown" data-op-value>발사 대기</div></div>
      <div class="op-readout"><strong>파일 발사 관제 1번대</strong><span>화물 적재 대기</span></div>`,
    random: `
      <div class="op-random-room"><div class="satellite">🛰️</div><div class="reticle"><i></i><b></b></div><div class="digit-cloud"><span>7</span><span>4</span><span>2</span><span>3</span><span>9</span><span>1</span></div><div class="random-lock">🔒</div><div class="random-result" data-op-value>기밀 대기</div></div>
      <div class="op-readout"><strong>난수 확보 극비 작전</strong><span>위성 좌표 동기화 중</span></div>`,
    quiz: `
      <div class="op-battle"><div class="mage">🧙</div><div class="dragon">🐉</div><div class="magic-orb"></div><div class="slash"></div><div class="damage" data-op-value>정답 대기</div><div class="boss-bar"><i></i></div></div>
      <div class="op-readout"><strong>고대 수학룡 보스전</strong><span>산수 마법 충전 중</span></div>`,
    compress: `
      <div class="op-press"><div class="press-frame"></div><div class="hydraulic-head"><i></i></div><div class="image-slab"><span>사진</span></div><div class="conveyor"><i></i></div><div class="pressure-gauge"><b></b></div><div class="press-result" data-op-value>압축 대기</div></div>
      <div class="op-readout"><strong>고압 이미지 압착 공장</strong><span>안전문 잠김</span></div>`,
    compat: `
      <div class="op-observatory"><div class="star-chart"></div><div class="star one">✦</div><div class="star two">✦</div><div class="orbit-path"></div><div class="heart-line">♡</div><div class="compat-score" data-op-value>--%</div><div class="telescope"></div></div>
      <div class="op-readout"><strong>쌍성 관계 관측소</strong><span>두 이름의 궤도 대기</span></div>`,
    volume: `
      <div class="op-stadium"><div class="crowd">${'<i></i>'.repeat(60)}</div><div class="stage-beam b1"></div><div class="stage-beam b2"></div><div class="stage-beam b3"></div><div class="speaker left">◖</div><div class="speaker right">◗</div><div class="eq-bars">${'<i></i>'.repeat(16)}</div><div class="volume-value" data-op-value>출력 대기</div></div>
      <div class="op-readout"><strong>십만 관객 음향 조종석</strong><span>주 출력 0%</span></div>`,
    refresh: `
      <div class="op-timegate"><div class="time-ring r1"></div><div class="time-ring r2"></div><div class="time-ring r3"></div><div class="clock-hand h1"></div><div class="clock-hand h2"></div><div class="portal-core"></div><div class="time-fragments">Ⅲ　Ⅵ　Ⅸ　Ⅻ</div><div class="timeline-label" data-op-value>현재 시간선</div></div>
      <div class="op-readout"><strong>시간선 복원 관문</strong><span>역설 위험 높음</span></div>`
  };

  const ACTIONS = {
    weather:['#wSimulate'], button:['#confirmCore'], todo:['[data-done]'], timer:['#timerStart'], password:['#pwGen'], dice:['#diceRoll'], rps:['[data-rps]'], currency:['#curConvert'], counter:['#countInterrogate'], lunch:['#lunchOracle'], qr:['#qrGenerate'], nickname:['#nickAwaken'], spell:['#spellJudge'], download:['#dlLaunch'], random:['#randGo'], quiz:['#quizCast'], compress:['#cmpRun'], compat:['#compGo'], volume:['#volBlast','[data-fader]'], refresh:['#refGo']
  };

  const RESULT_READERS = {
    weather:r=>r.querySelector('#wAlert')?.textContent,
    button:r=>r.querySelector('#confirmStatus')?.textContent,
    todo:r=>r.querySelector('#todoHp')?.textContent,
    timer:r=>r.querySelector('#timerDisplay')?.textContent,
    password:r=>r.querySelector('#pwOutput')?.textContent,
    dice:r=>r.querySelector('#diceValue')?.textContent,
    rps:r=>r.querySelector('#rpsResult')?.textContent,
    currency:r=>r.querySelector('#curOutput')?.textContent,
    counter:r=>r.querySelector('#countChars')?.textContent,
    lunch:r=>r.querySelector('#lunchResult')?.textContent,
    qr:r=>r.querySelector('#qrResult')?.textContent?.split('\n')[1],
    nickname:r=>r.querySelector('#nickOut')?.textContent,
    spell:r=>r.querySelector('#spellVerdict')?.textContent,
    download:r=>r.querySelector('#dlTimer')?.textContent,
    random:r=>r.querySelector('#randOut')?.textContent,
    quiz:r=>r.querySelector('#quizResult')?.textContent,
    compress:r=>r.querySelector('#cmpAfter')?.textContent,
    compat:r=>r.querySelector('#compScore')?.textContent,
    volume:r=>r.querySelector('#volEnergy')?.textContent,
    refresh:r=>r.querySelector('#refState')?.textContent
  };

  function createStage(root,id){
    const content=root.querySelector('.app-content');
    if(!content || content.querySelector('.operation-stage')) return;
    const stage=document.createElement('section');
    stage.className=`operation-stage op-${id}`;
    stage.dataset.op=id;
    stage.innerHTML=STAGES[id] || '';
    content.prepend(stage);
    sync(root,id,stage);
    installAmbient(root,id,stage);
  }

  function trigger(root,id){
    const stage=root.querySelector('.operation-stage'); if(!stage) return;
    stage.classList.remove('op-running','op-finish','op-fail');
    void stage.offsetWidth;
    stage.classList.add('op-running');
    burst(stage,id);
    if(id==='timer'){ sync(root,id,stage); return; }
    const duration={weather:2200,button:1600,todo:1000,password:1500,dice:1400,rps:1200,currency:1600,counter:1300,lunch:1800,qr:2100,nickname:2100,spell:1300,download:3500,random:1600,quiz:1200,compress:2100,compat:1900,volume:1100,refresh:1800}[id]||1500;
    clearTimeout(stage._finish);
    stage._finish=setTimeout(()=>{ stage.classList.remove('op-running'); stage.classList.add('op-finish'); sync(root,id,stage); setTimeout(()=>stage.classList.remove('op-finish'),900); },duration);
  }

  function sync(root,id,stage){
    const val=stage.querySelector('[data-op-value]'); if(!val) return;
    const read=RESULT_READERS[id]; const text=read ? read(root) : '';
    if(text && text.trim()) val.textContent=text.trim().slice(0,42);
    if(id==='timer') val.textContent=root.querySelector('#timerDisplay')?.textContent||val.textContent;
    if(id==='counter') val.textContent=(root.querySelector('#countChars')?.textContent||'0')+'자';
  }

  function burst(stage,id){
    const symbols={weather:['⚡','💧'],button:['⚠','✦'],todo:['⚔','✦'],timer:['☢','⚠'],password:['0','1'],dice:['✦','◆'],rps:['💥','✦'],currency:['₩','$','€'],counter:['§','📄'],lunch:['🍜','🍕'],qr:['▦','✦'],nickname:['🧬','✦'],spell:['⚖','§'],download:['🔥','🚀'],random:['0','7'],quiz:['✨','💥'],compress:['⚙','✦'],compat:['♡','✦'],volume:['♪','♫'],refresh:['Ⅻ','◌']}[id]||['✦'];
    for(let i=0;i<14;i++){
      const p=document.createElement('i'); p.className='op-particle'; p.textContent=symbols[i%symbols.length];
      p.style.left=(45+Math.random()*10)+'%'; p.style.top=(40+Math.random()*20)+'%'; p.style.setProperty('--dx',(Math.random()*260-130)+'px'); p.style.setProperty('--dy',(Math.random()*180-90)+'px'); p.style.animationDelay=(Math.random()*.12)+'s'; stage.appendChild(p); setTimeout(()=>p.remove(),1200);
    }
  }

  function installAmbient(root,id,stage){
    if(id==='timer'){
      const obs=new MutationObserver(()=>sync(root,id,stage)); const d=root.querySelector('#timerDisplay'); if(d) obs.observe(d,{childList:true,characterData:true,subtree:true});
      root.querySelector('#timerPause')?.addEventListener('click',()=>stage.classList.remove('op-running'));
      root.querySelector('#timerReset')?.addEventListener('click',()=>{stage.classList.remove('op-running');sync(root,id,stage)});
    }
    if(id==='counter') root.querySelector('#countText')?.addEventListener('input',()=>{sync(root,id,stage);stage.classList.add('op-scanning');clearTimeout(stage._scan);stage._scan=setTimeout(()=>stage.classList.remove('op-scanning'),350)});
    if(id==='volume') root.addEventListener('input',e=>{if(e.target.matches('[data-fader]')){sync(root,id,stage);stage.style.setProperty('--volume',e.target.value);stage.classList.add('op-running');clearTimeout(stage._vol);stage._vol=setTimeout(()=>stage.classList.remove('op-running'),520)}});
    if(id==='todo'){
      const hp=root.querySelector('#todoHp'); if(hp){const obs=new MutationObserver(()=>sync(root,id,stage));obs.observe(hp,{childList:true,subtree:true});}
    }
  }

  function enhance(root){
    if(!root || root.dataset.operationStage==='1') return;
    root.dataset.operationStage='1'; const id=root.id.replace('app-',''); createStage(root,id);
    root.addEventListener('click',e=>{
      const sels=ACTIONS[id]||[];
      if(id==='download' && (e.target.matches('#dlLaunch') || e.target.closest('#dlLaunch'))){
        const btn=root.querySelector('#dlLaunch');
        if(btn && !btn.classList.contains('armed')){
          const stage=root.querySelector('.operation-stage'); stage?.classList.add('op-arming'); setTimeout(()=>stage?.classList.remove('op-arming'),900);
          return;
        }
      }
      if(sels.some(sel=>e.target.matches(sel) || e.target.closest(sel))) trigger(root,id);
    },true);
  }

  const mount=document.getElementById('appMount');
  if(mount) new MutationObserver(()=>mount.querySelectorAll('.app-screen').forEach(enhance)).observe(mount,{childList:true,subtree:true});
  document.querySelectorAll('.app-screen').forEach(enhance);
})();
