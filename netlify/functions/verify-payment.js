const crypto = require("crypto");

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
    const { id } = body;

    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ verified: false, error: "Missing payment ID" }),
      };
    }

    // Verify the signature
    const secretKey = process.env.YOCO_SECRET_KEY;
    if (!secretKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ verified: false, error: "Server configuration error" }),
      };
    }

    const expectedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(id)
      .digest("hex");

    const providedSignature = event.headers["x-yoco-signature"] || "";

    if (expectedSignature !== providedSignature) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ verified: false, error: "Invalid signature" }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ verified: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ verified: false, error: err.message }),
    };
  }
};
