// Canonical minimum price per product, in cents. The client submits the
// amount it intends to charge, but that value must never be trusted on its
// own — without this check anyone could initiate a checkout for any product
// at any price (e.g. 1 cent) by editing the request before it reaches Yoco.
// Prices are a floor rather than an exact match so that legitimate temporary
// test/discount pricing (set client-side) keeps working without needing a
// matching server deploy every time.
const MIN_PRICE_CENTS = {
  lovebetter_assessment: 1000,
  lovebetter_couples: 1000,
  lovebetter_bundle: 1000,
  "swapcards-romantic-couples-digital": 20000,
  "swapcards-parenting-deck-digital": 20000,
  "ebook-second-child": 20000,
  "quiet-load": 18000,
};

// Only ever redirect back to a domain we control. The Origin/Referer
// headers are attacker-controlled on a raw HTTP request, so trusting them
// directly would let anyone redirect a victim's browser to an arbitrary
// site after a real Yoco payment completes.
const ALLOWED_ORIGIN_SUFFIXES = [".lovebetter.co.za", ".netlify.app"];
const ALLOWED_ORIGINS = ["https://lovebetter.co.za", "http://localhost:3000", "http://localhost:8888"];

function resolveOrigin(event) {
  const candidate = event.headers.origin || event.headers.referer;
  if (candidate) {
    try {
      const parsed = new URL(candidate);
      const isAllowedHost =
        ALLOWED_ORIGINS.includes(parsed.origin) ||
        (parsed.protocol === "https:" && ALLOWED_ORIGIN_SUFFIXES.some((suffix) => parsed.hostname.endsWith(suffix)));
      if (isAllowedHost) {
        return parsed.origin;
      }
    } catch {
      // fall through to default below
    }
  }
  return "https://lovebetter.co.za";
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
    const { productId, amountInCents, email, name, phone, path } = body;

    if (!amountInCents || !productId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required checkout parameters" }),
      };
    }

    const minPrice = MIN_PRICE_CENTS[productId];
    if (minPrice === undefined) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Unknown product ID" }),
      };
    }
    if (typeof amountInCents !== "number" || !Number.isFinite(amountInCents) || amountInCents < minPrice) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid amount for this product" }),
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

    // Determine request origin for redirect URLs, restricted to domains we control
    const origin = resolveOrigin(event);

    let basePath = typeof path === "string" && path.startsWith("/") && !path.startsWith("//") ? path : "/individual-assessment";
    if (basePath.includes("delivery")) {
      const [cleanPath, query] = basePath.split("?");
      let finalPath = cleanPath;
      if (!finalPath.endsWith("/")) {
        finalPath = finalPath + "/";
      }
      basePath = query ? `${finalPath}?${query}` : finalPath;
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
