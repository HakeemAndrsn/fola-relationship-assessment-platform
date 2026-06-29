const puppeteer = require("puppeteer");
const { join } = require("path");

(async () => {
  console.log("🚀 Initializing FOLA Nurturing Sequence Playbook PDF Generation...");

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FOLA Step 1 Nurturing & Ascension Email Playbook</title>
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
    
    .email-box {
      background-color: #FAF8F5;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      margin: 15px 0;
      font-size: 13px;
      line-height: 1.6;
      color: #241613;
    }
    
    .email-box strong {
      color: #6B2737;
    }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-top">
      <div class="cover-tag">FOLA Business Automation</div>
      <h1 class="cover-title">Step 1 Nurturing<br>& Ascension<br>Email Playbook</h1>
      <div class="cover-subtitle">A five-part dangerously emotional email sequence to convert R150 workbook buyers into R36,500 flagship clients.</div>
    </div>
    
    <div class="cover-bottom">
      <div class="cover-meta">
        <div class="meta-item">
          <strong>Tool Stack</strong>
          Brevo / n8n
        </div>
        <div class="meta-item">
          <strong>Practice</strong>
          FOLA
        </div>
        <div class="meta-item">
          <strong>Author</strong>
          Hakeem Lesolang
        </div>
      </div>
    </div>
  </div>

  <!-- EMAIL 1 & 2 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Practice</span>
      <span>Emails 1 & 2</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <h1>Deliver & Explain the Trace</h1>
      <div class="subtitle">Days 1 and 2 of the Sequence</div>
    </div>
    
    <h2>Email 1: Immediate Delivery (Subject: Your downloads are inside)</h2>
    <div class="email-box">
      "Hello [Name],
      <br><br>
      Your decision to download the <strong>Step 1 Somatic Companion</strong> is a promise to yourself. 
      Your workbook and guided regression audio links are ready below:
      <br>
      👉 [Download Your Somatic Workbook & Audio Pack]
      <br><br>
      Over the next 7 days, do not try to intellectually solve your life. Just open page 3, breathe, and find where stress clenches your body.
      <br><br>
      Speak soon,
      <br>
      Hakeem Lesolang, FOLA"
    </div>
    
    <h2>Email 2: Day 2 (Subject: The physical address of your stress)</h2>
    <div class="email-box">
      "Hello [Name],
      <br><br>
      Think about the last time someone criticized you or pulled away. 
      Your heart rate spiked. Your chest felt tight. Your stomach knotted.
      <br><br>
      You didn't think those feelings—your nervous system executed them. That physical knot is a map. It points directly to a room you stood in as a child where it wasn't safe to be seen, to fail, or to speak.
      <br><br>
      Open Day 1 in your journal. Trace the knot.
      <br><br>
      Warmly,
      <br>
      Hakeem"
    </div>
    
    <div class="footer">
      <span>FOLA Step 1 Email Playbook</span>
      <span>Page 2</span>
    </div>
  </div>

  <!-- EMAIL 3 & 4 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Practice</span>
      <span>Emails 3 & 4</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <h1>Expose the Script & Anchor the Shift</h1>
      <div class="subtitle">Days 4 and 7 of the Sequence</div>
    </div>
    
    <h2>Email 3: Day 4 (Subject: The survival script you built)</h2>
    <div class="email-box">
      "Hello [Name],
      <br><br>
      As a child, you built a script to survive emotional noise.
      Did you become the <strong>Performer</strong> (earning love through grades and success)? 
      The <strong>Avoidant</strong> (withdrawing to protect yourself)?
      <br><br>
      That script kept you safe then. Today, it is running your calendar, keeping you exhausted, and blocking your relationships.
      <br><br>
      It is time to let the child rest. The danger is over.
      <br><br>
      Warmly,
      <br>
      Hakeem"
    </div>
    
    <h2>Email 4: 14 Days Post-Purchase (Subject: How did your 7-day somatic sequence feel?)</h2>
    <div class="email-box">
      "Hello [Name],
      <br><br>
      It has been two weeks since you downloaded the <strong>Step 1 Somatic Companion Workbook</strong>. By now, you've had a chance to complete the daily sequence.
      <br><br>
      True somatic healing is solidified when we externalize our shift. I would love to hear how the nervous system tracking and daily somatic prompts felt for your body.
      <br><br>
      Would you be open to sharing your reflection with our community?
      <br><br>
      1. <strong>Leave a professional review:</strong> Share your experience with the workbook on our [Bark.com profile](https://www.bark.com/en/za/company/fola-hypnotherapy/3x38g/).
      <br>
      2. <strong>Submit a video or written testimonial:</strong> Upload a quick 2-minute phone video or write your thoughts, and send it via [WeTransfer](https://wetransfer.com/) directly to <strong>hakeemandrsn@gmail.com</strong>.
      <br><br>
      Your review or testimonial helps other high-performing professionals realize they don't have to carry their quiet exhaustion alone.
      <br><br>
      Warmly,
      <br>
      Hakeem"
    </div>
    
    <div class="footer">
      <span>FOLA Step 1 Email Playbook</span>
      <span>Page 3</span>
    </div>
  </div>

  <!-- EMAIL 5 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Practice</span>
      <span>Email 5</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <h1>The High-Ticket Ascension Pitch</h1>
      <div class="subtitle">Day 10 of the Sequence</div>
    </div>
    
    <h2>Email 5: Day 10 (Subject: Is your childhood address running your calendar?)</h2>
    <div class="email-box">
      "Hello [Name],
      <br><br>
      You can keep managing your exhaustion. You can buy more planners, download more apps, and set more boundaries.
      <br><br>
      Or you can resolve the subconscious wiring that makes peace feel dangerous.
      <br><br>
      At FOLA, we guide high-performing professionals through <strong>The Ladderwork Sequence</strong>—a 10-session one-on-one regression experience to unwind ancestral scarcity scripts, release parental guilt, and establish absolute authority over your calendar and bank accounts.
      <br><br>
      We are currently accepting intakes for our next cohort. Let's speak.
      <br><br>
      👉 [Apply for a Direct Discovery Intake Call]
      <br><br>
      Warmly,
      <br>
      Hakeem Lesolang, Founder, FOLA"
    </div>
    
    <div class="footer">
      <span>FOLA Step 1 Email Playbook</span>
      <span>Page 4</span>
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

    const pdfPath = "/Users/fola/.gemini/antigravity-cli/brain/91893e3d-83bb-4259-a3fd-eb5a4f255470/FOLA_Step_1_Nurturing_Sequence_Playbook.pdf";
    
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
    });

    console.log("✅ PDF Nurturing Sequence Playbook Successfully Written to: " + pdfPath);
    await browser.close();
  } catch (err) {
    console.error("❌ Error generating PDF Nurturing Sequence Playbook:", err);
  }
})();
