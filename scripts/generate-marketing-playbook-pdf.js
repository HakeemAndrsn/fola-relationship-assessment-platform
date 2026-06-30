const puppeteer = require("puppeteer");
const { join } = require("path");

(async () => {
  console.log("🚀 Initializing FOLA SLO Marketing Playbook PDF Generation...");

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FOLA Step 1 SLO Marketing & Ascension Playbook</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      color: #241613;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      -webkit-print-color-adjust: exact;
    }
    
    .page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      box-sizing: border-box;
      padding: 25mm 22mm 22mm 22mm;
      page-break-after: always;
      position: relative;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    /* Cover Page Specific */
    .cover-page {
      background-color: #241613;
      color: #EDE5D4;
      padding: 40mm 22mm 25mm 22mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      box-sizing: border-box;
      page-break-after: always;
      position: relative;
      overflow: hidden;
      margin: 0;
    }
    
    .cover-top {
      border-left: 3px solid #C9B99A;
      padding-left: 25px;
    }
    
    .cover-tag {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 4px;
      color: #C9B99A;
      margin-bottom: 12px;
    }
    
    .cover-title {
      font-family: 'Playfair Display', serif;
      font-size: 38px;
      font-weight: 600;
      line-height: 1.15;
      margin: 0 0 20px 0;
      color: #ffffff;
    }
    
    .cover-subtitle {
      font-size: 15px;
      font-weight: 300;
      color: #bfae8f;
      line-height: 1.6;
      max-width: 500px;
    }
    
    .cover-bottom {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding-top: 30px;
    }
    
    .cover-meta {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #8c7f76;
    }
    
    .meta-item strong {
      color: #EDE5D4;
      display: block;
      font-size: 13px;
      margin-bottom: 6px;
    }
    
    /* Document Headers/Footers */
    .header {
      position: absolute;
      top: 15mm;
      left: 22mm;
      right: 22mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #FAF8F5;
      padding-bottom: 8px;
      font-size: 10px;
      color: #7A6A5E;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    
    .header-logo {
      font-weight: 700;
      color: #241613;
    }
    
    .footer {
      position: absolute;
      bottom: 15mm;
      left: 22mm;
      right: 22mm;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #FAF8F5;
      padding-top: 8px;
      font-size: 9px;
      color: #7A6A5E;
    }
    
    /* Layout Elements */
    .title-area {
      margin-bottom: 20px;
    }
    
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 26px;
      color: #241613;
      margin-top: 0;
      margin-bottom: 8px;
      font-weight: 600;
    }
    
    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      color: #241613;
      margin-top: 20px;
      margin-bottom: 8px;
      font-weight: 600;
    }
    
    .subtitle {
      font-size: 13.5px;
      color: #6B2737;
      font-weight: 500;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    p.instruction-text {
      font-size: 13.5px;
      line-height: 1.6;
      color: #475569;
      margin-bottom: 22px;
      text-align: justify;
    }
    
    .bullet-list {
      margin-top: 0;
      margin-bottom: 20px;
      padding-left: 20px;
    }
    
    .bullet-list li {
      font-size: 13.5px;
      line-height: 1.6;
      color: #475569;
      margin-bottom: 8px;
    }
    
    .highlight-box {
      background-color: #FAF8F5;
      border-left: 3px solid #6B2737;
      padding: 15px;
      margin: 15px 0;
      border-radius: 0 8px 8px 0;
    }
    
    .highlight-box p {
      margin: 0;
      font-size: 13px;
      font-style: italic;
      color: #241613;
    }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-top">
      <div class="cover-tag">FOLA Business Strategy</div>
      <h1 class="cover-title">Step 1 SLO Funnel<br>Marketing & Ascension<br>Playbook</h1>
      <div class="cover-subtitle">Strategic positioning, pricing structures, order bump upsells, and the 2-minute somatic video testimonial loop.</div>
    </div>
    
    <div class="cover-bottom">
      <div class="cover-meta">
        <div class="meta-item">
          <strong>Prepared For</strong>
          Hakeem Lesolang
        </div>
        <div class="meta-item">
          <strong>Practice</strong>
          FOLA
        </div>
        <div class="meta-item">
          <strong>Date</strong>
          June 2026
        </div>
      </div>
    </div>
  </div>

  <!-- STRATEGIC SUMMARY -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Practice</span>
      <span>Executive Playbook</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <h1>The Self-Liquidating Offer (SLO) Model</h1>
      <div class="subtitle">Funnel Economics & Lead Acquisition</div>
    </div>
    
    <p class="instruction-text">
      The FOLA Step 1 Somatic Companion Package is designed as a Self-Liquidating Offer (SLO). In premium client acquisition, cold traffic is highly expensive to convert directly into high-ticket sessions (R3,650/session). The SLO solves this by packaging low-barrier entry assets that offset ad spend.
    </p>
    
    <h2>1. Funnel Architecture</h2>
    <p class="instruction-text">
      The front-end offer is <strong>The Inner Child Somatic Companion Workbook (R150)</strong>. During checkout, clients are presented with an <strong>Order Bump: The Guided Regression Audio Guide (R150)</strong>. Packaging these as a highly aligned R300 bundle allows FOLA to acquire customers at zero net cost, building a database of verified buyers.
    </p>
    
    <h2>2. Trust & Authority</h2>
    <p class="instruction-text">
      By delivering a tangible, high-quality, typeset workbook and a professionally mixed audio experience, the client experiences immediate value and shifts state. They transition from skeptical observers to warm, engaged leads ready for deeper work.
    </p>
    
    <div class="footer">
      <span>FOLA SLO Marketing Playbook</span>
      <span>Page 2</span>
    </div>
  </div>

  <!-- VALUE ASCENSION LOOP -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Practice</span>
      <span>Ascension Strategy</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <h1>The Value Ascension Loop</h1>
      <div class="subtitle">From Entry Level to High-Ticket Intake</div>
    </div>
    
    <p class="instruction-text">
      FOLA's value ladder consists of four distinct tiers designed to move leads from symptom awareness to committed practice integration.
    </p>
    
    <h2>Tier 1: The SLO Front-End (R150 - R300)</h2>
    <p class="instruction-text">
      The Somatic Companion Workbook and Guided Regression Audio. Focuses on introducing somatic awareness and locating childhood defense imprints.
    </p>
    
    <h2>Tier 2: The LoveBetter Portal (R600)</h2>
    <p class="instruction-text">
      A client-encrypted, secure self-reflection assessment mapping attachment styles, developmental traces, and intimacy loops.
    </p>
    
    <h2>Tier 3: The Flagship Ladderwork Sequence (R36,500)</h2>
    <p class="instruction-text">
      The core 10-session guided regression sequence covering Inner Child, Parental Boundaries, Reclaiming Authority, and Wealth Wiring.
    </p>
    
    <h2>Tier 4: Built Capacity (Ongoing Practice)</h2>
    <p class="instruction-text">
      Secondary integration check-ins and maintenance sequences following a 3–6 month release period.
    </p>
    
    <div class="footer">
      <span>FOLA SLO Marketing Playbook</span>
      <span>Page 3</span>
    </div>
  </div>

  <!-- TESTIMONIAL HOOK -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Practice</span>
      <span>Somatic Testimonials</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <h1>The Somatic Testimonial Ask</h1>
      <div class="subtitle">Leveraging the Post-Trance Integration State</div>
    </div>
    
    <p class="instruction-text">
      Testimonial acquisition is traditionally a friction-point. FOLA solves this by framing the request as a therapeutic somatic anchoring practice. The request lives on Day 7 of the workbook and in the closing moments of the Regression Audio.
    </p>
    
    <h2>1. The Psychology of Post-Trance Reflection</h2>
    <p class="instruction-text">
      Immediately upon waking from hypnosis, the client's prefrontal cortex is quiet, and their emotional release is highly present. Expressing their shift aloud anchors it. We ask the client to record a 2-minute video sharing their Before, During, After, and Next Steps.
    </p>
    
    <h2>2. The Incentive Loop (Funnel Bridge)</h2>
    <p class="instruction-text">
      Uploading the video to the portal serves as a direct value exchange. In return, the portal unlocks:
    </p>
    <ul class="bullet-list">
      <li><strong>An R200 LoveBetter Voucher:</strong> Reducing the assessment from R600 to R400, pulling them directly into Tier 2.</li>
      <li><strong>10-Min Somatic Emergency Reset Audio:</strong> A high-utility, short-form tool for immediate stress regulation.</li>
    </ul>
    
    <div class="footer">
      <span>FOLA SLO Marketing Playbook</span>
      <span>Page 4</span>
    </div>
  </div>

  <!-- AD COPY & HOOKS -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Practice</span>
      <span>Marketing Copy</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <h1>Advertising Copy & Creative Hooks</h1>
      <div class="subtitle">Emotionally Precise, Somatic Messaging</div>
    </div>
    
    <p class="instruction-text">
      To attract high-performing professionals, founders, and executives, FOLA's marketing must speak to their unique, quiet exhaustion. We avoid clinical diagnostic words, focusing on somatic experiences.
    </p>
    
    <h2>Hook 1: The Calendar</h2>
    <div class="highlight-box">
      <p>"Your childhood address is running your adult calendar."</p>
    </div>
    <p class="instruction-text">
      Triggers the high-performer who realizes their relentless schedule, hyper-vigilance, and constant drive are actually child-level defense mechanisms to secure safety.
    </p>
    
    <h2>Hook 2: Performance vs Peace</h2>
    <div class="highlight-box">
      <p>"Performance without peace is just a slower collapse."</p>
    </div>
    <p class="instruction-text">
      Targets executives who are highly successful in public but silently buckling under burnout, decision fatigue, and relationship friction in private.
    </p>
    
    <div class="footer">
      <span>FOLA SLO Marketing Playbook</span>
      <span>Page 5</span>
    </div>
  </div>

</body>
</html>
  `;

  try {
    const browser = await puppeteer.launch({
      executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfPath = "/Users/fola/.gemini/antigravity-cli/brain/77500196-dec9-416a-978c-68d6cb4ec0c9/FOLA_Inner_Child_Marketing_Playbook.pdf";
    
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
    });

    console.log("✅ PDF Marketing Playbook Successfully Written to: " + pdfPath);
    await browser.close();
  } catch (err) {
    console.error("❌ Error generating PDF Marketing Playbook:", err);
  }
})();
