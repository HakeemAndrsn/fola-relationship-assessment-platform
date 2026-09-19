
const crypto = require("crypto");

const REPORT_TOKEN_TTL_SECONDS = 4 * 60 * 60;
const ASSESSMENT_PRODUCTS = new Set(["lovebetter_assessment", "lovebetter_couples", "lovebetter_bundle"]);

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function createReportToken(payload, secret) {
  const encoded = base64url(JSON.stringify(payload));
  const signature = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
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

  try {
    const body = JSON.parse(event.body);
    const { checkoutId } = body;
    console.log("validate-checkout triggered for checkoutId:", checkoutId);

    if (!checkoutId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing checkout ID" }),
      };
    }

    const secretKey = process.env.YOCO_SECRET_KEY;
    if (!secretKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Server configuration error" }),
      };
    }

    // Call Yoco's API to retrieve the checkout session status
    const response = await fetch(`https://payments.yoco.com/api/checkouts/${checkoutId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    });

    const checkoutData = await response.json();
    console.log("Yoco Checkouts API response status:", response.status);
    console.log("Checkout status resolved:", checkoutData.status);

    if (!response.ok) {
      console.error("Yoco API error details:", checkoutData);
      return {
        statusCode: response.statusCode || 400,
        headers,
        body: JSON.stringify({ error: "Failed to retrieve checkout from Yoco" }),
      };
    }

    // Verify checkout was successful
    if (checkoutData.status !== "successful" && checkoutData.status !== "approved" && checkoutData.status !== "completed") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ verified: false, status: checkoutData.status }),
      };
    }

    // Return payment details and a short-lived, signed token that authorizes
    // exactly one paid assessment identity to request its report email.
    const { productId, customerEmail, customerPhone, customerName } = checkoutData.metadata || {};
    const reportTokenSecret = process.env.REPORT_TOKEN_SECRET;
    if (!reportTokenSecret) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Report delivery is not configured" }),
      };
    }
    if (!ASSESSMENT_PRODUCTS.has(productId) || !customerEmail) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Checkout is not eligible for assessment delivery" }),
      };
    }
    const now = Math.floor(Date.now() / 1000);
    const reportToken = createReportToken({
      checkoutId,
      productId,
      email: String(customerEmail).trim().toLowerCase(),
      iat: now,
      exp: now + REPORT_TOKEN_TTL_SECONDS,
    }, reportTokenSecret);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        verified: true,
        productId,
        email: customerEmail,
        phone: customerPhone,
        name: customerName,
        amount: checkoutData.amount,
        reportToken,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
