const puppeteer = require("puppeteer");
const { join } = require("path");

(async () => {
  console.log("🚀 Initializing FOLA Inner Child Somatic Workbook PDF Generation...");

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Inner Child Somatic Workbook — FOLA Polyclinics</title>
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
      box-sizing: border-box;
      padding: 25mm 22mm 22mm 22mm;
      page-break-after: always;
      position: relative;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
    }
    
    /* Cover Page */
    .cover-page {
      background-color: #241613;
      color: #EDE5D4;
      padding: 40mm 22mm 25mm 22mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 297mm;
      box-sizing: border-box;
      page-break-after: always;
      position: relative;
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
    
    .page-number-large {
      font-family: 'Playfair Display', serif;
      font-size: 54px;
      color: #C9B99A;
      opacity: 0.25;
      line-height: 1;
      margin-bottom: -10px;
    }
    
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 26px;
      color: #241613;
      margin-top: 0;
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
    
    /* Somatic Checklist / Forms */
    .somatic-map-container {
      display: flex;
      justify-content: space-between;
      margin: 15px 0;
      gap: 15px;
    }
    
    .somatic-option {
      flex: 1;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
      text-align: center;
      font-size: 12px;
      color: #475569;
      background-color: #faf8f5;
    }
    
    .somatic-option strong {
      display: block;
      color: #241613;
      margin-bottom: 4px;
      font-size: 13px;
    }
    
    /* Journal Lines (Writing Areas) */
    .journal-box {
      flex-grow: 1;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background-color: #faf8f5;
      padding: 20px;
      position: relative;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
    }
    
    .journal-line {
      border-bottom: 1px solid #e2e8f0;
      height: 32px;
      width: 100%;
    }
    
    .journal-line:last-child {
      border-bottom: none;
    }
    
    .journal-box-label {
      position: absolute;
      top: -10px;
      left: 15px;
      background-color: #ffffff;
      padding: 0 10px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #6B2737;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
    }
    
    /* Scale Slider Graphic */
    .scale-bar {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      border-top: 2px solid #e2e8f0;
      position: relative;
      padding-top: 10px;
    }
    
    .scale-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 11px;
      color: #64748b;
      position: relative;
    }
    
    .scale-node::before {
      content: '';
      width: 10px;
      height: 10px;
      background-color: #e2e8f0;
      border-radius: 50%;
      position: absolute;
      top: -16px;
    }
    
    .scale-node.active::before {
      background-color: #6B2737;
      width: 14px;
      height: 14px;
      top: -18px;
    }
    
    .scale-node.active {
      color: #6B2737;
      font-weight: 700;
    }

    /* Testimonial specific page components */
    .qr-container {
      display: flex;
      align-items: center;
      gap: 25px;
      margin-top: 25px;
      background-color: #FAF8F5;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
    }
    
    .qr-box {
      width: 110px;
      height: 110px;
      border: 2px dashed #C9B99A;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 9px;
      color: #7A6A5E;
      text-transform: uppercase;
      letter-spacing: 1px;
      text-align: center;
      font-weight: 600;
      background-color: #ffffff;
      shrink-0;
    }
    
    .qr-text h4 {
      margin: 0 0 6px 0;
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      color: #241613;
    }
    
    .qr-text p {
      margin: 0;
      font-size: 12.5px;
      color: #475569;
      line-height: 1.5;
    }
    
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-top">
      <div class="cover-tag">The Ladderwork Sequence — Step 1</div>
      <h1 class="cover-title">The Inner Child<br>Somatic Companion Journal</h1>
      <div class="cover-subtitle">A 7-day workbook to map triggers, locate the childhood address of self-sabotage, and integrate the rewired subconscious state.</div>
    </div>
    
    <div class="cover-bottom">
      <div class="cover-meta">
        <div class="meta-item">
          <strong>Name</strong>
          ___________________________
        </div>
        <div class="meta-item">
          <strong>Practice Date</strong>
          ___________________________
        </div>
        <div class="meta-item">
          <strong>Practitioner</strong>
          Hakeem Lesolang (FOLA)
        </div>
      </div>
    </div>
  </div>

  <!-- INTRO PAGE -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Polyclinics</span>
      <span>Somatic Journal</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <h1>Understanding Somatic Traces</h1>
      <div class="subtitle">The Core Philosophy of the Journal</div>
    </div>
    
    <p class="instruction-text">
      Welcome to your Step 1 Somatic Companion. Your conscious mind is an intellectual strategist. It can write lists, set boundaries, and explain why you feel stuck. However, your survival defenses—your anxiety, your sudden urges to withdraw, your fear of visibility—do not live in your logic. They live in your nervous system.
    </p>
    
    <p class="instruction-text">
      When you experience a trigger today (whether a relationship conflict or a financial block), your body is executing a defense script that was written years ago to keep you safe in a child's environment. We call this the <strong>Somatic Trace</strong>.
    </p>
    
    <p class="instruction-text">
      This journal is designed to help you locate that trace, map its childhood address, and document the integration process. Use these pages before and after you play your Step 1 Regression Audio. Write without filtering. Let the subconscious speak.
    </p>
    
    <div class="highlight-box" style="margin-top: 10px;">
      <p><strong>Clinical Axiom:</strong> You cannot think your way out of a physiological defense response. To update the code, you must locate the somatic address where it was first compiled.</p>
    </div>
    
    <div class="footer">
      <span>Step 1: The Inner Child Somatic Journal</span>
      <span>Page 2</span>
    </div>
  </div>

  <!-- DAY 1 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Polyclinics</span>
      <span>Day 1: Locating the Trace</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">01</div>
      <h1>Locating the Somatic Trace</h1>
      <div class="subtitle">Trigger & Physical Address Logging</div>
    </div>
    
    <p class="instruction-text">
      Identify a moment this past week when you felt defensive, small, or irrationally anxious. Map where it registered in your body. Don't write what you *thought*—write what you *felt*.
    </p>
    
    <div class="somatic-map-container">
      <div class="somatic-option">
        <strong>Throat</strong>
        Tightness, vocal constraint, choke
      </div>
      <div class="somatic-option">
        <strong>Chest</strong>
        Heavy weight, shallow breathing
      </div>
      <div class="somatic-option">
        <strong>Stomach</strong>
        Fluttering, hollow, bracing drop
      </div>
    </div>
    
    <div class="journal-box">
      <span class="journal-box-label">Write your physical sensations and childhood memory link here</span>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
    </div>
    
    <div class="footer">
      <span>Step 1: The Inner Child Somatic Journal</span>
      <span>Page 3</span>
    </div>
  </div>

  <!-- DAY 2 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Polyclinics</span>
      <span>Day 2: The Protection Script</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">02</div>
      <h1>The Protection Script</h1>
      <div class="subtitle">Identifying your childhood survival strategy</div>
    </div>
    
    <p class="instruction-text">
      As a child, when your environment felt unsafe or overwhelming, you developed a defense mechanism. Which of these four scripts did you build? 
      <em>(Underline yours: The Avoidant One, The Academic Performer, The Rebel Rouser, The Over-Eager Helper).</em>
    </p>
    
    <div class="journal-box">
      <span class="journal-box-label">Inquiry: How did this script keep you safe then? What is it costing you now?</span>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
    </div>
    
    <div class="footer">
      <span>Step 1: The Inner Child Somatic Journal</span>
      <span>Page 4</span>
    </div>
  </div>

  <!-- DAY 3 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Polyclinics</span>
      <span>Day 3: Hypnotic Preparation</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">03</div>
      <h1>Subconscious Preparation</h1>
      <div class="subtitle">Nervous System Mapping & Intentions</div>
    </div>
    
    <p class="instruction-text">
      Complete this page right before you listen to your Step 1 Regression Audio. Rate your current somatic state. Are you hyper-vigilant (anxious/tense) or shut down (fatigued/numb)?
    </p>
    
    <div class="scale-bar">
      <div class="scale-node">
        <span>1</span>
        <span>Numb</span>
      </div>
      <div class="scale-node"><span>2</span></div>
      <div class="scale-node"><span>3</span></div>
      <div class="scale-node">
        <span>4</span>
        <span>Grounded</span>
      </div>
      <div class="scale-node"><span>5</span></div>
      <div class="scale-node"><span>6</span></div>
      <div class="scale-node">
        <span>7</span>
        <span>Activated</span>
      </div>
      <div class="scale-node"><span>8</span></div>
      <div class="scale-node"><span>9</span></div>
      <div class="scale-node">
        <span>10</span>
        <span>Panicked</span>
      </div>
    </div>
    
    <div class="journal-box">
      <span class="journal-box-label">Set your intention: What is your adult self promising to protect today?</span>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
    </div>
    
    <div class="footer">
      <span>Step 1: The Inner Child Somatic Journal</span>
      <span>Page 5</span>
    </div>
  </div>

  <!-- DAY 4 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Polyclinics</span>
      <span>Day 4: Post-Audio Integration</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">04</div>
      <h1>Post-Audio Integration</h1>
      <div class="subtitle">Transcribing the Subconscious Dialogue</div>
    </div>
    
    <p class="instruction-text">
      Open your eyes from the regression. Immediately, while your prefrontal cortex is quiet, transcribe the words your younger self spoke. What did they ask for? What did they need you to hear?
    </p>
    
    <div class="journal-box">
      <span class="journal-box-label">Transcribe the dialogue and write down your concrete adult promise</span>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
    </div>
    
    <div class="footer">
      <span>Step 1: The Inner Child Somatic Journal</span>
      <span>Page 6</span>
    </div>
  </div>

  <!-- DAY 5 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Polyclinics</span>
      <span>Day 5: Reclaiming Agency</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">05</div>
      <h1>Reclaiming Agency</h1>
      <div class="subtitle">Unwiring Scarcity Projections</div>
    </div>
    
    <p class="instruction-text">
      Scarcity is a survival instinct. It makes you feel like resources, love, and safety are finite. If you knew, with absolute physical certainty, that you could not be abandoned or go broke, what choice would you make today?
    </p>
    
    <div class="journal-box">
      <span class="journal-box-label">Write your choice audit here</span>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
    </div>
    
    <div class="footer">
      <span>Step 1: The Inner Child Somatic Journal</span>
      <span>Page 7</span>
    </div>
  </div>

  <!-- DAY 6 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Polyclinics</span>
      <span>Day 6: Relational Traces</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">06</div>
      <h1>Relational Traces</h1>
      <div class="subtitle">Rewiring the Intimacy Loop</div>
    </div>
    
    <p class="instruction-text">
      Intimacy triggers the inner child because closeness feels threatening to an early protection script. When your partner triggers you, how does your body react? What is a rewired somatic response you can execute?
    </p>
    
    <div class="journal-box">
      <span class="journal-box-label">Write your relational trigger mapping and somatic boundaries here</span>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
      <div class="journal-line"></div>
    </div>
    
    <div class="footer">
      <span>Step 1: The Inner Child Somatic Journal</span>
      <span>Page 8</span>
    </div>
  </div>

  <!-- DAY 7 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Polyclinics</span>
      <span>Day 7: The Integration Portal</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">07</div>
      <h1>Anchor Your Shift</h1>
      <div class="subtitle">Day 7: Value Ascension Portal</div>
    </div>
    
    <p class="instruction-text">
      Subconscious transformation is solidified when it is spoken. By expressing your progress aloud, you wire the new state of safety directly into your nervous system. Complete the 7-day sequence by recording a brief, 2-minute video.
    </p>
    
    <div style="background-color: #faf8f5; border-left: 3px solid #6B2737; padding: 15px; border-radius: 0 8px 8px 0; margin-bottom: 20px;">
      <p style="font-weight: 700; color: #241613; margin-bottom: 8px; font-size: 13.5px;">Your 2-Minute Reflection Outline:</p>
      <ul style="margin: 0; padding-left: 20px; font-size: 12.5px; color: #475569; line-height: 1.6;">
        <li><strong>Before:</strong> How did you feel walking into this Step 1 package? (Anxiety, block, or tension).</li>
        <li><strong>During:</strong> What occurred in your body during the guided regression audio?</li>
        <li><strong>After:</strong> How does your body (chest, throat, stomach) feel right now?</li>
        <li><strong>Next:</strong> What are you looking forward to next on your healing journey?</li>
      </ul>
    </div>
    
    <div class="qr-container">
      <div class="qr-box">
        Scan<br>Portal<br>QR Code
      </div>
      <div class="qr-text">
        <h4>Access Your Ascension Dashboard</h4>
        <p>Scan this code to record your video. Once uploaded, your dashboard will instantly unlock your <strong>R200 LoveBetter Assessment Voucher</strong> and email your <strong>10-Min Somatic Emergency Reset Audio</strong>.</p>
      </div>
    </div>
    
    <div class="footer">
      <span>Step 1: The Inner Child Somatic Journal</span>
      <span>Page 9</span>
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

    const pdfPath = "/Users/fola/.gemini/antigravity-cli/brain/77500196-dec9-416a-978c-68d6cb4ec0c9/FOLA_Inner_Child_Somatic_Workbook.pdf";
    
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
    });

    console.log("✅ PDF Somatic Workbook Successfully Written to: " + pdfPath);
    await browser.close();
  } catch (err) {
    console.error("❌ Error generating PDF Somatic Workbook:", err);
  }
})();
