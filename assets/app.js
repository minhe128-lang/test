const APPS = [
  {id:'weather', title:'천지개벽 날씨국', icon:'🌦️', color:'#4dceff', scene:'assets/scenes/weather.webp', cls:'theme-blue', dock:'right'},
  {id:'button', title:'궁극의 확인 버튼', icon:'🔘', color:'#ff5c5c', scene:'assets/scenes/button.webp', cls:'theme-red', dock:'bottom'},
  {id:'todo', title:'마왕 토벌 투두', icon:'⚔️', color:'#d9a74a', scene:'assets/scenes/todo.webp', cls:'theme-gold', dock:'left'},
  {id:'timer', title:'종말 집중 타이머', icon:'☢️', color:'#d7ff4d', scene:'assets/scenes/timer.webp', cls:'theme-gold', dock:'right'},
  {id:'password', title:'해킹식 비밀번호 생성', icon:'💻', color:'#59ff83', scene:'assets/scenes/password.webp', cls:'theme-green', dock:'left'},
  {id:'dice', title:'우주 창조 주사위', icon:'🎲', color:'#d48aff', scene:'assets/scenes/dice.webp', cls:'theme-purple', dock:'right'},
  {id:'rps', title:'세계대전 가위바위보', icon:'✊', color:'#ff704d', scene:'assets/scenes/rps.webp', cls:'theme-red', dock:'left'},
  {id:'currency', title:'금융위기 환율 계산', icon:'📉', color:'#ff6c57', scene:'assets/scenes/currency.webp', cls:'theme-red', dock:'right'},
  {id:'counter', title:'문서 심문실', icon:'🔎', color:'#69b6ff', scene:'assets/scenes/counter.webp', cls:'theme-blue', dock:'bottom'},
  {id:'lunch', title:'점심 신탁소', icon:'🍲', color:'#ffb14d', scene:'assets/scenes/lunch.webp', cls:'theme-gold', dock:'right'},
  {id:'qr', title:'레이저 QR 제조소', icon:'▦', color:'#55e8ff', scene:'assets/scenes/qr.webp', cls:'theme-blue', dock:'left'},
  {id:'nickname', title:'닉네임 각성 연구소', icon:'🧬', color:'#c76dff', scene:'assets/scenes/nickname.webp', cls:'theme-purple', dock:'right'},
  {id:'spell', title:'맞춤법 대법원', icon:'⚖️', color:'#f0c06c', scene:'assets/scenes/spell.webp', cls:'theme-gold', dock:'left'},
  {id:'download', title:'파일 발사 통제소', icon:'🚀', color:'#4aa6ff', scene:'assets/scenes/download.webp', cls:'theme-blue', dock:'right'},
  {id:'random', title:'극비 난수 작전실', icon:'🎰', color:'#ff5c6b', scene:'assets/scenes/random.webp', cls:'theme-red', dock:'left'},
  {id:'quiz', title:'산수 던전', icon:'🐉', color:'#91d45d', scene:'assets/scenes/quiz.webp', cls:'theme-gold', dock:'right'},
  {id:'compress', title:'이미지 압축 프레스', icon:'🗜️', color:'#ff9d4c', scene:'assets/scenes/compress.webp', cls:'theme-gold', dock:'left'},
  {id:'compat', title:'우주 궁합 판독기', icon:'🔮', color:'#ff7acc', scene:'assets/scenes/compat.webp', cls:'theme-purple', dock:'right'},
  {id:'volume', title:'스타디움 볼륨 콘솔', icon:'🔊', color:'#4fe0c3', scene:'assets/scenes/volume.webp', cls:'theme-blue', dock:'bottom'},
  {id:'refresh', title:'시간여행 새로고침', icon:'🌀', color:'#8f7cff', scene:'assets/scenes/refresh.webp', cls:'theme-purple', dock:'bottom'},
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
  <div class="sys">도구 ${String(i+1).padStart(2,'0')}</div>
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
    weather:'서울 날씨 하나 보려고 위성 관제망을 총동원합니다.',
    button:'아무 일도 없지만 누르는 순간 세계가 끝난 척합니다.',
    todo:'할 일 하나 끝내고 마왕 체력 1,250을 깎습니다.',
    timer:'25분 집중을 위해 핵벙커 출입문을 봉쇄합니다.',
    password:'문자열 하나 만들려고 국가 보안망을 해킹한 척합니다.',
    dice:'주사위 하나에 은하와 운명을 갈아 넣습니다.',
    rps:'가위바위보를 세계대전급 군사 작전으로 처리합니다.',
    currency:'환전 한 번 할 때마다 시장이 붕괴하는 척합니다.',
    counter:'문장을 취조실에 앉혀 글자 수를 자백시킵니다.',
    lunch:'점심 메뉴를 고르려고 고대 신탁을 깨웁니다.',
    qr:'검은 네모를 만들기 위해 산업용 레이저를 가동합니다.',
    nickname:'닉네임 하나에 유전자 조작과 등급 판정을 실시합니다.',
    spell:'오타를 피고석에 세우고 판결봉을 내려칩니다.',
    download:'작은 문서 파일을 로켓에 실어 다운로드 궤도로 보냅니다.',
    random:'숫자 하나를 위성 추적 끝에 국가기밀로 확정합니다.',
    quiz:'산수 정답을 마법탄으로 바꿔 드래곤에게 발사합니다.',
    compress:'이미지 용량을 산업용 프레스로 짓눌러 버립니다.',
    compat:'이름 두 개로 우주적 운명을 자신 있게 날조합니다.',
    volume:'볼륨 하나 올릴 때마다 공연장 관객이 폭주합니다.',
    refresh:'새로고침 한 번을 위해 시간선을 통째로 갈아엎습니다.'
  }[id];
}

