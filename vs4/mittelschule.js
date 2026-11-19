/* ===== 🚀 Fit für die Mittelschule – Brücke von der 4. Klasse VS zur 1. Klasse MS ===== */
const MS_MATHE=[
 {id:'ms-bruch',em:'🍕',name:'Brüche: Hälfte, Viertel, Drittel',gen(){const t=pick([[2,'Hälfte','½'],[4,'Viertel','¼'],[3,'Drittel','⅓']]);const g=t[0]*rnd(2,KLEIN()?5:10);return{q:`Wie viel ist ein ${t[1]} (${t[2]}) von ${g}?`,a:g/t[0],bild:tellerBild(t[0],g/t[0]>12?0:g/t[0],'🔵'),schritte:[`Ein ${t[1]} heißt: in <b>${t[0]} gleiche Teile</b> teilen und <b>einen</b> Teil nehmen.`,`${g} : ${t[0]} = <b>${g/t[0]}</b>`,`Probe: ${t[0]} · ${g/t[0]} = ${g} ✓`],e:`${t[2]} von ${g} = ${g/t[0]}`};}},
 {id:'ms-komma',em:'🔣',name:'Kommazahlen bei Größen',gen(){const t=pick(['m','eur','kg']);if(t==='m'){const m=rnd(1,9),c=pick([5,25,50,75]);return{q:`${m},${String(c).padStart(2,'0')} m = ? cm`,sag:`${m} Komma ${c} Meter sind wie viele Zentimeter?`,a:m*100+c,schritte:['Vor dem Komma stehen die <b>Meter</b>, nach dem Komma die <b>Zentimeter</b>.',`${m} m = ${m*100} cm`,`dazu ${c} cm → <b>${m*100+c} cm</b>`],e:`${m},${String(c).padStart(2,'0')} m = ${m*100+c} cm`};}
   if(t==='eur'){const e=rnd(1,30),c=rnd(1,99);return{q:`${e},${String(c).padStart(2,'0')} € = ? Cent`,sag:`${e} Euro ${c} sind wie viele Cent?`,a:e*100+c,schritte:['Vor dem Komma: <b>Euro</b>. Nach dem Komma: <b>Cent</b>.',`${e} € = ${e*100} Cent`,`${e*100} + ${c} = <b>${e*100+c}</b>`],e:`${e*100+c} Cent`};}
   const k=rnd(1,5),g=pick([250,500,750]);return{q:`${k},${String(g).padStart(3,'0').replace(/0+$/,'')} kg = ? g`,sag:`${k} Komma ${String(g).replace(/0+$/,'')} Kilogramm sind wie viele Gramm?`,a:k*1000+g,schritte:['1 kg = 1000 g. Nach dem Komma stehen die Gramm – <b>drei</b> Stellen.',`${k} kg = ${k*1000} g`,`dazu ${g} g → <b>${k*1000+g} g</b>`],e:`${k*1000+g} g`};}},
 {id:'ms-ueberschlag',em:'🎯',name:'Überschlagen (ungefähr rechnen)',gen(){const a=rnd(102,989),b=rnd(102,989);const ar=Math.round(a/100)*100,br=Math.round(b/100)*100;return{q:`Rechne UNGEFÄHR: ${a} + ${b} ≈ ? (runde beide auf Hunderter)`,a:ar+br,schritte:[`Runde ${a} auf Hunderter → <b>${ar}</b>`,`Runde ${b} auf Hunderter → <b>${br}</b>`,`${ar} + ${br} = <b>${ar+br}</b>`,'Überschlagen hilft dir, das genaue Ergebnis zu kontrollieren!'],e:`≈ ${ar+br} (genau: ${a+b})`};}},
 {id:'ms-million',em:'🔢',name:'Große Zahlen sicher lesen',gen(){const d=[rnd(1,9),...Array.from({length:6},()=>pick([0,rnd(1,9)]))];const n=+d.slice(0,rnd(5,7)).join('');const s=String(n);const k=rnd(0,s.length-1);const pos=s.length-1-k;const namen=['Einer','Zehner','Hunderter','Tausender','Zehntausender','Hunderttausender','Millionen'];return{q:`Welche Ziffer steht in ${fmt(n)} an der Stelle der ${namen[pos]}?`,a:+s[k],bild:stellentafel(['M','HT','ZT','T','H','Z','E'].slice(7-s.length),s.split('')),schritte:['Schau in die Stellentafel. Lies von <b>rechts</b>: E, Z, H, T, ZT, HT, M.',`Die ${namen[pos]} sind die Spalte <b>${['E','Z','H','T','ZT','HT','M'][pos]}</b>.`,`Dort steht die <b>${s[k]}</b>.`],e:`${s[k]}`};}},
 {id:'ms-geo',em:'📐',name:'Rechteck, Quadrat & Würfel',mc:true,gen(){return pick([
   {q:'Wie viele Ecken hat ein Rechteck?',o:['4','3','6'],a:0,e:'Rechteck: 4 Ecken, 4 Seiten, 4 rechte Winkel.'},
   {q:'Was ist beim Quadrat besonders?',o:['Alle 4 Seiten sind gleich lang','Es hat 3 Ecken','Es ist rund'],a:0,e:'Das Quadrat ist ein besonderes Rechteck mit 4 gleich langen Seiten.'},
   {q:'Wie viele Flächen hat ein Würfel?',o:['6','4','8'],a:0,e:'Wie beim Spielwürfel: 6 Flächen (1 bis 6).'},
   {q:'Wie viele Ecken hat ein Würfel?',o:['8','6','12'],a:0,e:'4 Ecken oben, 4 unten = 8.'},
   {q:'Wie viele Kanten hat ein Würfel?',o:['12','8','6'],a:0,e:'4 oben, 4 unten, 4 senkrecht = 12.'},
   {q:'Ein rechter Winkel ist wie …',o:['die Ecke eines Heftes','ein spitzer Zahn','ein Kreis'],a:0,e:'Ein rechter Winkel hat 90° – wie eine Heftecke.'},
   {q:'Womit zeichnet man einen genauen Kreis?',o:['Zirkel','Geodreieck','Radiergummi'],a:0,e:'Mit dem Zirkel. Das Geodreieck brauchst du für gerade Linien und rechte Winkel.'},
   {q:'Welcher Körper rollt?',o:['Kugel','Würfel','Quader'],a:0,e:'Die Kugel hat keine Ecken und Kanten.'}]);}}
];
const MS_THEMEN=[
 {id:'ms-ankommen',em:'🏫',name:'Was ist neu in der Mittelschule?',fr:[
  ['Wie viele Lehrerinnen und Lehrer hast du in der Mittelschule ungefähr?',['Für fast jedes Fach eine eigene Person','Nur eine Lehrerin für alles','Gar keine'],0,'In der Mittelschule gibt es Fachlehrer:innen – für Mathe, Deutsch, Englisch usw. jeweils eigene.'],
  ['Was ist eine Schularbeit?',['Eine größere schriftliche Prüfung in Deutsch, Mathe oder Englisch','Eine Hausübung','Ein Ausflug'],0,'Schularbeiten werden angekündigt – du kannst dich gut vorbereiten!'],
  ['Wozu dient ein Hausübungsheft oder Kalender?',['Damit du nichts vergisst, was zu tun ist','Zum Malen','Für Sammelbilder'],0,'Schreib jede Hausübung sofort auf – mit Datum, bis wann sie fertig sein muss.'],
  ['Was hilft beim Lernen für einen Test am meisten?',['Mehrere Tage vorher in kleinen Portionen üben','Erst am Abend vorher alles lernen','Gar nicht lernen'],0,'Kurz und öfter üben ist viel besser als alles auf einmal.'],
  ['Was machst du, wenn du etwas nicht verstehst?',['Nachfragen – bei der Lehrerin, Mitschülern oder zu Hause','Still sein und hoffen','Weglaufen'],0,'Fragen ist schlau! Lehrer:innen freuen sich, wenn du nachfragst.'],
  ['Was ist ein Stundenplan?',['Eine Tabelle, wann welches Fach ist','Ein Rezept','Eine Landkarte'],0,'Pack am Abend die Schultasche nach dem Stundenplan.'],
  ['Welche neuen Fächer gibt es oft in der Mittelschule?',['Geschichte, Geografie, Biologie, Physik','Nur Turnen','Keine neuen'],0,'Sachunterricht wird in mehrere Fächer aufgeteilt.']]},
 {id:'ms-faelle',em:'🧩',name:'Die 4 Fälle – erster Blick',fr:[
  ['Mit welcher Frage findest du den 1. Fall?',['Wer oder was?','Wem?','Wen oder was?'],0,'1. Fall (Nominativ): Wer oder was? – Der Hund bellt.'],
  ['Mit welcher Frage findest du den 3. Fall?',['Wem?','Wessen?','Wer?'],0,'3. Fall (Dativ): Wem? – Ich helfe dem Kind.'],
  ['Mit welcher Frage findest du den 4. Fall?',['Wen oder was?','Wem?','Wessen?'],0,'4. Fall (Akkusativ): Wen oder was? – Ich sehe den Hund.'],
  ['„Ich gebe ___ Hund einen Knochen.“',['dem','den','der'],0,'Wem gebe ich den Knochen? → 3. Fall → dem Hund.'],
  ['„Ich sehe ___ Hund.“',['den','dem','des'],0,'Wen sehe ich? → 4. Fall → den Hund.'],
  ['„Das ist das Haus ___ Lehrers.“',['des','dem','den'],0,'Wessen Haus? → 2. Fall → des Lehrers.'],
  ['Nach „mit“ kommt immer der …',['3. Fall','4. Fall','1. Fall'],0,'mit dem Bus, mit der Mama, mit dem Rad.'],
  ['Nach „für“ kommt immer der …',['4. Fall','3. Fall','2. Fall'],0,'für den Papa, für die Oma.']]},
 {id:'ms-dass',em:'🔗',name:'das oder dass?',fr:[
  ['„Ich hoffe, ___ du kommst.“',['dass','das'],0,'Kannst du „dieses“ oder „welches“ einsetzen? Nein → dass.'],
  ['„___ Buch ist spannend.“',['Das','Dass'],0,'„Dieses Buch“ passt → das.'],
  ['„Das Fahrrad, ___ dort steht, gehört mir.“',['das','dass'],0,'„welches dort steht“ passt → das.'],
  ['„Mama sagt, ___ wir bald essen.“',['dass','das'],0,'„dieses/welches“ passt nicht → dass.'],
  ['Welche Probe hilft bei das/dass?',['dieses, jenes oder welches einsetzen','laut vorlesen','Wörter zählen'],0,'Passt eines davon → das. Sonst → dass.'],
  ['„Ich weiß, ___ ___ stimmt.“',['dass das','das dass','das das'],0,'Ich weiß, dass dieses stimmt → dass das.']]},
 {id:'ms-wortarten',em:'🏷️',name:'Wortarten für Profis',fr:[
  ['Was ist „auf“ in „Das Buch liegt auf dem Tisch“?',['Vorwort (Präposition)','Nomen','Verb'],0,'Vorwörter zeigen, wo etwas ist: auf, unter, neben, in.'],
  ['Was ist „und“?',['Bindewort (Konjunktion)','Fürwort','Adjektiv'],0,'Bindewörter verbinden: und, oder, aber, weil.'],
  ['Was ist „wir“?',['Fürwort (Pronomen)','Artikel','Nomen'],0,'Persönliche Fürwörter: ich, du, er, sie, es, wir, ihr, sie.'],
  ['Welches Wort ist ein Adjektiv?',['freundlich','Freund','befreunden'],0,'freundlich sagt, wie jemand ist.'],
  ['Was ist „weil“?',['Bindewort','Vorwort','Nomen'],0,'„weil“ leitet eine Begründung ein: …, weil es regnet.'],
  ['Wie heißt die Grundform von „sie lief“?',['laufen','liefen','lauft'],0,'Die Grundform (Infinitiv) endet auf -en: laufen.']]},
 {id:'ms-englisch',em:'🇬🇧',name:'Englisch: erste Sätze',fr:[
  ['„Ich heiße Lara.“ auf Englisch?',['My name is Lara.','I am name Lara.','Name me Lara.'],0,'My name is … / I am …'],
  ['„Wie alt bist du?“ auf Englisch?',['How old are you?','How are you?','Where are you?'],0,'How old are you? – I am ten.'],
  ['„I have got a dog.“ heißt …',['Ich habe einen Hund.','Ich bin ein Hund.','Ich mag Hunde.'],0,'have got = haben'],
  ['Welches Wort fehlt? „She ___ my sister.“',['is','am','are'],0,'I am, you are, he/she/it is.'],
  ['„Where do you live?“ heißt …',['Wo wohnst du?','Wie heißt du?','Was magst du?'],0,'I live in Austria.'],
  ['„I like apples.“ heißt …',['Ich mag Äpfel.','Ich habe Äpfel.','Ich esse Äpfel nicht.'],0,'like = mögen'],
  ['Wie fragst du nach der Farbe?',['What colour is it?','How colour?','Where is colour?'],0,'What colour is it? – It is red.']]}
];
function mittelschulFit(){
  farbe('#7c3aed');KONTEXT='Vorbereitung auf die 1. Klasse Mittelschule (Brücke von der 4. Klasse Volksschule)';const d=store.get('done',{});
  seite(`<h1>🚀 Fit für die Mittelschule</h1><p class="sub">Nach der 4. Klasse kommt die Mittelschule. Hier übst du schon das, was dort wichtig wird – leicht erklärt und Schritt für Schritt.</p>
    <div class="learn" style="margin-bottom:12px">💡 Du musst das noch nicht alles können! Jede Übung hier ist ein kleiner Vorsprung. 🌱</div>
    <div class="list">
     <div class="hdr">🏫 Ankommen</div>${MS_THEMEN.slice(0,1).map(t=>item(t,'q')).join('')}
     <div class="hdr">📐 Mathematik</div>${MS_MATHE.map(m=>item(m,'m')).join('')}
     <div class="hdr">📝 Deutsch</div>${MS_THEMEN.slice(1,4).map(t=>item(t,'q')).join('')}
     <button class="item" data-mod="artikel"><span class="em">🎯</span><span><b>Artikel-Trainer: des, dem, den</b><small>Mit Tricks und Übungen</small></span><span class="lvl">›</span></button>
     <div class="hdr">🇬🇧 Englisch</div>${MS_THEMEN.slice(4).map(t=>item(t,'q')).join('')}
     <button class="item" data-mod="sprachen"><span class="em">🌍</span><span><b>Sprachlektionen</b><small>Englisch, Türkisch, Italienisch & mehr – Schritt für Schritt</small></span><span class="lvl">›</span></button>
    </div>`,home);
  function item(t,k){return `<button class="item" data-${k}="${t.id}"><span class="em">${t.em}</span><span><b>${t.name}</b><small>${d[t.id]?'Bestes Ergebnis: '+d[t.id].best+' %':k==='m'?'mit Rechenweg':'8 Fragen'}</small></span></button>`;}
  app.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{const t=MS_THEMEN.find(x=>x.id===b.dataset.q);mcRunde({id:t.id,titel:t.name,fragen:themaFragen(t),nachher:()=>themaFragen(t),back:mittelschulFit});nachschub(t,'Vorbereitung auf die Mittelschule');});
  app.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{const m=MS_MATHE.find(x=>x.id===b.dataset.m);if(m.mc){const gen=()=>shuffle(Array.from({length:12},()=>m.gen())).filter((q,i,a)=>a.findIndex(x=>x.q===q.q)===i).slice(0,6);return mcRunde({id:m.id,titel:m.name,fragen:gen(),nachher:gen,back:mittelschulFit});}zahlRunde({id:m.id,titel:m.name,gen:()=>m.gen.call(m),anzahl:8,back:mittelschulFit});});
  app.querySelectorAll('[data-mod]').forEach(b=>b.onclick=()=>modul(b.dataset.mod));
}
