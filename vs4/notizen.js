/* ===== Notizen: für jedes Kind eigene Notizen, auch mit Foto ===== */
(function(){
  const btn=document.createElement('button');btn.id='notizBtn';btn.textContent='📒 Notiz';
  btn.style.cssText='position:fixed;left:14px;bottom:calc(14px + env(safe-area-inset-bottom));z-index:50;border:none;border-radius:999px;padding:13px 18px;font-weight:900;font-size:1rem;color:#fff;background:linear-gradient(135deg,#14b8a6,#22c55e);box-shadow:0 8px 22px rgba(20,184,166,.35);font-family:inherit';
  document.body.appendChild(btn);
  const sichtbar=()=>{btn.style.display=KIND&&kindInfo()?'':'none';};
  new MutationObserver(sichtbar).observe(app,{childList:true}); sichtbar();
  btn.onclick=()=>notizListe();
})();
const notizen=()=>store.get('notizen',[]);
function bildKlein(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>{const img=new Image();img.onload=()=>{const m=900,s=Math.min(1,m/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*s);c.height=Math.round(img.height*s);c.getContext('2d').drawImage(img,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.7));};img.onerror=rej;img.src=r.result;};r.onerror=rej;r.readAsDataURL(file);});}
function notizOverlay(html){document.querySelectorAll('.overlay.notiz').forEach(o=>o.remove());const ov=document.createElement('div');ov.className='overlay notiz';ov.innerHTML=`<div class="card" style="overflow-y:auto">${html}</div>`;document.body.appendChild(ov);ov.onclick=e=>{if(e.target===ov)ov.remove();};return ov;}
function notizListe(){
  const L=notizen();
  const ov=notizOverlay(`<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><span style="font-size:2rem">📒</span><h2 style="margin:0">Meine Notizen</h2><button class="btn ghost" style="margin-left:auto;padding:8px 14px" id="nzu">✕</button></div>
    <button class="btn" id="nneu" style="width:100%;margin-bottom:12px">➕ Neue Notiz</button>
    <div class="list">${L.map((n,i)=>`<button class="item" data-i="${i}">${n.foto?`<img src="${n.foto}" style="width:52px;height:52px;object-fit:cover;border-radius:10px">`:'<span class="em">📝</span>'}<span style="min-width:0"><b style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(n.titel||'Notiz')}</b><small>${new Date(n.t).toLocaleDateString('de-AT')} · ${esc((n.text||'').slice(0,50))}</small></span></button>`).join('')||'<p class="sub" style="text-align:center">Noch keine Notizen. Hier kannst du dir merken, was wichtig ist – zum Beispiel Hausübungen oder Merksätze. ✏️</p>'}</div>`);
  ov.querySelector('#nzu').onclick=()=>ov.remove();
  ov.querySelector('#nneu').onclick=()=>notizEdit(null);
  ov.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>notizEdit(+b.dataset.i));
}
function notizEdit(i){
  const n=i==null?{titel:'',text:'',foto:null}:{...notizen()[i]};
  const ov=notizOverlay(`<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><h2 style="margin:0">${i==null?'Neue Notiz':'Notiz'}</h2><button class="btn ghost" style="margin-left:auto;padding:8px 14px" id="nzur">← Liste</button></div>
    <input class="txt" id="nt" placeholder="Überschrift (z. B. Hausübung Mathe)" value="${esc(n.titel||'')}" style="max-width:none;margin-bottom:10px">
    <textarea id="nx" rows="7" placeholder="Schreib hier deine Notiz …" style="width:100%;font:inherit;font-size:1.1rem;font-weight:600;padding:12px;border:3px solid var(--line);border-radius:14px">${esc(n.text||'')}</textarea>
    <div id="nf" style="margin-top:10px">${n.foto?`<img src="${n.foto}" style="max-width:100%;border-radius:14px">`:''}</div>
    <div class="row"><label class="btn ghost" style="cursor:pointer">📷 ${n.foto?'Anderes Foto':'Foto dazu'}<input type="file" accept="image/*" id="nfile" hidden></label>${n.foto?'<button class="btn ghost" id="nfweg">Foto entfernen</button>':''}${('speechSynthesis' in window)?'<button class="btn ghost" id="nvor">🔊 Vorlesen</button>':''}</div>
    <div class="row"><button class="btn" id="nsave">💾 Speichern</button>${i!=null?'<button class="btn ghost" id="ndel">🗑️ Löschen</button>':''}</div><p class="ruhe" id="nmsg"></p>`);
  const $o=s=>ov.querySelector(s);
  $o('#nzur').onclick=notizListe;
  $o('#nfile').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{n.foto=await bildKlein(f);$o('#nf').innerHTML=`<img src="${n.foto}" style="max-width:100%;border-radius:14px">`;}catch(err){$o('#nmsg').textContent='Das Foto konnte nicht geladen werden.';}};
  if($o('#nfweg')) $o('#nfweg').onclick=()=>{n.foto=null;$o('#nf').innerHTML='';};
  if($o('#nvor')) $o('#nvor').onclick=e=>sprich(($o('#nt').value+'. '+$o('#nx').value),'de',e.currentTarget);
  $o('#nsave').onclick=()=>{n.titel=$o('#nt').value.trim();n.text=$o('#nx').value;n.t=Date.now();if(!n.titel&&!n.text.trim()&&!n.foto){notizListe();return;}
    const L=notizen();if(i==null)L.unshift(n);else L[i]=n;
    try{localStorage.setItem('vs4_'+KIND+'_notizen',JSON.stringify(L));addSterne(0);notizListe();}catch(err){$o('#nmsg').textContent='😕 Der Speicher ist voll. Lösch ein paar alte Notizen mit Fotos.';}};
  if($o('#ndel')) $o('#ndel').onclick=()=>{const L=notizen();L.splice(i,1);store.set('notizen',L);notizListe();};
  setTimeout(()=>{if(i==null)$o('#nt').focus();},100);
}
