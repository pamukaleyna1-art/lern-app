/* ===== Inhalte 4. Klasse Volksschule ===== */

/* --- Mathe: Aufgaben werden jedes Mal neu erzeugt --- */
/* Mathe-Aufgaben stehen in mathe4.js */

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
 {id:'m-diktat',em:'🎧',name:'Diktat',small:'Die App liest vor, du schreibst mit – leichte Diktate',modul:'diktat'},
 {id:'m-rs',em:'🔤',name:'Rechtschreib-Trainer',small:'ie, ss/ß, ck/tz, Dehnungs-h – jedes Mal neue Wörter',modul:'rechtschreibung'},
 {id:'m-wb',em:'📕',name:'Wörterbuch',small:'Jedes Wort nachschlagen – auch österreichische Wörter',modul:'woerterbuch'},
 {id:'m-artikel',em:'🎯',name:'Artikel-Trainer: der, die, das',small:'Erklärung, Tricks & Übungen – auch des, dem, den',modul:'artikel'},
 {id:'m-wortschatz',em:'📖',name:'Neue Wörter lernen',small:'Wortschatz-Trainer – jeden Tag neue Wörter',modul:'wortschatz'},
 {id:'m-buecher',em:'📚',name:'Bücher & Geschichten',small:'Lesen, anhören – die Lern-Eule schreibt neue Bücher',modul:'buecher'},
 {id:'d-artikel',em:'🔤',name:'der, die oder das? – Schnelltest',artikel:true},
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
 {id:'m-kalender',em:'📅',name:'Kalender',small:'Tage, Wochen, Monate – mit Kalender zum Nachschauen',lokal:'kalenderSeite'},
 {id:'s-kalender',em:'🗓️',name:'Tage, Wochen & Monate',fr:[
  ['Wie viele Tage hat eine Woche?',['7','5','10'],0,'Montag bis Sonntag – das sind 7 Tage.'],
  ['Welcher Tag kommt nach Mittwoch?',['Donnerstag','Dienstag','Freitag'],0,'Montag, Dienstag, Mittwoch, Donnerstag …'],
  ['Heute ist Montag. Welcher Tag ist in 3 Tagen?',['Donnerstag','Mittwoch','Freitag'],0,'Dienstag (1), Mittwoch (2), Donnerstag (3).'],
  ['Heute ist Freitag. Welcher Tag war gestern?',['Donnerstag','Samstag','Mittwoch'],0,'Gestern ist der Tag davor.'],
  ['Welche Tage gehören zum Wochenende?',['Samstag und Sonntag','Freitag und Samstag','Sonntag und Montag'],0,'Samstag und Sonntag.'],
  ['Wie viele Monate hat ein Jahr?',['12','10','52'],0,'Jänner bis Dezember – 12 Monate.'],
  ['Welcher Monat kommt nach März?',['April','Mai','Februar'],0,'Jänner, Februar, März, April …'],
  ['Wie viele Tage hat der Februar (kein Schaltjahr)?',['28','30','31'],0,'Der Februar ist der kürzeste Monat: 28 Tage, im Schaltjahr 29.'],
  ['Wie viele Tage hat der Juli?',['31','30','28'],0,'Knöchel-Trick: Juli liegt auf einem Knöchel → 31 Tage.'],
  ['Wie viele Tage hat der April?',['30','31','28'],0,'April liegt in einer Lücke → 30 Tage.'],
  ['Wie viele Wochen hat ein Jahr ungefähr?',['52','12','100'],0,'Etwa 52 Wochen.'],
  ['Wie viele Tage sind 2 Wochen?',['14','12','10'],0,'2 · 7 = 14'],
  ['In welchem Monat ist Weihnachten?',['Dezember','November','Jänner'],0,'Am 24. Dezember.'],
  ['Mit welchem Monat beginnt das Jahr?',['Jänner','März','September'],0,'Mit dem Jänner (Januar).'],
  ['Wie viele Tage hat ein Schaltjahr?',['366','365','360'],0,'Alle 4 Jahre gibt es einen 29. Februar – dann sind es 366 Tage.']]},
 {id:'m-globus',em:'🌍',name:'Globus',small:'Dreh die Erde, entdecke Länder, Städte und Tiere',modul:'globus'},
 {id:'m-lexikon',em:'📸',name:'Bilder-Lexikon: Tiere & Pflanzen',small:'Echte Fotos – antippen, anhören, mehr lesen',modul:'lexikon'},
 {id:'m-bilderquiz',em:'🖼️',name:'Bilder-Quiz: Wer ist das?',small:'Erkennst du Tier oder Pflanze?',modul:'bilderquiz'},
 {id:'s-oesterreich',em:'<img src="../flags/at.svg" alt="" class="flg" style="height:1.1em">',name:'Österreich',fr:[
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
