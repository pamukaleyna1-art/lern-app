/* ===== Rechen-Werkstatt: in kleinen Schritten, mit Bildern, ohne Zeitdruck ===== */

/* --- Bilder --- */
function zfeld(rot,blau=0,weg=0){ // ein Zehnerfeld: rot gefüllt, dann blau, "weg" = durchgestrichen (von hinten)
  let h='';for(let k=0;k<10;k++){let c='';if(k<rot)c=(k>=rot-weg)?'x':'r';else if(k<rot+blau)c='b';h+=`<i class="${c}"></i>`;}
  return `<div class="zf">${h}</div>`;
}
function felder(n,farbeB=0,weg=0){ // n Punkte rot, danach farbeB blau, über mehrere Zehnerfelder
  let out='',r=n,b=farbeB,w=weg;const total=n+farbeB;const frames=Math.max(1,Math.ceil(total/10));
  for(let f=0;f<frames;f++){const hierR=Math.min(10,r);r-=hierR;const hierB=Math.min(10-hierR,b);b-=hierB;out+=zfeld(hierR,hierB,0);}
  if(w){ // durchstreichen von hinten über die Felder
    const tmp=document.createElement('div');tmp.innerHTML=out;const dots=[...tmp.querySelectorAll('i.r')];dots.slice(-w).forEach(d=>d.className='x');out=tmp.innerHTML;}
  return `<div class="vis">${out}</div>`;
}
function bloecke(n){ // Hunderterplatten, Zehnerstangen, Einerwürfel
  const h=Math.floor(n/100),z=Math.floor(n%100/10),e=n%10;
  const platte=`<div class="platte">${'<i></i>'.repeat(100)}</div>`, stange=`<div class="stange">${'<i></i>'.repeat(10)}</div>`;
  return `<div class="vis"><div class="bl">${platte.repeat(h)}</div><div class="bl">${stange.repeat(z)}</div><div class="wcol">${'<span class="wuerfel"></span>'.repeat(e)}</div></div>`;
}
function punktfeld(r,c,teil=0){ // r Reihen à c Punkte; die ersten "teil" Reihen in Lila
  let h='';for(let i=0;i<r;i++)for(let j=0;j<c;j++)h+=`<i class="${i<teil?'b2':''}"></i>`;
  return `<div class="vis"><div class="feld" style="grid-template-columns:repeat(${c},20px)">${h}</div></div>`;
}
function zahlenstrahl(min,max,{gross,klein,pfeil,labelAlle=false}){
  const W=640,L=30,R=610,y=60,x=v=>L+(v-min)/(max-min)*(R-L);let s='';
  for(let v=min;v<=max;v+=klein){const g=(v-min)%gross===0;s+=`<line x1="${x(v)}" x2="${x(v)}" y1="${y-(g?14:7)}" y2="${y+(g?14:7)}" stroke="#334155" stroke-width="${g?3:1.5}"/>`;if(g||labelAlle)s+=`<text x="${x(v)}" y="${y+36}" font-size="${g?18:13}" font-weight="800" text-anchor="middle" fill="#334155">${fmt(v)}</text>`;}
  if(pfeil!=null) s+=`<path d="M${x(pfeil)} ${y-18} l-9 -18 h18 z" fill="#ef4444"/><text x="${x(pfeil)}" y="${y-42}" font-size="22" font-weight="900" text-anchor="middle" fill="#ef4444">?</text>`;
  return `<svg class="zs" viewBox="0 0 ${W} 110"><line x1="${L-10}" x2="${R+10}" y1="${y}" y2="${y}" stroke="#334155" stroke-width="3"/>${s}</svg>`;
}
function stellentafel(stellen,werte,leer=false){
  const farben={M:'#7c3aed',HT:'#db2777',ZT:'#0891b2',T:'#7c3aed',H:'#16a34a',Z:'#ea580c',E:'#2563eb'};
  return `<table class="st"><tr>${stellen.map(s=>`<th style="background:${farben[s]}">${s}</th>`).join('')}</tr><tr>${werte.map(w=>`<td>${leer&&w==='?'?'?':w}</td>`).join('')}</tr></table>`;
}
function tellerBild(teller,proTeller,emoji='🍪'){return `<div class="vis">${Array.from({length:teller},()=>`<div class="teller">${emoji.repeat(proTeller)}</div>`).join('')}</div>`;}
function haufen(n,emoji='🍪'){return `<div class="vis" style="max-width:420px;margin:8px auto;font-size:1.6rem;gap:4px">${emoji.repeat(n)}</div>`;}
const wahl3=(a,min=0,spr=[1,2])=>{const s=new Set([a]);let t=0;while(s.size<3&&t++<50){const d=pick(spr)*(Math.random()<.5?-1:1);if(a+d>=min)s.add(a+d);}return shuffle([...s]);};

