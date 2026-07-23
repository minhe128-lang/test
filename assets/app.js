const APPS = [
  {id:'weather', title:'천지개벽 날씨국', icon:'🌦️', color:'#4dceff', scene:'assets/scenes/weather.webp', thumb:'assets/mockups/weather.webp', cls:'theme-blue', dock:'right'},
  {id:'button', title:'궁극의 확인 버튼', icon:'🔘', color:'#ff5c5c', scene:'assets/scenes/button.webp', thumb:'assets/mockups/button.webp', cls:'theme-red', dock:'bottom'},
  {id:'todo', title:'마왕 토벌 투두', icon:'⚔️', color:'#d9a74a', scene:'assets/scenes/todo.webp', thumb:'assets/mockups/todo.webp', cls:'theme-gold', dock:'left'},
  {id:'timer', title:'종말 집중 타이머', icon:'☢️', color:'#d7ff4d', scene:'assets/scenes/timer.webp', thumb:'assets/mockups/timer.webp', cls:'theme-gold', dock:'right'},
  {id:'password', title:'해킹식 비밀번호 생성', icon:'💻', color:'#59ff83', scene:'assets/scenes/password.webp', thumb:'assets/mockups/password.webp', cls:'theme-green', dock:'left'},
  {id:'dice', title:'우주 창조 주사위', icon:'🎲', color:'#d48aff', scene:'assets/scenes/dice.webp', thumb:'assets/mockups/dice.webp', cls:'theme-purple', dock:'right'},
  {id:'rps', title:'세계대전 가위바위보', icon:'✊', color:'#ff704d', scene:'assets/scenes/rps.webp', thumb:'assets/mockups/rps.webp', cls:'theme-red', dock:'left'},
  {id:'currency', title:'금융위기 환율 계산', icon:'📉', color:'#ff6c57', scene:'assets/scenes/currency.webp', thumb:'assets/mockups/currency.webp', cls:'theme-red', dock:'right'},
  {id:'counter', title:'문서 심문실', icon:'🔎', color:'#69b6ff', scene:'assets/scenes/counter.webp', thumb:'assets/mockups/counter.webp', cls:'theme-blue', dock:'bottom'},
  {id:'lunch', title:'점심 신탁소', icon:'🍲', color:'#ffb14d', scene:'assets/scenes/lunch.webp', thumb:'assets/mockups/lunch.webp', cls:'theme-gold', dock:'right'},
  {id:'qr', title:'레이저 QR 제조소', icon:'▦', color:'#55e8ff', scene:'assets/scenes/qr.webp', thumb:'assets/mockups/qr.webp', cls:'theme-blue', dock:'left'},
  {id:'nickname', title:'닉네임 각성 연구소', icon:'🧬', color:'#c76dff', scene:'assets/scenes/nickname.webp', thumb:'assets/mockups/nickname.webp', cls:'theme-purple', dock:'right'},
  {id:'spell', title:'맞춤법 대법원', icon:'⚖️', color:'#f0c06c', scene:'assets/scenes/spell.webp', thumb:'assets/mockups/spell.webp', cls:'theme-gold', dock:'left'},
  {id:'download', title:'파일 발사 통제소', icon:'🚀', color:'#4aa6ff', scene:'assets/scenes/download.webp', thumb:'assets/mockups/download.webp', cls:'theme-blue', dock:'right'},
  {id:'random', title:'극비 난수 작전실', icon:'🎰', color:'#ff5c6b', scene:'assets/scenes/random.webp', thumb:'assets/mockups/random.webp', cls:'theme-red', dock:'left'},
  {id:'quiz', title:'산수 던전', icon:'🐉', color:'#91d45d', scene:'assets/scenes/quiz.webp', thumb:'assets/mockups/quiz.webp', cls:'theme-gold', dock:'right'},
  {id:'compress', title:'이미지 압축 프레스', icon:'🗜️', color:'#ff9d4c', scene:'assets/scenes/compress.webp', thumb:'assets/mockups/compress.webp', cls:'theme-gold', dock:'left'},
  {id:'compat', title:'우주 궁합 판독기', icon:'🔮', color:'#ff7acc', scene:'assets/scenes/compat.webp', thumb:'assets/mockups/compat.webp', cls:'theme-purple', dock:'right'},
  {id:'volume', title:'스타디움 볼륨 콘솔', icon:'🔊', color:'#4fe0c3', scene:'assets/scenes/volume.webp', thumb:'assets/mockups/volume.webp', cls:'theme-blue', dock:'bottom'},
  {id:'refresh', title:'시간여행 새로고침', icon:'🌀', color:'#8f7cff', scene:'assets/scenes/refresh.webp', thumb:'assets/mockups/refresh.webp', cls:'theme-purple', dock:'bottom'},
];

const byId = (id) => document.getElementById(id);
const $ = (sel, root=document) => root.querySelector(sel);
const mount = byId('appMount');
const flash = document.createElement('div'); flash.className = 'full-flash'; document.body.appendChild(flash);
let currentApp = null;

const cardGrid = byId('toolGrid');
cardGrid.innerHTML = APPS.map((app, i) => `
<button class="launch-card" style="--scene:url('${app.thumb || app.scene}');--accent:${app.color}" data-app="${app.id}">
  <span class="enter">↗</span>
  <div class="sys">System ${String(i+1).padStart(2,'0')}</div>
  <span class="card-icon">${app.icon}</span>
  <h3>${app.title}</h3>
  <p>${tagline(app.id)}</p>
  <div class="accent-line"></div>
</button>`).join('');
cardGrid.addEventListener('click', e => {
  const btn = e.target.closest('.launch-card');
  if (btn) openApp(btn.dataset.app);
});

function tagline(id){
  return {
    weather:'기상국 관제실 UI에서 실제 날씨를 상황실처럼 표시.',
    button:'중앙 돔형 확인 코어를 누르면 세계가 끝난 척 연출.',
    todo:'길드 게시판 구조로 할 일과 보스전 진행이 분리.',
    timer:'벙커 제어판처럼 생긴 집중 타이머.',
    password:'녹색 터미널과 로그창이 따로 있는 해킹식 생성기.',
    dice:'우주 제단 중심의 운명 굴림실.',
    rps:'전장 지도와 전략 브리핑이 있는 가위바위보 지휘실.',
    currency:'시장 붕괴 대시보드 형식의 환율 변환기.',
    counter:'취조 영상, 진술서, 분석 패널이 분리된 글자수 도구.',
    lunch:'제단 중심의 메뉴 신탁 구조.',
    qr:'레이저 각인 장비 구조의 QR 생성실.',
    nickname:'DNA 챔버와 등급 판정이 있는 닉네임 연구소.',
    spell:'법정 문서 검토 UI로 오타를 재판.',
    download:'페이로드 설정과 발사 패널 분리.',
    random:'작전 콘솔 기반 난수 생성.',
    quiz:'드래곤 보스전형 산수 풀이.',
    compress:'산업 프레스 장비형 압축기.',
    compat:'별자리 관측소형 궁합 감정.',
    volume:'실제 믹서 콘솔처럼 채널 슬라이더 구성.',
    refresh:'시공간 포털 제어 화면.'
  }[id];
}

