/* ===== Animierte Erklär-Filme (laufen von allein und werden vorgelesen) ===== */
const pop=(html,d)=>`<span class="pop" style="animation-delay:${d}s">${html}</span>`;
function zfAni(rot,blau=0,start=0,schritt=.18,weg=0){let h='';for(let k=0;k<10;k++){let c='';if(k<rot)c=k>=rot-weg?'x':'r';else if(k<rot+blau)c='b';const d=k<rot?start+k*schritt:start+(k-rot)*schritt+(rot?0:0);h+=c?`<i class="${c} pop" style="animation-delay:${(c==='b'?start+rot*0+(k-rot)*schritt:start+k*schritt).toFixed(2)}s"></i>`:'<i></i>';}return `<div class="zf">${h}</div>`;}
const leerZf='<div class="zf">'+'<i></i>'.repeat(10)+'</div>';
const gross=t=>`<div class="ftext">${t}</div>`;

const FILME={
 mengen:{titel:'Mengen auf einen Blick',bilder:[
  {t:'Das ist ein Zehnerfeld. Es hat genau zehn Plätze: fünf oben und fünf unten.',h:`<div class="vis">${leerZf}</div>${gross('10 Plätze')}`},
  {t:'Wir füllen es: eins, zwei, drei, vier, fünf. Die obere Reihe ist voll – das sind fünf!',h:`<div class="vis">${zfAni(5,0,0,.5)}</div>${gross(pop('Obere Reihe voll = <b>5</b>',2.6))}`},
  {t:'Jetzt kommen noch drei dazu. Fünf und drei sind acht. Du musst nicht jeden Punkt zählen – du siehst die volle Reihe und zählst nur den Rest.',h:`<div class="vis">${zfAni(5,3,0,.0)}</div>`.replace(/animation-delay:0\.00s/g,'animation-delay:0s')+gross(pop('5 + 3 = <b>8</b>',1.2))},
  {t:'Ist das ganze Feld voll, sind es zehn. Zwei volle Felder sind zwanzig.',h:`<div class="vis">${zfAni(10,0,0,.12)}${pop('<span class="pl">+</span>',1.3)}${zfAni(10,0,1.5,.12)}</div>${gross(pop('10 + 10 = <b>20</b>',3))}`}]},
 strahl:{titel:'Der Zahlenstrahl',bilder:[
  {t:'Auf dem Zahlenstrahl wohnen die Zahlen der Reihe nach. Links die kleinen, rechts die großen.',h:zahlenstrahl(0,20,{gross:5,klein:1})+gross('klein ⬅️ ➡️ groß')},
  {t:'Die großen Striche sind beschriftet: null, fünf, zehn, fünfzehn, zwanzig. Wo ist die zwölf? Von der zehn gehen wir zwei kleine Striche weiter.',h:`<div class="wander">${zahlenstrahl(0,20,{gross:5,klein:1,pfeil:12})}</div>${gross(pop('10 → 11 → <b>12</b>',1.5))}`},
  {t:'Bis hundert ist es genauso – nur sind die großen Striche jetzt die Zehner.',h:zahlenstrahl(0,100,{gross:10,klein:5,pfeil:35})+gross(pop('30 und noch ein halber Zehner = <b>35</b>',1))}]},
 zerlegen:{titel:'Verliebte Zahlen',bilder:[
  {t:'Verliebte Zahlen ergeben zusammen immer zehn. Schau: sechs rote Punkte – wie viele Plätze sind noch frei?',h:`<div class="vis">${zfAni(6,0,0,.2)}</div>${gross(pop('6 + ? = 10',1.4))}`},
  {t:'Wir füllen die freien Plätze blau: eins, zwei, drei, vier. Also sechs und vier sind verliebt!',h:`<div class="vis">${zfAni(6,4,0,.45).replace(/(class="r pop" style="animation-delay:)[\d.]+s/g,'$10s')}</div>${gross(pop('6 + <b>4</b> = 10 ❤️',2))}`},
  {t:'Alle verliebten Zahlen: eins und neun, zwei und acht, drei und sieben, vier und sechs, fünf und fünf.',h:gross(['1 + 9','2 + 8','3 + 7','4 + 6','5 + 5'].map((x,i)=>pop(x+' ❤️<br>',i*.6)).join(''))},
  {t:'Das hilft auch bei hundert: siebzig und dreißig sind hundert – weil sieben und drei zehn sind.',h:gross(pop('7 + 3 = 10',0)+'<br>'+pop('70 + 30 = <b>100</b>',1.2))}]},
 plusminus:{titel:'Plus und Minus über die Zehn',bilder:[
  {t:'Wir rechnen acht plus fünf. Zuerst legen wir acht rote Punkte.',h:`<div class="vis">${zfAni(8,0,0,.15)}${leerZf}</div>${gross('8 + 5')}`},
  {t:'Jetzt machen wir zuerst die zehn voll! Dafür brauchen wir zwei von den fünf.',h:`<div class="vis">${zfAni(8,2,0,.5).replace(/(class="r pop" style="animation-delay:)[\d.]+s/g,'$10s')}${leerZf}</div>${gross(pop('8 + <b>2</b> = 10',1.4))}`},
  {t:'Von den fünf sind noch drei übrig. Die kommen ins nächste Feld. Zehn und drei sind dreizehn!',h:`<div class="vis">${zfAni(8,2,0,0)}${zfAni(0,3,0,.5)}</div>${gross(pop('10 + <b>3</b> = <b>13</b>',1.8))}`},
  {t:'Bei Minus genauso, nur rückwärts. Dreizehn minus fünf: zuerst drei weg bis zur zehn, dann noch zwei weg. Das ergibt acht.',h:`<div class="vis">${zfAni(10,0,0,0)}${zfAni(3,0,0,0)}</div>${gross(pop('13 − <b>3</b> = 10',.6)+'<br>'+pop('10 − <b>2</b> = <b>8</b>',2.2))}`}]},
 stellen:{titel:'Einer, Zehner, Hunderter',bilder:[
  {t:'Das ist ein Einer – ein kleiner Würfel.',h:`<div class="vis">${pop('<span class="wuerfel" style="width:34px;height:34px"></span>',0)}</div>${gross('1 Einer')}`},
  {t:'Zehn Einer zusammen ergeben eine Zehnerstange.',h:`<div class="vis"><div class="wcol" style="max-width:120px">${Array.from({length:10},(_,i)=>pop('<span class="wuerfel"></span>',i*.15)).join('')}</div>${pop('<span class="pl">=</span>',1.7)}${pop('<div class="stange">'+'<i></i>'.repeat(10)+'</div>',2)}</div>${gross(pop('10 Einer = <b>1 Zehner</b>',2.2))}`},
  {t:'Zehn Zehnerstangen ergeben eine Hunderterplatte.',h:`<div class="vis"><div class="bl">${Array.from({length:10},(_,i)=>pop('<div class="stange">'+'<i></i>'.repeat(10)+'</div>',i*.15)).join('')}</div>${pop('<span class="pl">=</span>',1.7)}${pop('<div class="platte">'+'<i></i>'.repeat(100)+'</div>',2)}</div>${gross(pop('10 Zehner = <b>1 Hunderter</b>',2.2))}`},
  {t:'Jetzt lesen wir eine Zahl: zwei Hunderter, drei Zehner, fünf Einer. Das ist zweihundertfünfunddreißig.',h:`${bloecke(235)}${stellentafel(['H','Z','E'],[2,3,5])}${gross(pop('<b>235</b>',1))}`},
  {t:'Achtung bei der Null! Vier Hunderter, null Zehner, sieben Einer – das ist vierhundertsieben. Die Null hält den Platz frei.',h:`${stellentafel(['H','Z','E'],[4,0,7])}${gross(pop('<b>407</b> – nicht 47!',1))}`}]},
 mal:{titel:'Einmaleins verstehen',bilder:[
  {t:'Drei mal vier heißt: drei Reihen mit je vier Punkten.',h:`<div class="vis"><div class="feld" style="grid-template-columns:repeat(4,20px)">${Array.from({length:12},(_,i)=>`<i class="pop" style="animation-delay:${(Math.floor(i/4)*.8+(i%4)*.12).toFixed(2)}s"></i>`).join('')}</div></div>${gross(pop('4 + 4 + 4 = <b>12</b>',2.6))}`},
  {t:'Man kann auch tauschen: vier mal drei ist genauso viel. Das Feld ist nur gedreht.',h:`<div class="vis">${punktfeld(3,4)}<span class="pl">=</span><div class="drehen">${punktfeld(4,3)}</div></div>${gross('3 · 4 = 4 · 3 = <b>12</b>')}`},
  {t:'Ein Trick für schwere Aufgaben: sieben mal sechs. Wir teilen das Feld: fünf Reihen sind dreißig, zwei Reihen sind zwölf. Zusammen zweiundvierzig.',h:`${punktfeld(7,6,5)}${gross(pop('5 · 6 = 30',.6)+'<br>'+pop('2 · 6 = 12',1.6)+'<br>'+pop('30 + 12 = <b>42</b>',2.6))}`}]},
 teilen:{titel:'Teilen ist gerecht verteilen',bilder:[
  {t:'Zwölf Kekse sollen gerecht auf drei Teller verteilt werden.',h:`${haufen(12)}${gross('12 : 3 = ?')}`},
  {t:'Wir legen reihum immer einen Keks auf jeden Teller – so lange, bis keiner mehr übrig ist.',h:`<div class="vis">${[0,1,2].map(t=>`<div class="teller">${[0,1,2,3].map(r=>pop('🍪',(r*3+t)*.35)).join('')}</div>`).join('')}</div>`},
  {t:'Auf jedem Teller liegen vier Kekse. Also ist zwölf geteilt durch drei gleich vier. Probe: drei mal vier ist zwölf!',h:`${tellerBild(3,4)}${gross(pop('12 : 3 = <b>4</b>',.4)+'<br>'+pop('Probe: 3 · 4 = 12 ✓',1.4))}`}]},
 uhr:{titel:'Die Uhr lesen',bilder:[
  {t:'Die Uhr hat zwei Zeiger. Der kurze rote zeigt die Stunden. Der lange blaue zeigt die Minuten.',h:`<div class="vis">${uhr(3,0)}</div>${uhrLegende}`},
  {t:'Wenn der lange Zeiger einmal ganz herum wandert, vergeht eine Stunde – sechzig Minuten.',h:`<div class="vis"><div class="uhrdreh">${uhr(3,0).replace('stroke="#2563eb"','class="mz" stroke="#2563eb"')}</div></div>${gross(pop('1 Stunde = <b>60 Minuten</b>',1))}`},
  {t:'Jede Zahl auf der Uhr steht für fünf Minuten. Zeigt der lange Zeiger auf die drei, sind es fünfzehn Minuten. In Österreich sagt man: viertel.',h:`<div class="vis">${uhr(7,15)}</div>${gross('7:15 = <b>viertel acht</b>')}`},
  {t:'Zeigt er auf die sechs, sind es dreißig Minuten – halb. Auf der neun sind es fünfundvierzig Minuten – dreiviertel.',h:`<div class="vis" style="gap:10px">${uhr(7,30,130)}${uhr(7,45,130)}</div>${gross('7:30 = <b>halb acht</b> · 7:45 = <b>dreiviertel acht</b>')}`}]},
 splus:{titel:'Schriftlich addieren',bilder:[
  {t:'Wir rechnen dreihundertachtundsiebzig plus zweihundertvierundfünfzig. Schreib die Zahlen genau untereinander – Einer unter Einer.',h:schriftBild([378,254],'+')},
  {t:'Wir fangen rechts bei den Einern an: acht plus vier ist zwölf. Wir schreiben die zwei und merken uns die eins.',h:schriftBild([378,254],'+','2')+gross(pop('8 + 4 = 12 → schreib <b>2</b>, merk dir <b>1</b>',.4))},
  {t:'Bei den Zehnern: sieben plus fünf plus die gemerkte eins ist dreizehn. Schreib drei, merk dir eins.',h:schriftBild([378,254],'+','32')+gross(pop('7 + 5 + 1 = 13 → schreib <b>3</b>, merk dir <b>1</b>',.4))},
  {t:'Bei den Hundertern: drei plus zwei plus eins ist sechs. Das Ergebnis ist sechshundertzweiunddreißig.',h:schriftBild([378,254],'+',632)+gross(pop('3 + 2 + 1 = 6 → Ergebnis <b>632</b> 🎉',.4))}]}
};

