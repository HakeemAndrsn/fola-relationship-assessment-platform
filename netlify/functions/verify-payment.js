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
    const { productId, amountInCents, email, name, phone, path } = body;

    if (!amountInCents || !productId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required checkout parameters" }),
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

    // Determine request origin dynamically for redirect URLs
    const origin = event.headers.origin || event.headers.referer ? 
      new URL(event.headers.referer || event.headers.origin).origin : 
      "https://lovebetter.co.za";

    let basePath = path || "/individual-assessment";
    if (basePath.includes("delivery") && !basePath.endsWith("/")) {
      basePath = basePath + "/";
    }
    const successUrl = `${origin}${basePath}`;
    const cancelUrl = `${origin}${basePath}`;

    // Create a Yoco Checkout session using their latest Checkouts API
    const response = await fetch(
      "https://payments.yoco.com/api/checkouts",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInCents,
          currency: "ZAR",
          successUrl: successUrl,
          cancelUrl: cancelUrl,
          metadata: {
            productId,
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
          },
        }),
      }
    );

    const checkoutData = await response.json();

    if (!response.ok || !checkoutData.redirectUrl) {
      return {
        statusCode: response.statusCode || 403,
        headers,
        body: JSON.stringify({
          error: checkoutData.errorCode || checkoutData.message || "Checkout creation failed",
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        redirectUrl: checkoutData.redirectUrl,
        checkoutId: checkoutData.id
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
