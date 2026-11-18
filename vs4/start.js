/* ===== Start: Profile, Startseite, Fächer ===== */
const EMOJIS=['🦊','🐼','🦄','🐱','🐶','🐸','🦁','🐰','🐧','🐢','🦋','🌸','⭐','🌈','⚽','🎨'];
const FARBEN=['#ccfbf1','#fde68a','#fbcfe8','#ddd6fe','#bfdbfe','#bbf7d0','#fed7aa'];

function profilWahl(){
  farbe('var(--teal)');$('#eulenBtn').style.display='none';
  const ks=kinder();
  seite(`<h1>Hallo! 👋</h1><p class="sub">Wer lernt heute?</p>
    <div class="profs">${ks.map((k,i)=>`<button class="prof" data-id="${k.id}" style="--pc:${FARBEN[i%FARBEN.length]}"><span class="av">${k.emoji}</span>${esc(k.name)}</button>`).join('')}
    <button class="prof neu" id="neuK"><span class="av" style="background:#f1f5f9">➕</span>Neues Kind</button></div>
    ${ks.length?'<p class="ruhe">Jedes Kind hat seine eigenen Sterne und seinen eigenen Fortschritt.</p>':''}`);
  app.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>{KIND=b.dataset.id;LS.set('aktiv',KIND);zeigSterne();home();});
  $('#neuK').onclick=neuesKind;
}
function neuesKind(){
  let em=EMOJIS[0];
  seite(`<h1>Neues Kind</h1><p class="sub">Wie heißt du? (Der Vorname reicht.)</p><input class="txt" id="nm" maxlength="16" placeholder="Vorname">
    <p class="sub" style="margin-top:16px">Such dir ein Bild aus:</p><div class="emos">${EMOJIS.map((e,i)=>`<button data-e="${e}" class="${i?'':'sel'}">${e}</button>`).join('')}</div>
    <div class="row"><button class="btn" id="ok">Los geht's! 🚀</button></div>`,profilWahl);
  app.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{em=b.dataset.e;app.querySelectorAll('[data-e]').forEach(x=>x.classList.toggle('sel',x===b));});
  $('#ok').onclick=()=>{const n=$('#nm').value.trim();if(!n){$('#nm').focus();return;}const ks=kinder();const id='k'+Date.now().toString(36);ks.push({id,name:n,emoji:em});LS.set('kinder',ks);KIND=id;LS.set('aktiv',id);zeigSterne();home();};
  setTimeout(()=>{const n=$('#nm');if(n)n.focus();},100);
}

function home(){
  if(!KIND||!kindInfo()) return profilWahl();
  farbe('var(--teal)');KONTEXT=null;$('#eulenBtn').style.display='';zeigSterne();
  const k=kindInfo();const f=store.get('fehler',[]).length;
  seite(`<h1>Hallo ${esc(k.name)}! ${k.emoji}</h1><p class="sub">Was möchtest du heute üben? Für jede richtige Antwort bekommst du einen ⭐.</p>
    <div class="grid">
      <button class="tile wide" style="--c:linear-gradient(135deg,#f97316,#fb923c)" data-go="werkstatt"><span class="em">🧮</span><span><b>Rechen-Werkstatt</b><br><small>Rechnen verstehen – Schritt für Schritt, mit Bildern und ohne Zeitdruck</small></span></button>
      <button class="tile" style="--c:#ef4444" data-go="mathe"><span class="em">📐</span><b>Mathematik</b><small>4. Klasse</small></button>
      <button class="tile" style="--c:#8b5cf6" data-go="deutsch"><span class="em">📝</span><b>Deutsch</b><small>Wortarten, Zeiten, Rechtschreibung</small></button>
      <button class="tile" style="--c:#16a34a" data-go="sach"><span class="em">🌍</span><b>Sachunterricht</b><small>Österreich, Körper, Natur</small></button>
      <button class="tile" style="--c:#0ea5e9" data-go="englisch"><span class="em">🇬🇧</span><b>Englisch</b><small>Wörter hören & lernen</small></button>
      ${f?`<button class="tile" style="--c:#e11d48" data-go="fehler"><span class="em">🔁</span><b>Fehler üben</b><small>${f} Aufgaben zum Wiederholen</small></button>`:''}
      ${KI?`<button class="tile" style="--c:linear-gradient(135deg,#a855f7,#ec4899)" data-go="eule"><span class="em">🦉</span><b>Lern-Eule</b><small>Frag alles, was du wissen willst</small></button>`:''}
    </div>
    <div class="row" style="justify-content:center;margin-top:24px"><button class="btn ghost" id="wechsel">👥 Kind wechseln</button><button class="btn ghost" id="erw">🔒 Für Erwachsene</button></div>`);
  AUF_HOME=true;
  app.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>({werkstatt:werkstattMenue,mathe:matheMenue,deutsch:()=>fachMenue('deutsch'),sach:()=>fachMenue('sach'),englisch:englischMenue,fehler:fehlerUeben,eule:()=>eule()})[b.dataset.go]());
  $('#wechsel').onclick=profilWahl; $('#erw').onclick=erwachsene;
}
$('#homeBtn').onclick=()=>home(); $('#kidBtn').onclick=profilWahl;