function erklaerFilm(id,back){
  const F=FILME[id]; if(!F) return; let i=0,auto=true,tok=0;
  const mal=()=>{const B=F.bilder[i];const my=++tok;
    seite(`<h1>🎬 ${F.titel}</h1><div class="card film"><div class="progress"><div style="width:${(i+1)/F.bilder.length*100}%"></div></div>
      <div class="filmbild" key="${i}">${B.h}</div><p class="filmtext">${B.t}</p>
      <div class="row" style="justify-content:center"><button class="btn ghost" id="fz" ${i?'':'disabled'}>⏮ Zurück</button><button class="btn ghost" id="fp">${auto?'⏸ Pause':'▶️ Weiter abspielen'}</button><button class="btn" id="fw">${i<F.bilder.length-1?'Weiter ⏭':'Fertig ✓'}</button></div></div>`,back);
    $('#fz').onclick=()=>{auto=false;if(i>0){i--;mal();}};
    $('#fw').onclick=()=>{auto=false;if(i<F.bilder.length-1){i++;mal();}else back();};
    $('#fp').onclick=()=>{auto=!auto;stopp();mal();};
    if(!auto) return;
    const weiter=()=>{if(my!==tok||!auto)return;if(i<F.bilder.length-1){i++;mal();}};
    if('speechSynthesis' in window){ setTimeout(()=>{ if(my!==tok)return; try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(B.t);const v=stimme('de');if(v){u.voice=v;u.lang=v.lang;}else u.lang='de-AT';u.rate=.92;u.onend=()=>setTimeout(weiter,1400);u.onerror=()=>setTimeout(weiter,5000);speechSynthesis.speak(u);}catch(e){setTimeout(weiter,6000);} },400); }
    else setTimeout(weiter,Math.max(5000,B.t.length*70));
  };
  mal();
}
/* Filme an die passenden Stellen hängen */
const FILM_ZU_MATHE={'m-uhr':'uhr','m-zeitspanne':'uhr','m-splus':'splus','m-1x1':'mal','m-div':'teilen','m-stellen':'stellen'};
