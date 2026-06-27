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

    const secretKey = process.env.YOCO_SECRET_KEY;
    if (!secretKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ verified: false, error: "Server configuration error" }),
      };
    }

    // Charge the card token with Yoco's API
    const response = await fetch(
      "https://online.yoco.com/v1/charges/",
      {
        method: "POST",
        headers: {
          "X-Auth-Secret-Key": secretKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: id,
          amountInCents: 60000, // R600.00
          currency: "ZAR",
        }),
      }
    );

    const charge = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.statusCode || 403,
        headers,
        body: JSON.stringify({
          verified: false,
          error: charge.displayMessage || charge.message || "Payment execution failed",
        }),
      };
    }

    // Confirm the charge was actually paid
    if (charge.status !== "successful") {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          verified: false,
          error: `Payment status: ${charge.status}`,
        }),
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