function shell(app, layoutClass, inner){
  return `
  <section class="app-screen ${app.cls}" id="app-${app.id}" style="--accent:${app.color};--scene:url('${app.scene}')">
    <div class="app-frame">
      <div class="app-toolbar">
        <div class="meta"><b>${app.title}</b><span>전용 작동실</span></div>
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
  try{if(location.hash !== '#'+id) history.replaceState(null,'','#'+id);}catch{}
  mount.innerHTML = renderers[id](app);
  const screen = byId(`app-${id}`);
  screen.classList.add('open');
  currentApp = id;
  document.body.classList.add('app-open');
  screen.addEventListener('click', e => { if (e.target.dataset.close) closeApp(); });
  initApp(id, screen);
  setTimeout(()=>window.__enhanceOverkill?.(id),0);
}
function closeApp(){ mount.innerHTML=''; currentApp=null; document.body.classList.remove('app-open'); try{if(location.hash) history.replaceState(null,'',location.pathname+location.search);}catch{} }
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
  $('#wSimulate', root).onclick = ()=>{ $('#wAlert', root).textContent='최고 단계 기상 경보 연출 가동'; spawnParticles(['⚡','☁','🌧'], '#79d8ff', 24); };
  fetch('https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.9780&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code,cloud_cover,precipitation&hourly=visibility&timezone=Asia%2FSeoul')
    .then(r=>r.json()).then(data=>{
      const c=data.current; if(!c) throw new Error('no data');
      $('#wTemp', root).textContent=`${c.temperature_2m}°C`; $('#wWind', root).textContent=`${c.wind_speed_10m} km/h`;
      $('#wHum', root).textContent=`${c.relative_humidity_2m}%`; $('#wCode', root).textContent=weatherText(c.weather_code);
      $('#wCloud', root).textContent=`${c.cloud_cover ?? '--'}%`; $('#wPrecip', root).textContent=`${c.precipitation ?? 0}%`;
      $('#wPress', root).textContent=`${c.pressure_msl} hPa`; const vis=data.hourly?.visibility?.[0]; $('#wVis', root).textContent = vis ? `${Math.round(vis/1000)} km` : '-- km';
      $('#wAlert', root).textContent = `서울 현재 상태 // ${weatherText(c.weather_code)} // 풍속 ${c.wind_speed_10m}km/h`;
      log.textContent = `기상 자료 연결 완료\n기온 ${c.temperature_2m}°C\n습도 ${c.relative_humidity_2m}%\n기압 ${c.pressure_msl} hPa\n기상 코드 ${c.weather_code}`;
    }).catch(()=>{ $('#wAlert', root).textContent='실시간 연결 실패 // 시뮬레이션 모드'; log.textContent+='\n연결 실패. 모의 관측 모드로 전환.';});
}
function weatherText(code){ const map={0:'맑음',1:'대체로 맑음',2:'구름 조금',3:'흐림',45:'안개',48:'서리 안개',51:'약한 이슬비',53:'이슬비',55:'강한 이슬비',61:'비',63:'강한 비',65:'폭우',71:'눈',80:'소나기',95:'뇌우'}; return map[code]||`기상 코드 ${code}`; }


