export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const body = await request.json();
    const required = ["nombre", "email", "empresa"];
    for (const field of required) {
      if (!body[field]?.trim()) {
        return new Response(JSON.stringify({ error: `Campo requerido: ${field}` }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(JSON.stringify({ error: "Email inválido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const payload = {
      nombre: body.nombre.trim(),
      email: body.email.trim().toLowerCase(),
      empresa: body.empresa.trim(),
      mensaje: body.mensaje?.trim() || null,
      tipo: body.tipo === "core" ? "core" : "audit",
      lang: body.lang === "en" ? "en" : "es",
      origen: body.origen ?? "landing",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    const webhookUrl = undefined                                ;
    if (webhookUrl) ; else {
      console.log("[lead]", payload);
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Lead API error:", err);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
