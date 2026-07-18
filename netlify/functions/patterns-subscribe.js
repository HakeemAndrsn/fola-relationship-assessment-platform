// netlify/functions/patterns-subscribe.js
// Captures a Pattern Assessment (/patterns) lead into MailerLite: upserts the
// subscriber into the pattern-family group so the matching nurture automation
// (built separately in MailerLite) fires. Keeps MAILERLITE_API_KEY and the
// per-family group IDs server-side only.

const MAILERLITE_API = "https://connect.mailerlite.com/api";

const FAMILY_GROUP_ENV = {
  "Inward Blade": "ML_GROUP_INWARD_BLADE",
  "Storm Maker": "ML_GROUP_STORM_MAKER",
  "Story Spinner": "ML_GROUP_STORY_SPINNER",
};

// Best-effort, in-memory-per-instance rate limit — Netlify Functions are
// stateless across cold starts, so this only throttles bursts within a warm
// instance. Good enough for a v1 lead form with no CAPTCHA.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  const ip = event.headers["x-nf-client-connection-ip"] || event.headers["client-ip"] || "unknown";
  if (isRateLimited(ip)) {
    return { statusCode: 429, headers, body: JSON.stringify({ ok: false, error: "Too many requests" }) };
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.error("MAILERLITE_API_KEY is not set");
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: "Server configuration error" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Invalid JSON" }) };
  }

  const { name, email, family, topGuards } = payload || {};

  if (!isValidEmail(email)) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "A valid email is required" }) };
  }
  if (typeof name !== "string" || !name.trim()) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Name is required" }) };
  }
  if (!Array.isArray(topGuards) || topGuards.length !== 3 || !family) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "family and three topGuards are required" }) };
  }

  const groupEnvVar = FAMILY_GROUP_ENV[family];
  const groupId = groupEnvVar && process.env[groupEnvVar];
  if (!groupId) {
    console.error(`No MailerLite group ID configured for family "${family}" (expected env var ${groupEnvVar})`);
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: "Server configuration error" }) };
  }

  const fields = { name: name.trim(), family };
  topGuards.forEach((g, i) => {
    fields[`guard_${i + 1}`] = g && g.guard;
    fields[`guard_${i + 1}_score`] = g && g.score;
  });

  try {
    const mlRes = await fetch(MAILERLITE_API + "/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
        Accept: "application/json",
      },
      body: JSON.stringify({ email, fields, groups: [groupId] }),
    });

    const mlData = await mlRes.json();

    if (!mlRes.ok) {
      console.error("MailerLite error:", JSON.stringify(mlData));
      return { statusCode: 502, headers, body: JSON.stringify({ ok: false, error: "MailerLite API error", details: mlData }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, subscriberId: mlData.data && mlData.data.id }) };
  } catch (err) {
    console.error("patterns-subscribe function error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: err.message }) };
  }
};
