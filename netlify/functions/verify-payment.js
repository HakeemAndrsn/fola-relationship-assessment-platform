exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let token;
  try {
    ({ token } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  if (!token) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing payment token" }) };
  }

  let chargeData;
  try {
    const response = await fetch("https://online.yoco.com/v1/charges/", {
      method: "POST",
      headers: {
        "X-Auth-Secret-Key": process.env.YOCO_SECRET_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        amountInCents: 60000,
        currency: "ZAR",
      }),
    });

    chargeData = await response.json();

    if (!response.ok || chargeData.error) {
      const message = chargeData?.error?.message || chargeData?.errorCode || "Payment failed";
      return {
        statusCode: 402,
        body: JSON.stringify({ error: message }),
      };
    }
  } catch {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: "Could not reach payment provider. Please try again." }),
    };
  }

  // Google Sheets audit log — fails silently so it never blocks payment confirmation
  try {
    // Sheets integration to be built in a later step (see CLAUDE.md priority list item 5)
  } catch {
    // intentional no-op
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
