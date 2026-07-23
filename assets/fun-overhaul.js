(() => {
  const TEXT = new Map(Object.entries({
    'Global Telemetry':'전 지구 기상 관측','Temp':'기온','Wind':'풍속','Humidity':'습도','Condition':'현재 상태','LOADING':'불러오는 중',
    'Active Systems':'가동 중인 장치','Cloud Seeding':'구름 씨앗 살포','Jet Stream Control':'제트기류 조절','Hurricane Dampener':'태풍 억제기','ON':'가동','READY':'준비','STANDBY':'대기',
    'Atmospheric Command':'기상 통제 판정','Cloud Density':'구름 밀도','Precipitation':'강수량','Visibility':'가시거리','Pressure':'기압','Storm Front Analysis':'폭풍 전선 분석','Override':'수동 개입',
    'Authorization Level':'승인 권한','MAX':'최고','Clearance OMEGA':'최종 승인 권한','Potential Outcomes':'예상되는 결과','All systems':'모든 장치','Timelines':'시간선','Reality':'현실','Cookies':'쿠키까지',
    'Final Confirmation':'최종 확인','CONFIRM':'확인','ONE PRESS. NO TAKEBACKS.':'한 번 누르면 되돌릴 수 없습니다.','System Stability':'현실 안정도','Mission Log':'작동 기록',
    'Boss Status':'마왕 상태','Dragon Lord HP':'마왕 체력','Reward Tracker':'토벌 보상','Legendary Chest':'전설 상자','Main Quest Board':'주요 퀘스트 게시판','Quest List':'퀘스트 목록','Guild Notices':'길드 공지','Progress':'완료 횟수',
    'Bunker Status':'벙커 상태','Power Core':'동력로','ONLINE':'정상','Air Supply':'공기 공급','STABLE':'안정','Threat Level':'위협 단계','Doomsday Focus Timer Bunker':'종말 대비 집중 벙커','Pomodoro':'집중 25분','Short Break':'짧은 휴식','Long Break':'긴 휴식','START':'집중 시작','PAUSE':'일시정지','RESET':'초기화','FOCUS MODE: STANDBY':'집중 모드 대기','Survival Rules':'생존 수칙','No social media':'SNS 금지','No games':'게임 금지','Only focus':'집중만 허용','Session Log':'집중 기록',
    'Terminal':'작전 단말기','Dashboard':'상황판','Password Gen':'비밀번호 생성','Hash Cracker':'해시 분석','Encryptor':'암호화 장치','System Status':'장치 상태','Password Generator':'비밀번호 생성기','Length':'길이','Upper':'영문 대문자','Lower':'영문 소문자','Number':'숫자','Symbol':'특수문자','GENERATE PASSWORD':'비밀번호 생성','COPY':'복사','Generated Password':'생성 결과','Server Logs':'단말 기록',
    'Dice Collection':'주사위 보관함','FATE D4':'운명의 4면체','ARCANE D6':'비전의 6면체','STELLAR D8':'별빛의 8면체','VOID D12':'공허의 12면체','ASTRAL D20':'성운의 20면체','Roll History':'굴림 기록','Cosmic Dice Chamber':'우주 주사위 제단','ROLL THE DICE':'운명을 굴린다','Probability Oracle':'확률 신탁','Min':'최솟값','Max':'최댓값','Ritual Modifiers':'의식 보정','+2 Cosmic Alignment':'우주 정렬 +2','Exploding 20s':'20 폭발 판정','Re-Roll Ones':'1 재굴림',
    'Enemy Intel':'적군 정보','USA — aggressive':'미군 — 공격적','CHINA — defensive':'중국군 — 방어적','GLOBAL AI — unknown':'전 지구 AI — 알 수 없음','Choose Your Weapon':'전략 병기 선택','ROCK':'바위','PAPER':'보','SCISSORS':'가위','You':'아군','Enemy':'적군','Result':'결과','Operation Log':'작전 기록','Mission Objectives':'작전 목표','Win 3 rounds':'3회 승리','Avoid 3 losses in a row':'3연패 방지','Maintain global dominance':'세계 패권 유지',
    'Currency Converter':'환율 변환기','From':'보유 통화','To':'교환 통화','Amount':'금액','CONVERT':'환전 실행','SWAP':'서로 바꾸기','Converted Amount':'환전 결과','Market Impact':'시장 충격','Inflation Surge':'물가 상승','Interest Rate':'기준 금리','GDP Forecast':'성장률 전망','Recent Conversions':'최근 환전',
    'Evidence Document':'진술서','Evidence Metrics':'증거 수치','Character':'글자 수','Word':'단어 수','Sentence':'문장 수','Reading':'읽는 시간','Transcript Analysis':'진술 분석','Trust Index':'신뢰 지수',
    'Ritual Status':'의식 상태','Hunger — focused':'배고픔 — 집중됨','Intention — clear':'의도 — 명확함','Alignment — 98%':'식욕 정렬 — 98%','Consult the Oracle':'점심 신탁 의식','DESTINY DRAW':'오늘의 메뉴를 내려주소서','Today’s Prophecy':'오늘의 계시',"Today's Prophecy":'오늘의 계시','Oracle Result':'신탁 결과','TACOS AL PASTOR':'타코',
    'QR Generator':'QR 생성 장치','URL':'주소','TEXT':'문자','Size':'크기','Error Level':'오류 복구 단계','GENERATE QR CODE':'레이저 각인 시작','Laser Etching Chamber':'레이저 각인실','Scan Result':'인식 결과','Production Metrics':'생산 기록','QR Codes Today':'오늘 제작량','Success Rate':'성공률',
    'Seed Input':'각성 원본','ACTIVATE':'각성 시작','Gene Traits':'각성 성향','Creativity':'창의력','Mystique':'신비도','Manifested Nickname':'발현된 닉네임','Nickname Potential':'잠재 등급','Candidate Ranking':'후보 순위',
    'Case File':'사건 기록','Opening Brief.txt':'최초 진술.txt','Exhibit A_Document.txt':'증거문서_A.txt','Final Argument.pdf':'최종 변론.pdf','Exhibit A':'증거문서 A','STRIKE VERDICT':'판결봉 내리기','LOAD SAMPLE':'예시 사건 불러오기','Defendants':'피고 단어','Verdict':'판결','PENDING':'심리 중',
    'Payload Configuration':'발사 화물 설정','Downloads Folder':'다운로드 폴더','Desktop':'바탕화면','Local System':'이 장치','Launch Status':'발사 승인 상태','Payload Integrity — OK':'화물 무결성 — 정상','Destination Access — VERIFIED':'도착지 접근 — 확인','Launch Authorization — APPROVED':'발사 승인 — 완료','IGNITE':'점화','T-Minus':'발사까지',
    'Mission Parameters':'작전 범위','EXECUTE':'작전 실행','Generated Outcome':'확정된 난수','Command Log':'명령 기록','Recent Operations':'최근 작전',
    'Calculatorian':'계산술사','INT 42':'지능 42','Combo x5':'연속 공격 5배','Accuracy 92%':'정확도 92%','Challenge the Dragon':'드래곤에게 문제를 던진다','CAST ANSWER':'정답 마법 발사','Boss HP':'마왕 체력','Battle Log':'전투 기록',
    'Upload & Drop':'이미지 투입구','Compression Ratio':'압축 강도','ENGAGE PRESS':'프레스 가동','Compression Stats':'압축 결과','Before':'압축 전','Ratio':'감소율','After':'압축 후','Safety Protocols':'안전 장치','Guard Doors — LOCKED':'안전문 — 잠김','Thermal Level — NORMAL':'열 수치 — 정상','System Status — NOMINAL':'장치 상태 — 정상','Press Log':'프레스 기록',
    'Your Name':'첫 번째 이름','Their Name':'두 번째 이름','COMPARE':'궁합 관측','Love Harmony':'관계 파장','Emotional':'정서 일치','Physical':'행동 호흡','Compatibility':'궁합 수치','Soul Connection':'영혼 연결','Cosmic Insight':'우주 판독','Constellation Overlay':'관계 별자리','Heart Nebula':'심장 성운','Twin Flames':'쌍둥이 불꽃','Soul Path':'영혼의 길','Destiny Line':'운명의 선',
    'Stage Monitor':'무대 중계','Crowd Energy':'관객 열기','Sonic Arena — Live Mix Console':'초대형 공연장 음향 조종석','Transport':'재생 제어','Latency':'지연','Live Feed':'현장 반응',
    'Current Timeline':'현재 시간선','Prime // v7.3.1':'기준 세계선 // 7.3.1','Reality Stability — 64.7%':'현실 안정도 — 64.7%','Paradox Risk — HIGH':'역설 위험 — 높음','Temporal Coordinates':'시간 좌표','Time Travel Refresh Portal':'시간여행 새로고침 관문','INITIATE REFRESH':'시간선 재가동','Recent Refreshes':'최근 시간선 복원','Diagnostics':'시간선 진단','Chrono Energy':'시간 에너지','Paradox Threshold':'역설 한계'
  }));


  const SUBSTRINGS=[
    ['INIT WEATHER CONTROL HQ','기상 통제실 기동'],['requesting seoul telemetry...','서울 관측 자료 요청 중...'],
    ['waiting for irresponsible input...','무책임한 입력을 기다리는 중...'],['ABSOLUTE CONSEQUENCES DEPLOYED.','과도한 결과가 배치되었습니다.'],
    ['10,000 Gold','10,000 골드'],['2,500 XP','경험치 2,500'],
    ['Defeat the procrastination dragon','미루기 드래곤 토벌'],['Cleanse the cursed desktop','저주받은 바탕화면 정리'],['Rescue the deadline','마감 기한 구출'],['Gather 10 useful notes','쓸모 있는 메모 10개 수집'],
    ['Raid night is Friday.','금요일은 토벌의 날.'],['Bring potions.','회복약을 챙기십시오.'],['Complain about everything.','불평은 퀘스트 완료 후.'],['Glory to the guild.','길드에 영광을.'],
    ['OMEGA','오메가'],['RAM','메모리'],['GLOBAL AI','전 지구 인공지능'],['AI','인공지능'],['SNS 금지','소셜 미디어 금지'],['ready.','준비 완료.'],
    ['seeded entropy pool','난수 재료 충전 완료'],['password generated successfully','비밀번호 생성 완료'],['est. time to crack:','예상 해독 시간:'],['years','년'],
    ['ASTRAL D20 SELECTED','성운의 20면체 선택'],['Re-roll Ones','1이 나오면 재굴림'],['awaiting deployment...','작전 배치 대기 중...'],
    ['no recent conversions.','최근 환전 기록 없음.'],
    ['honestly','솔직히'],['actually','사실은'],['i swear','정말이에요'],['you know','알잖아요'],['maybe','아마도'],
    ['DECODED DATA','인식 내용'],['STATUS VALID QR CODE','상태: 정상 QR 코드'],
    ['KAGEJIN','그림자칼날'],['SEIYO','별빛'],['YACHO','밤나비'],
    ['none','없음'],['0 issues','혐의 0건'],['awaiting launch command...','발사 명령 대기 중...'],
    ['deal damage by answering correctly.','정답을 맞히면 드래곤에게 피해를 줍니다.'],['waiting for image payload...','이미지 투입 대기 중...'],
    ['KICK','킥'],['SNARE','스네어'],['BASS','베이스'],['LEAD','리드'],['SYNTH','신스'],['VOCAL','보컬'],['MASTER','전체'],['REC','녹화'],['CPU','처리량'],
    ['BassDropper: this drop is insane.','관객: 저음이 바닥을 뜯고 있습니다.'],['hold if you ignore causality.','인과관계를 무시하고 재가동하십시오.']
  ];

  const DYNAMIC = [
    [/^CONNECTED TO OPEN-METEO$/,'기상 자료 연결 완료'],[/^TEMP /,'기온 '],[/^HUMIDITY /,'습도 '],[/^PRESSURE /,'기압 '],[/^WEATHER CODE /,'기상 코드 '],
    [/^CLEAR$/,'맑음'],[/^MAINLY CLEAR$/,'대체로 맑음'],[/^PARTLY CLOUDY$/,'구름 조금'],[/^OVERCAST$/,'흐림'],[/^FOG$/,'안개'],[/^RAIN$/,'비'],[/^HEAVY RAIN$/,'강한 비'],[/^THUNDERSTORM$/,'뇌우'],
    [/^CONFIRMATION ACCEPTED\./,'확인 완료.'],[/^absolute consequences deployed\.?$/i,'과도한 결과가 배치되었습니다.'],
    [/^FOCUS MODE: ACTIVATED$/,'집중 모드 가동'],[/^MODE SET \/\/ (\d+) MIN$/,'집중 시간 $1분 설정'],[/^PAUSED$/,'일시정지'],[/^RESET COMPLETE$/,'초기화 완료'],[/^DOOMSDAY ALERT \/\/ SESSION COMPLETE$/,'집중 완료. 종말은 잠시 연기되었습니다.'],
    [/^secure session established/i,'보안 연결 수립 완료'],[/^seeded entropy pool/i,'난수 재료 수집 완료'],[/^password generated successfully/i,'비밀번호 생성 완료'],[/^est\. time to crack:/i,'예상 해독 시간:'],
    [/^D(\d+) SELECTED$/,'$1면체 선택'],[/^no rolls yet\.?$/i,'아직 굴린 기록이 없습니다.'],
    [/^DRAW$/,'무승부'],[/^WIN$/,'승리'],[/^LOSE$/,'패배'],[/^Wins (\d+) \/ Losses (\d+) \/ Draws (\d+)$/,'승리 $1 / 패배 $2 / 무승부 $3'],
    [/^live market feed ready\.?$/i,'실시간 시장 자료 대기 중.'],[/^live feed unavailable$/i,'실시간 시장 자료를 불러오지 못했습니다.'],[/^FAIL$/,'연결 실패'],
    [/^LOW CONFIDENCE$/,'신뢰 낮음'],[/^MIXED SIGNAL$/,'진술 혼재'],[/^HIGH CONFIDENCE$/,'신뢰 높음'],[/^detected$/,'발견'],
    [/^The stars are hungry\.?$/i,'별들이 배고파하고 있습니다.'],[/^The stars demand (.+)\. Feast well\.$/i,'별들의 판정: $1. 맛있게 드십시오.'],
    [/^DECODED DATA$/,'인식 내용'],[/^STATUS VALID QR CODE$/,'상태: 정상 QR 코드'],
    [/^GUILTY$/,'유죄'],[/^CLEARED$/,'무혐의'],[/^(\d+) issues detected$/,'혐의 $1건 발견'],
    [/^launch sequence initiated/i,'발사 절차 시작'],[/^payload reached local orbit\. download complete\.$/i,'파일이 다운로드 궤도에 도착했습니다.'],
    [/^generation time:/i,'생성 시간:'],[/^randomization standby\.?$/i,'난수 작전 대기 중.'],[/^initializing RNG/i,'난수 장치 초기화'],[/^entropy pool:/i,'난수 재료 충전:'],[/^outcome generated:/i,'결과 확정:'],
    [/^CRITICAL HIT$/,'치명타'],[/^MISS \/\/ correct was (.+)$/,'빗나감 / 정답은 $1'],[/^dragon is waiting/i,'드래곤이 비웃으며 기다리는 중'],
    [/^guard doors locked/i,'안전문 잠금'],[/^applying pressure profile/i,'압축 강도 적용'],[/^compression finished/i,'압축 완료'],
    [/^Twin Flames$/,'쌍둥이 불꽃'],[/^Strong Orbit$/,'단단한 궤도'],[/^Chaotic Stars$/,'혼돈의 별자리'],[/^Your energies flow beautifully together\.$/,'두 사람의 궤도가 부드럽게 겹칩니다.'],
    [/^mix updated \/\//i,'음향 조정 /'],[/^causality breach imminent/i,'인과관계 붕괴가 임박했습니다.']
  ];

  function translateText(raw){
    const leading = raw.match(/^\s*/)?.[0] || '';
    const trailing = raw.match(/\s*$/)?.[0] || '';
    const core = raw.trim();
    if(!core) return raw;
    if(TEXT.has(core)) return leading + TEXT.get(core) + trailing;
    let changed = core;
    for(const [rx, rep] of DYNAMIC){ if(rx.test(changed)){ changed = changed.replace(rx, rep); break; } }
    for(const [from,to] of SUBSTRINGS) changed=changed.split(from).join(to);
    return leading + changed + trailing;
  }

  function localize(root){
    if(!root) return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{ const next=translateText(n.nodeValue); if(next!==n.nodeValue) n.nodeValue=next; });
    const values={
      countText:'그 물건은 제가 가져간 게 아닙니다. 창고에 있었고, 누군가 먼저 옮겼을 겁니다. 정말입니다.',
      spellText:'오늘은 날씨가 조아서 친구와 공원에 갔읍니다. 생각보다 사람이 만아서 놀랐습니다.',
      dlName:'작전문서.txt',dlContent:'이 파일은 지나치게 거창한 발사 절차를 거쳐 다운로드됩니다.',nickSeed:'그림자_칼날_07',compA:'현승',compB:'지우'
    };
    Object.entries(values).forEach(([id,v])=>{const el=root.querySelector('#'+id);if(el&&(!el.dataset.localized)){el.value=v;el.dataset.localized='1';}});
    root.querySelectorAll('input,textarea').forEach(el=>{if(el.placeholder) el.placeholder=translateText(el.placeholder)});
    root.querySelectorAll('option').forEach(el=>{el.textContent=translateText(el.textContent)});
  }

  const SHOWS={
    weather:{symbol:'🌩️',title:'서울 기상권 분석',steps:['위성 관측망 연결','구름 밀도 계산','돌풍 경로 추적','기상 판정 완료'],stamp:'분석 완료',chars:['⚡','🌧','☁']},
    button:{symbol:'🔴',title:'최종 확인 절차',steps:['안전 덮개 해제','책임 소재 제거','현실 안정장치 정지','확인 처리 완료'],stamp:'확인됨',chars:['⚠','☢','💥']},
    todo:{symbol:'⚔️',title:'퀘스트 완료 판정',steps:['완료 증거 확인','공격력 계산','마왕 방어력 관통','체력 피해 적용'],stamp:'치명타',chars:['⚔','🔥','💢']},
    timer:{symbol:'☢️',title:'벙커 집중 모드',steps:['출입문 봉쇄','방해 요소 차단','집중 시간 장전','집중 작전 개시'],stamp:'봉쇄 완료',chars:['☢','⚠','⏱']},
    password:{symbol:'💻',title:'보안 문자열 조립',steps:['난수 재료 확보','문자 조합 섞기','취약 패턴 제거','비밀번호 봉인'],stamp:'생성 완료',chars:['0','1','⌁']},
    dice:{symbol:'🎲',title:'우주 확률 재배열',steps:['주사위 차원 소환','확률 궤도 회전','운명 충돌','숫자 확정'],stamp:'운명 확정',chars:['✦','◇','☄']},
    rps:{symbol:'✊',title:'전략 병기 교전',steps:['아군 선택 확인','적군 수 읽기','상성 계산','전투 결과 확정'],stamp:'교전 종료',chars:['✊','✋','✌️']},
    currency:{symbol:'📉',title:'환율 시장 충격 계산',steps:['시장 자료 수집','통화 가치 충돌','수수료 공포 연출','환전 결과 확정'],stamp:'환전 완료',chars:['₩','$','€','¥']},
    counter:{symbol:'🔎',title:'진술서 정밀 심문',steps:['문장 분리','단어 압수','글자 수 대조','신뢰도 판정'],stamp:'심문 완료',chars:['🔎','§','📄']},
    lunch:{symbol:'🍲',title:'점심 신탁 의식',steps:['배고픔 수치 측정','메뉴 후보 소환','후회 가능성 제거','오늘의 메뉴 강림'],stamp:'메뉴 확정',chars:['🍜','🍔','🍕','🌮']},
    qr:{symbol:'▦',title:'QR 레이저 각인',steps:['입력 자료 압축','격자 위치 정렬','레이저 출력 상승','각인 및 검사 완료'],stamp:'각인 완료',chars:['▦','✦','⌁']},
    nickname:{symbol:'🧬',title:'닉네임 각성 실험',steps:['원본 이름 분해','성향 유전자 합성','중2병 농도 조절','최종 이름 발현'],stamp:'각성 완료',chars:['🧬','✦','影']},
    spell:{symbol:'⚖️',title:'맞춤법 공개 재판',steps:['문장 증거 채택','의심 단어 소환','오타 혐의 심리','최종 판결 선고'],stamp:'판결 완료',chars:['⚖','§','🔨']},
    download:{symbol:'🚀',title:'파일 궤도 발사',steps:['화물 적재','발사대 잠금','점화 및 상승','다운로드 궤도 진입'],stamp:'발사 성공',chars:['🚀','🔥','✦']},
    random:{symbol:'🎰',title:'극비 난수 작전',steps:['위성 좌표 확보','무작위성 충전','숫자 후보 제거','최종 숫자 봉인'],stamp:'기밀 확정',chars:['⌖','🔒','✦']},
    quiz:{symbol:'🐉',title:'산수 마법 공격',steps:['답안 마력 변환','정답 여부 판정','공격력 증폭','드래곤 피해 적용'],stamp:'공격 완료',chars:['🐉','💥','✨']},
    compress:{symbol:'🗜️',title:'산업용 이미지 압축',steps:['안전문 잠금','압력 상승','불필요한 용량 압착','압축물 배출'],stamp:'압축 완료',chars:['🗜','⚙','💥']},
    compat:{symbol:'🔮',title:'두 사람의 궤도 관측',steps:['이름 파장 분석','감정 궤도 연결','우주적 핑계 생성','궁합 수치 발표'],stamp:'관측 완료',chars:['♡','✦','💫']},
    volume:{symbol:'🔊',title:'공연장 음향 폭주',steps:['채널 신호 합류','저음 진동 상승','관객 열기 증폭','공연장 출력 확정'],stamp:'출력 폭발',chars:['♪','♫','🔊']},
    refresh:{symbol:'🌀',title:'시간선 재가동',steps:['현재 세계선 저장','시간축 분리','인과관계 흔들기','새로고침 관문 개방'],stamp:'재가동',chars:['🕒','⌛','◌']}
  };

  const ACTIONS={countInterrogate:'counter',volBlast:'volume',wSimulate:'weather',confirmCore:'button',timerStart:'timer',pwGen:'password',diceRoll:'dice',curConvert:'currency',lunchOracle:'lunch',qrGenerate:'qr',nickAwaken:'nickname',spellJudge:'spell',dlLaunch:'download',randGo:'random',quizCast:'quiz',cmpRun:'compress',compGo:'compat',refGo:'refresh'};
  let soundOn=true;
  let sessionScore=0;
  let sessionCombo=0;
  const ACHIEVEMENTS={weather:'기상청보다 과몰입함',button:'버튼 하나로 책임 회피',todo:'현실의 일을 게임으로 속임',timer:'25분에 핵벙커 동원',password:'문자열 하나에 해커 영화 제작',dice:'확률에 우주를 낭비함',rps:'손놀이에 세계정세 투입',currency:'환전 한 번에 시장 붕괴',counter:'문장을 취조실로 끌고 옴',lunch:'점심에 신탁 사용',qr:'검은 네모에 레이저 낭비',nickname:'이름 하나에 유전자 조작',spell:'오타를 피고석에 세움',download:'텍스트 파일을 우주로 발사',random:'숫자 하나를 국가기밀화',quiz:'산수로 드래곤 폭행',compress:'사진에 산업용 프레스 사용',compat:'이름 두 개로 우주 날조',volume:'슬라이더에 공연장 동원',refresh:'새로고침에 시간선 희생'};
  const toggle=document.getElementById('soundToggle');
  toggle?.addEventListener('click',()=>{soundOn=!soundOn;toggle.classList.toggle('off',!soundOn);toggle.textContent=soundOn?'🔊':'🔇';});

  function tone(id,phase=0){
    if(!soundOn) return;
    try{
      const C=window.AudioContext||window.webkitAudioContext; const ctx=new C();
      const palettes={weather:[180,260,420],button:[90,70,50],todo:[220,330,110],timer:[440,220,110],password:[520,620,780],dice:[260,390,520],rps:[130,180,90],currency:[300,240,180],counter:[480,320,200],lunch:[330,440,550],qr:[620,820,980],nickname:[240,480,720],spell:[180,120,70],download:[110,220,440],random:[190,380,760],quiz:[160,240,100],compress:[90,130,70],compat:[440,550,660],volume:[110,220,330],refresh:[220,330,660]};
      const seq=palettes[id]||[220,330,440]; const now=ctx.currentTime;
      seq.forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=id==='password'||id==='qr'?'square':id==='compat'||id==='lunch'?'sine':'sawtooth';o.frequency.setValueAtTime(f+(phase*10),now+i*.09);g.gain.setValueAtTime(.0001,now+i*.09);g.gain.exponentialRampToValueAtTime(.05,now+i*.09+.02);g.gain.exponentialRampToValueAtTime(.0001,now+i*.09+.16);o.connect(g).connect(ctx.destination);o.start(now+i*.09);o.stop(now+i*.09+.18);});
      setTimeout(()=>ctx.close(),700);
    }catch{}
  }

  function particleBurst(chars,color){
    const layer=document.getElementById('fxLayer'); if(!layer) return;
    for(let i=0;i<32;i++){const p=document.createElement('div');p.className='fx-particle';p.textContent=chars[i%chars.length];p.style.left=(innerWidth/2+Math.random()*120-60)+'px';p.style.top=(innerHeight/2+Math.random()*90-45)+'px';p.style.color=color;p.style.setProperty('--x',(Math.random()*620-310)+'px');p.style.setProperty('--y',(Math.random()*440-220)+'px');layer.appendChild(p);setTimeout(()=>p.remove(),1000);}
  }


  function updateHud(){
    document.querySelectorAll('.fun-hud-score').forEach(el=>el.textContent=sessionScore.toLocaleString());
    document.querySelectorAll('.fun-hud-combo').forEach(el=>el.textContent=Math.max(1,sessionCombo)+'연속');
  }

  function runShow(id){
    const cfg=SHOWS[id]; if(!cfg||document.querySelector('.cinema')) return;
    sessionScore+=Math.floor(700+Math.random()*900);sessionCombo++;updateHud();
    const app=document.querySelector(`#app-${id}`); const color=getComputedStyle(app||document.documentElement).getPropertyValue('--accent').trim()||'#7ff0ff';
    const el=document.createElement('div');el.className=`cinema cinema-${id}`;el.style.setProperty('--accent',color);
    el.innerHTML=`<div class="cinema-grid"></div><div class="cinema-rain"></div><div class="cinema-ring"></div><div class="cinema-core"><div class="cinema-symbol">${cfg.symbol}</div><div class="cinema-title">${cfg.title}</div><div class="cinema-step">${cfg.steps[0]}</div><div class="cinema-bar"><i></i></div><div class="cinema-count">진행 0%</div></div><div class="cinema-stamp">${cfg.stamp}</div>`;
    document.body.appendChild(el); tone(id,0);
    const step=el.querySelector('.cinema-step'),bar=el.querySelector('.cinema-bar i'),count=el.querySelector('.cinema-count');
    let i=0;
    const next=()=>{i++; const pct=Math.min(100,Math.round(i/cfg.steps.length*100));bar.style.width=pct+'%';count.textContent=`진행 ${pct}%`;if(i<cfg.steps.length){step.textContent=cfg.steps[i];tone(id,i);}else{el.classList.add('done');step.textContent=cfg.stamp;particleBurst(cfg.chars,color);tone(id,5);toast('업적 해제: '+(ACHIEVEMENTS[id]||'쓸데없이 거창하게 처리함'));setTimeout(()=>{el.classList.add('out');setTimeout(()=>el.remove(),360)},650);return;}setTimeout(next,360)};
    setTimeout(next,280);
  }

  function toast(text){const t=document.createElement('div');t.className='fun-toast';t.textContent=text;document.body.appendChild(t);setTimeout(()=>t.remove(),2300)}

  function enhance(id){
    const root=document.querySelector(`#app-${id}`); if(!root||root.dataset.funEnhanced==='1') return;
    root.dataset.funEnhanced='1';
    localize(root);
    const toolbar=root.querySelector('.app-toolbar');
    if(toolbar&&!toolbar.querySelector('.fun-hud')){const hud=document.createElement('div');hud.className='fun-hud';hud.innerHTML='<span>연출력 <b class="fun-hud-score">'+sessionScore.toLocaleString()+'</b></span><span>콤보 <b class="fun-hud-combo">'+Math.max(1,sessionCombo)+'연속</b></span>';toolbar.insertBefore(hud,toolbar.lastElementChild);}
    root.addEventListener('click',e=>{
      const key=ACTIONS[e.target.id];
      if(key) runShow(key);
      if(id==='todo' && e.target.matches('[data-done]')){runShow('todo');root.querySelector('.app-frame')?.classList.add('damage-flash');setTimeout(()=>root.querySelector('.app-frame')?.classList.remove('damage-flash'),600)}
      if(id==='rps' && e.target.matches('[data-rps]')) runShow('rps');
      if(id==='compress' && e.target.id==='cmpRun'){root.classList.add('pressing');setTimeout(()=>root.classList.remove('pressing'),1700)}
      if(id==='download' && e.target.id==='dlLaunch'){root.classList.add('launching');setTimeout(()=>root.classList.remove('launching'),3300)}
      if(id==='spell' && e.target.id==='spellJudge'){root.querySelector('.app-frame')?.classList.add('gavel-hit');setTimeout(()=>root.querySelector('.app-frame')?.classList.remove('gavel-hit'),600)}
    },true);
    if(id==='counter'){
      const ta=root.querySelector('#countText');
      ta?.addEventListener('input',()=>{ta.classList.remove('scanning');void ta.offsetWidth;ta.classList.add('scanning')});
      if(ta&&!root.querySelector('#countInterrogate')){const b=document.createElement('button');b.id='countInterrogate';b.className='btn';b.textContent='진술서 심문 시작';b.style.marginTop='12px';ta.insertAdjacentElement('afterend',b);}
    }
    if(id==='qr'){
      root.querySelector('#qrGenerate')?.addEventListener('click',()=>{const q=root.querySelector('#qrOutput');q.classList.add('lasering');setTimeout(()=>q.classList.remove('lasering'),2400)},true);
    }
    if(id==='volume'){
      const bar=root.querySelector('.app-toolbar');
      if(bar&&!root.querySelector('#volBlast')){const b=document.createElement('button');b.id='volBlast';b.className='btn';b.textContent='공연장 출력 폭발';bar.insertBefore(b,bar.lastElementChild);}
      root.addEventListener('input',e=>{if(e.target.matches('[data-fader]')){tone('volume',Math.floor(+e.target.value/20));root.style.filter=`saturate(${1+(+e.target.value/120)})`;clearTimeout(root._flt);root._flt=setTimeout(()=>root.style.filter='',140)}});
      root.addEventListener('click',e=>{if(e.target.id==='volBlast'){root.querySelectorAll('[data-fader]').forEach(f=>{f.value=100;f.dispatchEvent(new Event('input',{bubbles:true}))});}});
    }
    toast(`${SHOWS[id]?.symbol||'✦'} ${TEXT.get('Dashboard')||'작동실'} 입장 완료`);
  }

  window.__enhanceOverkill=enhance;
  const observer=new MutationObserver(muts=>{
    muts.forEach(m=>{if(m.type==='characterData'){const v=translateText(m.target.nodeValue);if(v!==m.target.nodeValue)m.target.nodeValue=v;}m.addedNodes.forEach(n=>{if(n.nodeType===1)localize(n);else if(n.nodeType===3){const v=translateText(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v;}})});
  });
  const mount=document.getElementById('appMount');if(mount)observer.observe(mount,{subtree:true,childList:true,characterData:true});
  localize(document.body);
  window.addEventListener('load',()=>{const id=location.hash.slice(1);if(id&&document.querySelector(`#app-${id}`))enhance(id)});
})();