function shell(app, layoutClass, inner){
  return `
  <section class="app-screen ${app.cls}" id="app-${app.id}" style="--accent:${app.color};--scene:url('${app.scene}')">
    <div class="app-frame">
      <div class="app-toolbar">
        <div class="meta"><b>${app.title}</b><span>${app.id.toUpperCase()} SYSTEM</span></div>
        <button class="close-app" data-close="1">← 도구함으로</button>
      </div>
      <div class="app-content app-unique ${layoutClass}">${inner}</div>
    </div>
  </section>`;
}

const renderers = {
  weather(app){return shell(app,'layout-weather',`
    <div class="stack">
      <div class="panel pad"><div class="sub">Global Telemetry</div><div class="metric-grid two">
        <div class="metric"><div class="label">Temp</div><div class="num" id="wTemp">--°C</div></div>
        <div class="metric"><div class="label">Wind</div><div class="num" id="wWind">-- km/h</div></div>
        <div class="metric"><div class="label">Humidity</div><div class="num" id="wHum">--%</div></div>
        <div class="metric"><div class="label">Condition</div><div class="num" id="wCode" style="font-size:15px">LOADING</div></div>
      </div></div>
      <div class="scene-window short"></div>
      <div class="panel pad"><div class="sub">Active Systems</div><div class="choice-list">
        <div class="choice-item">Cloud Seeding <span class="badge">ON</span></div>
        <div class="choice-item">Jet Stream Control <span class="badge">READY</span></div>
        <div class="choice-item">Hurricane Dampener <span class="badge">STANDBY</span></div>
      </div></div>
    </div>
    <div class="stack">
      <div class="scene-window tall"></div>
      <div class="panel pad center">
        <div class="sub">Atmospheric Command</div>
        <div class="warning-strip" id="wAlert">서울 기상 데이터를 불러오는 중</div>
      </div>
      <div class="metric-grid four">
        <div class="metric"><div class="label">Cloud Density</div><div class="num" id="wCloud">72%</div></div>
        <div class="metric"><div class="label">Precipitation</div><div class="num" id="wPrecip">0%</div></div>
        <div class="metric"><div class="label">Visibility</div><div class="num" id="wVis">-- km</div></div>
        <div class="metric"><div class="label">Pressure</div><div class="num" id="wPress">--</div></div>
      </div>
    </div>
    <div class="stack">
      <div class="panel pad"><div class="sub">Storm Front Analysis</div><div class="log" id="wLog">INIT WEATHER CONTROL HQ\nrequesting seoul telemetry...</div></div>
      <div class="panel pad"><div class="sub">Override</div><button class="btn" id="wSimulate">경보 연출 보기</button></div>
    </div>`);},
  button(app){return shell(app,'layout-button',`
    <div class="stack">
      <div class="panel pad"><div class="sub">Authorization Level</div><div class="big-display" style="font-size:48px;color:#ff8b8b">MAX</div><div class="warning-strip">Clearance OMEGA</div></div>
      <div class="panel pad"><div class="sub">Potential Outcomes</div><div class="choice-list"><div class="choice-item">All systems</div><div class="choice-item">Timelines</div><div class="choice-item">Reality</div><div class="choice-item">Cookies</div></div></div>
    </div>
    <div class="stack center">
      <div class="scene-window tall"></div>
      <div class="panel pad center">
        <div class="sub">Final Confirmation</div>
        <div style="margin:10px auto 18px;width:min(520px,100%);aspect-ratio:1.8/1;border-radius:999px;background:radial-gradient(circle at 50% 35%,#ffd0d0,#ff4e4e 55%,#68070d);display:grid;place-items:center;box-shadow:0 0 0 8px rgba(255,255,255,.06),0 0 60px rgba(255,80,80,.4)">
          <button class="btn-danger" id="confirmCore" style="width:88%;height:76%;border-radius:999px;font-size:clamp(28px,5vw,56px)">CONFIRM</button>
        </div>
        <div class="warning-strip" id="confirmStatus">ONE PRESS. NO TAKEBACKS.</div>
      </div>
    </div>
    <div class="stack">
      <div class="panel pad"><div class="sub">Pressure</div><div class="count-ring"><div class="center"><div class="sub">PSI</div><div class="big-display" style="font-size:38px">9.87k</div></div></div></div>
      <div class="panel pad"><div class="sub">System Stability</div><div class="big-display" style="font-size:42px;color:#ff8181" id="confirmStability">12%</div></div>
      <div class="panel pad"><div class="sub">Mission Log</div><div class="log" id="confirmLog">waiting for irresponsible input...</div></div>
    </div>`);},
  todo(app){return shell(app,'layout-todo',`
    <div class="stack">
      <div class="panel pad"><div class="sub">Boss Status</div><div class="scene-window short"></div><div class="metric" style="margin-top:12px"><div class="label">Dragon Lord HP</div><div class="num" id="todoHp">10000 / 10000</div><div class="progress"><i id="todoBar" style="width:100%"></i></div></div></div>
      <div class="panel pad"><div class="sub">Reward Tracker</div><div class="choice-list"><div class="choice-item">10,000 Gold</div><div class="choice-item">2,500 XP</div><div class="choice-item">Legendary Chest</div></div></div>
    </div>
    <div class="stack">
      <div class="panel pad"><div class="between"><div><div class="sub">Main Quest Board</div><div class="value">할 일을 완료할 때마다 보스가 약해진다</div></div><button class="btn" id="todoAddBtn">퀘스트 추가</button></div><div style="margin-top:12px" class="flex"><input id="todoInput" class="field" placeholder="새 퀘스트 입력"><button class="btn-ghost" id="todoQuick">기본 퀘스트 추가</button></div></div>
      <div class="panel pad"><div class="sub">Quest List</div><div id="todoList" class="choice-list"></div></div>
    </div>
    <div class="stack">
      <div class="panel pad"><div class="sub">Guild Notices</div><div class="log">Raid night is Friday.\nBring potions.\nComplain about everything.\nGlory to the guild.</div></div>
      <div class="panel pad"><div class="sub">Progress</div><div class="big-display" style="font-size:42px" id="todoDone">0</div></div>
    </div>`);},
  timer(app){return shell(app,'layout-timer',`
    <div class="stack">
      <div class="panel pad"><div class="sub">Bunker Status</div><div class="choice-list"><div class="choice-item">Power Core <span class="badge">ONLINE</span></div><div class="choice-item">Air Supply <span class="badge">STABLE</span></div><div class="choice-item">Threat Level <span class="badge">OMEGA</span></div></div></div>
      <div class="scene-window short"></div>
    </div>
    <div class="stack center">
      <div class="panel pad center">
        <div class="sub">Doomsday Focus Timer Bunker</div>
        <div class="big-display" id="timerDisplay">25:00</div>
        <div class="orbit-buttons" style="margin-top:14px"><button class="btn-ghost" data-mins="25">Pomodoro</button><button class="btn-ghost" data-mins="5">Short Break</button><button class="btn-ghost" data-mins="15">Long Break</button></div>
        <div class="flex" style="margin-top:14px;justify-content:center"><button class="btn" id="timerStart">START</button><button class="btn-ghost" id="timerPause">PAUSE</button><button class="btn-danger" id="timerReset">RESET</button></div>
      </div>
      <div class="warning-strip" id="timerState">FOCUS MODE: STANDBY</div>
    </div>
    <div class="stack">
      <div class="panel pad"><div class="sub">Survival Rules</div><div class="choice-list"><div class="choice-item">No social media</div><div class="choice-item">No games</div><div class="choice-item">Only focus</div></div></div>
      <div class="panel pad"><div class="sub">Session Log</div><div class="log" id="timerLog">ready.</div></div>
    </div>`);},
  password(app){return shell(app,'layout-password',`
    <div class="stack">
      <div class="panel pad"><div class="sub">Terminal</div><div class="choice-list"><div class="choice-item">Dashboard</div><div class="choice-item">Password Gen</div><div class="choice-item">Hash Cracker</div><div class="choice-item">Encryptor</div></div></div>
      <div class="panel pad"><div class="sub">System Status</div><div class="metric-grid two"><div class="metric"><div class="label">CPU</div><div class="num">24%</div></div><div class="metric"><div class="label">RAM</div><div class="num">41%</div></div></div></div>
    </div>
    <div class="stack">
      <div class="panel pad">
        <div class="sub">Password Generator</div>
        <div class="metric-grid three">
          <div class="metric"><div class="label">Length</div><input type="number" id="pwLen" class="field" value="24" min="8" max="64"></div>
          <label class="metric"><div class="label">Upper</div><input type="checkbox" id="pwUpper" checked></label>
          <label class="metric"><div class="label">Lower</div><input type="checkbox" id="pwLower" checked></label>
          <label class="metric"><div class="label">Number</div><input type="checkbox" id="pwNum" checked></label>
          <label class="metric"><div class="label">Symbol</div><input type="checkbox" id="pwSym" checked></label>
        </div>
        <div class="flex" style="margin-top:12px"><button class="btn" id="pwGen">GENERATE PASSWORD</button><button class="btn-ghost" id="pwCopy">COPY</button></div>
      </div>
      <div class="panel pad"><div class="sub">Generated Password</div><div class="big-display" id="pwOutput" style="font-size:34px;line-height:1.2;word-break:break-all">K7$!bPz9@Lr#Qw2%xTd8!MnV</div><div class="progress" style="margin-top:10px"><i id="pwStrength" style="width:100%"></i></div></div>
    </div>
    <div class="stack">
      <div class="panel pad"><div class="sub">Server Logs</div><div class="log" id="pwLog">secure session established...</div></div>
      <div class="scene-window short"></div>
    </div>`);},
  dice(app){return shell(app,'layout-dice',`
    <div class="stack">
      <div class="panel pad"><div class="sub">Dice Collection</div><div class="choice-list"><button class="btn-ghost die-select" data-sides="4">FATE D4</button><button class="btn-ghost die-select" data-sides="6">ARCANE D6</button><button class="btn-ghost die-select" data-sides="8">STELLAR D8</button><button class="btn-ghost die-select" data-sides="12">VOID D12</button><button class="btn-ghost die-select" data-sides="20">ASTRAL D20</button></div></div>
      <div class="panel pad"><div class="sub">Roll History</div><div class="log" id="diceHistory">no rolls yet.</div></div>
    </div>
    <div class="stack center">
      <div class="scene-window tall"></div>
      <div class="panel pad center"><div class="sub">Cosmic Dice Chamber</div><div class="big-display" id="diceValue">20</div><div class="pill" id="diceType">ASTRAL D20 SELECTED</div><div style="margin-top:14px"><button class="btn portal-button" id="diceRoll">ROLL THE DICE</button></div></div>
    </div>
    <div class="stack">
      <div class="panel pad"><div class="sub">Probability Oracle</div><div class="metric-grid two"><div class="metric"><div class="label">Min</div><div class="num" id="diceMin">1</div></div><div class="metric"><div class="label">Max</div><div class="num" id="diceMax">20</div></div></div></div>
      <div class="panel pad"><div class="sub">Ritual Modifiers</div><div class="choice-list"><div class="choice-item">+2 Cosmic Alignment</div><div class="choice-item">Exploding 20s</div><div class="choice-item">Re-roll Ones</div></div></div>
    </div>`);},
  rps(app){return shell(app,'layout-rps',`
    <div class="stack"><div class="panel pad"><div class="sub">Enemy Intel</div><div class="choice-list"><div class="choice-item">USA — aggressive</div><div class="choice-item">CHINA — defensive</div><div class="choice-item">GLOBAL AI — unknown</div></div></div><div class="scene-window short"></div></div>
    <div class="stack">
      <div class="panel pad center"><div class="sub">Choose Your Weapon</div><div class="war-buttons orbit-buttons"><button data-rps="rock">✊<br>ROCK</button><button data-rps="paper">✋<br>PAPER</button><button data-rps="scissors">✌️<br>SCISSORS</button></div></div>
      <div class="panel pad center"><div class="metric-grid three"><div class="metric"><div class="label">You</div><div class="num" id="rpsYou">-</div></div><div class="metric"><div class="label">Enemy</div><div class="num" id="rpsEnemy">-</div></div><div class="metric"><div class="label">Result</div><div class="num" id="rpsResult">STANDBY</div></div></div></div>
      <div class="warning-strip" id="rpsScore">Wins 0 / Losses 0 / Draws 0</div>
    </div>
    <div class="stack"><div class="panel pad"><div class="sub">Operation Log</div><div class="log" id="rpsLog">awaiting deployment...</div></div><div class="panel pad"><div class="sub">Mission Objectives</div><div class="choice-list"><div class="choice-item">Win 3 rounds</div><div class="choice-item">Avoid 3 losses in a row</div><div class="choice-item">Maintain global dominance</div></div></div></div>`);},
  currency(app){return shell(app,'layout-currency',`
    <div class="stack"><div class="panel pad"><div class="sub">Currency Converter</div><label>From<select class="select" id="curFrom"><option>USD</option><option>EUR</option><option>JPY</option><option>GBP</option><option>KRW</option></select></label><label>To<select class="select" id="curTo" style="margin-top:8px"><option>EUR</option><option>USD</option><option>JPY</option><option>GBP</option><option>KRW</option></select></label><label>Amount<input class="field" id="curAmount" value="10000" type="number"></label><div class="flex" style="margin-top:12px"><button class="btn" id="curConvert">CONVERT</button><button class="btn-ghost" id="curSwap">SWAP</button></div></div></div>
    <div class="stack"><div class="scene-window tall"></div><div class="panel pad"><div class="sub">Converted Amount</div><div class="big-display" id="curOutput" style="font-size:52px">-</div><div class="warning-strip" id="curRate">live market feed ready.</div></div></div>
    <div class="stack"><div class="panel pad"><div class="sub">Market Impact</div><div class="choice-list"><div class="choice-item">Inflation Surge <span class="badge">8.7%</span></div><div class="choice-item">Interest Rate <span class="badge">6.25%</span></div><div class="choice-item">GDP Forecast <span class="badge">-2.4%</span></div></div></div><div class="panel pad"><div class="sub">Recent Conversions</div><div class="log" id="curLog">no recent conversions.</div></div></div>`);},
  counter(app){return shell(app,'layout-counter',`
    <div class="stack">
      <div class="panel pad"><div class="sub">Evidence Document</div><textarea class="area" id="countText">I didn't take the package. I was at the warehouse like you said. Someone else must have moved it.</textarea></div>
      <div class="panel pad"><div class="sub">Evidence Metrics</div><div class="metric-grid four"><div class="metric"><div class="label">Character</div><div class="num" id="countChars">0</div></div><div class="metric"><div class="label">Word</div><div class="num" id="countWords">0</div></div><div class="metric"><div class="label">Sentence</div><div class="num" id="countSentences">0</div></div><div class="metric"><div class="label">Reading</div><div class="num" id="countRead">0s</div></div></div></div>
    </div>
    <div class="stack">
      <div class="scene-window short"></div>
      <div class="panel pad"><div class="sub">Transcript Analysis</div><div class="choice-list" id="countPhrases"></div></div>
      <div class="panel pad"><div class="sub">Trust Index</div><div class="big-display" style="font-size:52px" id="countTrust">41%</div><div class="warning-strip" id="countVerdict">LOW CONFIDENCE</div></div>
    </div>`);},
  lunch(app){return shell(app,'layout-lunch',`
    <div class="stack"><div class="panel pad"><div class="sub">Ritual Status</div><div class="choice-list"><div class="choice-item">Hunger — focused</div><div class="choice-item">Intention — clear</div><div class="choice-item">Alignment — 98%</div></div></div></div>
    <div class="stack center"><div class="scene-window tall"></div><div class="panel pad"><div class="sub">Consult the Oracle</div><div class="food-buttons"><button data-food="라멘">🍜 라멘</button><button data-food="버거">🍔 버거</button><button data-food="피자">🍕 피자</button><button data-food="만두">🥟 만두</button><button data-food="스시">🍣 스시</button><button data-food="타코">🌮 타코</button></div><div style="margin-top:12px"><button class="btn" id="lunchOracle">DESTINY DRAW</button></div></div></div>
    <div class="stack"><div class="panel pad"><div class="sub">Today's Prophecy</div><div class="log" id="lunchProphecy">The stars are hungry.</div></div><div class="panel pad"><div class="sub">Oracle Result</div><div class="big-display" style="font-size:40px" id="lunchResult">TACOS AL PASTOR</div></div></div>`);},
  qr(app){return shell(app,'layout-qr',`
    <div class="stack"><div class="panel pad"><div class="sub">QR Generator</div><select class="select" id="qrType"><option value="url">URL</option><option value="text">TEXT</option></select><input class="field" id="qrInput" value="https://example.com" style="margin-top:8px"><div class="metric-grid two" style="margin-top:8px"><div class="metric"><div class="label">Size</div><input class="field" id="qrSize" type="number" value="256"></div><div class="metric"><div class="label">Error Level</div><select class="select" id="qrLevel"><option>H</option><option>Q</option><option>M</option><option>L</option></select></div></div><div style="margin-top:12px"><button class="btn" id="qrGenerate">GENERATE QR CODE</button></div></div></div>
    <div class="stack center"><div class="scene-window short"></div><div class="panel pad"><div class="sub">Laser Etching Chamber</div><div id="qrOutput" style="display:grid;place-items:center;background:#fff;border-radius:16px;padding:14px;min-height:290px"></div></div></div>
    <div class="stack"><div class="panel pad"><div class="sub">Scan Result</div><div class="log" id="qrResult">decoded data will appear here.</div></div><div class="panel pad"><div class="sub">Production Metrics</div><div class="metric-grid two"><div class="metric"><div class="label">QR Codes Today</div><div class="num">12684</div></div><div class="metric"><div class="label">Success Rate</div><div class="num">99.91%</div></div></div></div></div>`);},
  nickname(app){return shell(app,'layout-nickname',`
    <div class="stack"><div class="panel pad"><div class="sub">Seed Input</div><input class="field" id="nickSeed" value="shadow_strike_07"><div style="margin-top:12px"><button class="btn" id="nickAwaken">ACTIVATE</button></div></div><div class="panel pad"><div class="sub">Gene Traits</div><div class="metric-grid two"><div class="metric"><div class="label">Creativity</div><div class="num" id="nickCrea">87%</div></div><div class="metric"><div class="label">Mystique</div><div class="num" id="nickMyst">78%</div></div></div></div></div>
    <div class="stack center"><div class="scene-window tall"></div><div class="panel pad"><div class="sub">Manifested Nickname</div><div class="big-display" id="nickOut" style="font-size:56px">影刃</div><div class="pill" id="nickRoman">KAGEJIN</div></div></div>
    <div class="stack"><div class="panel pad"><div class="sub">Nickname Potential</div><div class="big-display" style="font-size:42px" id="nickTier">S+</div></div><div class="panel pad"><div class="sub">Candidate Ranking</div><div class="log" id="nickCandidates">KAGEJIN\nSEIYO\nYACHO</div></div></div>`);},
  spell(app){return shell(app,'layout-spell',`
    <div class="stack"><div class="panel pad"><div class="sub">Case File</div><div class="choice-list"><div class="choice-item">Opening Brief.txt</div><div class="choice-item">Exhibit A_Document.txt</div><div class="choice-item">Final Argument.pdf</div></div></div></div>
    <div class="stack"><div class="panel pad"><div class="sub">Exhibit A</div><textarea class="area" id="spellText">The defendant did knowingly commit severall acts of mispelled words, gramar offenses, and punctuation neglect.</textarea><div style="margin-top:12px" class="flex"><button class="btn" id="spellJudge">STRIKE VERDICT</button><button class="btn-ghost" id="spellSample">LOAD SAMPLE</button></div></div><div class="panel pad"><div class="sub">Defendants</div><div class="log" id="spellList">none</div></div></div>
    <div class="stack"><div class="panel pad"><div class="sub">Verdict</div><div class="big-display" style="font-size:48px" id="spellVerdict">PENDING</div><div class="warning-strip" id="spellCounts">0 issues</div></div><div class="scene-window short"></div></div>`);},
  download(app){return shell(app,'layout-download',`
    <div class="stack"><div class="panel pad"><div class="sub">Payload Configuration</div><input class="field" id="dlName" value="Project_Proposal.txt"><select class="select" id="dlDest" style="margin-top:8px"><option>Downloads Folder</option><option>Desktop</option><option>Local System</option></select><textarea class="area" id="dlContent" style="margin-top:8px">Orbit-ready text payload.</textarea></div></div>
    <div class="stack"><div class="scene-window tall"></div><div class="panel pad center"><div class="sub">Launch Status</div><div class="choice-list"><div class="choice-item">Payload Integrity — OK</div><div class="choice-item">Destination Access — VERIFIED</div><div class="choice-item">Launch Authorization — APPROVED</div></div><div style="margin-top:12px"><button class="btn-danger portal-button" id="dlLaunch">IGNITE</button></div></div></div>
    <div class="stack"><div class="panel pad"><div class="sub">T-Minus</div><div class="big-display" id="dlTimer" style="font-size:50px">00:04:37</div></div><div class="panel pad"><div class="sub">Mission Log</div><div class="log" id="dlLog">awaiting launch command...</div></div></div>`);},
  random(app){return shell(app,'layout-random',`
    <div class="stack"><div class="panel pad"><div class="sub">Mission Parameters</div><input class="field" id="randMin" type="number" value="1"><input class="field" id="randMax" type="number" value="1000000" style="margin-top:8px"><input class="field" id="randQty" type="number" value="1" style="margin-top:8px"><div style="margin-top:12px"><button class="btn" id="randGo">EXECUTE</button></div></div></div>
    <div class="stack"><div class="panel pad center"><div class="sub">Generated Outcome</div><div class="big-display" id="randOut">742391</div><div class="warning-strip" id="randTime">generation time: 3.27 ms</div></div><div class="scene-window short"></div></div>
    <div class="stack"><div class="panel pad"><div class="sub">Command Log</div><div class="log" id="randLog">randomization standby.</div></div><div class="panel pad"><div class="sub">Recent Operations</div><div class="log" id="randRecent">none.</div></div></div>`);},
  quiz(app){return shell(app,'layout-quiz',`
    <div class="stack"><div class="panel pad"><div class="sub">Calculatorian</div><div class="choice-list"><div class="choice-item">INT 42</div><div class="choice-item">Combo x5</div><div class="choice-item">Accuracy 92%</div></div></div></div>
    <div class="stack center"><div class="scene-window tall"></div><div class="panel pad"><div class="sub">Challenge the Dragon</div><div class="big-display" style="font-size:42px" id="quizEq">(48 ÷ 6) + (7 × 5) = ?</div><input class="field center" id="quizAns" type="number" style="margin-top:10px"><div style="margin-top:10px"><button class="btn" id="quizCast">CAST ANSWER</button></div><div class="warning-strip" id="quizResult">deal damage by answering correctly.</div></div></div>
    <div class="stack"><div class="panel pad"><div class="sub">Boss HP</div><div class="big-display" style="font-size:44px" id="quizHp">12000</div><div class="progress"><i id="quizBar" style="width:100%"></i></div></div><div class="panel pad"><div class="sub">Battle Log</div><div class="log" id="quizLog">dragon is waiting...</div></div></div>`);},
  compress(app){return shell(app,'layout-compress',`
    <div class="stack"><div class="panel pad"><div class="sub">Upload & Drop</div><input class="field" id="cmpFile" type="file" accept="image/*"><div class="metric" style="margin-top:12px"><div class="label">Compression Ratio</div><input id="cmpRatio" type="range" min="30" max="95" value="78" style="width:100%"></div><div style="margin-top:12px"><button class="btn" id="cmpRun">ENGAGE PRESS</button></div></div></div>
    <div class="stack"><div class="scene-window tall"></div><div class="panel pad center"><div class="sub">Compression Stats</div><div class="metric-grid three"><div class="metric"><div class="label">Before</div><div class="num" id="cmpBefore">12.4 MB</div></div><div class="metric"><div class="label">Ratio</div><div class="num" id="cmpRatioOut">78%</div></div><div class="metric"><div class="label">After</div><div class="num" id="cmpAfter">2.67 MB</div></div></div></div></div>
    <div class="stack"><div class="panel pad"><div class="sub">Safety Protocols</div><div class="choice-list"><div class="choice-item">Guard Doors — LOCKED</div><div class="choice-item">Thermal Level — NORMAL</div><div class="choice-item">System Status — NOMINAL</div></div></div><div class="panel pad"><div class="sub">Press Log</div><div class="log" id="cmpLog">waiting for image payload...</div></div></div>`);},
  compat(app){return shell(app,'layout-compat',`
    <div class="stack"><div class="panel pad"><div class="sub">Your Name</div><input class="field" id="compA" value="Luna Everly"><div class="sub" style="margin-top:12px">Their Name</div><input class="field" id="compB" value="Orion Vale"><div style="margin-top:12px"><button class="btn" id="compGo">COMPARE</button></div></div><div class="panel pad"><div class="sub">Love Harmony</div><div class="metric-grid two"><div class="metric"><div class="label">Emotional</div><div class="num" id="compEmo">92%</div></div><div class="metric"><div class="label">Physical</div><div class="num" id="compPhy">85%</div></div></div></div></div>
    <div class="stack center"><div class="scene-window tall"></div><div class="panel pad"><div class="sub">Compatibility</div><div class="big-display" id="compScore" style="font-size:60px">87%</div><div class="pill" id="compTier">Soul Connection</div></div></div>
    <div class="stack"><div class="panel pad"><div class="sub">Cosmic Insight</div><div class="log" id="compInsight">Your energies flow beautifully together.</div></div><div class="panel pad"><div class="sub">Constellation Overlay</div><div class="const-cards"><button>Heart Nebula</button><button>Twin Flames</button><button>Soul Path</button><button>Destiny Line</button></div></div></div>`);},
  volume(app){return shell(app,'layout-volume',`
    <div class="stack"><div class="panel pad"><div class="sub">Stage Monitor</div><div class="scene-window short"></div></div><div class="panel pad"><div class="sub">Crowd Energy</div><div class="big-display" style="font-size:44px" id="volEnergy">92%</div></div></div>
    <div class="stack"><div class="panel pad"><div class="sub">Sonic Arena — Live Mix Console</div><div class="fader-board" id="faderBoard"></div></div><div class="panel pad between"><div><div class="sub">Transport</div><div class="pill">REC 00:45:32</div></div><div class="flex"><button class="btn-ghost">⏮</button><button class="btn">▶</button><button class="btn-ghost">⏹</button></div></div></div>
    <div class="stack"><div class="panel pad"><div class="sub">System Status</div><div class="metric-grid two"><div class="metric"><div class="label">CPU</div><div class="num">45%</div></div><div class="metric"><div class="label">Latency</div><div class="num" id="volLatency">12ms</div></div></div></div><div class="panel pad"><div class="sub">Live Feed</div><div class="log" id="volLog">BassDropper: this drop is insane.</div></div></div>`);},
  refresh(app){return shell(app,'layout-refresh',`
    <div class="stack"><div class="panel pad"><div class="sub">Current Timeline</div><div class="choice-list"><div class="choice-item">Prime // v7.3.1</div><div class="choice-item">Reality Stability — 64.7%</div><div class="choice-item">Paradox Risk — HIGH</div></div></div><div class="panel pad"><div class="sub">Temporal Coordinates</div><input class="field" id="refYear" value="2024"><input class="field" id="refMonth" value="05" style="margin-top:8px"><input class="field" id="refDay" value="24" style="margin-top:8px"></div></div>
    <div class="stack center"><div class="scene-window tall"></div><div class="panel pad"><div class="sub">Time Travel Refresh Portal</div><button class="btn portal-button" id="refGo">INITIATE REFRESH</button><div class="warning-strip" id="refState" style="margin-top:12px">hold if you ignore causality.</div></div></div>
    <div class="stack"><div class="panel pad"><div class="sub">Recent Refreshes</div><div class="log">v7.3.0 — 05/23 11:42\nv7.2.9 — 05/22 19:17\nv7.2.8 — 05/21 09:33</div></div><div class="panel pad"><div class="sub">Diagnostics</div><div class="metric-grid two"><div class="metric"><div class="label">Chrono Energy</div><div class="num">81%</div></div><div class="metric"><div class="label">Paradox Threshold</div><div class="num">34%</div></div></div></div></div>`);},
};

