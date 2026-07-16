// netlify/functions/report-client-error.js
// Fire-and-forget client error alerting. When a page crashes into the
// global error boundary, this notifies the site owner via Brevo immediately
// instead of relying on a customer to report it.

const OWNER_EMAIL = "hakeemandrsn@gmail.com";
const SENDER = { name: "LOVEBETTER by FOLA Alerts", email: "decks@fola.co.za" };
const MAX_FIELD_LENGTH = 4000;

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function truncate(str) {
  const s = String(str ?? "");
  return s.length > MAX_FIELD_LENGTH ? s.slice(0, MAX_FIELD_LENGTH) + "…(truncated)" : s;
}

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: "Method Not Allowed" };
  }

  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!brevoApiKey) {
    // Don't fail the caller's page over this — just skip the alert
    return { statusCode: 200, headers, body: JSON.stringify({ ok: false, skipped: true }) };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const message = truncate(body.message || "Unknown error");
    const stack = truncate(body.stack || "");
    const digest = truncate(body.digest || "");
    const url = truncate(body.url || "");
    const userAgent = truncate(body.userAgent || event.headers["user-agent"] || "");

    const htmlContent = `
      <div style="font-family: monospace; background:#1B1917; color:#F3EFE6; padding:24px;">
        <h2 style="color:#e53e3e; margin-top:0;">🚨 Site error on lovebetter.co.za</h2>
        <p><strong>Message:</strong> ${escapeHtml(message)}</p>
        <p><strong>Page:</strong> ${escapeHtml(url)}</p>
        ${digest ? `<p><strong>Digest:</strong> ${escapeHtml(digest)}</p>` : ""}
        <p><strong>User agent:</strong> ${escapeHtml(userAgent)}</p>
        ${stack ? `<pre style="white-space:pre-wrap;background:#000;padding:12px;border-radius:4px;">${escapeHtml(stack)}</pre>` : ""}
      </div>
    `;

    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: SENDER,
        to: [{ email: OWNER_EMAIL }],
        subject: `🚨 Site error: ${message.slice(0, 120)}`,
        htmlContent,
      }),
    });

    if (!brevoRes.ok) {
      const errData = await brevoRes.json().catch(() => ({}));
      console.error("Failed to send error alert email:", JSON.stringify(errData));
    }

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("report-client-error handler error:", err);
    // Never fail loudly here — this is best-effort alerting, not a critical path
    return { statusCode: 200, headers, body: JSON.stringify({ ok: false }) };
  }
};
