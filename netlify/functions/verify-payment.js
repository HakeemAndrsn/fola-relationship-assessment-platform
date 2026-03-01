exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://lovebetter.co.za";

  let checkoutData;
  try {
    const response = await fetch("https://payments.yoco.com/api/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 60000,
        currency: "ZAR",
        successUrl: `${appUrl}/assessment?lb_paid=1`,
        cancelUrl: `${appUrl}/`,
        metadata: {
          product: "love-better-assessment",
        },
      }),
    });

    checkoutData = await response.json();

    if (!response.ok || !checkoutData.redirectUrl) {
      const message =
        checkoutData?.errorCode ||
        checkoutData?.message ||
        "Checkout creation failed";
      return {
        statusCode: 402,
        body: JSON.stringify({ error: message }),
      };
    }
  } catch {
    return {
      statusCode: 502,
      body: JSON.stringify({
        error: "Could not reach payment provider. Please try again.",
      }),
    };
  }

  // Google Sheets audit log — fails silently so it never blocks payment
  try {
    // Sheets integration to be built in a later step (see CLAUDE.md priority list item 5)
  } catch {
    // intentional no-op
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ redirectUrl: checkoutData.redirectUrl }),
  };
};
