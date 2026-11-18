/* ===== Inhalte 4. Klasse Volksschule ===== */

/* --- Mathe: Aufgaben werden jedes Mal neu erzeugt --- */
const schrift=(zeilen,op)=>`<pre style="font:900 1.6rem/1.35 ui-monospace,Menlo,monospace;text-align:right;width:max-content;margin:6px auto;padding:10px 16px;background:#f8fafc;border-radius:12px">${zeilen.map((z,i)=>(i===zeilen.length-1?op+' ':'  ')+String(z).padStart(Math.max(...zeilen.map(x=>String(x).length)),' ')).join('\n')}\n${'─'.repeat(Math.max(...zeilen.map(x=>String(x).length))+2)}</pre>`;
const MATHE=[
 {h:'🧠 Kopfrechnen'},
 {id:'m-1x1',em:'✖️',name:'Einmaleins gemischt',gen(){const a=rnd(2,10),b=rnd(2,10);return{q:`${a} · ${b} = ?`,sag:`${a} mal ${b}`,a:a*b,tipp:`Rechne zuerst 5 · ${b} = ${5*b} und dann weiter.`,e:`${a} · ${b} = ${a*b}`};}},
 {id:'m-div',em:'➗',name:'Geteilt im Kopf',gen(){const a=rnd(2,10),b=rnd(2,10);return{q:`${a*b} : ${a} = ?`,sag:`${a*b} geteilt durch ${a}`,a:b,tipp:`${a} mal wie viel ist ${a*b}?`,e:`${a} · ${b} = ${a*b}`};}},
 {id:'m-dopp',em:'👯',name:'Verdoppeln & Halbieren',gen(){if(Math.random()<.5){const n=rnd(11,499);return{q:`Verdopple ${n}`,a:2*n,tipp:'Verdopple Hunderter, Zehner und Einer einzeln.',e:`${n} + ${n} = ${2*n}`};}const n=rnd(6,499)*2;return{q:`Halbiere ${n}`,a:n/2,tipp:'Halbiere zuerst die Hunderter, dann den Rest.',e:`${n} : 2 = ${n/2}`};}},
 {id:'m-zehner',em:'🔟',name:'Mal und geteilt durch 10 und 100',gen(){const n=rnd(2,99),f=pick([10,100]);return Math.random()<.5?{q:`${n} · ${f} = ?`,sag:`${n} mal ${f}`,a:n*f,tipp:`Bei mal ${f} hängst du ${f===10?'eine Null':'zwei Nullen'} an.`,e:`${n} · ${f} = ${fmt(n*f)}`}:{q:`${fmt(n*f)} : ${f} = ?`,sag:`${n*f} geteilt durch ${f}`,a:n,tipp:`Bei geteilt durch ${f} streichst du ${f===10?'eine Null':'zwei Nullen'}.`,e:`${fmt(n*f)} : ${f} = ${n}`};}},
 {h:'🔢 Zahlen bis 1 Million'},
 {id:'m-runden',em:'🎯',name:'Runden',gen(){const n=rnd(1001,999999);const auf=pick([10,100,1000]);const r=Math.round(n/auf)*auf;const w={10:'Zehner',100:'Hunderter',1000:'Tausender'}[auf];return{q:`Runde ${fmt(n)} auf ${w}.`,a:r,tipp:`Schau auf die Ziffer RECHTS neben dem ${w}: 0–4 → abrunden, 5–9 → aufrunden.`,e:`${fmt(n)} ≈ ${fmt(r)}`};}},
 {id:'m-nachbar',em:'🏘️',name:'Nachbartausender',gen(){const n=rnd(1001,99999);if(n%1000===0)return this.gen();const k=Math.random()<.5;const r=k?Math.floor(n/1000)*1000:Math.ceil(n/1000)*1000;return{q:`Welcher ist der ${k?'kleinere':'größere'} Nachbartausender von ${fmt(n)}?`,a:r,tipp:'Lass die Hunderter, Zehner und Einer weg (= 000).',e:`${fmt(Math.floor(n/1000)*1000)} < ${fmt(n)} < ${fmt(Math.ceil(n/1000)*1000)}`};}},
 {h:'📝 Schriftlich rechnen'},
 {id:'m-splus',em:'➕',name:'Schriftlich addieren',gen(){const a=rnd(1000,49999),b=rnd(1000,49999);return{q:`${fmt(a)} + ${fmt(b)} = ?`,bild:schrift([a,b],'+'),a:a+b,tipp:'Fang bei den Einern rechts an. Wird es 10 oder mehr, schreib den Einer hin und merk dir 1 (Übertrag) für die nächste Stelle.',e:`${fmt(a)} + ${fmt(b)} = ${fmt(a+b)}`};}},
 {id:'m-sminus',em:'➖',name:'Schriftlich subtrahieren',gen(){const a=rnd(20000,99999),b=rnd(1000,a-1000);return{q:`${fmt(a)} − ${fmt(b)} = ?`,sag:`${a} minus ${b}`,bild:schrift([a,b],'−'),a:a-b,tipp:'Rechne von rechts nach links und ergänze nach oben: „Von 7 bis 12 sind 5 – 1 weiter.“',e:`${fmt(a)} − ${fmt(b)} = ${fmt(a-b)}`};}},
 {id:'m-smal',em:'✖️',name:'Schriftlich multiplizieren',gen(){const a=rnd(102,989),b=Math.random()<.6?rnd(2,9):rnd(11,49);return{q:`${a} · ${b} = ?`,sag:`${a} mal ${b}`,bild:`<pre style="font:900 1.6rem ui-monospace,Menlo,monospace;text-align:center;margin:6px auto">${a} · ${b}</pre>`,a:a*b,tipp:b<10?`Rechne ${b} · Einer, dann ${b} · Zehner, dann ${b} · Hunderter – mit Übertrag.`:`Rechne ${a} · ${Math.floor(b/10)*10} und ${a} · ${b%10} und zähle zusammen.`,e:`${a} · ${b} = ${fmt(a*b)}`};}},
 {id:'m-sdiv',em:'➗',name:'Schriftlich dividieren',gen(){const d=rnd(2,9),q=rnd(102,1999);return{q:`${fmt(d*q)} : ${d} = ?`,sag:`${d*q} geteilt durch ${d}`,bild:`<pre style="font:900 1.6rem ui-monospace,Menlo,monospace;text-align:center;margin:6px auto">${d*q} : ${d} = ?</pre>`,a:q,tipp:`Fang vorne an: Wie oft passt ${d} in die erste Ziffer (oder die ersten zwei)? Schreib es hin, rechne den Rest aus, hol die nächste Ziffer herunter.`,e:`${fmt(d*q)} : ${d} = ${fmt(q)} (Probe: ${fmt(q)} · ${d} = ${fmt(d*q)})`};}},
 {h:'📐 Größen & Geometrie'},
 {id:'m-laenge',em:'📏',name:'Längen umwandeln',gen(){const t=pick([['m','cm',100,rnd(2,9)],['km','m',1000,rnd(2,9)],['cm','mm',10,rnd(2,30)],['m','dm',10,rnd(2,9)]]);return Math.random()<.6?{q:`${t[3]} ${t[0]} = ? ${t[1]}`,a:t[3]*t[2],tipp:`1 ${t[0]} = ${t[2]} ${t[1]}`,e:`${t[3]} · ${t[2]} = ${t[3]*t[2]} ${t[1]}`}:{q:`${t[3]*t[2]} ${t[1]} = ? ${t[0]}`,a:t[3],tipp:`1 ${t[0]} = ${t[2]} ${t[1]}`,e:`${t[3]*t[2]} : ${t[2]} = ${t[3]} ${t[0]}`};}},
 {id:'m-gewicht',em:'⚖️',name:'Gewichte & Liter',gen(){const t=pick([['kg','g',1000],['l','ml',1000],['t','kg',1000]]);const n=rnd(2,9);const halb=Math.random()<.3;return halb?{q:`½ ${t[0]} = ? ${t[1]}`,sag:`ein halbes ${t[0]==='l'?'Liter':t[0]==='kg'?'Kilogramm':'Tonne'} sind wie viele ${t[1]}?`,a:t[2]/2,tipp:`1 ${t[0]} = ${t[2]} ${t[1]}, die Hälfte davon.`,e:`½ ${t[0]} = ${t[2]/2} ${t[1]}`}:{q:`${n} ${t[0]} = ? ${t[1]}`,a:n*t[2],tipp:`1 ${t[0]} = ${t[2]} ${t[1]}`,e:`${n} ${t[0]} = ${fmt(n*t[2])} ${t[1]}`};}},
 {id:'m-zeit',em:'⏰',name:'Zeit',gen(){const t=pick(['hmin','minsec','tagh','bis']);if(t==='hmin'){const h=rnd(1,5),m=pick([0,15,30,45]);return{q:`${h} h ${m} min = ? min`,sag:`${h} Stunden ${m} Minuten sind wie viele Minuten?`,a:h*60+m,tipp:'1 Stunde = 60 Minuten.',e:`${h} · 60 + ${m} = ${h*60+m} min`};}if(t==='minsec'){const m=rnd(2,9);return{q:`${m} min = ? s`,sag:`${m} Minuten sind wie viele Sekunden?`,a:m*60,tipp:'1 Minute = 60 Sekunden.',e:`${m} · 60 = ${m*60} s`};}if(t==='tagh'){const d=rnd(2,5);return{q:`${d} Tage = ? Stunden`,a:d*24,tipp:'1 Tag = 24 Stunden.',e:`${d} · 24 = ${d*24} h`};}const s=rnd(7,15),m1=pick([0,15,30]),dauer=pick([45,50,90,75]);const end=s*60+m1+dauer;return{q:`Der Film beginnt um ${s}:${String(m1).padStart(2,'0')} Uhr und dauert ${dauer} Minuten. Um wie viel Uhr endet er? (Schreib z. B. 1715 für 17:15)`,sag:`Der Film beginnt um ${s} Uhr ${m1} und dauert ${dauer} Minuten. Wann endet er?`,a:Math.floor(end/60)*100+end%60,tipp:'Rechne zuerst bis zur vollen Stunde, dann den Rest.',e:`Er endet um ${Math.floor(end/60)}:${String(end%60).padStart(2,'0')} Uhr.`};}},
 {id:'m-geld',em:'💶',name:'Geld',gen(){const t=pick(['cent','wechsel','kauf']);if(t==='cent'){const e=rnd(1,20),c=pick([0,10,20,50,75,95]);return{q:`${e},${String(c).padStart(2,'0')} € = ? Cent`,sag:`${e} Euro ${c} sind wie viele Cent?`,a:e*100+c,tipp:'1 € = 100 Cent.',e:`${e*100+c} Cent`};}if(t==='wechsel'){const p=rnd(2,18)*50;return{q:`Du zahlst mit 20 € und kaufst etwas um ${(p/100).toFixed(2).replace('.',',')} €. Wie viele CENT bekommst du zurück?`,a:2000-p,tipp:'Rechne in Cent: 20 € = 2000 Cent.',e:`2000 − ${p} = ${2000-p} Cent = ${((2000-p)/100).toFixed(2).replace('.',',')} €`};}const a=rnd(2,6),pr=rnd(2,9);return{q:`Ein Heft kostet ${pr} €. Wie viel Euro kosten ${a} Hefte?`,a:a*pr,tipp:'Malrechnung!',e:`${a} · ${pr} € = ${a*pr} €`};}},
 {id:'m-flaeche',em:'⬛',name:'Umfang & Fläche',gen(){const a=rnd(2,9),b=rnd(2,9);const u=Math.random()<.5;const bild=`<div class="vis"><div style="display:grid;grid-template-columns:repeat(${a},22px);gap:2px;background:#0ea5a4;padding:2px;border-radius:4px">${'<i style="width:22px;height:22px;background:#ccfbf1;display:block"></i>'.repeat(a*b)}</div></div><p class="sub" style="text-align:center">Rechteck: ${a} cm lang, ${b} cm breit (1 Kästchen = 1 cm²)</p>`;return u?{q:`Wie groß ist der UMFANG in cm?`,bild,a:2*(a+b),tipp:'Der Umfang ist der Weg rundherum: alle 4 Seiten zusammen.',e:`${a} + ${b} + ${a} + ${b} = ${2*(a+b)} cm`}:{q:`Wie groß ist die FLÄCHE in cm²?`,bild,a:a*b,tipp:'Zähle die Kästchen – oder rechne Länge mal Breite.',e:`${a} · ${b} = ${a*b} cm²`};}},
 {h:'📖 Textaufgaben'},
 {id:'m-text',em:'📖',name:'Sachaufgaben',gen(){return null;}}
];
MATHE.find(m=>m.id==='m-text').gen=function(){const T=[
   ()=>{const k=rnd(18,28),b=rnd(3,6);return{q:`In einen Bus passen ${k} Kinder. Wie viele Kinder passen in ${b} Busse?`,a:k*b,e:`${k} · ${b} = ${k*b}`,tipp:'Jeder Bus gleich viele → mal.'};},
   ()=>{const g=rnd(120,480),a=rnd(30,g-20);return{q:`Die Schule hat ${g} Kinder. ${a} sind auf Schikurs. Wie viele sind in der Schule?`,a:g-a,e:`${g} − ${a} = ${g-a}`,tipp:'Ein Teil ist weg → minus.'};},
   ()=>{const p=rnd(2,9)*12;return{q:`${p} Semmeln werden gerecht auf 12 Körbe verteilt. Wie viele sind in jedem Korb?`,a:p/12,e:`${p} : 12 = ${p/12}`,tipp:'Gerecht verteilen → geteilt.'};},
   ()=>{const t=rnd(3,6),k=rnd(12,25);return{q:`Oma radelt ${t} Tage lang jeden Tag ${k} km. Wie viele km sind das zusammen?`,a:t*k,e:`${t} · ${k} = ${t*k} km`,tipp:'Jeden Tag gleich viel → mal.'};},
   ()=>{const a=rnd(250,900),b=rnd(150,900);return{q:`Im Juni kamen ${a} Besucher in den Zoo, im Juli ${b}. Wie viele waren es zusammen?`,a:a+b,e:`${a} + ${b} = ${a+b}`,tipp:'Zusammen → plus.'};},
   ()=>{const st=rnd(3,8);return{q:`Lea kauft ${st} Kugeln Eis. Eine Kugel kostet 2 €. Sie zahlt mit 20 €. Wie viel Euro bekommt sie zurück?`,a:20-st*2,e:`${st} · 2 = ${st*2} €, 20 − ${st*2} = ${20-st*2} €`,tipp:'Zuerst ausrechnen, was das Eis kostet, dann vom Geld abziehen.'};},
   ()=>{const w=rnd(3,8);return{q:`Ein Schuljahr hat ungefähr 38 Wochen. Wie viele Tage sind ${w} Wochen?`,a:w*7,e:`${w} · 7 = ${w*7} Tage`,tipp:'1 Woche = 7 Tage.'};}];
   return pick(T)();};