function initButton(root){
  const status=$('#confirmStatus', root), stability=$('#confirmStability', root), log=$('#confirmLog', root);
  $('#confirmCore', root).onclick=()=>{
    doFlash(); spawnParticles(['⚠','✦','☢'],'#ff6a6a',34);
    const stable=Math.max(0,Math.floor(Math.random()*9));
    status.textContent='최종 확인 완료. 과도한 결과가 배치되었습니다.';
    stability.textContent=`${stable}%`;
    log.textContent='최종 확인 신호 수신\n결과 장치 개방\n되돌리기 기능: 애초에 없음';
  };
}

function initTodo(root){
  let hp=10000, done=0; const list=$('#todoList', root);
  let tasks=['미루기 드래곤 토벌','저주받은 바탕화면 정리','마감 기한 구출','쓸모 있는 메모 10개 수집'];
  function render(){ list.innerHTML=tasks.map((t,i)=>`<div class="choice-item between"><span>${t}</span><button class="btn-ghost" data-done="${i}">완료</button></div>`).join(''); $('#todoHp', root).textContent=`${hp} / 10000`; $('#todoBar', root).style.width=`${hp/100}%`; $('#todoDone', root).textContent=done; }
  render();
  list.onclick=(e)=>{ const idx=e.target.dataset.done; if(idx==null) return; tasks.splice(idx,1); hp=Math.max(0,hp-1250); done++; spawnParticles(['⚔','🔥','✦'],'#ffbd67',18); render(); };
  $('#todoAddBtn', root).onclick=()=>{ const v=$('#todoInput', root).value.trim(); if(v){ tasks.push(v); $('#todoInput', root).value=''; render(); } };
  $('#todoQuick', root).onclick=()=>{ tasks.push('훈련장에서 집중력 단련'); render(); };
}

function initTimer(root){
  let total=25*60, remain=total, timer=null;
  const display=$('#timerDisplay', root), log=$('#timerLog', root), state=$('#timerState', root);
  function paint(){ const m=String(Math.floor(remain/60)).padStart(2,'0'), s=String(remain%60).padStart(2,'0'); display.textContent=`${m}:${s}`; }
  paint();
  root.querySelectorAll('[data-mins]').forEach(b=>b.onclick=()=>{ total=+b.dataset.mins*60; remain=total; paint(); state.textContent=`집중 시간 ${b.dataset.mins}분 설정`; });
  $('#timerStart', root).onclick=()=>{ if(timer) return; state.textContent='집중 모드 가동'; log.textContent='벙커 봉쇄 완료. 집중 시간 진행 중...'; timer=setInterval(()=>{ remain--; paint(); if(remain<=0){ clearInterval(timer); timer=null; state.textContent='집중 완료. 종말은 잠시 연기되었습니다.'; doFlash(); spawnParticles(['☢','⚠','✦'],'#f8ff67',28);} },1000); };
  $('#timerPause', root).onclick=()=>{ clearInterval(timer); timer=null; state.textContent='일시정지'; };
  $('#timerReset', root).onclick=()=>{ clearInterval(timer); timer=null; remain=total; paint(); state.textContent='초기화 완료'; };
}

