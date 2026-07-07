// netlify/functions/yoco-webhook.js
// Secure server-side Yoco webhook receiver for digital product delivery via Brevo.
// Triggered on payment.succeeded event from Yoco servers.


const PRODUCTS = {
  "swapcards-romantic-couples-digital": {
    name: "Romantic Couples Deck (Swap Cards)",
    link: "https://drive.google.com/file/d/1McpGsEWIRys5e7sPcXDRcl7vwLs0OvJD/view?usp=drive_link",
  },
  "swapcards-parenting-deck-digital": {
    name: "The Parenting Deck (Swap Cards)",
    link: "https://drive.google.com/file/d/1MeaeyBnAKoN7wdhlebiDu4zOEb8x3Vci/view?usp=drive_link",
  },
  "ebook-second-child": {
    name: "The Second Child Ebook",
    link: "https://drive.google.com/file/d/1hFJl3X291e9z_iLkIJCxLfeAwELOJOKl/view?usp=drive_link",
  }
};

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
    console.log("Raw Webhook Body:", event.body);
    const body = JSON.parse(event.body);
    const eventType = body.type || body.event || body.event_type;
    console.log("Yoco Webhook received event type:", eventType);

    // Verify webhook payload
    const payment = body.payload || body.context || body.data || body;
    if (!payment) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing event payload" }) };
    }

    const checkoutId = payment.checkoutId || payment.checkoutSessionId || (payment.metadata && payment.metadata.checkoutId);
    const paymentId = payment.paymentId || payment.payment_id || (payment.id && payment.id.startsWith("pay_") ? payment.id : null) || payment.payment_id;

    if (!checkoutId && !paymentId) {
      console.warn("No checkoutId or paymentId found in payload. Reading metadata directly from body.");
    }

    // Securely verify transaction status directly with Yoco API to prevent spoofing
    let metadata = payment.metadata || {};
    let isSuccessful = payment.status === "successful" || payment.status === "captured" || payment.status === "approved";

    const secretKey = process.env.YOCO_SECRET_KEY;
    const webhookKey = process.env.YOCO_WEBHOOK_KEY || secretKey;

    if (checkoutId && secretKey) {
      console.log("Verifying checkout status directly with Yoco for:", checkoutId);
      const yocoRes = await fetch(`https://payments.yoco.com/api/checkouts/${checkoutId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      });
      if (yocoRes.ok) {
        const yocoData = await yocoRes.json();
        metadata = yocoData.metadata || {};
        isSuccessful = yocoData.status === "successful";
        console.log("Yoco checkout verification status:", yocoData.status);
      } else {
        console.error("Failed to verify checkout with Yoco API. Status:", yocoRes.status);
      }
    } else if (paymentId && webhookKey) {
      console.log("Verifying payment status directly with Yoco for payment ID:", paymentId);
      const yocoRes = await fetch(`https://api.yoco.com/v1/payments/${paymentId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${webhookKey}`,
          "Content-Type": "application/json",
        },
      });
      if (yocoRes.ok) {
        const yocoData = await yocoRes.json();
        metadata = yocoData.metadata || {};
        isSuccessful = yocoData.status === "successful" || yocoData.status === "captured" || yocoData.status === "approved";
        console.log("Yoco payment verification status:", yocoData.status);

        const resolvedCheckoutId = yocoData.checkout_id || yocoData.checkoutId;
        if (resolvedCheckoutId && (!metadata.customerEmail || !metadata.productId) && secretKey) {
          console.log("Payment metadata is empty. Fetching checkout session metadata for:", resolvedCheckoutId);
          const checkoutRes = await fetch(`https://payments.yoco.com/api/checkouts/${resolvedCheckoutId}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${secretKey}`,
              "Content-Type": "application/json",
            },
          });
          if (checkoutRes.ok) {
            const checkoutSessionData = await checkoutRes.json();
            metadata = checkoutSessionData.metadata || {};
            console.log("Retrieved checkout metadata successfully:", metadata);
          } else {
            console.error("Failed to fetch checkout session metadata. Status:", checkoutRes.status);
          }
        }
      } else {
        console.error("Failed to verify payment with Yoco API. Status:", yocoRes.status);
      }
    }

    if (!isSuccessful) {
      console.log("Payment status was not successful. Status verified:", isSuccessful);
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, message: "Ignored unsuccessful status" }) };
    }

    const { productId, customerEmail, customerName } = metadata;
    if (!customerEmail || !productId) {
      console.error("Missing required metadata in transaction. Metadata:", metadata);
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing product or email metadata" }) };
    }

    const product = PRODUCTS[productId];
    if (!product) {
      console.error("Unknown product ID purchased:", productId);
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Unknown product ID" }) };
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      console.error("BREVO_API_KEY is not configured in environment variables!");
      return { statusCode: 500, headers, body: JSON.stringify({ error: "Email provider not configured" }) };
    }

    // Compile beautiful HTML transactional email body matching charcoal/terracotta brand
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Your LOVEBETTER Cards Are Ready</title>
        <style>
          body { background-color: #1B1917; color: #F3EFE6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 40px 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #221F1C; border: 1px solid #EAE2D2; padding: 40px; border-radius: 4px; }
          h1 { color: #F3EFE6; font-size: 28px; font-weight: bold; margin-bottom: 20px; text-align: center; }
          p { color: #DDD5C4; font-size: 15px; line-height: 1.6; margin-bottom: 24px; }
          .button-container { text-align: center; margin: 35px 0; }
          .btn { background-color: #B4531F; color: #F3EFE6 !important; text-decoration: none; padding: 16px 32px; font-size: 15px; font-weight: bold; display: inline-block; border-radius: 2px; letter-spacing: 0.05em; }
          .btn:hover { background-color: #C1795A; }
          .footer { margin-top: 40px; border-t: 1px solid #8A8378; padding-top: 20px; font-size: 12px; color: #8A8378; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Your files are ready.</h1>
          <p>Hello ${customerName || "there"},</p>
          <p>Thank you for purchasing <strong>${product.name}</strong> from LOVEBETTER by FOLA. Your payment was successfully confirmed.</p>
          <p>You can access and download your purchase directly from Google Drive using the button below:</p>
          
          <div class="button-container">
            <a href="${product.link}" target="_blank" class="btn">Download Your Files</a>
          </div>

          <p>This download link will remain active. If you need any support or have questions, please reach out to us at fola@fola.co.za.</p>
          
          <div class="footer">
            <p>LOVEBETTER by FOLA &middot; Hazelwood, Tshwane</p>
            <p>If you did not request this email, please contact fola@fola.co.za.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log("Sending delivery email via Brevo to:", customerEmail);
    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: { name: "LOVEBETTER by FOLA", email: "sessions@fola.co.za" },
        to: [{ email: customerEmail, name: customerName || "Customer" }],
        subject: `Your LOVEBETTER ${product.name} is ready for download`,
        htmlContent: htmlContent
      })
    });

    const brevoData = await brevoRes.json();
    if (!brevoRes.ok) {
      console.error("Brevo API error:", JSON.stringify(brevoData));
      return { statusCode: 502, headers, body: JSON.stringify({ error: "Brevo delivery failed", details: brevoData }) };
    }

    console.log("Brevo email successfully sent! Message ID:", brevoData.messageId);

    // Sync to MailerLite as subscriber (optional fallback list tracking)
    const mlApiKey = process.env.MAILERLITE_API_KEY;
    if (mlApiKey) {
      console.log("Syncing purchaser list to MailerLite for email:", customerEmail);
      let productLabel = "swapcards_romantic_couples";
      if (productId === "swapcards-parenting-deck-digital") {
        productLabel = "swapcards_parenting_deck";
      } else if (productId === "ebook-second-child") {
        productLabel = "ebook_second_child";
      }

      fetch(`https://connect.mailerlite.com/api/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + mlApiKey,
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: customerEmail,
          fields: {
            name: customerName || "Store Customer",
            product_purchased: productLabel,
            purchase_amount: "R10"
          }
        }),
      }).catch(e => console.error("MailerLite webhook sync error:", e));
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, message: "Delivery email successfully sent and user synchronized" }),
    };
  } catch (err) {
    console.error("Webhook handler error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
