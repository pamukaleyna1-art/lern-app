/* ===== Kern: Speicher, Vorlesen, Hilfsfunktionen, Übungs-Abläufe ===== */
const app=document.getElementById('app');
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const fmt=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');

/* Speicher – jedes Kind hat seinen eigenen Bereich */
const LS={get(k,d){try{const v=localStorage.getItem('vs4_'+k);return v===null?d:JSON.parse(v);}catch(e){return d;}},set(k,v){try{localStorage.setItem('vs4_'+k,JSON.stringify(v));}catch(e){}}};
let KIND=LS.get('aktiv',null);
const store={get:(k,d)=>LS.get((KIND||'x')+'_'+k,d),set:(k,v)=>LS.set((KIND||'x')+'_'+k,v)};
function kinder(){return LS.get('kinder',[]);}
function kindInfo(){return kinder().find(k=>k.id===KIND)||null;}
const KLEIN=()=>!!(kindInfo()&&kindInfo().klein);
const modul=m=>{stopp();location.href='../index.html?modul='+m+'&kind='+encodeURIComponent(KIND||'');};

/* Sterne */
function sterne(){return store.get('sterne',0);}
function addSterne(n){store.set('sterne',sterne()+n);zeigSterne();}
function zeigSterne(){$('#stars').textContent='⭐ '+sterne();const k=kindInfo();$('#kidBtn').textContent=k?k.emoji+' '+k.name:'';}

/* Fortschritt & Fehler */
function logFehler(frage,richtig,bereich){const f=store.get('fehler',[]);f.unshift({f:String(frage).slice(0,160),r:String(richtig),b:bereich,t:Date.now()});store.set('fehler',f.slice(0,60));}
function markDone(id,score,total){const d=store.get('done',{});const alt=d[id]||{best:0,n:0};d[id]={best:Math.max(alt.best,Math.round(score/total*100)),n:alt.n+1,t:Date.now()};store.set('done',d);}

/* Vorlesen – Gerätestimme, nochmal tippen = stopp */
let SPRICHT=null;
function stimme(lang){try{const vs=speechSynthesis.getVoices();const pre=lang==='en'?'en':'de';const sc=v=>(/natural|neural|premium|enhanced|siri/i.test(v.name)?8:0)+(/google/i.test(v.name)?5:0)+(v.lang.toLowerCase().replace('_','-')===(pre==='de'?'de-at':'en-gb')?3:0)+(/compact|espeak/i.test(v.name)?-6:0);return vs.filter(v=>v.lang.toLowerCase().startsWith(pre)).sort((a,b)=>sc(b)-sc(a))[0]||null;}catch(e){return null;}}
function stopp(){try{speechSynthesis.cancel();}catch(e){} if(SPRICHT){SPRICHT.classList.remove('an');SPRICHT=null;}}
function sprich(text,lang='de',btn){
  if(!('speechSynthesis' in window)) return;
  if(btn&&SPRICHT===btn){stopp();return;}
  stopp(); const t=String(text).replace(/<[^>]+>/g,' ').replace(/·/g,',').replace(/×/g,' mal ').replace(/:/g,' geteilt durch ').replace(/–|—/g,' minus ').replace(/\s+/g,' ').trim(); if(!t) return;
  const u=new SpeechSynthesisUtterance(t); const v=stimme(lang); if(v){u.voice=v;u.lang=v.lang;}else u.lang=lang==='en'?'en-GB':'de-AT'; u.rate=lang==='en'?.85:.92;
  if(btn){SPRICHT=btn;btn.classList.add('an');u.onend=u.onerror=()=>{if(SPRICHT===btn){btn.classList.remove('an');SPRICHT=null;}};}
  speechSynthesis.speak(u);
}
(function(){if(!('speechSynthesis' in window))return;let frei=false;const los=()=>{if(frei)return;frei=true;try{const u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u);}catch(e){}};['touchend','click'].forEach(e=>document.addEventListener(e,los,{capture:true,once:true}));try{speechSynthesis.getVoices();speechSynthesis.onvoiceschanged=()=>{};}catch(e){}})();
document.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(b){e.preventDefault();sprich(b.dataset.say,b.dataset.lang||'de',b);}});
const spk=(t,lang)=>('speechSynthesis' in window)?` <button class="spk" data-say="${esc(t)}" data-lang="${lang||'de'}" aria-label="Vorlesen">🔊</button>`:'';

/* Farben/Seiten */
function farbe(c){document.documentElement.style.setProperty('--fc',c);}
let AUF_HOME=false;
function seite(html,back){AUF_HOME=false;stopp();app.innerHTML=(back?'<button class="back">← Zurück</button>':'')+html;if(back)app.querySelector('.back').onclick=back;scrollTo(0,0);}
let KONTEXT=null;
const LOB=['Super! ⭐','Richtig! 🎉','Toll gemacht! 🌟','Genau! 👏','Bravo! 💪','Spitze! ✨'];

