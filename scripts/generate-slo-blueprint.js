const puppeteer = require("puppeteer");
const { join } = require("path");

(async () => {
  console.log("🚀 Initializing FOLA Step 1 SLO Workbook & Audio Script PDF Generation...");

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FOLA Step 1: Inner Child Journal & Audio Script</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      color: #1e293b;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      -webkit-print-color-adjust: exact;
    }
    
    .page {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      padding: 25mm 20mm 20mm 20mm;
      page-break-after: always;
      position: relative;
      background-color: #ffffff;
    }
    
    /* Cover Page Specific styling */
    .cover-page {
      background-color: #241613;
      color: #EDE5D4;
      padding: 30mm 20mm 20mm 20mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 297mm;
      box-sizing: border-box;
      page-break-after: always;
      position: relative;
    }
    
    .cover-top {
      border-left: 4px solid #C9B99A;
      padding-left: 20px;
    }
    
    .cover-tag {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #C9B99A;
      margin-bottom: 10px;
    }
    
    .cover-title {
      font-family: 'Playfair Display', serif;
      font-size: 36px;
      font-weight: 700;
      line-height: 1.15;
      margin: 0 0 15px 0;
      color: #ffffff;
    }
    
    .cover-subtitle {
      font-size: 16px;
      font-weight: 300;
      color: #bfae8f;
      line-height: 1.5;
      max-width: 550px;
    }
    
    .cover-bottom {
      border-top: 1px solid rgba(255,255,255,0.1);
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
      margin-bottom: 5px;
    }
    
    /* Header / Footer styling */
    .header {
      position: absolute;
      top: 12mm;
      left: 20mm;
      right: 20mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 8px;
      font-size: 10px;
      color: #7A6A5E;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    
    .header-logo {
      font-weight: 700;
      color: #241613;
    }
    
    .footer {
      position: absolute;
      bottom: 12mm;
      left: 20mm;
      right: 20mm;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #f1f5f9;
      padding-top: 8px;
      font-size: 9px;
      color: #7A6A5E;
    }
    
    /* Typography */
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      color: #241613;
      margin-top: 0;
      margin-bottom: 15px;
      border-bottom: 2px solid #f1f5f9;
      padding-bottom: 8px;
    }
    
    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      color: #241613;
      margin-top: 18px;
      margin-bottom: 8px;
    }
    
    p {
      font-size: 13px;
      line-height: 1.55;
      margin-top: 0;
      margin-bottom: 10px;
      color: #475569;
      text-align: justify;
    }
    
    ul {
      margin-top: 0;
      margin-bottom: 12px;
      padding-left: 20px;
    }
    
    li {
      font-size: 12.5px;
      line-height: 1.5;
      margin-bottom: 6px;
      color: #475569;
    }
    
    /* Highlight blocks */
    .highlight-box {
      background-color: #faf8f5;
      border-left: 3px solid #6B2737;
      padding: 12px;
      margin: 12px 0;
      border-radius: 0 6px 6px 0;
    }
    
    .highlight-box p {
      margin: 0;
      font-style: italic;
      color: #241613;
      font-size: 12.5px;
    }

    .script-quote {
      font-family: 'Playfair Display', serif;
      font-size: 14.5px;
      font-style: italic;
      line-height: 1.6;
      color: #241613;
      background-color: #FAF8F5;
      border-left: 4px solid #C9B99A;
      padding: 15px;
      margin: 15px 0;
      text-align: justify;
    }
    
  </style>