/* --- Module mit Stufen --- */
const WERKSTATT=[
{id:'mengen',em:'🔴',name:'Mengen auf einen Blick',kurz:'Wie viele sind es? Ohne einzeln zu zählen',stufen:[
  {name:'bis 10',gen(){const n=rnd(1,10);return{q:'Wie viele Punkte siehst du?',bild:felder(n),art:'wahl',o:wahl3(n,1),a:n,hilfe:'Eine volle Reihe im Feld sind <b>5</b>. Das ganze Feld sind <b>10</b>. Schau: Ist die obere Reihe voll? Dann sind es schon 5 – und dann zähle nur noch unten weiter.',loes:`Es sind <b>${n}</b>.${n>5?` Oben 5, unten ${n-5} → 5 + ${n-5} = ${n}.`:''}`};}},
  {name:'bis 20',gen(){const n=rnd(11,20);return{q:'Wie viele Punkte sind es?',bild:felder(n),art:'wahl',o:wahl3(n,10),a:n,hilfe:'Ein volles Feld sind <b>10</b>. Das zweite Feld: Ist eine Reihe voll? Das sind 5 mehr.',loes:`Ein volles Feld = 10, dazu ${n-10} → <b>${n}</b>.`};}},
  {name:'bis 100',gen(){const n=rnd(2,9)*10+rnd(0,9);return{q:'Welche Zahl zeigen die Stangen und Würfel?',bild:bloecke(n),art:'wahl',o:wahl3(n,10,[1,10]),a:n,hilfe:'Jede orange <b>Stange</b> ist ein <b>Zehner</b> (10). Zähle in Zehnerschritten: 10, 20, 30 … Dann zählst du die blauen <b>Würfel</b> (Einer) dazu.',loes:`${Math.floor(n/10)} Stangen = ${Math.floor(n/10)*10}, dazu ${n%10} Würfel → <b>${n}</b>.`};}}
]},
{id:'strahl',em:'📏',name:'Zahlenstrahl',kurz:'Wo wohnt die Zahl?',stufen:[
  {name:'bis 20',gen(){const n=rnd(1,19);return{q:'Welche Zahl zeigt der rote Pfeil?',bild:zahlenstrahl(0,20,{gross:5,klein:1,pfeil:n}),art:'wahl',o:wahl3(n,0),a:n,hilfe:'Such die nächste <b>beschriftete</b> Zahl (0, 5, 10, 15, 20). Zähle von dort die kleinen Striche bis zum Pfeil.',loes:`Der Pfeil zeigt auf <b>${n}</b>.`};}},
  {name:'bis 100 (Zehner)',gen(){const n=rnd(1,19)*5;return{q:'Welche Zahl zeigt der Pfeil?',bild:zahlenstrahl(0,100,{gross:10,klein:5,pfeil:n}),art:'wahl',o:wahl3(n,0,[5,10]),a:n,hilfe:'Die großen Striche sind die <b>Zehner</b>: 10, 20, 30 … Ein kleiner Strich genau in der Mitte ist die <b>5</b> dazwischen.',loes:`Der Pfeil zeigt auf <b>${n}</b>.`};}},
  {name:'bis 100 genau',gen(){const z=rnd(0,8)*10;const lo=z,n=lo+rnd(1,9);return{q:'Welche Zahl zeigt der Pfeil?',bild:zahlenstrahl(lo,lo+20,{gross:5,klein:1,pfeil:n}),art:'wahl',o:wahl3(n,0),a:n,hilfe:`Hier siehst du nur einen Teil des Zahlenstrahls: von <b>${lo}</b> bis <b>${lo+20}</b>. Such die nächste beschriftete Zahl und zähle die kleinen Striche.`,loes:`Der Pfeil zeigt auf <b>${n}</b>.`};}},
  {name:'bis 1000',gen(){const n=rnd(1,19)*50;return{q:'Welche Zahl zeigt der Pfeil?',bild:zahlenstrahl(0,1000,{gross:100,klein:50,pfeil:n}),art:'wahl',o:wahl3(n,0,[50,100]),a:n,hilfe:'Die großen Striche sind die <b>Hunderter</b>: 100, 200, 300 … Der kleine Strich in der Mitte ist die <b>Hälfte</b> dazwischen, zum Beispiel 250.',loes:`Der Pfeil zeigt auf <b>${fmt(n)}</b>.`};}}
]},
{id:'vergleich',em:'⚖️',name:'Größer, kleiner, Nachbarn',kurz:'Zahlen vergleichen und ordnen',stufen:[
  {name:'bis 20',gen(){let a=rnd(2,20),b=rnd(2,20);while(b===a)b=rnd(2,20);return{q:'Welche Zahl ist größer?',bild:`<div class="vis" style="gap:30px"><div style="text-align:center"><div style="font-size:2rem;font-weight:900">${a}</div>${felder(a).replace('class="vis"','class="vis" style="flex-direction:column"')}</div><div style="text-align:center"><div style="font-size:2rem;font-weight:900">${b}</div>${felder(b).replace('class="vis"','class="vis" style="flex-direction:column"')}</div></div>`,art:'wahl',o:[a,b],fix:true,a:Math.max(a,b),hilfe:'Schau auf die Bilder: Wo sind <b>mehr</b> Punkte? Die Zahl mit mehr Punkten ist größer.',loes:`<b>${Math.max(a,b)}</b> ist größer als ${Math.min(a,b)}.`};}},
  {name:'Nachbarn bis 100',gen(){const n=rnd(11,98);const vor=Math.random()<.5;return{q:vor?`Welche Zahl kommt direkt VOR ${n}?`:`Welche Zahl kommt direkt NACH ${n}?`,bild:zahlenstrahl(n-5,n+5,{gross:1,klein:1,labelAlle:true}),art:'zahl',a:vor?n-1:n+1,hilfe:vor?'Der Vorgänger ist immer <b>1 weniger</b>. Auf dem Zahlenstrahl: ein Schritt nach <b>links</b>.':'Der Nachfolger ist immer <b>1 mehr</b>. Auf dem Zahlenstrahl: ein Schritt nach <b>rechts</b>.',loes:vor?`${n} − 1 = <b>${n-1}</b>`:`${n} + 1 = <b>${n+1}</b>`};}},
  {name:'bis 1000',gen(){const h=rnd(1,9),z=rnd(0,9),e=rnd(0,9);let a=h*100+z*10+e;let b=pick([h*100+e*10+z,(h)*100+z*10+((e+rnd(1,8))%10),((h%9)+1)*100+z*10+e]);if(b===a)b=a+10;return{q:`Welche Zahl ist größer?`,art:'wahl',o:[a,b],fix:true,a:Math.max(a,b),bild:stellentafel(['H','Z','E'],String(a).split(''))+stellentafel(['H','Z','E'],String(b).split('')),hilfe:'Vergleiche zuerst die <b>Hunderter</b>. Sind sie gleich, dann die <b>Zehner</b>. Sind die auch gleich, dann die <b>Einer</b>.',loes:`<b>${Math.max(a,b)}</b> ist größer.`};}},
  {name:'Nachbarzehner',gen(){const n=rnd(11,99);if(n%10===0)return this.gen();const klein=Math.random()<.5;return{q:klein?`${n} liegt zwischen zwei Zehnern. Welcher ist der KLEINERE Zehner?`:`${n} liegt zwischen zwei Zehnern. Welcher ist der GRÖSSERE Zehner?`,bild:zahlenstrahl(Math.floor(n/10)*10-10,Math.floor(n/10)*10+20,{gross:10,klein:1,pfeil:n}),art:'zahl',a:klein?Math.floor(n/10)*10:Math.floor(n/10)*10+10,hilfe:`Schau auf den Zehner in der Zahl: In ${n} stecken <b>${Math.floor(n/10)} Zehner</b>. Das ist ${Math.floor(n/10)*10}. Der nächste Zehner ist 10 mehr.`,loes:`${n} liegt zwischen ${Math.floor(n/10)*10} und ${Math.floor(n/10)*10+10}.`};}}
]},
{id:'zerlegen',em:'💞',name:'Zerlegen & Verliebte Zahlen',kurz:'Was fehlt bis 10, bis 20, bis 100?',stufen:[
  {name:'bis 10',gen(){const n=rnd(1,9);return{q:`${n} + ? = 10`,sag:`${n} plus wie viel ist 10?`,bild:`<div class="vis">${zfeld(n)}</div>`,art:'zahl',a:10-n,hilfe:'Zähle die <b>leeren</b> Kreise im Feld. So viele fehlen bis 10.',loes:`${n} + <b>${10-n}</b> = 10. Das sind „verliebte Zahlen“: zusammen immer 10!`};}},
  {name:'Zahlen zerlegen',gen(){const t=rnd(4,10),a=rnd(1,t-1);return{q:`${t} = ${a} + ?`,sag:`${t} ist ${a} plus wie viel?`,bild:`<div class="vis">${zfeld(a,t-a)}</div>`,art:'zahl',a:t-a,hilfe:`Rot sind ${a}. Zähle die <b>blauen</b> Punkte.`,loes:`${t} = ${a} + <b>${t-a}</b>`};}},
  {name:'bis 20',gen(){const n=rnd(11,19);return Math.random()<.5?{q:`10 + ? = ${n}`,sag:`10 plus wie viel ist ${n}?`,bild:felder(10,n-10),art:'zahl',a:n-10,hilfe:'Ein volles Feld sind 10. Wie viele Punkte sind im zweiten Feld?',loes:`10 + <b>${n-10}</b> = ${n}`}:(()=>{const a=rnd(11,19),z=20;return{q:`${a} + ? = 20`,sag:`${a} plus wie viel ist 20?`,bild:felder(a),art:'zahl',a:z-a,hilfe:'Zähle die leeren Kreise im zweiten Feld.',loes:`${a} + <b>${z-a}</b> = 20`};})();}},
  {name:'Zehner bis 100',gen(){const n=rnd(1,9)*10;return{q:`${n} + ? = 100`,sag:`${n} plus wie viel ist 100?`,bild:bloecke(n),art:'zahl',a:100-n,hilfe:`Das ist wie bei 10! ${n/10} + ${10-n/10} = 10 – also ${n} + ${100-n} = 100. Du rechnest einfach mit Zehnern.`,loes:`${n} + <b>${100-n}</b> = 100`};}},
  {name:'beliebig bis 100',gen(){const n=rnd(11,89);if(n%10===0)return this.gen();const zum=Math.ceil(n/10)*10;return{q:`${n} + ? = 100`,sag:`${n} plus wie viel ist 100?`,bild:zahlenstrahl(Math.floor(n/10)*10,100,{gross:10,klein:1,pfeil:n}),art:'zahl',a:100-n,hilfe:`Zwei kleine Schritte:<div class="step">1️⃣ ${n} + <b>${zum-n}</b> = ${zum} (bis zum nächsten Zehner)</div><div class="step">2️⃣ ${zum} + <b>${100-zum}</b> = 100</div>Jetzt zähle beide zusammen: ${zum-n} + ${100-zum}.`,loes:`${zum-n} + ${100-zum} = <b>${100-n}</b>. Also ${n} + ${100-n} = 100.`};}}
]},
{id:'plusminus',em:'➕',name:'Plus & Minus',kurz:'Mit Zehnerübergang – Schritt für Schritt',stufen:[
  {name:'Plus bis 10',gen(){const a=rnd(1,8),b=rnd(1,10-a);return{q:`${a} + ${b} = ?`,bild:`<div class="vis">${zfeld(a,b)}</div>`,art:'zahl',a:a+b,hilfe:`Rot sind ${a}, blau sind ${b}. Wie viele sind es zusammen? Tipp: Ist die obere Reihe voll, sind es schon 5.`,loes:`${a} + ${b} = <b>${a+b}</b>`};}},
  {name:'Minus bis 10',gen(){const a=rnd(3,10),b=rnd(1,a-1);return{q:`${a} − ${b} = ?`,sag:`${a} minus ${b}`,bild:`<div class="vis">${(()=>{let h='';for(let k=0;k<10;k++)h+=`<i class="${k<a-b?'r':k<a?'x':''}"></i>`;return `<div class="zf">${h}</div>`;})()}</div>`,art:'zahl',a:a-b,hilfe:`Die durchgestrichenen ${b} Punkte nimmst du weg. Wie viele <b>rote</b> bleiben übrig?`,loes:`${a} − ${b} = <b>${a-b}</b>`};}},
  {name:'Plus über die 10',gen(){const a=rnd(6,9),b=rnd(11-a,9);const r=10-a;return{q:`${a} + ${b} = ?`,bild:felder(a,b),art:'zahl',a:a+b,hilfe:`Mach zuerst die <b>10 voll</b>!<div class="step">1️⃣ ${a} + <b>${r}</b> = 10</div><div class="step">2️⃣ Von ${b} sind noch <b>${b-r}</b> übrig: 10 + ${b-r} = ?</div>`,loes:`${a} + ${r} = 10, dann 10 + ${b-r} = <b>${a+b}</b>`};}},
  {name:'Minus über die 10',gen(){const a=rnd(11,18),e=a-10,b=rnd(e+1,9);return{q:`${a} − ${b} = ?`,sag:`${a} minus ${b}`,bild:felder(a,0,b),art:'zahl',a:a-b,hilfe:`Zuerst <b>bis zur 10</b> zurück!<div class="step">1️⃣ ${a} − <b>${e}</b> = 10</div><div class="step">2️⃣ Von ${b} sind noch <b>${b-e}</b> übrig: 10 − ${b-e} = ?</div>`,loes:`${a} − ${e} = 10, dann 10 − ${b-e} = <b>${a-b}</b>`};}},
  {name:'Zweistellig + Einer',gen(){const z=rnd(1,8),e=rnd(3,9),b=rnd(10-e,9),a=z*10+e;const r=10-e;return{q:`${a} + ${b} = ?`,bild:zahlenstrahl(z*10,z*10+20,{gross:5,klein:1,pfeil:a}),art:'zahl',a:a+b,hilfe:`Wie bei der 10 – nur mit dem nächsten Zehner:<div class="step">1️⃣ ${a} + <b>${r}</b> = ${a+r}</div><div class="step">2️⃣ ${a+r} + <b>${b-r}</b> = ?</div>`,loes:`${a} + ${r} = ${a+r}, dann + ${b-r} = <b>${a+b}</b>`};}},
  {name:'Zweistellig − Einer',gen(){const z=rnd(2,9),e=rnd(0,6),a=z*10+e,b=rnd(e+1,9);return{q:`${a} − ${b} = ?`,sag:`${a} minus ${b}`,bild:zahlenstrahl(z*10-10,z*10+10,{gross:5,klein:1,pfeil:a}),art:'zahl',a:a-b,hilfe:e?`Zuerst zurück zum Zehner:<div class="step">1️⃣ ${a} − <b>${e}</b> = ${z*10}</div><div class="step">2️⃣ ${z*10} − <b>${b-e}</b> = ?</div>`:`${a} ist ein Zehner. Denk an 10 − ${b} = ${10-b}. Also ist das Ergebnis ${z-1}${10-b}.`,loes:`<b>${a-b}</b>`};}},
  {name:'Zweistellig ± zweistellig',gen(){if(Math.random()<.5){const a=rnd(12,69),b=rnd(11,99-a);const az=Math.floor(b/10)*10,ae=b%10;return{q:`${a} + ${b} = ?`,art:'zahl',a:a+b,hilfe:`Zerlege ${b} in Zehner und Einer: ${az} und ${ae}.<div class="step">1️⃣ ${a} + <b>${az}</b> = ${a+az}</div><div class="step">2️⃣ ${a+az} + <b>${ae}</b> = ?</div>`,loes:`${a} + ${az} = ${a+az}, dann + ${ae} = <b>${a+b}</b>`};}const a=rnd(40,99),b=rnd(11,a-10);const bz=Math.floor(b/10)*10,be=b%10;return{q:`${a} − ${b} = ?`,sag:`${a} minus ${b}`,art:'zahl',a:a-b,hilfe:`Zerlege ${b} in Zehner und Einer: ${bz} und ${be}.<div class="step">1️⃣ ${a} − <b>${bz}</b> = ${a-bz}</div><div class="step">2️⃣ ${a-bz} − <b>${be}</b> = ?</div>`,loes:`${a} − ${bz} = ${a-bz}, dann − ${be} = <b>${a-b}</b>`};}},
  {name:'Hunderter',gen(){const plus=Math.random()<.5;if(plus){const a=rnd(1,7)*100+rnd(0,9)*10,b=rnd(1,9-Math.ceil(a/100))*100+rnd(0,5)*10;return{q:`${a} + ${b} = ?`,art:'zahl',a:a+b,hilfe:`Rechne zuerst die <b>Hunderter</b>, dann die <b>Zehner</b>. Tipp: ${Math.floor(a/100)}H + ${Math.floor(b/100)}H = ${Math.floor(a/100)+Math.floor(b/100)}H.`,loes:`<b>${a+b}</b>`};}const a=rnd(4,9)*100+rnd(0,9)*10,b=rnd(1,Math.floor(a/100)-1)*100;return{q:`${a} − ${b} = ?`,sag:`${a} minus ${b}`,art:'zahl',a:a-b,hilfe:`Nur die <b>Hunderter</b> ändern sich: ${Math.floor(a/100)} − ${b/100} = ${Math.floor(a/100)-b/100}. Der Rest bleibt gleich.`,loes:`<b>${a-b}</b>`};}}
]},
{id:'stellen',em:'🧱',name:'Stellenwerte',kurz:'Einer, Zehner, Hunderter, Tausender',stufen:[
  {name:'bis 100',gen(){const n=rnd(11,99);return{q:'Welche Zahl ist das?',bild:bloecke(n),art:'zahl',a:n,hilfe:'Stangen = <b>Zehner</b>, Würfel = <b>Einer</b>. Die Zehner schreibst du vorne, die Einer hinten.',loes:`${Math.floor(n/10)} Zehner und ${n%10} Einer = <b>${n}</b>`};}},
  {name:'bis 1000',gen(){const n=rnd(1,4)*100+rnd(0,9)*10+rnd(0,9);return{q:'Welche Zahl ist das?',bild:bloecke(n),art:'zahl',a:n,hilfe:'Grüne Platten = <b>Hunderter</b>, Stangen = <b>Zehner</b>, Würfel = <b>Einer</b>. Schreib sie der Reihe nach: H Z E. Fehlt etwas, schreibst du eine <b>0</b>.',loes:`<b>${n}</b>`};}},
  {name:'Wie viele Zehner?',gen(){const n=rnd(101,999);const s=String(n);const st=pick([['Hunderter',0],['Zehner',1],['Einer',2]]);const a=+s[st[1]];return{q:`Wie viele ${st[0]} hat die Zahl ${n}?`,bild:stellentafel(['H','Z','E'],s.split('')),art:'wahl',o:[...new Set([a,+s[0],+s[1],+s[2],(a+1)%10])].slice(0,4),a,hilfe:'Schau in die Stellentafel: H = Hunderter, Z = Zehner, E = Einer. Die Ziffer darunter sagt dir, wie viele.',loes:`In ${n} stehen <b>${a}</b> ${st[0]}.`};}},
  {name:'Mit Null aufpassen',gen(){const h=rnd(1,9),z=pick([0,rnd(1,9)]),e=z?0:rnd(1,9);const n=h*100+z*10+e;const t=[h?h+' H':'',z?z+' Z':'',e?e+' E':''].filter(Boolean).join(', ');return{q:`Schreib die Zahl: ${t}`,sag:`Schreib die Zahl: ${t.replace(/H/g,'Hunderter').replace(/Z/g,'Zehner').replace(/E/g,'Einer')}`,bild:stellentafel(['H','Z','E'],[h,z||'?',e||'?'],true),art:'zahl',a:n,hilfe:'Eine Stelle, die <b>fehlt</b>, bekommt eine <b>0</b>. Sonst rutschen die anderen Ziffern an die falsche Stelle!',loes:`${t} = <b>${n}</b>`};}},
  {name:'bis 10 000',gen(){const d=[rnd(1,9),rnd(0,9),pick([0,rnd(1,9)]),rnd(0,9)];const n=+d.join('');return{q:'Welche Zahl steht in der Stellentafel?',bild:stellentafel(['T','H','Z','E'],d),art:'zahl',a:n,hilfe:'Lies von links nach rechts: <b>Tausender</b>, Hunderter, Zehner, Einer.',loes:`<b>${fmt(n)}</b>`};}},
  {name:'bis 1 Million',gen(){const len=rnd(5,6);const d=[rnd(1,9),...Array.from({length:len-1},()=>pick([0,rnd(1,9)]))];const n=+d.join('');const st=['HT','ZT','T','H','Z','E'].slice(6-len);return{q:'Welche Zahl steht in der Stellentafel?',bild:stellentafel(st,d),art:'zahl',a:n,hilfe:'HT = Hunderttausender, ZT = Zehntausender, T = Tausender. Tipp: Nach dem Tausender machst du beim Lesen eine kleine Pause – „vierhundertzwölf<b>tausend</b> … dreihundert“.',loes:`<b>${fmt(n)}</b>`};}}
]},
{id:'mal',em:'✖️',name:'Einmaleins verstehen',kurz:'Mit Punktefeldern und Tricks',stufen:[
  {name:'2er, 5er, 10er mit Bild',gen(){const c=pick([2,5,10]),r=rnd(1,10);return{q:`${r} · ${c} = ?`,sag:`${r} mal ${c}`,bild:punktfeld(r,c),art:'zahl',a:r*c,hilfe:`${r} Reihen mit je ${c} Punkten. Zähle in <b>${c}er-Schritten</b>: ${Array.from({length:Math.min(r,4)},(_,i)=>(i+1)*c).join(', ')} …`,loes:`${r} · ${c} = <b>${r*c}</b>`};}},
  {name:'2er, 5er, 10er',gen(){const c=pick([2,5,10]),r=rnd(1,10);return{q:`${r} · ${c} = ?`,sag:`${r} mal ${c}`,art:'zahl',a:r*c,hilfe:`Zähle in ${c}er-Schritten bis zur ${r}. Zahl:${punktfeld(r,c)}`,loes:`${r} · ${c} = <b>${r*c}</b>`};}},
  {name:'3er & 4er mit Bild',gen(){const c=pick([3,4]),r=rnd(1,10);return{q:`${r} · ${c} = ?`,sag:`${r} mal ${c}`,bild:punktfeld(r,c),art:'zahl',a:r*c,hilfe:r>5?`Trick: Die oberen <b>5 Reihen</b> sind 5 · ${c} = ${5*c}. Dazu noch ${r-5} Reihen: ${r-5} · ${c} = ${(r-5)*c}.`:`Zähle in ${c}er-Schritten: ${Array.from({length:r},(_,i)=>(i+1)*c).join(', ')}`,loes:`${r} · ${c} = <b>${r*c}</b>`};}},
  {name:'Schwere Reihen ableiten',gen(){const c=pick([6,7,8,9]),r=rnd(6,9);return{q:`${r} · ${c} = ?`,sag:`${r} mal ${c}`,bild:punktfeld(r,c,5),art:'zahl',a:r*c,hilfe:`Teile das Feld! Die <b>lila</b> Reihen sind 5 · ${c} = <b>${5*c}</b>. Die orangen Reihen sind ${r-5} · ${c} = <b>${(r-5)*c}</b>. Zusammen: ${5*c} + ${(r-5)*c}.`,loes:`5 · ${c} + ${r-5} · ${c} = ${5*c} + ${(r-5)*c} = <b>${r*c}</b>`};}},
  {name:'Alle Reihen gemischt',gen(){const c=rnd(2,9),r=rnd(2,10);const tausch=Math.random()<.5;return{q:tausch?`${c} · ${r} = ?`:`${r} · ${c} = ?`,sag:tausch?`${c} mal ${r}`:`${r} mal ${c}`,art:'zahl',a:r*c,hilfe:`Tipp: Du darfst <b>tauschen</b> – ${r} · ${c} ist gleich viel wie ${c} · ${r}. Nimm die Reihe, die du besser kannst. Oder: 5 · ${c} = ${5*c} und dann weiter.${punktfeld(r,c,Math.min(5,r))}`,loes:`<b>${r*c}</b>`};}}
]},
{id:'teilen',em:'🍪',name:'Teilen = gerecht verteilen',kurz:'Mit Keksen und Tellern',stufen:[
  {name:'Kekse verteilen',gen(){const t=rnd(2,5),m=rnd(1,5);const n=t*m;return{q:`${n} Kekse werden gerecht auf ${t} Teller verteilt. Wie viele kommen auf jeden Teller?`,bild:haufen(n),art:'zahl',a:m,hilfe:`Stell dir vor, du legst immer <b>einen Keks auf jeden Teller</b> – reihum. So sieht es am Ende aus:${tellerBild(t,m)}`,loes:`${n} : ${t} = <b>${m}</b>. Jeder Teller bekommt ${m}.`};}},
  {name:'Teilen mit Mal-Trick',gen(){const d=rnd(2,9),q=rnd(2,10);return{q:`${d*q} : ${d} = ?`,sag:`${d*q} geteilt durch ${d}`,art:'zahl',a:q,hilfe:`Frag dich: <b>${d} mal wie viel</b> ist ${d*q}? Zähle in ${d}er-Schritten: ${Array.from({length:Math.min(q+1,10)},(_,i)=>(i+1)*d).join(', ')} … Wie viele Schritte bis ${d*q}?`,loes:`${d} · ${q} = ${d*q}, also ${d*q} : ${d} = <b>${q}</b>`};}},
  {name:'Was bleibt übrig?',gen(){const t=rnd(2,5),m=rnd(2,5),r=rnd(1,t-1);const n=t*m+r;return{q:`${n} Kekse, ${t} Kinder. Jedes Kind bekommt gleich viele. Wie viele Kekse bleiben übrig?`,bild:haufen(n),art:'zahl',a:r,hilfe:`Verteile reihum. Jedes Kind bekommt ${m} – das sind ${t} · ${m} = ${t*m} Kekse. Wie viele von ${n} sind dann noch übrig?${tellerBild(t,m)}`,loes:`${n} : ${t} = ${m}, Rest <b>${r}</b>`};}}
]}
];

