export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json() as Record<string, string>;

    const required = ['nombre', 'email', 'empresa'];
    for (const field of required) {
      if (!body[field]?.trim()) {
        return new Response(JSON.stringify({ error: `Campo requerido: ${field}` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(JSON.stringify({ error: 'Email inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const payload = {
      nombre: body.nombre.trim(),
      email: body.email.trim().toLowerCase(),
      empresa: body.empresa.trim(),
      mensaje: body.mensaje?.trim() || null,
      tipo: body.tipo === 'core' ? 'core' : 'audit',
      lang: body.lang === 'en' ? 'en' : 'es',
      origen: body.origen ?? 'landing',
      timestamp: new Date().toISOString(),
    };

    // Webhook to Notion/Airtable/n8n — configure via env var
    const webhookUrl = import.meta.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      const wh = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!wh.ok) {
        console.error('Webhook error:', wh.status, await wh.text());
      }
    } else {
      // Dev: log to console
      console.log('[lead]', payload);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Lead API error:', err);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
