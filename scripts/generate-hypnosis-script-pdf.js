const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
  console.log("🚀 Initializing FOLA Inner Child Regression Hypnosis Script PDF Generation with base64 cover...");

  const coverPath = "/Users/fola/.gemini/antigravity-cli/brain/77500196-dec9-416a-978c-68d6cb4ec0c9/somatic_workbook_cover.jpg";
  let base64Cover = "";
  try {
    const fileBuffer = fs.readFileSync(coverPath);
    base64Cover = `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;
    console.log("✅ Successfully loaded and base64-encoded cover image.");
  } catch (err) {
    console.error("⚠️ Failed to load cover image, proceeding without it:", err);
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Guided Somatic Regression Hypnosis Script — FOLA</title>
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
    
    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 20px;
      color: #241613;
      margin-top: 20px;
      margin-bottom: 10px;
      font-weight: 600;
      border-bottom: 1px solid #FAF8F5;
      padding-bottom: 6px;
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
    
    .script-quote {
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      font-style: italic;
      line-height: 1.7;
      color: #241613;
      background-color: #FAF8F5;
      border-left: 4px solid #C9B99A;
      padding: 20px;
      margin: 20px 0;
      text-align: justify;
    }
  </style>
</head>
<body>

  <!-- COVER PAGE (FULL BLEED COVER IMAGE) -->
  <div class="cover-page">
    <img class="cover-img" src="${base64Cover}" alt="FOLA Guided Somatic Regression Hypnosis Script Cover" />
  </div>

  <!-- ABOUT THE RECORDING PAGE -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Practice</span>
      <span>Production Guidelines</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <h1>Practitioner Guidelines</h1>
      <div class="subtitle">Audio Recording Instructions for Hakeem Lesolang</div>
    </div>
    
    <p class="instruction-text">
      The Step 1 Guided Somatic Regression is FOLA's introductory subconscious entry point. It has been refactored to align with non-clinical somatic practice guidelines, avoiding diagnostic, psychotherapeutic, or curing claims.
    </p>
    
    <h2>1. Voice Pacing & Cadence</h2>
    <p class="instruction-text">
      The delivery must be grounded, calm, and slow. Speak at roughly 60 beats per minute (a standard baroque tempo) matching exhalations. Allow for 2-3 second pauses between sentences to give space for subconscious exploration.
    </p>
    
    <h2>2. Background Frequencies</h2>
    <p class="instruction-text">
      Underlay a soft, continuous 396Hz tone (often used to clear fear and subconscious resistance). Mix with low pink noise to create a warm acoustic envelope for the client's home practice.
    </p>
    
    <h2>3. Tone & Container</h2>
    <p class="instruction-text">
      Speak from a place of solid, non-judgmental authority. You are creating a safe, maternal/paternal container for the client's nervous system. The vocabulary is somatic and state-focused, not clinical.
    </p>
    
    <div class="footer">
      <span>Step 1: Regression Audio Script</span>
      <span>Page 2</span>
    </div>
  </div>

  <!-- SECTION 1 INDUCTION -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Practice</span>
      <span>Script Section 1 & 2</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">01</div>
      <h1>Somatic Induction & Entry</h1>
      <div class="subtitle">0:00 - 8:00 Minutes</div>
    </div>
    
    <div class="highlight-box">
      <p><strong>Section 1: Somatic Induction (0:00 - 4:00)</strong> — Rhythmic, slow, deep breathing pacing.</p>
    </div>
    
    <div class="script-quote">
      "Sit comfortably. Close your eyes. Drop your shoulders away from your ears. Let the weight of your body sink fully into the chair beneath you.
      <br><br>
      You have spent the day managing, thinking, executing. For the next twenty minutes, there is nothing you need to fix. There is no one you need to save. Your nervous system is allowed to rest.
      <br><br>
      Take a deep breath in through your nose... hold it... and release it through your mouth with a soft sigh. Let your chest drop. Good.
      <br><br>
      As you listen to the sound of my voice, feel a wave of calm relaxation starting at the top of your head, sliding down behind your eyes, relaxing your jaw, settling into your throat, and softening your chest. Every breath out takes you deeper into a peaceful, focused state of authority."
    </div>
    
    <div class="highlight-box" style="margin-top: 10px;">
      <p><strong>Section 2: Bypassing the Critical Factor (4:00 - 8:00)</strong> — Counting transition down to the subconscious vault.</p>
    </div>
    
    <div class="script-quote" style="margin-top: 10px;">
      "Your conscious mind is a brilliant protector. But right now, we invite it to step back. We thank it for its service, and we let it rest.
      <br><br>
      Imagine a staircase of five steps leading down into your own safe, warm, subconscious vault.
      <br><br>
      Five... taking you deeper.
      <br><br>
      Four... letting go of external noise.
      <br><br>
      Three... feeling more present in your body than ever before.
      <br><br>
      Two... moving closer to the root.
      <br><br>
      One... you are there. Safe, focused, receptive."
    </div>
    
    <div class="footer">
      <span>Step 1: Regression Audio Script</span>
      <span>Page 3</span>
    </div>
  </div>

  <!-- SECTION 3 REGRESSION -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Practice</span>
      <span>Script Section 3</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">02</div>
      <h1>Guided Somatic Regression</h1>
      <div class="subtitle">8:00 - 14:00 Minutes</div>
    </div>
    
    <div class="highlight-box">
      <p><strong>Section 3: Somatic Regression (8:00 - 14:00)</strong> — Locating the trace and connecting with the younger self.</p>
    </div>
    
    <div class="script-quote">
      "Now, recall that physical feeling of pressure, tension, or defensiveness you logged in your journal. Feel it in your body now. Where is it? In your chest? In your throat?
      <br><br>
      Let that feeling act as a thread. We are following it back, back, back, through time. Back past last year... past college... past high school... down to a childhood address.
      <br><br>
      Locate the child who first felt this way. Look at them. See what they are wearing. See the room.
      <br><br>
      What are they afraid of? What script did they write to keep themselves safe in that room? Was it to hide? Was it to perform? Was it to build an empire so no one could touch them?
      <br><br>
      Step into the room as your adult self. Look at this child. Place your hand gently on their shoulder, and tell them what they have needed to hear for twenty years:
      <br><br>
      'I am here now. You don't have to carry this anymore. The danger is over. You did a beautiful job keeping us safe, but I am the adult now, and I've got this. You are allowed to play. You are allowed to rest.'
      <br><br>
      Feel that child step into your chest, releasing the grip. Feel the physical space opening up in your lungs."
    </div>
    
    <div class="footer">
      <span>Step 1: Regression Audio Script</span>
      <span>Page 4</span>
    </div>
  </div>

  <!-- SECTION 4 & 5 INTEGRATION AND HOOK -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Practice</span>
      <span>Script Section 4 & 5</span>
    </div>
    
    <div class="title-area" style="margin-top: 10mm;">
      <div class="page-number-large">03</div>
      <h1>Somatic Integration & Ascension</h1>
      <div class="subtitle">14:00 - 20:00 Minutes</div>
    </div>
    
    <div class="highlight-box">
      <p><strong>Section 4: Somatic Integration (14:00 - 18:00)</strong> — Anchoring safety, counting back up to alert state.</p>
    </div>
    
    <div class="script-quote">
      "With every breath, wire this safety in. Your nervous system is updating. The old threat response is dissolving. You no longer need to perform to be safe. You are safe because you exist.
      <br><br>
      In a moment, I will count from one to five, bringing you back to the room.
      <br><br>
      One... feeling the weight of your feet on the floor.
      <br><br>
      Two... carrying this deep somatic peace with you.
      <br><br>
      Three... drawing in a fresh, energizing breath.
      <br><br>
      Four... moving your fingers and toes.
      <br><br>
      Five... eyes open, fully back, fully integrated."
    </div>
    
    <div class="highlight-box" style="margin-top: 10px;">
      <p><strong>Section 5: The Testimonial Anchor & Funnel Hook (18:00 - 20:00)</strong> — Direct call to action.</p>
    </div>
    
    <div class="script-quote" style="margin-top: 10px;">
      "Welcome back. Take a moment to feel your body. Feel the silence in your mind.
      <br><br>
      What you are experiencing right now is not just relaxation—it is a physical update to your somatic patterns. While this shift is raw, while it is real, let us anchor it.
      <br><br>
      Open your journal to Page 7. Scan the portal code. Speak your truth. Record a brief, 2-minute video for me. Share how you felt coming in, what occurred during the regression, and how your chest and body feel right now.
      <br><br>
      Sharing your shift cements this state. It tells your subconscious that the safety you found is real. Once you submit your reflection, the portal will instantly unlock your R200 LoveBetter Assessment Voucher so we can map your full attachment loops, along with your somatic reset audio.
      <br><br>
      I look forward to hearing your voice. Speak soon."
    </div>
    
    <div class="footer">
      <span>Step 1: Regression Audio Script</span>
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

    const pdfPath = "/Users/fola/.gemini/antigravity-cli/brain/77500196-dec9-416a-978c-68d6cb4ec0c9/FOLA_Inner_Child_Regression_Hypnosis_Script.pdf";
    
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
    });

    console.log("✅ PDF Hypnosis Script Successfully Written to: " + pdfPath);
    await browser.close();
  } catch (err) {
    console.error("❌ Error generating PDF Hypnosis Script:", err);
  }
})();