/* Ziffernblock statt Tastatur */
function ziffernblock(el,{onOk,max=7,komma=false}){
  let wert='';
  el.innerHTML=`<div class="anz"><div class="anzf" id="anzf">&nbsp;</div></div><div class="pad">${[1,2,3,4,5,6,7,8,9].map(n=>`<button data-n="${n}">${n}</button>`).join('')}<button class="del" data-n="del">⌫</button><button data-n="0">0</button><button class="ok" data-n="ok">Fertig ✓</button></div>`;
  const anz=el.querySelector('#anzf');
  const zeig=()=>anz.innerHTML=wert?fmt(wert):'&nbsp;';
  el.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{const n=b.dataset.n;if(n==='del')wert=wert.slice(0,-1);else if(n==='ok'){if(wert!=='')onOk(parseInt(wert,10));return;}else if(wert.length<max){wert=(wert==='0'?'':wert)+n;}zeig();});
  const key=e=>{if(!document.body.contains(anz)){removeEventListener('keydown',key);return;}if(/^\d$/.test(e.key)&&wert.length<max){wert+=e.key;zeig();}else if(e.key==='Backspace'){wert=wert.slice(0,-1);zeig();}else if(e.key==='Enter'&&wert!==''){onOk(parseInt(wert,10));}};
  addEventListener('keydown',key);
  return {reset(){wert='';zeig();}};
}

/* Multiple-Choice-Runde */
function mcRunde({id,titel,fragen,back,lang,nachher}){
  let i=0,score=0;
  const qs=fragen.map(q=>({...q,order:q.fix?q.o.map((t,idx)=>({t,idx})):shuffle(q.o.map((t,idx)=>({t,idx})))}));
  function show(){
    if(i>=qs.length) return ende(id,score,qs.length,back,()=>mcRunde({id,titel,fragen:nachher?nachher():shuffle(fragen),back,lang,nachher}));
    const q=qs[i]; KONTEXT=`Übung „${titel}“, Frage: ${q.q} (Antworten: ${q.o.join(' | ')}; richtig wäre: ${q.o[q.a]} – nicht sofort verraten, erst Tipps geben)`;
    seite(`<div class="card"><div class="progress"><div style="width:${i/qs.length*100}%"></div></div><div class="meta"><span>${esc(titel)}</span><span>Frage ${i+1} von ${qs.length}</span></div>
      ${q.bild||''}<div class="q">${esc(q.q)}${spk(q.sag||q.q,q.lang||lang)}</div>
      <div class="opts">${q.order.map((o,j)=>`<button class="opt" data-j="${j}">${esc(o.t)}</button>`).join('')}</div><div class="fb"></div>
      <div class="row" id="wr" style="display:none"><button class="btn" id="weiter">Weiter →</button></div></div>`,back);
    if(typeof hilfsmittel==='function') hilfsmittel(q.q);
    app.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
      const p=q.order[+b.dataset.j];const ok=p.idx===q.a;
      app.querySelectorAll('.opt').forEach(x=>{x.disabled=true;if(q.order[+x.dataset.j].idx===q.a)x.classList.add('right');});
      if(!ok){b.classList.add('wrong');logFehler(q.q,q.o[q.a],titel);}else{score++;addSterne(1);}
      const fb=app.querySelector('.fb');fb.className='fb '+(ok?'ok':'no');
      fb.innerHTML=(ok?pick(LOB):`Fast! Richtig ist: <b>${esc(q.o[q.a])}</b>`)+(q.e?`<div class="ex">💡 ${esc(q.e)}</div>`:'');
      $('#wr').style.display='flex';$('#weiter').onclick=()=>{i++;show();};
    });
  }
  show();
}

