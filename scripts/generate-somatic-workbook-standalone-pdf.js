const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
  console.log("🚀 Initializing FOLA Standalone Inner Child Somatic Workbook PDF Generation...");

  const coverPath = "/Users/fola/.gemini/antigravity-cli/brain/77500196-dec9-416a-978c-68d6cb4ec0c9/somatic_workbook_cover.jpg";
  let base64Cover = "";
  try {
    const fileBuffer = fs.readFileSync(coverPath);
    base64Cover = `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;
  } catch (err) {
    console.error("⚠️ Failed to load cover image, proceeding without it:", err);
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Inner Child Somatic Workbook (Standalone) — FOLA</title>
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
    
    /* Cover Page Full Bleed */
    .cover-page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      box-sizing: border-box;
      page-break-after: always;
      position: relative;
      background-color: #241613;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }
    
    .cover-img {
      width: 210mm;
      height: 297mm;
      object-fit: cover;
      display: block;
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
      flex-shrink: 0;
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
    <img class="cover-img" src="${base64Cover}" alt="FOLA Inner Child Somatic Workbook Cover" />
  </div>

  <!-- INTRO PAGE -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Practice</span>
      <span>Step 1 Workbook</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <h1>The Physical Address of Early Memory</h1>
      <div class="subtitle">Where Your Past Lives Today</div>
    </div>
    
    <p class="instruction-text">
      <strong>Congratulations on taking this step.</strong> By purchasing this somatic journal and committing to this 7-day sequence, you have made a conscious decision to trace your behaviors back to their roots.
    </p>
    
    <p class="instruction-text">
      Your conscious mind is a brilliant strategist—managing calendars, task lists, and explaining why you feel stuck. But your survival defenses—the sudden shut downs, the fear of being visible, the tightness in your throat when speaking up—do not live in logic. They live in your nervous system. Journaling is a core FOLA tenet because it <strong>externalizes the fog, confusion, and pain</strong>. When trapped in your head, emotional noise remains an amorphous threat. Writing forces it onto the page, allowing you to see your pain live outside your body. You can inspect it, understand it, and realize that you are the author—not the victim—of your script.
    </p>
    
    <p class="instruction-text">
      Science shows that expressive writing downregulates the amygdala (the brain's threat center) and engages the prefrontal cortex. By naming your sensations and tracing their childhood origin, you rewire your brain, teaching your nervous system that the danger is over. This is the path to healing, living freely, and winning in life.
    </p>
    
    <div class="highlight-box" style="margin-top: 10px;">
      <p><strong>The Core Truth:</strong> You cannot think your way out of a physical defense response. To loosen the grip, you must externalize the fog and locate where the pattern first made your body feel unsafe.</p>
    </div>
    
    <p style="font-size: 10px; color: #94a3b8; font-style: italic; margin-top: 30px;">
      Disclaimer: FOLA is a complementary hypnotherapy and somatic coaching practice. We do not diagnose, treat, cure, or manage any medical or mental health condition. Individual results vary. If you are experiencing acute distress, contact SADAG at 0800 567 567.
    </p>
    
    <div class="footer">
      <span>Step 1: The Inner Child Somatic Journal</span>
      <span>Page 2</span>
    </div>
  </div>

  <!-- DAY 1 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Practice</span>
      <span>Day 1: Finding the Knot</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">01</div>
      <h1>Finding the Physical Knot</h1>
      <div class="subtitle">Where does stress register in your body?</div>
    </div>
    
    <p class="instruction-text">
      Recall a moment this week when you felt defensive, small, or irrationally anxious. Map where it registered in your body. Don't write what you *thought*—describe the raw physical sensation.
    </p>
    
    <div class="somatic-map-container">
      <div class="somatic-option">
        <strong>The Throat</strong>
        Tightness, feeling choked or silent
      </div>
      <div class="somatic-option">
        <strong>The Chest</strong>
        A heavy brick, shallow breathing
      </div>
      <div class="somatic-option">
        <strong>The Stomach</strong>
        A hollow drop, a bracing knot
      </div>
    </div>
    
    <div class="journal-box">
      <span class="journal-box-label">Inquiry: What did this knot feel like? What childhood memory carries this same physical sensation?</span>
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
      <span class="header-logo">FOLA Practice</span>
      <span>Day 2: The Safety Script</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">02</div>
      <h1>Your Survival Safety Script</h1>
      <div class="subtitle">What did you build to survive?</div>
    </div>
    
    <p class="instruction-text">
      When your childhood environment felt chaotic, you built a script to guarantee your safety. Underline yours:
      <em>The Avoidant One (withdrawing), The Performer (securing approval), The Rebel (rejecting control), The Helper (saving others).</em>
    </p>
    
    <div class="journal-box">
      <span class="journal-box-label">Inquiry: How did this script protect you as a child? What is it costing you today in sleep, health, or relationships?</span>
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
      <span class="header-logo">FOLA Practice</span>
      <span>Day 3: Quiet Reflection</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">03</div>
      <h1>Quietening the Nervous System</h1>
      <div class="subtitle">Nervous System Check-In before daily reflection</div>
    </div>
    
    <p class="instruction-text">
      Complete this page right before your daily quiet reflection window. Are you walking around in high alert (shoulders tight, jaw clenched, heart racing) or flatly shut down (feeling numb, exhausted, hiding behind your screen)?
    </p>
    
    <div class="scale-bar">
      <div class="scale-node">
        <span>1</span>
        <span>Shut Down</span>
      </div>
      <div class="scale-node"><span>2</span></div>
      <div class="scale-node"><span>3</span></div>
      <div class="scale-node">
        <span>4</span>
        <span>At Peace</span>
      </div>
      <div class="scale-node"><span>5</span></div>
      <div class="scale-node"><span>6</span></div>
      <div class="scale-node">
        <span>7</span>
        <span>Tense</span>
      </div>
      <div class="scale-node"><span>8</span></div>
      <div class="scale-node"><span>9</span></div>
      <div class="scale-node">
        <span>10</span>
        <span>High Alert</span>
      </div>
    </div>
    
    <div class="journal-box" style="margin-top: 15px;">
      <span class="journal-box-label">Set your intention: What is your adult self promising to protect during this reflection?</span>
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
      <span class="header-logo">FOLA Practice</span>
      <span>Day 4: Inner Dialogue</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">04</div>
      <h1>Subconscious Dialogue</h1>
      <div class="subtitle">Transcribing what arose during quiet reflection</div>
    </div>
    
    <p class="instruction-text">
      Close your eyes for five minutes, breathe slowly, and connect with your younger self. When you open them, immediately write down what came to mind. What did they ask for? What did they need you to hear?
    </p>
    
    <div class="journal-box">
      <span class="journal-box-label">Write the raw, unfiltered truth of what arose, and your concrete promise to them</span>
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
      <span class="header-logo">FOLA Practice</span>
      <span>Day 5: Unwiring Scarcity</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">05</div>
      <h1>Unwiring Scarcity Loops</h1>
      <div class="subtitle">Reclaiming abundance at the level of the body</div>
    </div>
    
    <p class="instruction-text">
      Scarcity is a survival strategy. It makes you feel like resources, love, and safety are finite. If you knew, with absolute physical certainty, that you could not be abandoned or go broke, what choice would you make today?
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
    </div>
    
    <div class="footer">
      <span>Step 1: The Inner Child Somatic Journal</span>
      <span>Page 7</span>
    </div>
  </div>

  <!-- DAY 6 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Practice</span>
      <span>Day 6: Relationship Patterns</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">06</div>
      <h1>Relational Triggers</h1>
      <div class="subtitle">Mapping attachment response loops</div>
    </div>
    
    <p class="instruction-text">
      Intimacy triggers our childhood scripts because closeness feels threatening. When your partner pulls away or criticizes, how does your body react? What is a rewired, peaceful response you can choose next time?
    </p>
    
    <div class="journal-box">
      <span class="journal-box-label">Write your relational mapping and somatic boundaries here</span>
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
      <span class="header-logo">FOLA Practice</span>
      <span>Day 7: Integration & Testimonial</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">07</div>
      <h1>Anchor Your Shift</h1>
      <div class="subtitle">Day 7: Share Your Somatic Journey</div>
    </div>
    
    <p class="instruction-text">
      Real shift is solidified when it is externalized and shared. We invite you to reflect on your 7-day somatic experience—how your body felt coming in, the shifts that occurred during your reflections, and the new-found ease in your breathing today.
    </p>
    
    <div style="background-color: #faf8f5; border-left: 3px solid #6B2737; padding: 15px; border-radius: 0 8px 8px 0; margin-bottom: 20px;">
      <p style="font-weight: 700; color: #241613; margin-bottom: 8px; font-size: 13.5px;">How to Share Your Reflection & Testimonial:</p>
      <ul style="margin: 0; padding-left: 20px; font-size: 12.5px; color: #475569; line-height: 1.6;">
        <li><strong>Leave a Review:</strong> Share your experience with the workbook on our professional profile at <strong>Bark.com</strong>.</li>
        <li><strong>Submit a Testimonial:</strong> Send a 2-minute raw video or written reflection via <strong>WeTransfer</strong> to <strong>hakeemandrsn@gmail.com</strong>.</li>
        <li><strong>Intake Call:</strong> Book a direct discovery session to experience <strong>The 10-Session Ladderwork Sequence</strong>.</li>
      </ul>
    </div>
    
    <div class="qr-container">
      <div class="qr-box">
        Share<br>Your<br>Shift
      </div>
      <div class="qr-text">
        <h4>Support the FOLA Community</h4>
        <p>Your story helps other high-performing professionals realize they don't have to carry their quiet exhaustion alone. To submit your testimonial or review, email us directly or upload your files via WeTransfer to <strong>hakeemandrsn@gmail.com</strong>.</p>
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

    const pdfPath = "/Users/fola/.gemini/antigravity-cli/brain/91893e3d-83bb-4259-a3fd-eb5a4f255470/FOLA_Inner_Child_Somatic_Workbook_Standalone.pdf";
    
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
    });

    console.log("✅ PDF Standalone Somatic Workbook Successfully Written to: " + pdfPath);
    await browser.close();

    // Copy to website downloads directory
    const webPath = "/Users/fola/fola-website-design/public/downloads/FOLA_Inner_Child_Somatic_Workbook_Standalone.pdf";
    fs.copyFileSync(pdfPath, webPath);
    console.log("✅ PDF Copied to Website Downloads: " + webPath);
  } catch (err) {
    console.error("❌ Error generating PDF Standalone Somatic Workbook:", err);
  }
})();