/* --- Fragen (Frage, Antworten, Index richtig, Erklärung) --- */
const DEUTSCH=[
 {id:'d-wortarten',em:'🏷️',name:'Wortarten',fr:[
  ['Was ist „Schule“?',['Nomen (Namenwort)','Verb (Zeitwort)','Adjektiv (Eigenschaftswort)'],0,'Nomen kann man mit Artikel sagen: die Schule. Sie werden großgeschrieben.'],
  ['Was ist „springen“?',['Nomen','Verb (Zeitwort)','Adjektiv'],1,'Verben sagen, was jemand tut: ich springe, du springst.'],
  ['Was ist „mutig“?',['Adjektiv (Eigenschaftswort)','Nomen','Verb'],0,'Adjektive sagen, wie etwas ist: mutig, laut, grün.'],
  ['Welches Wort ist ein Nomen?',['schnell','Freude','lachen','und'],1,'die Freude – man kann einen Artikel davorsetzen.'],
  ['Welches Wort ist ein Verb?',['Tisch','groß','schreiben','leise'],2,'schreiben: ich schreibe – das ist ein Tun.'],
  ['Welches Wort ist ein Adjektiv?',['Hund','klein','laufen','der'],1,'klein sagt, wie etwas ist.'],
  ['Was ist „er“ in „Er spielt Fußball“?',['Fürwort (Pronomen)','Nomen','Verb'],0,'Fürwörter stehen für ein Nomen: ich, du, er, sie, es, wir, ihr, sie.'],
  ['Was ist „die“ in „die Katze“?',['Artikel (Begleiter)','Adjektiv','Verb'],0,'der, die, das, ein, eine sind Artikel.'],
  ['Welche Wortart schreibt man immer groß?',['Nomen','Verben','Adjektive'],0,'Nomen schreibt man groß – und jedes Wort am Satzanfang.'],
  ['„Das Lesen macht Spaß.“ – Was ist „Lesen“ hier?',['Nomen','Verb','Adjektiv'],0,'Mit Artikel davor wird das Verb zum Nomen → groß!']]},
 {id:'d-artikel',em:'🎯',name:'der, die oder das?',artikel:true},
 {id:'d-mehrzahl',em:'👯',name:'Einzahl & Mehrzahl',fr:[
  ['Mehrzahl von „das Haus“?',['die Häuser','die Hause','die Hausen'],0,'Aus a wird ä, -er kommt dazu.'],
  ['Mehrzahl von „die Maus“?',['die Mause','die Mäuse','die Mäusen'],1,'au wird zu äu.'],
  ['Mehrzahl von „der Baum“?',['die Baume','die Bäumer','die Bäume'],2,'Baum → Bäume'],
  ['Mehrzahl von „das Kind“?',['die Kinder','die Kinds','die Kinde'],0,'Kind → Kinder'],
  ['Mehrzahl von „die Blume“?',['die Blumes','die Blumen','die Blümer'],1,'Blume → Blumen'],
  ['Einzahl von „die Äpfel“?',['der Apfel','der Äpfel','die Apfel'],0,'Äpfel → Apfel. Ä in der Mehrzahl, A in der Einzahl.'],
  ['Mehrzahl von „das Auto“?',['die Autos','die Auten','die Autoe'],0,'Auto → Autos'],
  ['Welcher Artikel steht in der Mehrzahl immer?',['der','die','das'],1,'In der Mehrzahl heißt es immer „die“.']]},
 {id:'d-zeit',em:'⏰',name:'Zeitformen',fr:[
  ['„Ich spiele.“ – Welche Zeitform?',['Gegenwart','Mitvergangenheit','Zukunft'],0,'Es passiert jetzt.'],
  ['„Ich spielte.“ – Welche Zeitform?',['Gegenwart','Mitvergangenheit','Vergangenheit'],1,'Mitvergangenheit (Präteritum): ich spielte, ich lief.'],
  ['„Ich habe gespielt.“ – Welche Zeitform?',['Vergangenheit','Zukunft','Gegenwart'],0,'Vergangenheit (Perfekt): habe/bin + gespielt.'],
  ['„Ich werde spielen.“ – Welche Zeitform?',['Zukunft','Gegenwart','Mitvergangenheit'],0,'Zukunft: werden + Grundform.'],
  ['Mitvergangenheit von „ich gehe“?',['ich ging','ich gehte','ich bin gegangen'],0,'gehen ist unregelmäßig: ich ging.'],
  ['Vergangenheit von „wir laufen“?',['wir sind gelaufen','wir haben gelaufen','wir liefen'],0,'Bei Bewegung oft „sein“: wir sind gelaufen.'],
  ['Mitvergangenheit von „sie sieht“?',['sie sah','sie seht','sie sahte'],0,'sehen → sah'],
  ['Mitvergangenheit von „er hat“?',['er hatte','er habte','er hat gehabt'],0,'haben → hatte'],
  ['„Morgen fahren wir ans Meer.“ – Wann passiert das?',['in der Zukunft','in der Vergangenheit','gerade jetzt'],0,'„Morgen“ zeigt: es kommt erst.']]},
 {id:'d-satz',em:'🧱',name:'Satzglieder',fr:[
  ['„Der Hund bellt.“ – Wer oder was bellt?',['Der Hund','bellt'],0,'Das ist das Subjekt (Satzgegenstand). Frage: Wer oder was?'],
  ['„Die Kinder lachen laut.“ – Was ist das Prädikat (Satzaussage)?',['Die Kinder','lachen','laut'],1,'Das Prädikat ist das Verb: Was tun sie? – lachen.'],
  ['Mit welcher Frage findest du das Subjekt?',['Wer oder was?','Wann?','Wo?'],0,'Subjekt: Wer oder was tut etwas?'],
  ['„Am Montag schreibt Mia einen Test.“ – Wer schreibt?',['Am Montag','Mia','einen Test'],1,'Mia ist das Subjekt.'],
  ['Wie viele Satzglieder hat „Paul | liest | ein Buch“?',['2','3','5'],1,'Mach die Umstellprobe: Ein Buch liest Paul. Es bleiben 3 Teile.'],
  ['Was ist die Umstellprobe?',['Satzglieder umstellen, der Sinn bleibt','Wörter weglassen','Den Satz rückwärts lesen'],0,'Was beim Umstellen zusammenbleibt, ist ein Satzglied.'],
  ['„Im Garten blühen die Blumen.“ – Subjekt?',['Im Garten','blühen','die Blumen'],2,'Wer oder was blüht? – die Blumen.']]},
 {id:'d-rs',em:'✏️',name:'Rechtschreibung',fr:[
  ['Wie schreibt man es richtig?',['die Strasse','die Straße','die Strase'],1,'Nach langem Selbstlaut (a lang) → ß.'],
  ['Wie schreibt man es richtig?',['der Fluß','der Fluss','der Flus'],1,'Nach kurzem Selbstlaut → ss.'],
  ['Wie schreibt man es richtig?',['die Biene','die Bine','die Bihne'],0,'Langes i → meistens ie.'],
  ['Wie schreibt man es richtig?',['backen','baken','bakken'],0,'Nach kurzem Selbstlaut → ck.'],
  ['Wie schreibt man es richtig?',['die Katze','die Kaze','die Kazze'],0,'Nach kurzem Selbstlaut → tz.'],
  ['Wie schreibt man es richtig?',['die Sonne','die Sone','die Sohne'],0,'Kurzes o → doppelter Mitlaut nn.'],
  ['Wie schreibt man es richtig?',['fahren','faren','farhen'],0,'Dehnungs-h: fahren, Fahrrad.'],
  ['Wie schreibt man es richtig?',['die Bäume','die Beume'],0,'Baum → Bäume: au wird äu.'],
  ['Welches Wort schreibt man groß?',['(S/s)chnell','(L/l)aufen','(F/f)reundschaft'],2,'Freundschaft ist ein Nomen (die Freundschaft).'],
  ['Ableiten hilft: „Er lä_ft“',['äu','eu'],0,'Er läuft – kommt von laufen (au → äu).']]},
 {id:'d-rede',em:'💬',name:'Wörtliche Rede & Satzzeichen',fr:[
  ['Welcher Satz ist richtig?',['Lea sagt: „Ich komme mit.“','Lea sagt „Ich komme mit“.','Lea sagt: Ich komme mit.'],0,'Begleitsatz, Doppelpunkt, Anführungszeichen unten und oben.'],
  ['Welches Zeichen kommt nach dem Begleitsatz vorne?',['Doppelpunkt :','Beistrich ,','Fragezeichen ?'],0,'Mama ruft: „Essen ist fertig!“'],
  ['„Wie spät ist es__“',['?','.','!'],0,'Eine Frage endet mit Fragezeichen.'],
  ['„Pass auf__“ schreit Tom.',['!','?','.'],0,'Ausruf → Rufzeichen.'],
  ['Wohin kommt der Beistrich? „Ich esse Äpfel Birnen und Bananen.“',['nach Äpfel','nach Birnen','nach Bananen'],0,'Bei Aufzählungen: Äpfel, Birnen und Bananen. Vor „und“ kein Beistrich.']]},
 {id:'d-wortbau',em:'🧩',name:'Wörter bauen',fr:[
  ['Welches Wort gehört NICHT zur Wortfamilie „fahren“?',['Fahrrad','Fahrer','Farbe','Abfahrt'],2,'Farbe hat nichts mit fahren zu tun.'],
  ['„Haus“ + „Tür“ = ?',['die Haustür','das Haustür','der Haustür'],0,'Das letzte Wort bestimmt den Artikel: die Tür → die Haustür.'],
  ['Steigere: groß – größer – ?',['am größten','am großesten','am größesten'],0,'groß, größer, am größten'],
  ['Steigere: gut – ?',['guter','besser','güter'],1,'gut, besser, am besten – unregelmäßig!'],
  ['Gegenteil von „laut“?',['leise','langsam','lustig'],0,'laut ↔ leise'],
  ['Was bedeutet „Paradeiser“?',['Tomate','Kartoffel','Paprika'],0,'In Österreich sagt man Paradeiser zur Tomate.'],
  ['Welches Wort hat die Vorsilbe „ver-“?',['verlieren','fahren','Rose'],0,'ver-lieren']]}
];
const SACH=[
 {id:'s-oesterreich',em:'🇦🇹',name:'Österreich',fr:[
  ['Wie viele Bundesländer hat Österreich?',['7','9','12'],1,'Wien, Niederösterreich, Oberösterreich, Salzburg, Tirol, Vorarlberg, Kärnten, Steiermark, Burgenland.'],
  ['Hauptstadt von Salzburg?',['Salzburg','Linz','Hallein'],0,'Das Bundesland und die Stadt heißen gleich.'],
  ['Hauptstadt von Oberösterreich?',['Graz','Linz','Wels'],1,'Linz liegt an der Donau.'],
  ['Hauptstadt von Tirol?',['Innsbruck','Kufstein','Lienz'],0,'Innsbruck – mitten in den Bergen.'],
  ['Hauptstadt der Steiermark?',['Graz','Leoben','Klagenfurt'],0,'Graz ist die zweitgrößte Stadt Österreichs.'],
  ['Hauptstadt von Kärnten?',['Villach','Klagenfurt','Spittal'],1,'Klagenfurt am Wörthersee.'],
  ['Hauptstadt von Vorarlberg?',['Bregenz','Dornbirn','Feldkirch'],0,'Bregenz am Bodensee.'],
  ['Hauptstadt des Burgenlands?',['Eisenstadt','Neusiedl','Oberwart'],0,'Eisenstadt.'],
  ['Hauptstadt von Niederösterreich?',['Wien','St. Pölten','Krems'],1,'St. Pölten – nicht Wien! Wien ist ein eigenes Bundesland.'],
  ['Welcher ist der höchste Berg Österreichs?',['Großglockner','Dachstein','Schneeberg'],0,'Der Großglockner ist 3 798 m hoch.'],
  ['Welcher Fluss fließt durch Wien?',['Donau','Salzach','Inn'],0,'Die Donau ist der längste Fluss Österreichs.'],
  ['Welcher Fluss fließt durch die Stadt Salzburg?',['Salzach','Donau','Mur'],0,'Die Salzach.'],
  ['Welches Land ist KEIN Nachbarland von Österreich?',['Deutschland','Frankreich','Italien','Ungarn'],1,'Nachbarn: Deutschland, Tschechien, Slowakei, Ungarn, Slowenien, Italien, Schweiz, Liechtenstein.'],
  ['Welche Farben hat die österreichische Fahne?',['Rot-Weiß-Rot','Schwarz-Rot-Gold','Blau-Weiß'],0,'Rot-Weiß-Rot.']]},
 {id:'s-koerper',em:'🫀',name:'Mein Körper',fr:[
  ['Was pumpt das Blut durch den Körper?',['das Herz','die Lunge','der Magen'],0,'Das Herz ist ein Muskel und schlägt ungefähr 80-mal pro Minute.'],
  ['Womit atmen wir?',['mit der Lunge','mit der Leber','mit den Nieren'],0,'In der Lunge kommt Sauerstoff ins Blut.'],
  ['Wie viele Sinne hat der Mensch?',['3','5','10'],1,'Sehen, Hören, Riechen, Schmecken, Tasten.'],
  ['Mit welchem Sinnesorgan riechen wir?',['Nase','Ohr','Haut'],0,'Die Nase.'],
  ['Was schützt das Gehirn?',['der Schädel','die Rippen','das Becken'],0,'Der Schädel ist ein harter Knochen.'],
  ['Was schützt Herz und Lunge?',['der Brustkorb (Rippen)','die Wirbelsäule','der Oberschenkel'],0,'Die Rippen bilden einen Korb.'],
  ['Wo beginnt die Verdauung?',['im Mund','im Darm','im Magen'],0,'Schon beim Kauen fängt die Verdauung an.'],
  ['Was ist gesund für die Zähne?',['zweimal am Tag putzen','viel Zucker','nie zum Zahnarzt'],0,'Morgens und abends putzen!']]},
 {id:'s-natur',em:'🌲',name:'Tiere & Pflanzen',fr:[
  ['Welches Tier hält Winterschlaf?',['Igel','Fuchs','Reh'],0,'Igel, Siebenschläfer und Murmeltier halten Winterschlaf.'],
  ['Was brauchen Pflanzen zum Wachsen?',['Licht, Wasser, Luft','nur Erde','Dunkelheit'],0,'Licht, Wasser und Luft (und Nährstoffe aus dem Boden).'],
  ['Welches Tier ist ein Säugetier?',['Delfin','Hai','Forelle'],0,'Delfine säugen ihre Jungen mit Milch.'],
  ['Wie heißt das Junge vom Reh?',['Kitz','Fohlen','Ferkel'],0,'Rehkitz.'],
  ['Welcher Baum ist ein Nadelbaum?',['Fichte','Buche','Eiche'],0,'Fichte, Tanne, Kiefer und Lärche haben Nadeln.'],
  ['Welcher Nadelbaum verliert im Herbst seine Nadeln?',['Lärche','Fichte','Tanne'],0,'Die Lärche wird im Herbst goldgelb und verliert die Nadeln.'],
  ['Was macht die Biene für Blumen?',['Sie bestäubt sie','Sie frisst sie','Sie gießt sie'],0,'Sie trägt Blütenstaub von Blüte zu Blüte.'],
  ['Wovon ernährt sich ein Pflanzenfresser?',['von Pflanzen','von Fleisch','von beidem'],0,'z. B. Kuh, Reh, Hase.']]},
 {id:'s-wasser',em:'💧',name:'Wasser & Wetter',fr:[
  ['Bei wie viel Grad gefriert Wasser?',['0 °C','10 °C','100 °C'],0,'Unter 0 °C wird Wasser zu Eis.'],
  ['Bei wie viel Grad kocht Wasser?',['50 °C','100 °C','200 °C'],1,'Bei 100 °C wird Wasser zu Dampf.'],
  ['Was passiert, wenn die Sonne Wasser erwärmt?',['Es verdunstet','Es gefriert','Es wird schwerer'],0,'Wasserdampf steigt auf, bildet Wolken – dann regnet es. Das ist der Wasserkreislauf.'],
  ['Womit misst man die Temperatur?',['Thermometer','Lineal','Waage'],0,'Thermometer.'],
  ['Aus Wolken fällt im Winter oft …',['Schnee','Sand','Hagel im Sommer'],0,'Schnee sind gefrorene Wassertropfen als Kristalle.'],
  ['Wie viel Wasser sollten Kinder ungefähr am Tag trinken?',['1 Liter','5 Liter','fast nichts'],0,'Etwa 1 bis 1,5 Liter.']]},
 {id:'s-verkehr',em:'🚲',name:'Verkehr & Radfahren',fr:[
  ['Welche Farbe hat das Stoppschild?',['rot','blau','gelb'],0,'Das Stoppschild ist ein rotes Achteck: Anhalten!'],
  ['Was muss ein Fahrrad vorne haben?',['weißes Licht','rotes Licht','grünes Licht'],0,'Vorne weiß, hinten rot.'],
  ['Was schützt beim Radfahren den Kopf?',['der Helm','die Mütze','die Kapuze'],0,'Immer Helm tragen!'],
  ['Ein blaues rundes Schild mit Fahrrad bedeutet …',['Radweg','Rad fahren verboten','Fahrradgeschäft'],0,'Gebotszeichen: Hier ist der Radweg.'],
  ['Wie zeigst du an, dass du links abbiegst?',['linken Arm ausstrecken','rechten Arm ausstrecken','klingeln'],0,'Rechtzeitig Handzeichen geben.'],
  ['Ab wie vielen Jahren darfst du in Österreich mit Radfahrausweis allein fahren?',['ab 10 Jahren','ab 6 Jahren','ab 16 Jahren'],0,'Mit dem Radfahrausweis darf man ab 10 allein fahren – wer die Prüfung in der 4. Klasse macht, schon ab 9.'],
  ['Was bedeutet ein dreieckiges Schild mit rotem Rand?',['Gefahr/Achtung','Verbot','Parkplatz'],0,'Gefahrenzeichen warnen dich.']]},
 {id:'s-zeit',em:'🏰',name:'Früher & heute',fr:[
  ['Wie viele Tage hat ein Jahr?',['365 (im Schaltjahr 366)','300','400'],0,'Alle 4 Jahre gibt es ein Schaltjahr mit dem 29. Februar.'],
  ['Wie sagt man in Österreich meistens zum ersten Monat des Jahres?',['Jänner','Feber','Mai'],0,'In Österreich sagt man meistens Jänner statt Januar.'],
  ['Wer baute vor rund 2000 Jahren Städte bei uns, z. B. Iuvavum (Salzburg)?',['die Römer','die Ritter','die Wikinger'],0,'Die Römer nannten Salzburg „Iuvavum“.'],
  ['Wo wohnten Ritter im Mittelalter?',['auf Burgen','in Hochhäusern','in Zelten'],0,'Zum Beispiel auf der Festung Hohensalzburg.'],
  ['Was gab es früher noch NICHT?',['Handys','Kerzen','Pferdekutschen'],0,'Handys gibt es erst seit ungefähr 40 Jahren.'],
  ['Welcher berühmte Komponist wurde in Salzburg geboren?',['Wolfgang Amadeus Mozart','Ludwig van Beethoven','Johann Strauss'],0,'Mozart wurde 1756 in der Getreidegasse geboren.']]},
 {id:'s-umwelt',em:'♻️',name:'Umwelt & Müll',fr:[
  ['Wohin kommt eine leere Plastikflasche?',['Gelbe Tonne / Gelber Sack','Biomüll','Altpapier'],0,'Plastikverpackungen in den gelben Sack/die gelbe Tonne.'],
  ['Wohin kommen Bananenschalen?',['Biomüll','Restmüll','Altglas'],0,'Bioabfall wird zu Kompost.'],
  ['Wohin kommt eine alte Zeitung?',['Altpapier','Gelber Sack','Biomüll'],0,'Altpapier wird wiederverwertet.'],
  ['Wohin gehören leere Batterien?',['Sammelstelle/Geschäft','Restmüll','Biomüll'],0,'Batterien sind giftig – immer zur Sammelstelle!'],
  ['Wie kannst du Energie sparen?',['Licht ausschalten, wenn du rausgehst','Fenster im Winter offen lassen','den Fernseher laufen lassen'],0,'Jedes ausgeschaltete Licht hilft.']]}
];
const ENGLISCH=[
 {id:'e-farben',em:'🎨',name:'Colours',w:[['red','rot','🔴'],['blue','blau','🔵'],['green','grün','🟢'],['yellow','gelb','🟡'],['black','schwarz','⚫'],['white','weiß','⚪'],['orange','orange','🟠'],['purple','lila','🟣'],['brown','braun','🟤'],['pink','rosa','🩷']]},
 {id:'e-tiere',em:'🐶',name:'Animals',w:[['dog','Hund','🐶'],['cat','Katze','🐱'],['horse','Pferd','🐴'],['cow','Kuh','🐮'],['pig','Schwein','🐷'],['mouse','Maus','🐭'],['bird','Vogel','🐦'],['fish','Fisch','🐟'],['rabbit','Hase','🐰'],['elephant','Elefant','🐘'],['lion','Löwe','🦁'],['monkey','Affe','🐒']]},
 {id:'e-familie',em:'👨‍👩‍👧',name:'Family',w:[['mother','Mutter','👩'],['father','Vater','👨'],['sister','Schwester','👧'],['brother','Bruder','👦'],['grandma','Oma','👵'],['grandpa','Opa','👴'],['baby','Baby','👶'],['aunt','Tante','👩‍🦰'],['uncle','Onkel','🧔']]},
 {id:'e-essen',em:'🍎',name:'Food',w:[['apple','Apfel','🍎'],['banana','Banane','🍌'],['bread','Brot','🍞'],['milk','Milch','🥛'],['water','Wasser','💧'],['cheese','Käse','🧀'],['egg','Ei','🥚'],['cake','Kuchen','🍰'],['ice cream','Eis','🍦'],['carrot','Karotte','🥕'],['strawberry','Erdbeere','🍓']]},
 {id:'e-schule',em:'🎒',name:'School things',w:[['pencil','Bleistift','✏️'],['book','Buch','📕'],['ruler','Lineal','📏'],['scissors','Schere','✂️'],['school bag','Schultasche','🎒'],['rubber','Radiergummi','🧽'],['teacher','Lehrerin/Lehrer','🧑‍🏫'],['chair','Sessel','🪑'],['table','Tisch','🟫']]},
 {id:'e-koerper',em:'🖐️',name:'Body',w:[['head','Kopf','🙂'],['hand','Hand','✋'],['foot','Fuß','🦶'],['eye','Auge','👁️'],['ear','Ohr','👂'],['nose','Nase','👃'],['mouth','Mund','👄'],['arm','Arm','💪'],['leg','Bein','🦵'],['hair','Haare','💇']]},
 {id:'e-zahlen',em:'🔢',name:'Numbers',w:[['one','eins','1️⃣'],['two','zwei','2️⃣'],['three','drei','3️⃣'],['four','vier','4️⃣'],['five','fünf','5️⃣'],['six','sechs','6️⃣'],['seven','sieben','7️⃣'],['eight','acht','8️⃣'],['nine','neun','9️⃣'],['ten','zehn','🔟'],['twelve','zwölf','🕛'],['twenty','zwanzig','2️⃣0️⃣']]},
 {id:'e-wetter',em:'🌦️',name:'Weather & Days',w:[['sunny','sonnig','☀️'],['rainy','regnerisch','🌧️'],['windy','windig','💨'],['snowy','schneereich','❄️'],['cloudy','bewölkt','☁️'],['Monday','Montag','📅'],['Friday','Freitag','📅'],['Sunday','Sonntag','📅'],['summer','Sommer','🏖️'],['winter','Winter','⛄']]},
 {id:'e-kleidung',em:'👕',name:'Clothes',w:[['T-shirt','T-Shirt','👕'],['trousers','Hose','👖'],['dress','Kleid','👗'],['shoes','Schuhe','👟'],['hat','Hut','👒'],['jacket','Jacke','🧥'],['socks','Socken','🧦'],['skirt','Rock','👗'],['cap','Kappe','🧢']]}
];
const ARTIKEL4=[['Hund','der','🐕'],['Baum','der','🌳'],['Tisch','der',''],['Apfel','der','🍎'],['Schlüssel','der','🔑'],['Montag','der','📅'],['Sommer','der','🏖️'],['Lehrer','der','👨‍🏫'],['Ball','der','⚽'],['Vogel','der','🐦'],['Bleistift','der','✏️'],['Käse','der','🧀'],
 ['Katze','die','🐈'],['Blume','die','🌷'],['Sonne','die','☀️'],['Schule','die','🏫'],['Zeitung','die','📰'],['Freundschaft','die','🤝'],['Bäckerei','die','🥐'],['Lehrerin','die','👩‍🏫'],['Banane','die','🍌'],['Tür','die','🚪'],['Maus','die','🐭'],['Gabel','die','🍴'],['Tasche','die','👜'],
 ['Haus','das','🏠'],['Auto','das','🚗'],['Buch','das','📖'],['Kind','das','🧒'],['Mädchen','das','👧'],['Kätzchen','das','🐱'],['Fahrrad','das','🚲'],['Pferd','das','🐴'],['Ei','das','🥚'],['Fenster','das','🪟'],['Bett','das','🛏️'],['Wasser','das','💧'],['Messer','das','🔪']];