function generatePassword(opts){
  let chars=''; if(opts.upper) chars+='ABCDEFGHIJKLMNOPQRSTUVWXYZ'; if(opts.lower) chars+='abcdefghijklmnopqrstuvwxyz'; if(opts.num) chars+='0123456789'; if(opts.sym) chars+='!@#$%^&*()_+-=[]{}|;:,.<>?';
  if(!chars) chars='abcdefghijklmnopqrstuvwxyz';
  const bytes=new Uint32Array(opts.len); if(globalThis.crypto?.getRandomValues) crypto.getRandomValues(bytes); else for(let i=0;i<bytes.length;i++) bytes[i]=Math.floor(Math.random()*2**32);
  let out=''; for(let i=0;i<opts.len;i++) out += chars[bytes[i]%chars.length]; return out;
}
function initPassword(root){
  const out=$('#pwOutput', root), log=$('#pwLog', root), bar=$('#pwStrength', root);
  function run(){ const pw=generatePassword({len:+$('#pwLen', root).value, upper:$('#pwUpper', root).checked, lower:$('#pwLower', root).checked, num:$('#pwNum', root).checked, sym:$('#pwSym', root).checked}); out.textContent=pw; log.textContent=`보안 연결 수립 완료\n난수 재료 충전 완료\n비밀번호 생성 완료\n예상 해독 시간: ${10 ** Math.min(9, Math.floor(pw.length/2))}년`; bar.style.width='100%'; }
  $('#pwGen', root).onclick=run; $('#pwCopy', root).onclick=()=>copyText(out.textContent); run();
}

function initDice(root){
  let sides=20; const val=$('#diceValue', root), hist=$('#diceHistory', root), type=$('#diceType', root); let rows=[];
  root.querySelectorAll('.die-select').forEach(b=>b.onclick=()=>{ sides=+b.dataset.sides; $('#diceMin', root).textContent='1'; $('#diceMax', root).textContent=String(sides); type.textContent=`${sides}면체 선택`; });
  $('#diceRoll', root).onclick=()=>{ const n=Math.ceil(Math.random()*sides); val.textContent=n; rows.unshift(`${sides}면체 → ${n}`); rows=rows.slice(0,8); hist.textContent=rows.join('\n'); spawnParticles(['✦','🜂','◈'],'#d48aff',20); };
}

function initRps(root){
  const names={rock:'✊',paper:'✋',scissors:'✌️'}; let w=0,l=0,d=0;
  root.querySelectorAll('[data-rps]').forEach(btn=>btn.onclick=()=>{
    const you=btn.dataset.rps, arr=['rock','paper','scissors'], enemy=arr[Math.floor(Math.random()*3)];
    let result='무승부'; if((you==='rock'&&enemy==='scissors')||(you==='paper'&&enemy==='rock')||(you==='scissors'&&enemy==='paper')){result='승리';w++;} else if(you!==enemy){result='패배';l++;} else d++;
    $('#rpsYou', root).textContent=names[you]; $('#rpsEnemy', root).textContent=names[enemy]; $('#rpsResult', root).textContent=result; $('#rpsScore', root).textContent=`승리 ${w} / 패배 ${l} / 무승부 ${d}`; $('#rpsLog', root).textContent=`아군 선택: ${names[you]}\n적군 선택: ${names[enemy]}\n판정: ${result}`;
  });
}