/* Eingabe-Runde (Zahlen) */
function zahlRunde({id,titel,gen,anzahl=10,back}){
  if(KLEIN()) anzahl=Math.min(anzahl,6);
  let i=0,score=0;
  function show(){
    if(i>=anzahl) return ende(id,score,anzahl,back,()=>zahlRunde({id,titel,gen,anzahl,back}));
    const t=gen(); let versuch=0;
    KONTEXT=`Rechenübung „${titel}“: ${t.q} (Ergebnis ${t.a} – nicht verraten, Rechenweg in kleinen Schritten erklären)`;
    seite(`<div class="card"><div class="progress"><div style="width:${i/anzahl*100}%"></div></div><div class="meta"><span>${esc(titel)}</span><span>Aufgabe ${i+1} von ${anzahl}</span></div>
      ${t.bild||''}<div class="q">${esc(t.q)}${spk(t.sag||t.q)}</div><div id="zb"></div><div class="fb"></div><div id="hl"></div>
      <div class="row" style="justify-content:center">${t.tipp||t.schritte?'<button class="btn soft" id="hb">🙋 Ich brauche Hilfe</button>':''}${KI?'<button class="btn ghost" id="eb">🦉 Erklär es mir</button>':''}</div>
      <div class="row" id="wr" style="display:none"><button class="btn" id="weiter">Weiter →</button></div></div>`,back);
    const fb=app.querySelector('.fb');
    if(typeof hilfsmittel==='function') hilfsmittel(t.q);
    let gezeigt=0;
    const hilfe=(alle)=>{const h=$('#hl');if(!h)return;
      if(!t.schritte){ if(!h.innerHTML) h.innerHTML=`<div class="help">🙋 ${t.tipp}</div>`; return; }
      gezeigt=alle?t.schritte.length:Math.max(gezeigt,1);
      const mal=()=>{h.innerHTML=`<div class="help">🙋 <b>Rechenweg – Schritt für Schritt</b>${t.bildHilfe||''}${t.schritte.slice(0,gezeigt).map((x,i)=>`<div class="step">${i+1}. ${x}</div>`).join('')}${gezeigt<t.schritte.length?'<div class="row" style="justify-content:center;margin-top:8px"><button class="btn" id="naechst">Nächster Schritt ➜</button></div>':''}</div>`;
        const nb=h.querySelector('#naechst'); if(nb) nb.onclick=()=>{gezeigt++;mal();};};
      mal(); const hb=$('#hb'); if(hb) hb.style.display='none';};
    if($('#hb'))$('#hb').onclick=()=>hilfe(); if($('#eb'))$('#eb').onclick=()=>eule('Kannst du mir bei dieser Aufgabe helfen? '+t.q);
    if(KLEIN()&&(t.tipp||t.schritte)) hilfe();
    const zb=ziffernblock($('#zb'),{max:9,onOk:v=>{
      if(v===t.a){ if(versuch===0){score++;addSterne(1);} fb.className='fb ok';fb.innerHTML=pick(LOB)+(t.e?`<div class="ex">💡 ${t.e}</div>`:'');$('#zb').style.pointerEvents='none';$('#wr').style.display='flex';$('#weiter').onclick=()=>{i++;show();};}
      else{versuch++; if(versuch<2){fb.className='fb no';fb.innerHTML='Noch nicht ganz – probier es noch einmal! 💪 Schau dir den Rechenweg an.';if(t.schritte||t.tipp)hilfe();zb.reset();}
        else{logFehler(t.q,t.a,titel);fb.className='fb no';fb.innerHTML=`Das Ergebnis ist <b>${fmt(t.a)}</b>.`+(t.e?`<div class="ex">💡 ${t.e}</div>`:'')+'<div class="ex">Das ist ganz normal – mit dem Rechenweg klappt es beim nächsten Mal leichter. 🌱</div>';if(t.schritte)hilfe(true);$('#zb').style.pointerEvents='none';$('#wr').style.display='flex';$('#weiter').onclick=()=>{i++;show();};}}
    }});
  }
  show();
}

function ende(id,score,total,back,nochmal){
  markDone(id,score,total); KONTEXT=null;
  const p=score/total; if(p===1){addSterne(3);konfetti();}
  seite(`<div class="card" style="text-align:center"><div style="font-size:4rem">${p===1?'🏆':p>=.7?'🌟':p>=.4?'👍':'💪'}</div>
    <h2>${score} von ${total} richtig</h2><p class="sub">${p===1?'Alles richtig! 3 Bonus-Sterne für dich!':p>=.7?'Sehr gut gemacht!':p>=.4?'Gut! Mit Übung wird es immer leichter.':'Nicht aufgeben – jedes Üben macht dein Gehirn stärker!'}</p>
    <div class="row" style="justify-content:center"><button class="btn" id="nochmal">🔁 Nochmal</button><button class="btn ghost" id="zur">Zur Übersicht</button></div></div>`);
  $('#nochmal').onclick=nochmal; $('#zur').onclick=back;
}
function konfetti(){const c=document.createElement('canvas');c.className='confetti';c.width=innerWidth;c.height=innerHeight;document.body.appendChild(c);const x=c.getContext('2d');const ps=[...Array(120)].map(()=>({x:Math.random()*c.width,y:-20-Math.random()*200,v:2+Math.random()*4,s:6+Math.random()*6,f:`hsl(${Math.random()*360},90%,60%)`,r:Math.random()*6}));let t=0;(function a(){x.clearRect(0,0,c.width,c.height);ps.forEach(p=>{p.y+=p.v;p.r+=.1;x.fillStyle=p.f;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);x.restore();});if(++t<160)requestAnimationFrame(a);else c.remove();})();}