function artikelErkl(w,g){const W=w.toLowerCase();if(/chen$/.test(W))return'Wörter auf -chen sind immer „das“.';if(/(ung|schaft|ei)$/.test(W)&&g==='die')return'Wörter auf -ung, -schaft, -ei sind immer „die“.';if(/in$/.test(W)&&g==='die')return'Weibliche Personen auf -in: die.';if(W==='montag')return'Wochentage sind immer „der“.';if(W==='sommer')return'Jahreszeiten sind immer „der“.';if(W==='fahrrad'||W==='bleistift')return'Das letzte Wort bestimmt den Artikel ('+(W==='fahrrad'?'das Rad':'der Stift')+').';return'Lerne jedes Nomen immer mit Artikel: '+g+' '+w+'.';}

/* Englisch-Fragen aus Wortlisten erzeugen */
function englischFragen(t){
  return shuffle(t.w).slice(0,8).map(([en,de,em],i)=>{
    const andere=shuffle(t.w.filter(x=>x[0]!==en)).slice(0,2);
    if(i%3===0) return {q:`${em} Was heißt „${de}“ auf Englisch?`,sag:de,o:[en,...andere.map(x=>x[0])],a:0,e:`${de} = ${en}`};
    if(i%3===1) return {q:`${em} „${en}“ heißt auf Deutsch …`,sag:en,lang:'en',o:[de,...andere.map(x=>x[1])],a:0,e:`${en} = ${de}`};
    return {q:`🎧 Hör gut zu! Welches Bild passt?`,sag:en,lang:'en',o:[em+' '+de,...andere.map(x=>x[2]+' '+x[1])],a:0,e:`${en} = ${de}`,bild:`<div class="row" style="justify-content:center"><button class="btn" data-say="${esc(en)}" data-lang="en">🔊 Anhören</button></div>`};
  });
}