</head>
<body>

  <!-- PAGE 1: COVER PAGE -->
  <div class="cover-page">
    <div class="cover-top">
      <div class="cover-tag">FOLA Ladderwork Series — Step 1</div>
      <h1 class="cover-title">Inner Child Somatic<br>Companion Journal<br>& Audio Script Blueprint</h1>
      <div class="cover-subtitle">A clinical framework, typeset journal workbook, and regression script featuring the signature 2-minute somatic testimonial loop and R200 value-ascent gateway.</div>
    </div>
    
    <div class="cover-bottom">
      <div class="cover-meta">
        <div class="meta-item">
          <strong>Prepared For</strong>
          Hakeem Lesolang<br>Founder, FOLA Polyclinics
        </div>
        <div class="meta-item">
          <strong>Prepared By</strong>
          FOLA Strategic Intelligence
        </div>
        <div class="meta-item">
          <strong>Date</strong>
          June 2026
        </div>
      </div>
    </div>
  </div>

  <!-- PAGE 2: STRATEGIC OVERVIEW & FUNNEL DYNAMICS -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Ladderwork</span>
      <span>Somatic Funnel Architecture</span>
    </div>
    
    <h1>Somatic Funnel Strategy: Step 1 SLO</h1>
    <p>The Step 1 Package is designed as a Self-Liquidating Offer (SLO). Its goal is to convert cold, symptom-focused traffic into buyers, setting up the relationship for high-ticket clinical services. By offering a premium A5 digital journal and a 20-minute guided audio regression for R150, we establish clinical authority and qualify leads early.</p>
    
    <h2>1. The Psychology of the Somatic Video Testimonial Ask</h2>
    <p>Traditional therapy collects testimonials through static forms or post-program emails. This separates the reflection from the experience. FOLA integrates the review directly into the clinical process. The video testimonial request is placed at the end of the guided regression audio, framed as "somatic anchoring." It asks the client to speak their truth while their prefrontal cortex is still relaxed and the release is fresh. The act of sharing cements the new state in the nervous system.</p>

    <h2>2. Dual-Channel Integration</h2>
    <ul>
      <li><strong>The Audio Prompt</strong>: Hakeem's voice guides the client back to their body and invites them to anchor their shift. It refers them to the final page of their workbook to scan a QR code and record their 2-minute video.</li>
      <li><strong>The Workbook Portal</strong>: The final page of the journal features the video upload portal. Recording the video serves as a value exchange to unlock the next level of support: an R200 discount for the LoveBetter assessment and an unreleased somatic emergency reset audio.</li>
    </ul>

    <div class="highlight-box">
      <p><strong>The Funnel Ascension Loop:</strong> The R200 voucher reduces the R600 LoveBetter assessment to R400. Once the client completes the assessment, the resulting PDF diagnostic report identifies the attachment gaps and trauma loops that can only be fully resolved in 1-on-1 sessions—ascending them into the R36,500 flagship protocol.</p>
    </div>
    
    <div class="footer">
      <span>Step 1: Companion Journal & Audio Script</span>
      <span>Page 2</span>
    </div>
  </div>

  <!-- PAGE 3: 7-DAY COMPANION JOURNAL -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Ladderwork</span>
      <span>Companion Journal</span>
    </div>
    
    <h1>The 7-Day Somatic Journal Outline</h1>
    <p>The journal supports the integration process before and after listening to the guided regression audio. It focuses on the body's physical responses to triggers.</p>

    <h2>Day 1: Locating the Trace</h2>
    <p>Identify a time you felt irrationally defensive or small this week in your business or connection. Where did you feel it first in your body? Write down the earliest childhood memory that carries this exact somatic sensation.</p>

    <h2>Day 2: The Protection Script</h2>
    <p>How did this defensive script (e.g., hyper-independence, people-pleasing) protect you when you were 8 years old? How is it costing you money, intimacy, or peace now that you are an adult?</p>

    <h2>Day 3: Somatic Hypnotic Preparation</h2>
    <p>Rate your current nervous system state from 1 (numb/shutdown) to 10 (panicked/hyper-aroused). Write a single sentence to your subconscious: <em>"I am ready to show you that we are safe now."</em> Play the Step 1 Audio.</p>

    <h2>Day 4: Post-Audio Integration</h2>
    <p>Write down the raw words your younger self spoke during the regression. What is the structural boundary your adult self must set this week to honor that child?</p>

    <h2>Day 5: Reclaiming Agency</h2>
    <p>Scarcity is a survival strategy. If you knew, with absolute physical certainty, that you could not be abandoned or go broke, what choice would you make in your life today?</p>

    <h2>Day 6: Relational Traces</h2>
    <p>How does your inner child's protection script react when your partner pulls away or criticizes you? Write down a rewired somatic response you can execute next time this trigger occurs.</p>

    <h2>Day 7: The Testimonial Portal</h2>
    <p>A full-page layout inviting them to anchor their shift. It prompts them to answer: 1) How they felt coming in, 2) The somatic shift during the audio, 3) How they feel right now, and 4) What they are looking forward to next.</p>

    <div class="footer">
      <span>Step 1: Companion Journal & Audio Script</span>
      <span>Page 3</span>
    </div>
  </div>

  <!-- PAGE 4: AUDIO SCRIPT - SECTION 1 & 2 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Ladderwork</span>
      <span>Recording Script</span>
    </div>
    
    <h1>Guided Regression Audio Script (Part 1)</h1>
    <p><strong>Voice Tone</strong>: Grounded, warm, clinical, slow, rhythmic (baroque pacing, 60 bpm speech). <strong>Background</strong>: 396Hz frequency (releasing fear/guilt) layered under soft pink noise.</p>

    <h2>Section 1: Somatic Induction (0:00 - 4:00)</h2>
    <div class="script-quote">
      "Sit comfortably. Close your eyes. Drop your shoulders away from your ears. Let the weight of your body sink fully into the chair beneath you.<br><br>
      You have spent the day managing, thinking, executing. For the next twenty minutes, there is nothing you need to fix. There is no one you need to save. Your nervous system is allowed to rest.<br><br>
      Take a deep breath in through your nose... hold it... and release it through your mouth with a soft sigh. Let your chest drop. Good.<br><br>
      As you listen to the sound of my voice, feel a wave of calm relaxation starting at the top of your head, sliding down behind your eyes, relaxing your jaw, settling into your throat, and softening your chest. Every breath out takes you deeper into a peaceful, focused state of authority."
    </div>

    <h2>Section 2: Bypassing the Critical Factor (4:00 - 8:00)</h2>
    <div class="script-quote">
      "Your conscious mind is a brilliant protector. But right now, we invite it to step back. We thank it for its service, and we let it rest. <br><br>
      Imagine a staircase of five steps leading down into your own safe, warm, subconscious vault. <br><br>
      Five... taking you deeper. <br>
      Four... letting go of external noise. <br>
      Three... feeling more present in your body than ever before. <br>
      Two... moving closer to the root. <br>
      One... you are there. Safe, focused, receptive."
    </div>

    <div class="footer">
      <span>Step 1: Companion Journal & Audio Script</span>
      <span>Page 4</span>
    </div>
  </div>

  <!-- PAGE 5: AUDIO SCRIPT - SECTION 3 & 4 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Ladderwork</span>
      <span>Recording Script</span>
    </div>
    
    <h1>Guided Regression Audio Script (Part 2)</h1>
    
    <h2>Section 3: Safe Somatic Regression (8:00 - 14:00)</h2>
    <div class="script-quote">
      "Now, recall that physical feeling of pressure, anxiety, or defensiveness you logged in your journal. Feel it in your body now. Where is it? In your chest? In your throat?<br><br>
      Let that feeling act as a thread. We are following it back, back, back, through time. Back past last year... past college... past high school... down to a childhood address.<br><br>
      Locate the child who first felt this way. Look at them. See what they are wearing. See the room.<br><br>
      What are they afraid of? What script did they write to keep themselves safe in that room? Was it to hide? Was it to perform? Was it to build an empire so no one could touch them?<br><br>
      Step into the room as your adult self. Look at this child. Place your hand gently on their shoulder, and tell them what they have needed to hear for twenty years:<br><br>
      'I am here now. You don't have to carry this anymore. The danger is over. You did a beautiful job keeping us safe, but I am the adult now, and I've got this. You are allowed to play. You are allowed to rest.'<br><br>
      Feel that child step into your chest, releasing the grip. Feel the physical space opening up in your lungs."
    </div>

    <h2>Section 4: Neurological Rewiring & Re-Emergence (14:00 - 18:00)</h2>
    <div class="script-quote">
      "With every breath, wire this safety in. Your nervous system is updating. The old threat response is dissolving. You no longer need to perform to be safe. You are safe because you exist.<br><br>
      In a moment, I will count from one to five, bringing you back to the room.<br><br>
      One... feeling the weight of your feet on the floor.<br><br>
      Two... carrying this deep somatic peace with you.<br><br>
      Three... drawing in a fresh, energizing breath.<br><br>
      Four... moving your fingers and toes.<br><br>
      Five... eyes open, fully back, fully integrated."
    </div>

    <div class="footer">
      <span>Step 1: Companion Journal & Audio Script</span>
      <span>Page 5</span>
    </div>
  </div>

  <!-- PAGE 6: AUDIO SCRIPT - SECTION 5 & TESTIMONIAL HOOK -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Ladderwork</span>
      <span>Recording Script</span>
    </div>
    
    <h1>Guided Regression Audio Script (Part 3)</h1>
    
    <h2>Section 5: The Testimonial Anchor & Funnel Hook (18:00 - 20:00)</h2>
    <p>This final section transitions Hakeem's voice from the hypnotic tone to a grounded, personal conversation. It delivers the testimonial ask and the value-ascent incentive.</p>
    
    <div class="script-quote">
      "Welcome back. Take a moment to feel your body. Feel the silence in your mind. <br><br>
      What you are experiencing right now is not just relaxation—it is a physical update to your neural wiring. While this shift is raw, while it is real, let us anchor it.<br><br>
      Open your journal to the final page. Scan the portal code. Speak your truth. Record a brief, 2-minute video for me. Share how you felt coming in, what occurred during the regression, and how your chest and body feel right now.<br><br>
      Sharing your shift cements this state. It tells your subconscious that the safety you found is real and permanent. <br><br>
      Once you submit your reflection, the portal will instantly unlock your R200 LoveBetter Assessment Voucher so we can map your full attachment taxonomy, along with your emergency reset audio.<br><br>
      I look forward to hearing your voice. Speak soon."
    </div>

    <h2>Technical Integration Blueprint</h2>
    <p>The final page QR code leads to a video ingestion portal (using VideoAsk or Senja). The submission triggers an automated webhook via <strong>n8n</strong>. The webhook performs three operations:</p>
    <ol>
      <li>Creates/Updates the contact profile in the <strong>Brevo/MailerLite</strong> database, tagging them as <code>Step-1-Video-Completed</code>.</li>
      <li>Generates a unique, one-time R200 discount code and emails it to the client with the <strong>Somatic Emergency Reset Audio</strong> link.</li>
      <li>Alerts Hakeem’s clinical intake channel on Slack/WhatsApp with the video testimonial link, allowing Hakeem to review client readiness for direct outreach.</li>
    </ol>

    <div class="footer">
      <span>Step 1: Companion Journal & Audio Script</span>
      <span>Page 6</span>
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

    const pdfPath = "/Users/fola/.gemini/antigravity-cli/brain/77500196-dec9-416a-978c-68d6cb4ec0c9/FOLA_Step_1_Somatic_Journal_and_Audio_Script_Blueprint.pdf";
    
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
    });

    console.log("✅ PDF Step 1 SLO Blueprint Successfully Written to: " + pdfPath);
    await browser.close();
  } catch (err) {
    console.error("❌ Error generating PDF Step 1 SLO Blueprint:", err);
  }
})();