/* Lern-Eule (KI im Hintergrund) */
let KI=null;
(async()=>{try{if(window.claude){KI=await window.claude.use('sample');}}catch(e){KI=null;} if(KI){ $('#eulenBtn').hidden=false; if(AUF_HOME&&typeof home==='function') home(); }})();
async function kiFrage(nachrichten){
  const k=kindInfo();
  const rahmen=`(Hinweis für dich, Lern-Eule: Du hilfst ${k?esc(k.name):'einem Kind'} aus der 4. Klasse Volksschule in Österreich. Sprich sehr einfach, freundlich und geduldig, kurze Sätze. Bei Rechnen: ganz kleine Schritte, mit Bildern aus dem Alltag (Äpfel, Geld, Finger), nie drängen, Mut machen. Verrate Lösungen von Übungen nicht sofort, sondern hilf mit Tipps. Österreichische Wörter (Jänner, Paradeiser) sind richtig.${KONTEXT?' Das Kind übt gerade: '+KONTEXT:''})`;
  const msgs=nachrichten.map((m,i)=>({role:m.role,content:i===0?rahmen+'\n\n'+m.content:m.content}));
  const r=await KI(msgs,{max_tokens:900}); return r.text;
}
function eule(start){
  if(!KI) return;
  const verlauf=store.get('chat',[]).slice(-12);
  const ov=document.createElement('div');ov.className='overlay';
  ov.innerHTML=`<div class="card"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><span style="font-size:2rem">🦉</span><h2 style="margin:0">Lern-Eule</h2><button class="btn ghost" style="margin-left:auto;padding:8px 14px" id="neu">🧹 Neu</button><button class="btn ghost" style="padding:8px 14px" id="zu">✕</button></div>
    <div class="msgs" id="msgs"></div><div class="chatin"><input id="ein" placeholder="Schreib deine Frage …" autocomplete="off"><button class="btn" id="send">Senden</button></div>
    <p class="ruhe" style="margin-top:6px">Die Lern-Eule ist eine KI und kann sich irren. Frag im Zweifel deine Lehrerin.</p></div>`;
  document.body.appendChild(ov);
  const box=ov.querySelector('#msgs');
  const male=()=>{box.innerHTML=(verlauf.length?'':`<div class="msg a">Hallo${kindInfo()?' '+esc(kindInfo().name):''}! 🦉 Was möchtest du wissen? Ich erkläre dir alles ganz in Ruhe.</div>`)+verlauf.map(m=>`<div class="msg ${m.role==='user'?'u':'a'}">${esc(m.content)}</div>`).join('');box.scrollTop=1e9;};
  male();
  const zu=()=>{ov.remove();stopp();};
  ov.querySelector('#zu').onclick=zu; ov.onclick=e=>{if(e.target===ov)zu();};
  ov.querySelector('#neu').onclick=()=>{verlauf.length=0;store.set('chat',[]);male();};
  const ein=ov.querySelector('#ein');
  const senden=async(text)=>{text=(text||ein.value).trim();if(!text)return;ein.value='';verlauf.push({role:'user',content:text});male();
    box.insertAdjacentHTML('beforeend','<div class="msg a" id="denkt"><span class="spinner">🦉 denkt nach …</span></div>');box.scrollTop=1e9;
    try{const a=await kiFrage(verlauf);verlauf.push({role:'assistant',content:a});store.set('chat',verlauf.slice(-12));male();
      const last=box.lastElementChild; if(last&&('speechSynthesis' in window)) last.insertAdjacentHTML('beforeend',` <button class="spk" data-say="${esc(a)}" aria-label="Vorlesen">🔊</button>`);}
    catch(e){const d=box.querySelector('#denkt');if(d)d.innerHTML='😕 Die Lern-Eule ist gerade nicht erreichbar. Probier es gleich nochmal.';}};
  ov.querySelector('#send').onclick=()=>senden(); ein.onkeydown=e=>{if(e.key==='Enter')senden();};
  if(start) senden(start); else setTimeout(()=>ein.focus(),100);
}
$('#eulenBtn').onclick=()=>eule();

/* Schwebender Zurück-Knopf */
(function(){const fab=$('#backFab');let t=false;const chk=()=>{t=false;const b=app.querySelector('.back');fab.classList.toggle('zeigen',!!b&&scrollY>240&&!document.querySelector('.overlay'));};
  addEventListener('scroll',()=>{if(!t){t=true;requestAnimationFrame(chk);}},{passive:true});new MutationObserver(chk).observe(app,{childList:true});
  fab.onclick=()=>{const b=app.querySelector('.back');fab.classList.remove('zeigen');if(b)b.click();};})();