/* Lern-Eule liefert neue Fragen nach */
async function nachschub(t,fach){
  if(!KI||nachschub.laeuft) return; const extra=store.get('aiq_'+t.id,[]); if(extra.length>=60) return; nachschub.laeuft=true;
  try{const r=await KI(`Erstelle 8 NEUE Übungsfragen für ein Kind der 4. Klasse Volksschule in Österreich, Fach ${fach}, Thema „${t.name}“. Kindgerecht, fehlerfreies Deutsch, österreichische Begriffe (Jänner, Paradeiser, Sessel). Jede Frage mit 3 Antworten, genau eine richtig, und kurzer Erklärung. Nicht wiederholen: ${[...(t.fr||[]),...extra].map(q=>q[0]).slice(-30).join(' | ')}
Antworte NUR mit JSON: {"fragen":[{"frage":"…","antworten":["…","…","…"],"richtig":0,"erklaerung":"…"}]}`,{max_tokens:2500});
    const txt=r.text;const d=JSON.parse(txt.slice(txt.indexOf('{'),txt.lastIndexOf('}')+1));
    const neu=(d.fragen||[]).filter(f=>f&&f.frage&&Array.isArray(f.antworten)&&f.antworten.length>=2&&f.richtig>=0&&f.richtig<f.antworten.length).map(f=>[String(f.frage),f.antworten.map(String),+f.richtig,String(f.erklaerung||'')]);
    store.set('aiq_'+t.id,[...extra,...neu].slice(-60));
  }catch(e){} finally{nachschub.laeuft=false;}
}
function themaFragen(t){
  const pool=[...(t.fr||[]),...store.get('aiq_'+t.id,[])];
  const gesehen=store.get('qg_'+t.id,[]);const frisch=pool.filter(q=>!gesehen.includes(q[0]));
  const wahl=(frisch.length>=6?shuffle(frisch):[...shuffle(frisch),...shuffle(pool.filter(q=>gesehen.includes(q[0])))]).slice(0,8);
  store.set('qg_'+t.id,[...gesehen,...wahl.map(q=>q[0])].slice(-Math.max(8,pool.length-5)));
  return wahl.map(([q,o,a,e])=>({q,o,a,e}));
}
