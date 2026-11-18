/* Lern-Eule – kleiner KI-Server für Cloudflare Workers.
   Einstellungen im Cloudflare-Dashboard (Settings → Variables and Secrets):
   - ANTHROPIC_API_KEY  (als Secret!)   – der API-Schlüssel aus console.anthropic.com
   - ALLOWED_ORIGIN                     – z. B. https://DEINNAME.github.io
   - MODEL (optional)                   – z. B. claude-haiku-5-5 (günstiger) oder claude-sonnet-5-5 (klüger)
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
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: env.MODEL || 'claude-haiku-5-5', max_tokens: Math.min(Number(body.max_tokens) || 3000, 4000), system: SYSTEM, messages: msgs })
    });
    if (r.status === 429) return new Response(JSON.stringify({ error: 'rate_limited' }), { status: 429, headers: { ...cors, 'content-type': 'application/json' } });
    if (!r.ok) return new Response(JSON.stringify({ error: 'upstream ' + r.status }), { status: 502, headers: { ...cors, 'content-type': 'application/json' } });
    const j = await r.json();
    const text = (j.content || []).filter(c => c.type === 'text').map(c => c.text).join('');
    return new Response(JSON.stringify({ text, truncated: j.stop_reason === 'max_tokens' }), { headers: { ...cors, 'content-type': 'application/json' } });
  }
};
