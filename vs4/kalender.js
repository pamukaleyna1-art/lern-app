/* ===== 📅 Kalender als Hilfsmittel ===== */
const MONATE=['Jänner','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
const WTAGE=['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'];
const tageImMonat=(j,m)=>new Date(j,m+1,0).getDate();
const KAL_RE=/woche|wochen|tag\b|tage|tagen|monat|monate|jahr|kalender|schaltjahr|montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|wochenende|jänner|januar|februar|märz|april|\bmai\b|juni|juli|august|september|oktober|november|dezember|gestern|morgen|übermorgen|vorgestern|datum/i;

function kalenderHTML(j,m,auswahl){
  const heute=new Date();const erster=(new Date(j,m,1).getDay()+6)%7;const n=tageImMonat(j,m);
  let zellen='';for(let i=0;i<erster;i++)zellen+='<span></span>';
  for(let d=1;d<=n;d++){const ist=heute.getFullYear()===j&&heute.getMonth()===m&&heute.getDate()===d;const wt=(erster+d-1)%7;const sel=auswahl.includes(d);const zw=auswahl.length===2&&d>Math.min(...auswahl)&&d<Math.max(...auswahl);
    zellen+=`<button class="kt${ist?' heute':''}${wt>=5?' we':''}${sel?' sel':''}${zw?' zw':''}" data-d="${d}">${d}</button>`;}
  return `<div class="kal"><div class="kalkopf"><button class="btn ghost" id="kvor">◀</button><b>${MONATE[m]} ${j}</b><button class="btn ghost" id="knach">▶</button></div>
    <div class="kalgrid">${WTAGE.map((w,i)=>`<span class="kw${i>=5?' we':''}">${w.slice(0,2)}</span>`).join('')}${zellen}</div></div>`;
}
function kalenderOeffnen(){
  const h=new Date();let j=h.getFullYear(),m=h.getMonth(),aus=[];
  const ov=document.createElement('div');ov.className='overlay';document.body.appendChild(ov);ov.onclick=e=>{if(e.target===ov)ov.remove();};
  const mal=()=>{
    let info='Tipp: Tippe auf <b>zwei Tage</b>, dann zähle ich für dich, wie viele Tage dazwischen liegen.';
    if(aus.length===1){const wt=WTAGE[(new Date(j,m,aus[0]).getDay()+6)%7];info=`Der ${aus[0]}. ${MONATE[m]} ist ein <b>${wt}</b>. Tippe noch einen zweiten Tag an.`;}
    if(aus.length===2){const a=Math.min(...aus),b=Math.max(...aus),d=b-a;info=`Vom ${a}. bis zum ${b}. ${MONATE[m]} sind es <b>${d} Tage</b>${d>=7?` – das sind ${Math.floor(d/7)} Woche${d>=14?'n':''}${d%7?` und ${d%7} Tag${d%7>1?'e':''}`:''}`:''}. 🗓️`;}
    ov.innerHTML=`<div class="card" style="overflow-y:auto"><div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><span style="font-size:2rem">📅</span><h2 style="margin:0">Kalender</h2><button class="btn ghost" style="margin-left:auto;padding:8px 14px" id="kzu">✕</button></div>
      ${kalenderHTML(j,m,aus)}<div class="learn" style="margin-top:10px">${info}</div>
      <details style="margin-top:10px"><summary style="font-weight:900;cursor:pointer">📖 Wichtig zu wissen</summary><div style="line-height:1.7;padding-top:6px">
        • 1 Woche = <b>7 Tage</b>: ${WTAGE.join(', ')}<br>• Samstag und Sonntag sind das <b>Wochenende</b><br>• 1 Jahr = <b>12 Monate</b> = 52 Wochen = <b>365 Tage</b> (Schaltjahr 366)<br>
        • Die Monate: ${MONATE.map((x,i)=>`${x} (${tageImMonat(2025,i)})`).join(', ')} – im Schaltjahr hat der Februar 29 Tage.<br>
        • ✊ <b>Knöchel-Trick:</b> Zähl die Monate an deinen Knöcheln ab – Knöchel = 31 Tage, Lücke = 30 Tage (Februar: 28/29).</div></details></div>`;
    ov.querySelector('#kzu').onclick=()=>ov.remove();
    ov.querySelector('#kvor').onclick=()=>{m--;if(m<0){m=11;j--;}aus=[];mal();};
    ov.querySelector('#knach').onclick=()=>{m++;if(m>11){m=0;j++;}aus=[];mal();};
    ov.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{const d=+b.dataset.d;if(aus.length>=2)aus=[];if(aus.includes(d))aus=aus.filter(x=>x!==d);else aus.push(d);mal();});
  };
  mal();
}
/* Kalender-Knopf automatisch einblenden, wenn es um Tage, Wochen oder Monate geht */
function hilfsmittel(text){
  if(!KAL_RE.test(text||'')) return;
  const card=app.querySelector('.card'); if(!card||card.querySelector('#kalBtn')) return;
  const row=card.querySelector('.fb'); const b=document.createElement('div');b.className='row';b.style.justifyContent='center';
  b.innerHTML='<button class="btn soft" id="kalBtn">📅 Kalender als Hilfe</button>';
  row.parentNode.insertBefore(b,row); b.querySelector('#kalBtn').onclick=kalenderOeffnen;
}
function kalenderSeite(){
  farbe('var(--sach)');KONTEXT='Kalender: Tage, Wochen, Monate, Jahr';
  seite(`<h1>📅 Kalender</h1><p class="sub">Wie viele Tage hat ein Monat? Welcher Tag ist heute? Schau nach – und übe danach.</p>
    <div class="row" style="margin:0 0 12px"><button class="btn" id="kauf">📅 Kalender öffnen</button><button class="btn ghost" id="kueb">✏️ Kalender-Quiz</button></div>
    <div class="card"><h2>Heute</h2><p style="font-size:1.3rem;font-weight:800">${(()=>{const h=new Date();return `${WTAGE[(h.getDay()+6)%7]}, ${h.getDate()}. ${MONATE[h.getMonth()]} ${h.getFullYear()}`;})()}</p></div>`,()=>fachMenue('sach'));
  $('#kauf').onclick=kalenderOeffnen;
  $('#kueb').onclick=()=>{const t=SACH.find(x=>x.id==='s-kalender');mcRunde({id:t.id,titel:t.name,fragen:themaFragen(t),nachher:()=>themaFragen(t),back:kalenderSeite});nachschub(t,'Sachunterricht');};
}
