/* Verbindung zur Lern-Eule im Hintergrund (über den eigenen KI-Server). Die Adresse steht in config.js. */
(function(){
  if(window.claude||!window.LERNAPP_KI_URL) return;
  const URL_=window.LERNAPP_KI_URL;
  const b64=blob=>new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>{ const d=String(r.result); res({media_type:(d.match(/^data:([^;]+)/)||[])[1]||'image/jpeg',data:d.split(',')[1]}); }; r.onerror=rej; r.readAsDataURL(blob); });
  async function frage(input,opts){
    opts=opts||{};
    let messages=typeof input==='string'?[{role:'user',content:input}]:input.map(m=>({role:m.role==='assistant'?'assistant':'user',content:String(m.content||'')}));
    const images=opts.images&&opts.images.length?await Promise.all(opts.images.map(b64)):[];
    let r;
    try{ r=await fetch(URL_,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({messages,images,max_tokens:opts.max_tokens||3500}),signal:opts.signal}); }
    catch(e){ if(e&&e.name==='AbortError') throw e; throw {code:'unavailable',message:'offline'}; }
    if(r.status===429) throw {code:'rate_limited',message:'Zu viele Anfragen'};
    if(!r.ok) throw {code:'unavailable',message:'Fehler '+r.status};
    const j=await r.json(); const text=String(j.text||'');
    if(opts.onText) try{ opts.onText({text,delta:text}); }catch(e){}
    return {text,truncated:!!j.truncated};
  }
  frage.json=async(p,o)=>{ const r=await frage(String(p)+'\n\nWICHTIG: Antworte ausschließlich mit gültigem JSON, ohne Text davor oder danach.',o); const t=r.text; return JSON.parse(t.slice(t.indexOf('{'),t.lastIndexOf('}')+1)); };
  frage.limits=async()=>({images:true});
  window.claude={use:async n=>n==='sample'?frage:null};
})();