function openApp(id){
  const app = APPS.find(a => a.id === id); if(!app) return;
  if(location.hash !== '#'+id) history.replaceState(null,'','#'+id);
  mount.innerHTML = renderers[id](app);
  const screen = byId(`app-${id}`);
  screen.classList.add('open');
  currentApp = id;
  document.body.classList.add('app-open');
  screen.addEventListener('click', e => { if (e.target.dataset.close) closeApp(); });
  initApp(id, screen);
}
function closeApp(){ mount.innerHTML=''; currentApp=null; document.body.classList.remove('app-open'); if(location.hash) history.replaceState(null,'',location.pathname+location.search); }
mount.addEventListener('click', e=>{ if(e.target.classList.contains('app-screen')) closeApp(); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape' && currentApp) closeApp(); });

function spawnParticles(chars=['✦'], color='#fff', n=18){
  const layer = byId('fxLayer');
  for(let i=0;i<n;i++){
    const p=document.createElement('div'); p.className='fx-particle'; p.textContent=chars[Math.floor(Math.random()*chars.length)];
    p.style.left=(window.innerWidth/2 + (Math.random()*80-40))+'px';
    p.style.top=(window.innerHeight/2 + (Math.random()*80-40))+'px';
    p.style.color=color;
    p.style.setProperty('--x', `${Math.random()*420-210}px`); p.style.setProperty('--y', `${Math.random()*320-160}px`);
    layer.appendChild(p); setTimeout(()=>p.remove(),900);
  }
}
function doFlash(){ flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go'); }
function copyText(t){ navigator.clipboard?.writeText(t); }
function formatBytes(bytes){ if(!bytes && bytes!==0) return '-'; const u=['B','KB','MB','GB']; let i=0, n=bytes; while(n>=1024&&i<u.length-1){n/=1024;i++;} return `${n.toFixed(n>=100?0:n>=10?1:2)} ${u[i]}`; }
function pseudoHash(s){ return [...s].reduce((a,c)=> (a*31 + c.charCodeAt(0))>>>0, 7); }

function initApp(id, root){
  const init = {
    weather:initWeather, button:initButton, todo:initTodo, timer:initTimer, password:initPassword,
    dice:initDice, rps:initRps, currency:initCurrency, counter:initCounter, lunch:initLunch,
    qr:initQr, nickname:initNickname, spell:initSpell, download:initDownload, random:initRandom,
    quiz:initQuiz, compress:initCompress, compat:initCompat, volume:initVolume, refresh:initRefresh
  }[id];
  if(init) init(root);
}

function initWeather(root){
  const log = $('#wLog', root);
  $('#wSimulate', root).onclick = ()=>{ $('#wAlert', root).textContent='SEVERE WEATHER ALERT // CATEGORY 5 VISUALIZATION'; spawnParticles(['⚡','☁','🌧'], '#79d8ff', 24); };
  fetch('https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.9780&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code,cloud_cover,precipitation&hourly=visibility&timezone=Asia%2FSeoul')
    .then(r=>r.json()).then(data=>{
      const c=data.current; if(!c) throw new Error('no data');
      $('#wTemp', root).textContent=`${c.temperature_2m}°C`; $('#wWind', root).textContent=`${c.wind_speed_10m} km/h`;
      $('#wHum', root).textContent=`${c.relative_humidity_2m}%`; $('#wCode', root).textContent=weatherText(c.weather_code);
      $('#wCloud', root).textContent=`${c.cloud_cover ?? '--'}%`; $('#wPrecip', root).textContent=`${c.precipitation ?? 0}%`;
      $('#wPress', root).textContent=`${c.pressure_msl} hPa`; const vis=data.hourly?.visibility?.[0]; $('#wVis', root).textContent = vis ? `${Math.round(vis/1000)} km` : '-- km';
      $('#wAlert', root).textContent = `서울 현재 상태 // ${weatherText(c.weather_code)} // 풍속 ${c.wind_speed_10m}km/h`;
      log.textContent = `CONNECTED TO OPEN-METEO\nTEMP ${c.temperature_2m}°C\nHUMIDITY ${c.relative_humidity_2m}%\nPRESSURE ${c.pressure_msl} hPa\nWEATHER CODE ${c.weather_code}`;
    }).catch(()=>{ $('#wAlert', root).textContent='실시간 연결 실패 // 시뮬레이션 모드'; log.textContent+='\nconnection failed. fallback mode enabled.';});
}
function weatherText(code){ const map={0:'CLEAR',1:'MAINLY CLEAR',2:'PARTLY CLOUDY',3:'OVERCAST',45:'FOG',48:'RIME FOG',51:'LIGHT DRIZZLE',53:'DRIZZLE',55:'DENSE DRIZZLE',61:'RAIN',63:'HEAVY RAIN',65:'EXTREME RAIN',71:'SNOW',80:'RAIN SHOWERS',95:'THUNDERSTORM'}; return map[code]||`CODE ${code}`; }

function initButton(root){
  $('#confirmCore', root).onclick = ()=>{
    doFlash(); spawnParticles(['⚠','✦','☢'], '#ff6a6a', 34);
    $('#confirmStatus', root).textContent='CONFIRMATION ACCEPTED. ABSOLUTE CONSEQUENCES DEPLOYED.';
    $('#confirmStability', root).textContent = `${Math.max(0,Math.floor(Math.random()*9))}%`;
    $('#confirmLog', root).textContent = 'final confirmation received...\nopening consequence gates...\nreality rollback unavailable.';
  };
}

function initTodo(root){
  let hp=10000, done=0; const list=$('#todoList', root);
  let tasks=['Defeat the procrastination dragon','Cleanse the cursed desktop','Rescue the deadline','Gather 10 useful notes'];
  function render(){ list.innerHTML=tasks.map((t,i)=>`<div class="choice-item between"><span>${t}</span><button class="btn-ghost" data-done="${i}">완료</button></div>`).join(''); $('#todoHp', root).textContent=`${hp} / 10000`; $('#todoBar', root).style.width=`${hp/100}%`; $('#todoDone', root).textContent=done; }
  render();
  list.onclick=(e)=>{ const idx=e.target.dataset.done; if(idx==null) return; tasks.splice(idx,1); hp=Math.max(0,hp-1250); done++; spawnParticles(['⚔','🔥','✦'],'#ffbd67',18); render(); };
  $('#todoAddBtn', root).onclick=()=>{ const v=$('#todoInput', root).value.trim(); if(v){ tasks.push(v); $('#todoInput', root).value=''; render(); } };
  $('#todoQuick', root).onclick=()=>{ tasks.push('Train at the arena'); render(); };
}

function initTimer(root){
  let total=25*60, remain=total, timer=null;
  const display=$('#timerDisplay', root), log=$('#timerLog', root), state=$('#timerState', root);
  function paint(){ const m=String(Math.floor(remain/60)).padStart(2,'0'), s=String(remain%60).padStart(2,'0'); display.textContent=`${m}:${s}`; }
  paint();
  root.querySelectorAll('[data-mins]').forEach(b=>b.onclick=()=>{ total=+b.dataset.mins*60; remain=total; paint(); state.textContent=`MODE SET // ${b.dataset.mins} MIN`; });
  $('#timerStart', root).onclick=()=>{ if(timer) return; state.textContent='FOCUS MODE: ACTIVATED'; log.textContent='bunker sealed. focus session running...'; timer=setInterval(()=>{ remain--; paint(); if(remain<=0){ clearInterval(timer); timer=null; state.textContent='DOOMSDAY ALERT // SESSION COMPLETE'; doFlash(); spawnParticles(['☢','⚠','✦'],'#f8ff67',28);} },1000); };
  $('#timerPause', root).onclick=()=>{ clearInterval(timer); timer=null; state.textContent='PAUSED'; };
  $('#timerReset', root).onclick=()=>{ clearInterval(timer); timer=null; remain=total; paint(); state.textContent='RESET COMPLETE'; };
}

function generatePassword(opts){
  let chars=''; if(opts.upper) chars+='ABCDEFGHIJKLMNOPQRSTUVWXYZ'; if(opts.lower) chars+='abcdefghijklmnopqrstuvwxyz'; if(opts.num) chars+='0123456789'; if(opts.sym) chars+='!@#$%^&*()_+-=[]{}|;:,.<>?';
  if(!chars) chars='abcdefghijklmnopqrstuvwxyz'; let out=''; for(let i=0;i<opts.len;i++) out += chars[Math.floor(Math.random()*chars.length)]; return out;
}
function initPassword(root){
  const out=$('#pwOutput', root), log=$('#pwLog', root), bar=$('#pwStrength', root);
  function run(){ const pw=generatePassword({len:+$('#pwLen', root).value, upper:$('#pwUpper', root).checked, lower:$('#pwLower', root).checked, num:$('#pwNum', root).checked, sym:$('#pwSym', root).checked}); out.textContent=pw; log.textContent=`secure session established\nseeded entropy pool\npassword generated successfully\nest. time to crack: ${10 ** Math.min(9, Math.floor(pw.length/2))} years`; bar.style.width='100%'; }
  $('#pwGen', root).onclick=run; $('#pwCopy', root).onclick=()=>copyText(out.textContent); run();
}

function initDice(root){
  let sides=20; const val=$('#diceValue', root), hist=$('#diceHistory', root), type=$('#diceType', root); let rows=[];
  root.querySelectorAll('.die-select').forEach(b=>b.onclick=()=>{ sides=+b.dataset.sides; $('#diceMin', root).textContent='1'; $('#diceMax', root).textContent=String(sides); type.textContent=`D${sides} SELECTED`; });
  $('#diceRoll', root).onclick=()=>{ const n=Math.ceil(Math.random()*sides); val.textContent=n; rows.unshift(`D${sides} → ${n}`); rows=rows.slice(0,8); hist.textContent=rows.join('\n'); spawnParticles(['✦','🜂','◈'],'#d48aff',20); };
}

function initRps(root){
  const names={rock:'✊',paper:'✋',scissors:'✌️'}; let w=0,l=0,d=0;
  root.querySelectorAll('[data-rps]').forEach(btn=>btn.onclick=()=>{
    const you=btn.dataset.rps, arr=['rock','paper','scissors'], enemy=arr[Math.floor(Math.random()*3)];
    let result='DRAW'; if((you==='rock'&&enemy==='scissors')||(you==='paper'&&enemy==='rock')||(you==='scissors'&&enemy==='paper')){result='WIN';w++;} else if(you!==enemy){result='LOSE';l++;} else d++;
    $('#rpsYou', root).textContent=names[you]; $('#rpsEnemy', root).textContent=names[enemy]; $('#rpsResult', root).textContent=result; $('#rpsScore', root).textContent=`Wins ${w} / Losses ${l} / Draws ${d}`; $('#rpsLog', root).textContent=`deployed ${you}\nenemy deployed ${enemy}\nresult ${result}`;
  });
}

function initCurrency(root){
  const log=$('#curLog', root);
  $('#curSwap', root).onclick=()=>{ const a=$('#curFrom', root), b=$('#curTo', root); [a.value,b.value]=[b.value,a.value]; };
  $('#curConvert', root).onclick=async()=>{
    const from=$('#curFrom', root).value, to=$('#curTo', root).value, amount=+$('#curAmount', root).value||0;
    try{ const r=await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`); const j=await r.json(); const val=j.rates?.[to]; if(val==null) throw new Error(); $('#curOutput', root).textContent=`${val.toFixed(2)} ${to}`; $('#curRate', root).textContent=`${from} → ${to} live rate loaded`; log.textContent=`${amount} ${from} → ${val.toFixed(2)} ${to}`; }
    catch{ $('#curOutput', root).textContent='FAIL'; $('#curRate', root).textContent='live feed unavailable'; }
  };
}

function initCounter(root){
  const ta=$('#countText', root), phraseWrap=$('#countPhrases', root);
  function update(){ const t=ta.value; const chars=t.length, words=(t.trim().match(/\S+/g)||[]).length, sentences=(t.match(/[.!?]+/g)||[]).length||1, read=Math.max(1,Math.ceil(words/4)); $('#countChars', root).textContent=chars; $('#countWords', root).textContent=words; $('#countSentences', root).textContent=sentences; $('#countRead', root).textContent=`${read}s`; const phrases=['honestly','actually','i swear','you know','maybe']; phraseWrap.innerHTML=phrases.map(p=>`<div class="choice-item between"><span>${p}</span><span class="badge">${t.toLowerCase().includes(p)?'detected':'0%'}</span></div>`).join(''); const trust=Math.max(20,Math.min(96, 80 - ((t.toLowerCase().match(/honestly|actually|i swear/g)||[]).length*12) + Math.floor(words/20))); $('#countTrust', root).textContent=`${trust}%`; $('#countVerdict', root).textContent=trust>70?'HIGH CONFIDENCE':trust>45?'MIXED SIGNAL':'LOW CONFIDENCE'; }
  ta.oninput=update; update();
}

function initLunch(root){
  const result=$('#lunchResult', root), prophecy=$('#lunchProphecy', root); let picked='TACOS AL PASTOR';
  root.querySelectorAll('[data-food]').forEach(b=>b.onclick=()=>{ picked=b.dataset.food; });
  $('#lunchOracle', root).onclick=()=>{ const foods=['김치찌개','라멘','버거','피자','타코','만두','초밥']; const final=picked || foods[Math.floor(Math.random()*foods.length)]; result.textContent=String(final).toUpperCase(); prophecy.textContent=`The stars demand ${final}. Feast well.`; spawnParticles(['🍜','🍔','🍕','🌮'],'#ffbd59',16); };
}

function initQr(root){
  const out=$('#qrOutput', root), res=$('#qrResult', root);
  function run(){ out.innerHTML=''; new QRCode(out,{text:$('#qrInput', root).value,width:+$('#qrSize', root).value,height:+$('#qrSize', root).value,correctLevel:QRCode.CorrectLevel[$('#qrLevel', root).value]}); res.textContent=`DECODED DATA\n${$('#qrInput', root).value}\nSTATUS VALID QR CODE`; }
  $('#qrGenerate', root).onclick=run; run();
}

function initNickname(root){
  const ja=['影','月','炎','蒼','雷','夜','刃','星','王','零'];
  const romanA=['KAGE','NOVA','SEI','RAVEN','LUNA','VEX','AERO','RYU'];
  const romanB=['JIN','FANG','BLADE','ARC','STRIKE','VOID','HEART','WAVE'];
  $('#nickAwaken', root).onclick=()=>{ const seed=$('#nickSeed', root).value; const h=pseudoHash(seed); const jp=ja[h%ja.length]+ja[(h>>3)%ja.length]; const rn=romanA[(h>>5)%romanA.length]+romanB[(h>>7)%romanB.length]; const score=80 + (h%20); $('#nickOut', root).textContent=jp; $('#nickRoman', root).textContent=rn; $('#nickTier', root).textContent=score>95?'S+':score>90?'S':'A+'; $('#nickCandidates', root).textContent=`${rn}\n${romanA[(h>>2)%romanA.length]+romanB[(h>>4)%romanB.length]}\n${romanA[(h>>1)%romanA.length]+romanB[(h>>6)%romanB.length]}`; };
}

function initSpell(root){
  const map=['severall','mispelled','gramar','obvous','showen','english','there'];
  $('#spellSample', root).onclick=()=>{ $('#spellText', root).value='The defendant did knowingly and willfully commit severall acts of mispelled words, gramar offenses, and punctuation neglect. It is obvous that the accused has showen a reckless disregard for the rules of english language. Furthermore, the there actions have caused confusion.'; };
  $('#spellJudge', root).onclick=()=>{ const t=$('#spellText', root).value.toLowerCase(); const found=map.filter(w=>t.includes(w)); $('#spellList', root).textContent = found.length ? found.join('\n') : 'none'; $('#spellCounts', root).textContent = `${found.length} issues detected`; $('#spellVerdict', root).textContent = found.length ? 'GUILTY' : 'CLEARED'; spawnParticles(['§','⚖','✦'],'#f0c06c',22); };
}

function initDownload(root){
  const log=$('#dlLog', root), timer=$('#dlTimer', root);
  $('#dlLaunch', root).onclick=()=>{
    let s=5; log.textContent='launch sequence initiated...'; const iv=setInterval(()=>{ s--; timer.textContent=`00:00:0${s}`; if(s<=0){ clearInterval(iv); const blob=new Blob([$('#dlContent', root).value],{type:'text/plain'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=$('#dlName', root).value || 'payload.txt'; a.click(); log.textContent='payload reached local orbit. download complete.'; spawnParticles(['🚀','🔥','✦'],'#7cc9ff',24);} },1000);
  };
}

function initRandom(root){
  const log=$('#randLog', root), recent=$('#randRecent', root); let rows=[];
  $('#randGo', root).onclick=()=>{ const min=+$('#randMin', root).value, max=+$('#randMax', root).value; const n=Math.floor(Math.random()*(max-min+1))+min; $('#randOut', root).textContent=n; const time=(Math.random()*5).toFixed(2); $('#randTime', root).textContent=`generation time: ${time} ms`; log.textContent=`initializing RNG...\nentropy pool: ${(95+Math.random()*5).toFixed(1)}%\noutcome generated: ${n}`; rows.unshift(`${new Date().toLocaleTimeString()} -> ${n}`); rows=rows.slice(0,6); recent.textContent=rows.join('\n'); };
}

function initQuiz(root){
  let hp=12000, answer=43;
  function newQ(){ const a=Math.floor(Math.random()*20)+10,b=Math.floor(Math.random()*8)+2,c=Math.floor(Math.random()*9)+2,d=Math.floor(Math.random()*8)+2; answer = Math.floor(a/b)+c*d; $('#quizEq', root).textContent=`(${a} ÷ ${b}) + (${c} × ${d}) = ?`; }
  newQ();
  $('#quizCast', root).onclick=()=>{ const v=+$('#quizAns', root).value; if(v===answer){ hp=Math.max(0,hp-1250); $('#quizResult', root).textContent='CRITICAL HIT'; spawnParticles(['🐉','✨','💥'],'#a6ff6a',20);} else { $('#quizResult', root).textContent=`MISS // correct was ${answer}`; } $('#quizHp', root).textContent=hp; $('#quizBar', root).style.width=`${hp/120}%`; $('#quizLog', root).textContent=`Ancient dragon HP now ${hp}\nlatest answer ${v}`; newQ(); };
}

function initCompress(root){
  let size=12.4*1024*1024;
  $('#cmpFile', root).onchange=(e)=>{ const f=e.target.files[0]; if(f){ size=f.size; $('#cmpBefore', root).textContent=formatBytes(size); } };
  $('#cmpRatio', root).oninput=()=>{ $('#cmpRatioOut', root).textContent=`${$('#cmpRatio', root).value}%`; };
  $('#cmpRun', root).onclick=()=>{ const ratio=+$('#cmpRatio', root).value/100; const after=size*(1-ratio); $('#cmpAfter', root).textContent=formatBytes(after); $('#cmpLog', root).textContent=`guard doors locked\napplying pressure profile ${(ratio*100).toFixed(0)}%\ncompression finished`; spawnParticles(['🗜','⚙','✦'],'#ffb24d',16); };
}

function initCompat(root){
  $('#compGo', root).onclick=()=>{ const a=$('#compA', root).value, b=$('#compB', root).value; const h=pseudoHash(a+'|'+b); const score=60+(h%39); $('#compScore', root).textContent=`${score}%`; $('#compTier', root).textContent=score>90?'Twin Flames':score>80?'Soul Connection':score>70?'Strong Orbit':'Chaotic Stars'; $('#compEmo', root).textContent=`${70+(h%25)}%`; $('#compPhy', root).textContent=`${65+((h>>3)%30)}%`; $('#compInsight', root).textContent=`${a} 와 ${b} 의 궤도는 ${score>85?'매우 안정적':'예측 불가하지만 매력적'}이다.`; };
}

function initVolume(root){
  const board=$('#faderBoard', root), channels=['KICK','SNARE','BASS','LEAD','SYNTH','VOCAL','FX','MASTER'];
  board.innerHTML = channels.map((ch,i)=>`<div class="fader"><div class="sub">${ch}</div><div class="meter-v"><i style="height:${50+i*5}%"></i></div><input type="range" min="0" max="100" value="${55+i*4}" data-fader="${ch}"><div class="badge" data-meter="${ch}">${55+i*4}</div></div>`).join('');
  board.oninput=(e)=>{ if(e.target.matches('input[type="range"]')){ const ch=e.target.dataset.fader; $(`[data-meter="${ch}"]`, root).textContent=e.target.value; const avg=[...board.querySelectorAll('input')].reduce((a,b)=>a + +b.value, 0)/8; $('#volEnergy', root).textContent=`${Math.round(avg)}%`; $('#volLatency', root).textContent=`${Math.max(4,Math.round(24-avg/5))}ms`; $('#volLog', root).textContent=`mix updated // ${ch} -> ${e.target.value}`; } };
}

function initRefresh(root){
  $('#refGo', root).onclick=()=>{ $('#refState', root).textContent='causality breach imminent...'; doFlash(); spawnParticles(['🕒','⌛','◌'],'#9f8bff',26); setTimeout(()=>location.reload(), 1800); };
}

// basic syntax guard use

window.addEventListener('load',()=>{ const id=location.hash.slice(1); if(APPS.some(a=>a.id===id)) openApp(id); });