function initCurrency(root){
  const log=$('#curLog', root);
  $('#curSwap', root).onclick=()=>{ const a=$('#curFrom', root), b=$('#curTo', root); [a.value,b.value]=[b.value,a.value]; };
  $('#curConvert', root).onclick=async()=>{
    const from=$('#curFrom', root).value, to=$('#curTo', root).value, amount=+$('#curAmount', root).value||0;
    try{ const r=await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`); const j=await r.json(); const val=j.rates?.[to]; if(val==null) throw new Error(); $('#curOutput', root).textContent=`${val.toFixed(2)} ${to}`; $('#curRate', root).textContent=`${from} → ${to} 실시간 환율 적용`; log.textContent=`${amount} ${from} → ${val.toFixed(2)} ${to}`; }
    catch{ $('#curOutput', root).textContent='연결 실패'; $('#curRate', root).textContent='실시간 시장 자료를 불러오지 못했습니다.'; }
  };
}

function initCounter(root){
  const ta=$('#countText', root), phraseWrap=$('#countPhrases', root);
  const phrases=['솔직히','사실은','정말이에요','알잖아요','아마도'];
  function update(){
    const t=ta.value; const chars=t.length, words=(t.trim().match(/\S+/g)||[]).length, sentences=(t.match(/[.!?。！？]+/g)||[]).length||1, read=Math.max(1,Math.ceil(words/4));
    $('#countChars', root).textContent=chars; $('#countWords', root).textContent=words; $('#countSentences', root).textContent=sentences; $('#countRead', root).textContent=`${read}초`;
    phraseWrap.innerHTML=phrases.map(p=>{const n=(t.match(new RegExp(p,'g'))||[]).length;return `<div class="choice-item between"><span>${p}</span><span class="badge">${n?`${n}회 발견`:'없음'}</span></div>`}).join('');
    const evasive=(t.match(/솔직히|사실은|정말|아마|기억이 안|모르겠/g)||[]).length;
    const trust=Math.max(18,Math.min(97,82-(evasive*8)+Math.floor(words/18)));
    $('#countTrust', root).textContent=`${trust}%`; $('#countVerdict', root).textContent=trust>70?'신뢰 높음':trust>45?'진술 혼재':'신뢰 낮음';
  }
  ta.oninput=update; update();
}

function initLunch(root){
  const result=$('#lunchResult', root), prophecy=$('#lunchProphecy', root); let picked=null;
  root.querySelectorAll('[data-food]').forEach(b=>b.onclick=()=>{ picked=b.dataset.food; root.querySelectorAll('[data-food]').forEach(x=>x.classList.toggle('chosen',x===b)); });
  $('#lunchOracle', root).onclick=()=>{ const foods=['김치찌개','라멘','버거','피자','타코','만두','초밥','제육볶음','돈가스','마라탕']; const final=picked || foods[Math.floor(Math.random()*foods.length)]; result.textContent=final; prophecy.textContent=`별들의 판정: ${final}. 오늘 점심은 이것으로 강제 확정합니다.`; spawnParticles(['🍜','🍔','🍕','🌮'],'#ffbd59',16); picked=null; };
}

function initQr(root){
  const out=$('#qrOutput', root), res=$('#qrResult', root);
  function run(){ out.innerHTML=''; new QRCode(out,{text:$('#qrInput', root).value,width:+$('#qrSize', root).value,height:+$('#qrSize', root).value,correctLevel:QRCode.CorrectLevel[$('#qrLevel', root).value]}); res.textContent=`인식 내용\n${$('#qrInput', root).value}\n상태: 정상 QR 코드`; }
  $('#qrGenerate', root).onclick=run; run();
}

function initNickname(root){
  const ja=['影','月','炎','蒼','雷','夜','刃','星','王','零'];
  const first=['그림자','별빛','검은','새벽','달빛','폭풍','푸른','용의','잿빛','심연'];
  const second=['칼날','송곳니','파동','사냥꾼','공허','심장','울림','왕관','유령','궤적'];
  $('#nickAwaken', root).onclick=()=>{ const seed=$('#nickSeed', root).value; const h=pseudoHash(seed); const jp=ja[h%ja.length]+ja[(h>>3)%ja.length]; const rn=first[(h>>5)%first.length]+second[(h>>7)%second.length]; const score=80+(h%20); $('#nickOut', root).textContent=jp; $('#nickRoman', root).textContent=rn; $('#nickTier', root).textContent=score>95?'특급':score>90?'상급':'고급'; $('#nickCandidates', root).textContent=`${rn}\n${first[(h>>2)%first.length]+second[(h>>4)%second.length]}\n${first[(h>>1)%first.length]+second[(h>>6)%second.length]}`; };
}

function initSpell(root){
  const typoMap={'조아서':'좋아서','갔읍니다':'갔습니다','만아서':'많아서','되요':'돼요','안되요':'안 돼요','몇일':'며칠','웬지':'왠지','할려고':'하려고','금새':'금세','어의없다':'어이없다','왠만하면':'웬만하면'};
  $('#spellSample', root).onclick=()=>{ $('#spellText', root).value='오늘은 날씨가 조아서 친구와 공원에 갔읍니다. 생각보다 사람이 만아서 놀랐고, 금새 집에 돌아왔습니다.'; };
  $('#spellJudge', root).onclick=()=>{
    let t=$('#spellText', root).value; const found=[];
    for(const [wrong,right] of Object.entries(typoMap).sort((a,b)=>b[0].length-a[0].length)){ if(t.includes(wrong)){found.push(`${wrong} → ${right}`); t=t.split(wrong).join(right);} }
    $('#spellList', root).textContent=found.length?found.join('\n'):'혐의 없음'; $('#spellCounts', root).textContent=`혐의 ${found.length}건`; $('#spellVerdict', root).textContent=found.length?'유죄':'무혐의';
    if(found.length) $('#spellText', root).value=t; spawnParticles(['§','⚖','✦'],'#f0c06c',22);
  };
}

function initDownload(root){
  const log=$('#dlLog', root), timer=$('#dlTimer', root);
  $('#dlLaunch', root).onclick=()=>{
    let s=5; log.textContent='발사 절차 시작...'; const iv=setInterval(()=>{ s--; timer.textContent=`00:00:0${s}`; if(s<=0){ clearInterval(iv); const blob=new Blob([$('#dlContent', root).value],{type:'text/plain'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=$('#dlName', root).value || 'payload.txt'; a.click(); log.textContent='파일이 다운로드 궤도에 도착했습니다.'; spawnParticles(['🚀','🔥','✦'],'#7cc9ff',24);} },1000);
  };
}

function initRandom(root){
  const log=$('#randLog', root), recent=$('#randRecent', root); let rows=[];
  $('#randGo', root).onclick=()=>{ const min=Math.ceil(+$('#randMin', root).value), max=Math.floor(+$('#randMax', root).value), qty=Math.max(1,Math.min(100,+$('#randQty', root).value||1));
    if(max<min){log.textContent='최댓값은 최솟값보다 커야 합니다.';return;}
    const range=max-min+1, bytes=new Uint32Array(qty); if(globalThis.crypto?.getRandomValues) crypto.getRandomValues(bytes); else for(let i=0;i<qty;i++)bytes[i]=Math.floor(Math.random()*2**32);
    const nums=[...bytes].map(v=>min+(v%range)); const shown=qty===1?String(nums[0]):nums.join(', '); $('#randOut', root).textContent=shown; $('#randOut', root).style.fontSize=qty>8?'clamp(24px,4vw,48px)':'';
    const time=(Math.random()*4+.2).toFixed(2); $('#randTime', root).textContent=`생성 시간: ${time}밀리초`; log.textContent=`난수 장치 초기화\n난수 재료 충전 ${(95+Math.random()*5).toFixed(1)}%\n${qty}개 결과 확정`;
    rows.unshift(`${new Date().toLocaleTimeString()} → ${shown.slice(0,80)}`); rows=rows.slice(0,6); recent.textContent=rows.join('\n'); };
}

function initQuiz(root){
  let hp=12000, answer=43;
  function newQ(){ const a=Math.floor(Math.random()*20)+10,b=Math.floor(Math.random()*8)+2,c=Math.floor(Math.random()*9)+2,d=Math.floor(Math.random()*8)+2; answer = Math.floor(a/b)+c*d; $('#quizEq', root).textContent=`(${a} ÷ ${b}) + (${c} × ${d}) = ?`; }
  newQ();
  $('#quizCast', root).onclick=()=>{ const v=+$('#quizAns', root).value; if(v===answer){ hp=Math.max(0,hp-1250); $('#quizResult', root).textContent='치명타'; spawnParticles(['🐉','✨','💥'],'#a6ff6a',20);} else { $('#quizResult', root).textContent=`빗나감 / 정답은 ${answer}`; } $('#quizHp', root).textContent=hp; $('#quizBar', root).style.width=`${hp/120}%`; $('#quizLog', root).textContent=`고대 드래곤 남은 체력 ${hp}\n최근 답안 ${v}`; newQ(); };
}

function initCompress(root){
  let file=null, sourceImage=null, sourceSize=12.4*1024*1024, lastUrl=null;
  const fileInput=$('#cmpFile', root), log=$('#cmpLog', root);
  fileInput.onchange=(e)=>{ file=e.target.files[0]||null; if(!file)return; sourceSize=file.size; $('#cmpBefore', root).textContent=formatBytes(sourceSize); const reader=new FileReader(); reader.onload=()=>{const img=new Image();img.onload=()=>{sourceImage=img;log.textContent=`이미지 적재 완료\n해상도 ${img.width} × ${img.height}\n프레스 가동 가능`;};img.src=reader.result;};reader.readAsDataURL(file); };
  $('#cmpRatio', root).oninput=()=>{ $('#cmpRatioOut', root).textContent=`${$('#cmpRatio', root).value}%`; };
  $('#cmpRun', root).onclick=()=>{ const ratio=+$('#cmpRatio', root).value/100;
    if(!sourceImage){ const after=sourceSize*(1-ratio); $('#cmpAfter', root).textContent=formatBytes(after); log.textContent='예시 이미지 기준 압축 시뮬레이션 완료\n실제 파일을 넣으면 다운로드 파일을 생성합니다.'; spawnParticles(['🗜','⚙','✦'],'#ffb24d',16); return; }
    const canvas=document.createElement('canvas'); canvas.width=sourceImage.naturalWidth; canvas.height=sourceImage.naturalHeight; const ctx=canvas.getContext('2d'); ctx.drawImage(sourceImage,0,0);
    const quality=Math.max(.08,Math.min(.92,1-ratio*.88)); canvas.toBlob(blob=>{ if(!blob){log.textContent='압축에 실패했습니다.';return;} $('#cmpAfter', root).textContent=formatBytes(blob.size); log.textContent=`압축 완료\n${formatBytes(sourceSize)} → ${formatBytes(blob.size)}\n감소율 ${Math.max(0,(1-blob.size/sourceSize)*100).toFixed(1)}%`; if(lastUrl)URL.revokeObjectURL(lastUrl);lastUrl=URL.createObjectURL(blob); let a=root.querySelector('#cmpDownload'); if(!a){a=document.createElement('a');a.id='cmpDownload';a.className='btn';a.style.display='inline-block';a.style.marginTop='12px';a.textContent='압축 파일 내려받기';log.insertAdjacentElement('afterend',a);}a.href=lastUrl;a.download=(file?.name?.replace(/\.[^.]+$/,'')||'compressed')+'.jpg'; spawnParticles(['🗜','⚙','✦'],'#ffb24d',16); },'image/jpeg',quality);
  };
}

function initCompat(root){
  $('#compGo', root).onclick=()=>{ const a=$('#compA', root).value, b=$('#compB', root).value; const h=pseudoHash(a+'|'+b); const score=60+(h%39); $('#compScore', root).textContent=`${score}%`; $('#compTier', root).textContent=score>90?'Twin Flames':score>80?'Soul Connection':score>70?'Strong Orbit':'Chaotic Stars'; $('#compEmo', root).textContent=`${70+(h%25)}%`; $('#compPhy', root).textContent=`${65+((h>>3)%30)}%`; $('#compInsight', root).textContent=`${a} 와 ${b} 의 궤도는 ${score>85?'매우 안정적':'예측 불가하지만 매력적'}이다.`; };
}

function initVolume(root){
  const board=$('#faderBoard', root), channels=['KICK','SNARE','BASS','LEAD','SYNTH','VOCAL','FX','MASTER'];
  board.innerHTML = channels.map((ch,i)=>`<div class="fader"><div class="sub">${ch}</div><div class="meter-v"><i style="height:${50+i*5}%"></i></div><input type="range" min="0" max="100" value="${55+i*4}" data-fader="${ch}"><div class="badge" data-meter="${ch}">${55+i*4}</div></div>`).join('');
  board.oninput=(e)=>{ if(e.target.matches('input[type="range"]')){ const ch=e.target.dataset.fader; $(`[data-meter="${ch}"]`, root).textContent=e.target.value; const avg=[...board.querySelectorAll('input')].reduce((a,b)=>a + +b.value, 0)/8; $('#volEnergy', root).textContent=`${Math.round(avg)}%`; $('#volLatency', root).textContent=`${Math.max(4,Math.round(24-avg/5))}ms`; $('#volLog', root).textContent=`음향 조정 / ${ch} → ${e.target.value}`; } };
}

function initRefresh(root){
  $('#refGo', root).onclick=()=>{ $('#refState', root).textContent='인과관계 붕괴가 임박했습니다...'; doFlash(); spawnParticles(['🕒','⌛','◌'],'#9f8bff',26); setTimeout(()=>location.reload(), 1800); };
}

// basic syntax guard use

window.addEventListener('load',()=>{ const id=location.hash.slice(1); if(APPS.some(a=>a.id===id)) openApp(id); });
