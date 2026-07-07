// netlify/functions/send-brevo-email.js
// Client-side triggered Netlify function to send transactional download emails via Brevo.
// Called from the store/delivery page when a successful purchase is verified on mount.


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
    const body = JSON.parse(event.body);
    const { checkoutId } = body;

    if (!checkoutId) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing checkout ID" }) };
    }

    const secretKey = process.env.YOCO_SECRET_KEY;
    if (!secretKey) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "Server configuration error" }) };
    }

    console.log("Verifying checkout via send-brevo-email endpoint for:", checkoutId);
    const yocoRes = await fetch(`https://payments.yoco.com/api/checkouts/${checkoutId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!yocoRes.ok) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Failed to verify transaction with Yoco" }) };
    }

    const yocoData = await yocoRes.json();
    if (yocoData.status !== "successful") {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Checkout payment was not successful" }) };
    }

    const metadata = yocoData.metadata || {};
    const { productId, customerEmail, customerName } = metadata;

    if (!customerEmail || !productId) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing required metadata" }) };
    }

    const product = PRODUCTS[productId];
    if (!product) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Unknown product ID" }) };
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "Email provider not configured" }) };
    }

    // Compile premium HTML email body
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
          <p>Thank you for purchasing <strong>${product.name}</strong> from LOVEBETTER by FOLA. Your payment was confirmed.</p>
          <p>You can access and download your purchase directly from Google Drive using the button below:</p>
          
          <div class="button-container">
            <a href="${product.link}" target="_blank" class="btn">Download Your Files</a>
          </div>

          <p>This download link will remain active. If you need any support, please contact us at decks@fola.co.za.</p>
          
          <div class="footer">
            <p>LOVEBETTER by FOLA &middot; Hazelwood, Tshwane</p>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log("Sending client-triggered delivery email via Brevo to:", customerEmail);
    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: { name: "LOVEBETTER by FOLA", email: "decks@fola.co.za" },
        replyTo: { name: "LOVEBETTER by FOLA", email: "decks@fola.co.za" },
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
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, message: "Delivery email sent successfully" }) };
  } catch (err) {
    console.error("Send email handler error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
