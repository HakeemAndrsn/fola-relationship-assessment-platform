const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: "Method Not Allowed" };
  }

  const { id: checkoutId, file: fileType } = event.queryStringParameters || {};

  if (!checkoutId || !fileType) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Missing checkout ID or file type parameters" }),
    };
  }

  if (fileType !== "pdf" && fileType !== "zip") {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid file type requested" }),
    };
  }

  try {
    const secretKey = process.env.YOCO_SECRET_KEY;
    if (!secretKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Server configuration error" }),
      };
    }

    // Call Yoco's API to retrieve and verify the checkout session
    const yocoRes = await fetch(`https://payments.yoco.com/api/checkouts/${checkoutId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    });

    const checkoutData = await yocoRes.json();

    if (!yocoRes.ok) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Failed to retrieve checkout from Yoco" }),
      };
    }

    // Verify checkout was successful and matches the store product
    const isSuccessful = checkoutData.status === "successful";
    const isStoreProduct = checkoutData.metadata && checkoutData.metadata.productId === "swapcards-romantic-couples-digital";

    if (!isSuccessful || !isStoreProduct) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: "Unauthorized access: Payment verification failed" }),
      };
    }

    // Locate the requested file
    const fileName = fileType === "pdf" ? "SwapCards_RomanticCouples_Deck_v3.pdf" : "SwapCards_Story_Set.zip";
    
    // In Netlify lambda functions, the root is bundled and process.cwd() or __dirname can be used
    const possiblePaths = [
      path.join(process.cwd(), "private", fileName),
      path.join(__dirname, "private", fileName),
      path.join(__dirname, "../private", fileName),
      path.join(__dirname, "../../private", fileName),
      path.join("/var/task", "private", fileName)
    ];

    let filePath = "";
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        filePath = p;
        break;
      }
    }

    if (!filePath) {
      console.error("Could not find file. Attempted paths:", possiblePaths);
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: `File not found on server. Contact support.` }),
      };
    }

    const fileBuffer = fs.readFileSync(filePath);
    const mimeType = fileType === "pdf" ? "application/pdf" : "application/zip";

    return {
      statusCode: 200,
      headers: {
        ...headers,
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
      body: fileBuffer.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
