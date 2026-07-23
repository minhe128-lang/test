(() => {
  const sceneIds=['weather','button','todo','timer','password','dice','rps','currency','counter','lunch','qr','nickname','spell','download','random','quiz','compress','compat','volume','refresh'];
  sceneIds.forEach(id=>{
    const value=`url("assets/scenes/${id}.webp")`;
    document.querySelector(`[data-tool="${id}"]`)?.style.setProperty('--scene',value);
    document.getElementById(`app-${id}`)?.style.setProperty('--scene',value);
  });

  let audioCtx;
  function tone(ctx,freq,start,duration,type='sine',volume=.025,endFreq=freq){
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.type=type;osc.frequency.setValueAtTime(freq,start);osc.frequency.exponentialRampToValueAtTime(Math.max(20,endFreq),start+duration);
    gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(volume,start+.015);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
    osc.connect(gain).connect(ctx.destination);osc.start(start);osc.stop(start+duration+.02);
  }
  function playSignature(id){
    try{
      audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();
      const c=audioCtx,t=c.currentTime+.01;
      const p={
        weather:[[70,.45,'sawtooth',.035,32],[110,.22,'sine',.02,50]],button:[[180,.18,'square',.025,55],[520,.09,'sawtooth',.018,120]],todo:[[760,.12,'triangle',.02,210],[1200,.08,'sine',.012,400]],timer:[[540,.16,'square',.018,540],[420,.16,'square',.018,420]],password:[[980,.06,'square',.012,1400],[1320,.05,'square',.01,760]],dice:[[260,.35,'sine',.02,880],[520,.28,'triangle',.014,1040]],rps:[[140,.16,'sawtooth',.025,75],[90,.22,'square',.018,45]],currency:[[850,.08,'square',.01,310],[240,.18,'sawtooth',.02,90]],counter:[[95,.16,'sine',.02,52]],lunch:[[420,.35,'sine',.018,840],[630,.28,'triangle',.012,1260]],qr:[[1250,.08,'sine',.015,420],[1680,.05,'square',.008,900]],nickname:[[320,.3,'sine',.018,960],[640,.24,'triangle',.014,1280]],spell:[[120,.14,'triangle',.03,62],[65,.2,'sine',.018,42]],download:[[60,.55,'sawtooth',.035,150],[220,.32,'triangle',.02,70]],random:[[700,.06,'square',.012,520],[1050,.07,'square',.01,730]],quiz:[[240,.2,'triangle',.02,720],[980,.12,'sine',.012,360]],compress:[[76,.28,'square',.026,42],[165,.09,'sawtooth',.012,80]],compat:[[440,.3,'sine',.016,660],[660,.3,'sine',.014,880]],volume:[[110,.12,'square',.014,220],[220,.12,'square',.012,440]],refresh:[[180,.48,'sine',.02,920],[90,.55,'triangle',.018,360]]
      }[id]||[[220,.16,'sine',.02,440]];
      p.forEach((x,i)=>tone(c,x[0],t+i*.045,x[1],x[2],x[3],x[4]));
    }catch{}
  }

  window.fx=function(power=24,color='#7c5cff'){
    const app=document.querySelector('.app.open');
    const id=app?.id.replace('app-','')||'button';
    if(app){app.classList.remove('event-active');void app.offsetWidth;app.classList.add('event-active');setTimeout(()=>app.classList.remove('event-active'),1450)}
    if(['weather','button','timer','download','refresh'].includes(id)){const f=document.getElementById('flash');f.classList.remove('go');void f.offsetWidth;f.classList.add('go')}
    if(['button','todo','timer','rps','download','quiz','compress'].includes(id)){document.body.classList.remove('shake');void document.body.offsetWidth;document.body.classList.add('shake')}
    playSignature(id);
    const glyphs={password:['0','1','>','_'],currency:['$','€','¥','₩'],lunch:['✦','☼','✧','◇'],spell:['§','¶','判','⚖'],compat:['♥','♡','✦','∞'],refresh:['Ⅻ','Ⅲ','Ⅵ','Ⅸ']};
    for(let i=0;i<power;i++){
      const p=document.createElement('i');p.className=`particle particle-${id}`;
      p.style.left=(45+Math.random()*10)+'vw';p.style.top=(43+Math.random()*14)+'vh';p.style.background=i%2?color:'#fff';p.style.color=i%2?color:'#fff';
      p.style.setProperty('--x',(Math.random()*760-380)+'px');p.style.setProperty('--y',(Math.random()*620-310)+'px');
      if(glyphs[id])p.textContent=glyphs[id][Math.floor(Math.random()*glyphs[id].length)];
      document.body.appendChild(p);setTimeout(()=>p.remove(),1250);
    }
  };
})();