function matheMenue(){
  farbe('var(--mathe)');KONTEXT='Mathematik 4. Klasse Volksschule';const d=store.get('done',{});
  seite(`<h1>📐 Mathematik</h1><p class="sub">Die Aufgaben sind jedes Mal neu. Tipp: Wenn etwas schwer ist, geh in die <b>Rechen-Werkstatt</b> 🧮.</p><div class="list">${MATHE.map(m=>m.h?`<div class="hdr">${m.h}</div>`:`<button class="item" data-id="${m.id}"><span class="em">${m.em}</span><span><b>${m.name}</b><small>${d[m.id]?'Bestes Ergebnis: '+d[m.id].best+' %':'10 Aufgaben'}</small></span></button>`).join('')}</div>`,home);
  app.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>{const m=MATHE.find(x=>x.id===b.dataset.id);zahlRunde({id:m.id,titel:m.name,gen:()=>m.gen.call(m),anzahl:10,back:matheMenue});});
}
function fachMenue(fach){
  const T=fach==='deutsch'?DEUTSCH:SACH;farbe(fach==='deutsch'?'var(--deutsch)':'var(--sach)');KONTEXT=fach==='deutsch'?'Deutsch 4. Klasse Volksschule':'Sachunterricht 4. Klasse Volksschule';const d=store.get('done',{});
  seite(`<h1>${fach==='deutsch'?'📝 Deutsch':'🌍 Sachunterricht'}</h1><p class="sub">Jedes Mal kommen andere Fragen dran${KI?' – und die Lern-Eule denkt sich laufend neue aus':''}.</p>
    <div class="list">${T.map(t=>`<button class="item" data-id="${t.id}"><span class="em">${t.em}</span><span><b>${t.name}</b><small>${d[t.id]?'Bestes Ergebnis: '+d[t.id].best+' %':'8 Fragen'}</small></span></button>`).join('')}</div>`,home);
  app.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>{const t=T.find(x=>x.id===b.dataset.id);const back=()=>fachMenue(fach);
    if(t.artikel){const gen=()=>shuffle(ARTIKEL4).slice(0,10).map(([w,g,em])=>({q:`${em?em+' ':''}___ ${w}`,sag:w,o:['der','die','das'],a:['der','die','das'].indexOf(g),fix:true,e:artikelErkl(w,g)}));
      return mcRunde({id:t.id,titel:t.name,fragen:gen(),nachher:gen,back});}
    mcRunde({id:t.id,titel:t.name,fragen:themaFragen(t),nachher:()=>themaFragen(t),back});nachschub(t,fach==='deutsch'?'Deutsch':'Sachunterricht');});
}
function englischMenue(){
  farbe('var(--englisch)');KONTEXT='Englisch 4. Klasse Volksschule (Wörter)';const d=store.get('done',{});
  seite(`<h1>🇬🇧 Englisch</h1><p class="sub">Tippe auf 🔊, dann hörst du das Wort auf Englisch.</p>
    <div class="list">${ENGLISCH.map(t=>`<button class="item" data-id="${t.id}"><span class="em">${t.em}</span><span><b>${t.name}</b><small>${t.w.slice(0,4).map(x=>x[0]).join(', ')} …${d[t.id]?' · Bestes: '+d[t.id].best+' %':''}</small></span><span class="lvl">📖</span></button>`).join('')}</div>`,home);
  app.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>englischThema(ENGLISCH.find(x=>x.id===b.dataset.id)));
}
function englischThema(t){
  seite(`<h1>${t.em} ${t.name}</h1><p class="sub">Schau dir die Wörter an und hör sie dir an. Dann geht's los!</p>
    <div class="list">${t.w.map(([en,de,em])=>`<button class="item" data-say="${esc(en)}" data-lang="en"><span class="em">${em}</span><span><b>${esc(en)}</b><small>${esc(de)}</small></span><span class="lvl">🔊</span></button>`).join('')}</div>
    <div class="row"><button class="btn" id="los">✏️ Jetzt üben</button></div>`,englischMenue);
  $('#los').onclick=()=>mcRunde({id:t.id,titel:t.name,fragen:englischFragen(t),nachher:()=>englischFragen(t),back:()=>englischThema(t)});
}
function fehlerUeben(){
  farbe('#e11d48');const f=store.get('fehler',[]);
  seite(`<h1>🔁 Fehler üben</h1><p class="sub">Diese Aufgaben waren knifflig. Schau sie dir noch einmal in Ruhe an – und tipp auf „Gekonnt!“, wenn du es jetzt weißt.</p>
    <div class="list">${f.slice(0,20).map((x,i)=>`<div class="item" style="flex-wrap:wrap"><span class="em">❓</span><span style="flex:1"><b>${esc(x.f)}</b><small>${esc(x.b)} · Lösung: <span class="lsg" style="filter:blur(6px)">${esc(fmt(x.r))}</span></small></span><button class="btn ghost" data-z="${i}" style="padding:8px 12px">👀 Zeigen</button><button class="btn" data-ok="${i}" style="padding:8px 12px">Gekonnt!</button></div>`).join('')||'<p class="sub">Keine Fehler – super! 🎉</p>'}</div>`,home);
  app.querySelectorAll('[data-z]').forEach(b=>b.onclick=()=>{b.parentElement.querySelector('.lsg').style.filter='none';});
  app.querySelectorAll('[data-ok]').forEach(b=>b.onclick=()=>{const l=store.get('fehler',[]);l.splice(+b.dataset.ok,1);store.set('fehler',l);addSterne(1);fehlerUeben();});
}
function erwachsene(){
  const pin=LS.get('pin',null);
  const offen=()=>{
    const ks=kinder();
    seite(`<h1>🔒 Für Erwachsene</h1>
      ${ks.map(k=>{const g=(key,d)=>LS.get(k.id+'_'+key,d);const done=g('done',{});const ws=WERKSTATT.map(m=>{const s=g('ws_'+m.id,{s:0});return `${m.em} ${m.name}: Stufe ${s.s+1}/${m.stufen.length}`;}).join('<br>');
        return `<div class="card"><h2>${k.emoji} ${esc(k.name)}</h2><p class="sub">⭐ ${g('sterne',0)} Sterne · ${Object.keys(done).length} Übungen gemacht · ${g('fehler',[]).length} offene Fehler</p>
        <div class="learn"><b>Rechen-Werkstatt:</b><br>${ws}</div>
        <div class="row"><button class="btn ghost" data-del="${k.id}">🗑️ Profil löschen</button></div></div>`;}).join('')}
      <div class="card"><h2>💡 Hinweise</h2><p style="line-height:1.6">Die <b>Rechen-Werkstatt</b> passt sich an: 5 richtige Antworten hintereinander (ohne Hilfe) → nächste Stufe. 3 Fehler → zurück zur leichteren Stufe. Es gibt keinen Zeitdruck. Kurze, regelmäßige Einheiten (10–15 Minuten täglich) bringen mehr als lange.</p>
      <p style="line-height:1.6">Alle Daten bleiben nur auf diesem Gerät.</p></div>
      <div class="row"><button class="btn ghost" id="pinNeu">🔑 PIN ${pin?'ändern':'festlegen'}</button></div>`,home);
    app.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{const k=kinder().find(x=>x.id===b.dataset.del);if(!confirm(`Profil von ${k.name} mit allem Fortschritt löschen?`))return;LS.set('kinder',kinder().filter(x=>x.id!==k.id));Object.keys(localStorage).filter(x=>x.startsWith('vs4_'+k.id+'_')).forEach(x=>localStorage.removeItem(x));if(KIND===k.id){KIND=null;LS.set('aktiv',null);}offen();});
    $('#pinNeu').onclick=()=>{const p=prompt('Neue PIN (4 Ziffern):');if(p&&/^\d{4}$/.test(p)){LS.set('pin',p);alert('PIN gespeichert.');}};
  };
  if(!pin) return offen();
  seite(`<h1>🔒 Für Erwachsene</h1><p class="sub">Bitte PIN eingeben.</p><div id="pz"></div><div class="fb"></div>`,home);
  ziffernblock($('#pz'),{max:4,onOk:v=>{if(String(v).padStart(4,'0')===pin)offen();else{const f=app.querySelector('.fb');f.className='fb no';f.textContent='Falsche PIN.';}}});
}

zeigSterne();
if(KIND&&kindInfo()) home(); else profilWahl();
