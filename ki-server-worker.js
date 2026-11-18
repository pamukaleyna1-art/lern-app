/* Lern-Eule – kleiner KI-Server für Cloudflare Workers.
   Einstellungen im Cloudflare-Dashboard (Settings → Variables and Secrets):
   EINEN der beiden Schlüssel (als Secret!):
   - OPENAI_API_KEY     – Schlüssel von platform.openai.com  → ChatGPT
   - ANTHROPIC_API_KEY  – Schlüssel von console.anthropic.com → Claude
   - ALLOWED_ORIGIN     – z. B. https://DEINNAME.github.io
   - MODEL (optional)   – ChatGPT: z. B. gpt-5-mini · Claude: z. B. claude-haiku-5-5
*/
const SYSTEM='Du bist die „Lern-Eule“, eine freundliche Lernhilfe in einer Schul-App für ein Kind in einer österreichischen Mittelschule. Antworte kindgerecht, ehrlich und sachlich richtig, auf Deutsch (außer bei Fremdsprachen-Übungen). Keine unpassenden Inhalte. Wenn du etwas nicht sicher weißt, sag es.';
export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const cors = { 'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'content-type', 'Vary': 'Origin' };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST' || !env.ALLOWED_ORIGIN || origin !== env.ALLOWED_ORIGIN) return new Response('Nicht erlaubt', { status: 403, headers: cors });
    let body; try { body = await req.json(); } catch (e) { return new Response('Ungültig', { status: 400, headers: cors }); }
    const msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-20).map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content || '').slice(0, 20000) }));
    if (!msgs.length || msgs[msgs.length - 1].role !== 'user') return new Response('Ungültig', { status: 400, headers: cors });
    const bilder = (Array.isArray(body.images) ? body.images : []).slice(0, 3).filter(b => /^image\/(jpeg|png|webp|gif)$/.test(b.media_type) && typeof b.data === 'string' && b.data.length < 6000000);
    if (bilder.length) { const letzte = msgs[msgs.length - 1]; letzte.content = [...bilder.map(b => ({ type: 'image', source: { type: 'base64', media_type: b.media_type, data: b.data } })), { type: 'text', text: letzte.content }]; }
    const json = { ...cors, 'content-type': 'application/json' };
    const maxT = Math.min(Number(body.max_tokens) || 3000, 4000);
    let r, text = '', truncated = false;
    if (env.OPENAI_API_KEY) {
      // ChatGPT (OpenAI)
      const oMsgs = [{ role: 'system', content: SYSTEM }, ...msgs.map(m => {
        if (!Array.isArray(m.content)) return m;
        return { role: m.role, content: m.content.map(c => c.type === 'image'
          ? { type: 'image_url', image_url: { url: 'data:' + c.source.media_type + ';base64,' + c.source.data } }
          : { type: 'text', text: c.text }) };
      })];
      r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'authorization': 'Bearer ' + env.OPENAI_API_KEY, 'content-type': 'application/json' },
        body: JSON.stringify({ model: env.MODEL || 'gpt-5-mini', max_completion_tokens: maxT, messages: oMsgs })
      });
      if (r.status === 429) return new Response(JSON.stringify({ error: 'rate_limited' }), { status: 429, headers: json });
      if (!r.ok) return new Response(JSON.stringify({ error: 'upstream ' + r.status }), { status: 502, headers: json });
      const j = await r.json();
      const ch = (j.choices || [])[0] || {};
      text = (ch.message && ch.message.content) || '';
      truncated = ch.finish_reason === 'length';
    } else {
      // Claude (Anthropic)
      r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify({ model: env.MODEL || 'claude-haiku-5-5', max_tokens: maxT, system: SYSTEM, messages: msgs })
      });
      if (r.status === 429) return new Response(JSON.stringify({ error: 'rate_limited' }), { status: 429, headers: json });
      if (!r.ok) return new Response(JSON.stringify({ error: 'upstream ' + r.status }), { status: 502, headers: json });
      const j = await r.json();
      text = (j.content || []).filter(c => c.type === 'text').map(c => c.text).join('');
      truncated = j.stop_reason === 'max_tokens';
    }
    return new Response(JSON.stringify({ text, truncated }), { headers: json });
  }
};
