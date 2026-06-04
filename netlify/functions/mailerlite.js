// netlify/functions/mailerlite.js
// Upserts a MailerLite subscriber directly — no Zapier required.
// Called from YocoButton (payment) and both assessment pages.

const MAILERLITE_API = "https://connect.mailerlite.com/api";
const ASSESSMENT_COMPLETED_GROUP_ID = "189335234876015893";

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

  const { email, name, phone, overallScore, primaryGrowthEdge } = payload;
  if (!email) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "email is required" }) };
  }

  try {
    const subscriberBody = {
      email,
      fields: {},
      groups: [ASSESSMENT_COMPLETED_GROUP_ID],
    };

    if (name) subscriberBody.fields.name = name;
    if (phone) subscriberBody.fields.phone = phone;
    if (overallScore !== undefined) subscriberBody.fields.overall_score = overallScore;
    if (primaryGrowthEdge) subscriberBody.fields.primary_growth_edge = primaryGrowthEdge;

    const mlRes = await fetch(MAILERLITE_API + "/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey,
        "Accept": "application/json",
      },
      body: JSON.stringify(subscriberBody),
    });

    const mlData = await mlRes.json();

    if (!mlRes.ok) {
      console.error("MailerLite error:", JSON.stringify(mlData));
      return { statusCode: 502, headers, body: JSON.stringify({ ok: false, error: "MailerLite API error", details: mlData }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, subscriberId: mlData.data && mlData.data.id }) };
  } catch (err) {
    console.error("mailerlite function error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: err.message }) };
  }
};
