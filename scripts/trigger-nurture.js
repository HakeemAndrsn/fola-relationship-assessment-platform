// scripts/trigger-nurture.js
// Manual MailerLite trigger script for LoveBetter clients.
// Usage: node scripts/trigger-nurture.js <email> "<name>" "[phone]" "[overallScore]" "[primaryGrowthEdge]"

const fs = require('fs');
const path = require('path');

// 1. Read command-line arguments
const args = process.argv.slice(2);
const email = args[0];
const name = args[1];
const phone = args[2] || "";
const overallScore = args[3] ? parseInt(args[3], 10) : 75;
const primaryGrowthEdge = args[4] || "Emotional Regulation";

if (!email) {
  console.error("Error: Client email is required.");
  console.log("Usage: node scripts/trigger-nurture.js <email> \"<name>\" \"[phone]\" \"[score]\" \"[growthEdge]\"");
  process.exit(1);
}

// 2. Parse .env.local file directly to get API key
let apiKey = process.env.MAILERLITE_API_KEY;
if (!apiKey) {
  try {
    const envPath = path.join(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/MAILERLITE_API_KEY\s*=\s*(.*)/);
      if (match && match[1]) {
        apiKey = match[1].trim();
      }
    }
  } catch (err) {
    console.warn("Could not read .env.local file:", err.message);
  }
}

if (!apiKey) {
  console.error("Error: MAILERLITE_API_KEY was not found in environment or .env.local.");
  process.exit(1);
}

const MAILERLITE_API = "https://connect.mailerlite.com/api";
const ASSESSMENT_COMPLETED_GROUP_ID = "189335234876015893";

async function run() {
  console.log(`Enrolling subscriber to FOLA nurture sequence...`);
  console.log(`Email:  ${email}`);
  console.log(`Name:   ${name || 'Client'}`);
  console.log(`Phone:  ${phone || 'N/A'}`);
  console.log(`Score:  ${overallScore}`);
  console.log(`Edge:   ${primaryGrowthEdge}`);

  const subscriberBody = {
    email,
    fields: {
      name: name || "Client",
    },
    groups: [ASSESSMENT_COMPLETED_GROUP_ID],
  };

  if (phone) subscriberBody.fields.phone = phone;
  if (overallScore !== undefined) subscriberBody.fields.overall_score = overallScore;
  if (primaryGrowthEdge) subscriberBody.fields.primary_growth_edge = primaryGrowthEdge;

  try {
    const response = await fetch(MAILERLITE_API + "/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey,
        "Accept": "application/json",
      },
      body: JSON.stringify(subscriberBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("MailerLite API Error:", JSON.stringify(data));
      process.exit(1);
    }

    console.log("\nSuccess!");
    console.log(`Subscriber successfully added/updated in MailerLite.`);
    console.log(`Subscriber ID: ${data.data && data.data.id}`);
    console.log(`Nurture trigger automation initiated. They will start receiving the sequence today.`);
  } catch (err) {
    console.error("Network or script error:", err.message);
    process.exit(1);
  }
}

run();