/* --- Ablauf einer Werkstatt-Übung (passt sich an) --- */
function wsStufe(id){return store.get('ws_'+id,{s:0,serie:0,falsch:0});}
function werkstattMenue(){
  farbe('var(--rechnen)');KONTEXT='Rechen-Werkstatt (Grundlagen: Mengen, Zahlenstrahl, Zerlegen, Plus/Minus, Stellenwerte, Einmaleins, Teilen)';
  seite(`<h1>🧮 Rechen-Werkstatt</h1><p class="sub">Hier übst du in <b>kleinen Schritten</b>. Es gibt keine Zeit, die abläuft – nimm dir so viel Zeit, wie du brauchst. Wenn eine Stufe sitzt, geht es von allein weiter. 🌱</p>
    <div class="learn" style="margin-bottom:14px">💡 Tipp: Tippe auf <b>„Ich brauche Hilfe“</b>, wann immer du willst. Hilfe holen ist schlau, nicht schlecht!</div>
    <div class="list">${WERKSTATT.map(m=>{const st=wsStufe(m.id);return `<button class="item" data-m="${m.id}"><span class="em">${m.em}</span><span><b>${m.name}</b><small>${m.kurz}</small><div class="lvlbar">${m.stufen.map((_,i)=>`<i class="${i<st.s||(i===st.s&&st.fertig)?'on':''}"></i>`).join('')}</div></span><span class="lvl">Stufe ${Math.min(st.s+1,m.stufen.length)}/${m.stufen.length}</span></button>`;}).join('')}</div>`,home);
  app.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>werkstattStart(WERKSTATT.find(m=>m.id===b.dataset.m)));
}
function werkstattStart(m){
  const st=wsStufe(m.id);
  seite(`<h1>${m.em} ${m.name}</h1><p class="sub">${m.kurz}</p>${typeof FILME!=='undefined'&&FILME[m.id]?`<button class="item filmbtn" id="film" style="width:100%;margin-bottom:12px"><span class="em">🎬</span><span><b>So geht's – Erklär-Film</b><small style="color:#fff">Anschauen und zuhören</small></span></button>`:''}<div class="list">${m.stufen.map((s,i)=>`<button class="item" data-s="${i}" ${i>st.s?'style="opacity:.55"':''}><span class="em">${i<st.s?'✅':i===st.s?'▶️':'🔒'}</span><span><b>Stufe ${i+1}: ${s.name}</b><small>${i<st.s?'geschafft – zum Wiederholen antippen':i===st.s?'hier bist du gerade':'kommt bald – du kannst es aber schon ausprobieren'}</small></span></button>`).join('')}</div>`,werkstattMenue);
  app.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>werkstattRunde(m,+b.dataset.s));
  const fb=$('#film'); if(fb) fb.onclick=()=>erklaerFilm(m.id,()=>werkstattStart(m));
}
function werkstattRunde(m,stufe){
  let nr=0,richtig=0;const RUNDE=8;
  function aufgabe(){
    if(nr>=RUNDE) return rundeEnde();
    const S=m.stufen[stufe];const t=S.gen.call(S);let versuch=0,hilfeAn=false;
    KONTEXT=`Rechen-Werkstatt „${m.name}“, Stufe „${S.name}“. Aufgabe: ${t.q} (Lösung ${t.a} – NICHT verraten. Erkläre in ganz kleinen Schritten mit Gegenständen wie Äpfeln oder Fingern, sehr geduldig, Mut machen.)`;
    const st=wsStufe(m.id);
    seite(`<div class="card"><div class="meta"><span>${m.em} ${m.name} · Stufe ${stufe+1}: ${S.name}</span><span>${nr+1} von ${RUNDE}</span></div>
      <div class="lvlbar" title="Richtig hintereinander">${[0,1,2,3,4].map(i=>`<i class="${i<(stufe===st.s?st.serie:0)?'on':''}"></i>`).join('')}</div>
      ${t.bild||''}<div class="q" style="text-align:center">${esc(t.q)}${spk(t.sag||t.q)}</div>
      <div id="ant"></div><div class="fb"></div><div id="hilfe"></div>
      <div class="row" style="justify-content:center"><button class="btn soft" id="hbtn">🙋 Ich brauche Hilfe</button>${KI?'<button class="btn ghost" id="ebtn">🦉 Erklär es mir</button>':''}</div>
      <div class="row" id="wr" style="display:none;justify-content:center"><button class="btn" id="weiter">Weiter →</button></div>
      <p class="ruhe">Keine Eile. Atme ruhig – du schaffst das. 🌱</p></div>`,()=>werkstattStart(m));
    const fb=app.querySelector('.fb'),hl=$('#hilfe');
    const zeigHilfe=()=>{if(hilfeAn)return;hilfeAn=true;hl.innerHTML=`<div class="help">🙋 ${t.hilfe}</div>`;};
    $('#hbtn').onclick=zeigHilfe;
    if($('#ebtn')) $('#ebtn').onclick=()=>eule('Kannst du mir bei dieser Aufgabe helfen? '+t.q);
    const fertig=ok=>{
      const s=wsStufe(m.id);
      if(stufe===s.s){ if(ok&&versuch===0&&!hilfeAn){s.serie++;s.falsch=0;} else if(!ok){s.serie=0;s.falsch++;} else {s.serie=Math.max(0,s.serie);} }
      let meldung='';
      if(stufe===s.s&&s.serie>=5&&s.s<m.stufen.length-1){s.s++;s.serie=0;s.falsch=0;meldung=`<div class="learn" style="margin-top:10px">🎉 <b>Stufe geschafft!</b> Ab jetzt übst du Stufe ${s.s+1}: ${m.stufen[s.s].name}.</div>`;addSterne(5);konfetti();stufe=s.s;}
      else if(stufe===s.s&&s.serie>=5&&s.s===m.stufen.length-1&&!s.fertig){s.fertig=true;meldung=`<div class="learn" style="margin-top:10px">🏆 <b>Du hast alle Stufen geschafft!</b> Wahnsinn!</div>`;addSterne(10);konfetti();}
      else if(stufe===s.s&&s.falsch>=3&&s.s>0){s.s--;s.serie=0;s.falsch=0;stufe=s.s;meldung=`<div class="learn" style="margin-top:10px">🌱 Wir üben noch ein bisschen die Stufe davor – das macht dich stärker für später.</div>`;}
      store.set('ws_'+m.id,s);
      fb.insertAdjacentHTML('beforeend',meldung);
      $('#wr').style.display='flex';$('#weiter').onclick=()=>{nr++;aufgabe();};
    };
    const pruef=v=>{
      if(v===t.a){ if(versuch===0)richtig++; addSterne(versuch===0?2:1); fb.className='fb ok';fb.innerHTML=pick(LOB)+(versuch||hilfeAn?`<div class="ex">${t.loes}</div>`:'');sperren();fertig(true);}
      else{versuch++; if(versuch<2){fb.className='fb no';fb.innerHTML='Noch nicht – aber du bist nah dran! Schau dir die Hilfe an und probier es nochmal. 💪';zeigHilfe();nochmal();}
        else{logFehler(t.q,t.a,'Rechen-Werkstatt');fb.className='fb no';fb.innerHTML=`So geht es: <div class="ex">${t.loes}</div><div class="ex">Das ist ganz normal – beim nächsten Mal klappt es leichter. 🌱</div>`;sperren();fertig(false);}}
    };
    let zb=null;
    const sperren=()=>{$('#ant').style.pointerEvents='none';$('#hbtn').style.display='none';};
    const nochmal=()=>{ if(zb) zb.reset(); else app.querySelectorAll('.opt.wrong').forEach(b=>b.disabled=true);};
    if(t.art==='wahl'){ const opts=t.fix?t.o:shuffle(t.o); $('#ant').innerHTML=`<div class="opts">${opts.map(o=>`<button class="opt big" data-v="${o}">${fmt(o)}</button>`).join('')}</div>`;
      app.querySelectorAll('#ant .opt').forEach(b=>b.onclick=()=>{const v=+b.dataset.v;if(v===t.a)b.classList.add('right');else b.classList.add('wrong');pruef(v);if(v!==t.a&&versuch>=2)app.querySelectorAll('#ant .opt').forEach(x=>{if(+x.dataset.v===t.a)x.classList.add('right');});});}
    else zb=ziffernblock($('#ant'),{max:7,onOk:pruef});
  }
  function rundeEnde(){
    markDone('ws-'+m.id,richtig,RUNDE);KONTEXT=null;
    const s=wsStufe(m.id);
    seite(`<div class="card" style="text-align:center"><div style="font-size:4rem">${richtig>=6?'🌟':'🌱'}</div><h2>Runde geschafft!</h2>
      <p class="sub">${richtig} von ${RUNDE} gleich beim ersten Mal richtig.<br>Du bist jetzt bei <b>Stufe ${s.s+1} von ${m.stufen.length}</b>: ${m.stufen[s.s].name}.</p>
      <p class="sub">${richtig>=6?'Super gemacht! Dein Gehirn wird immer stärker. 💪':'Jedes Üben hilft – auch wenn es sich schwer anfühlt. Du bist auf einem guten Weg!'}</p>
      <div class="row" style="justify-content:center"><button class="btn" id="noch">🔁 Noch eine Runde</button><button class="btn ghost" id="pause">☕ Pause machen</button></div></div>`);
    $('#noch').onclick=()=>werkstattRunde(m,wsStufe(m.id).s);$('#pause').onclick=werkstattMenue;
  }
  aufgabe();
}
