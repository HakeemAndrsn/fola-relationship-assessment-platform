const puppeteer = require("puppeteer");
const { join } = require("path");

(async () => {
  console.log("🚀 Generating Parenting Assessment Blueprint PDF...");

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FOLA Conscious Parenting Diagnostic</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      color: #1a202c;
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
    
    /* Cover Page */
    .cover-page {
      background-color: #080e1d;
      color: #f7fafc;
      padding: 50mm 22mm 30mm 22mm;
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
      border-left: 3px solid #d4af37;
      padding-left: 25px;
    }
    
    .cover-tag {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 4px;
      color: #d4af37;
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
      font-size: 16px;
      font-weight: 300;
      color: #cbd5e0;
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
      color: #718096;
    }
    
    .meta-item strong {
      color: #ffffff;
      display: block;
      font-size: 13px;
      margin-bottom: 6px;
    }
    
    /* Headers/Footers */
    .header {
      position: absolute;
      top: 15mm;
      left: 22mm;
      right: 22mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #edf2f7;
      padding-bottom: 8px;
      font-size: 10px;
      color: #718096;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    
    .header-logo {
      font-weight: 700;
      color: #080e1d;
    }
    
    .footer {
      position: absolute;
      bottom: 15mm;
      left: 22mm;
      right: 22mm;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #edf2f7;
      padding-top: 8px;
      font-size: 9px;
      color: #718096;
    }
    
    /* Typography */
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 26px;
      color: #080e1d;
      margin-top: 0;
      margin-bottom: 15px;
      line-height: 1.2;
    }
    
    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      color: #080e1d;
      margin-top: 20px;
      margin-bottom: 10px;
      border-bottom: 1px solid #f7fafc;
      padding-bottom: 4px;
    }
    
    p {
      font-size: 12.5px;
      line-height: 1.6;
      color: #4a5568;
      margin-top: 0;
      margin-bottom: 12px;
    }
    
    ul {
      margin-top: 0;
      margin-bottom: 15px;
      padding-left: 20px;
    }
    
    li {
      font-size: 12px;
      line-height: 1.6;
      color: #4a5568;
      margin-bottom: 6px;
    }
    
    strong {
      color: #080e1d;
      font-weight: 600;
    }
    
    .highlight-box {
      background-color: #f7fafc;
      border-left: 3px solid #d4af37;
      padding: 15px 20px;
      margin: 15px 0;
      border-radius: 0 8px 8px 0;
    }
    
    .highlight-box p {
      margin: 0;
      font-size: 13px;
      font-style: italic;
      color: #2d3748;
    }
    
    .cta-box {
      background-color: #080e1d;
      color: #ffffff;
      padding: 25px;
      border-radius: 12px;
      margin-top: 20px;
      text-align: center;
    }
    
    .cta-box h3 {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      color: #ffffff;
      margin-top: 0;
      margin-bottom: 10px;
    }
    
    .cta-box p {
      color: #cbd5e0;
      font-size: 12px;
      margin-bottom: 0;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 11px;
    }
    
    th {
      background-color: #080e1d;
      color: #ffffff;
      text-align: left;
      padding: 10px;
      font-weight: 600;
    }
    
    td {
      padding: 10px;
      border-bottom: 1px solid #edf2f7;
      color: #4a5568;
    }
    
    tr:nth-child(even) {
      background-color: #f8fafc;
    }
  </style>
</head>
<body>

  <!-- Page 1: Cover Page -->
  <div class="cover-page">
    <div class="cover-top">
      <div class="cover-tag">FOLA Relational Diagnostics</div>
      <h1 class="cover-title">The Conscious Legacy Assessment</h1>
      <div class="cover-subtitle">A clinical-grade, trauma-informed parenting diagnostic mapping the transgenerational and neurological blueprints of high-performing professionals.</div>
    </div>
    <div class="cover-bottom">
      <div class="cover-meta">
        <div class="meta-item">
          <strong>AUTHOR</strong>
          Hakeem Lesolang
        </div>
        <div class="meta-item" style="text-align: right;">
          <strong>ORGANIZATION</strong>
          LOVEBETTER by FOLA
        </div>
      </div>
    </div>
  </div>

  <!-- Page 2: Core Philosophy -->
  <div class="page">
    <div class="header">
      <span class="header-logo">LOVEBETTER</span>
      <span>Conscious Parenting Blueprint</span>
    </div>
    
    <div style="margin-top: 15mm;">
      <h1>Core Philosophy: The Mirror & The Blueprint</h1>
      
      <div class="highlight-box">
        <p>"Children do not listen to what we say; they encode who we are. Our children are neurological mirrors of our unresolved past."</p>
      </div>
      
      <p>Traditional parenting advice operates on a flawed premise: that a child's behavior is a standalone problem to be managed through discipline, schedules, and rewards. At FOLA, we reject this superficial approach. We understand that a child's nervous system relies entirely on the parents' nervous system for co-regulation, safety, and attachment mapping.</p>
      
      <p>This diagnostic focuses on two key dynamics:</p>
      
      <ul>
        <li><strong>The Mirror:</strong> A parent's silent anxieties, unexpressed trauma, and autonomic dysregulation (fight, flight, freeze) are copied by the child's mirror neurons, becoming their default state of being.</li>
        <li><strong>The Blueprint:</strong> The transgenerational script we carry from our own parents is unconsciously printed onto the next generation. Healing the parent's childhood wiring is the only genuine way to free the child from inheriting ancestral burdens.</li>
      </ul>
      
      <h2>Strategic Intent & Ascension</h2>
      <p>This diagnostic tool is designed not just to educate, but to illuminate the blind spots in a parent's own emotional history. It functions as the direct bridge into the <strong>FOLA 10-Session Ladderwork Program</strong>, demonstrating that effective parenting is an act of personal regression and self-healing.</p>
    </div>
    
    <div class="footer">
      <span>LOVEBETTER by FOLA &copy; 2026</span>
      <span>Page 2 of 5</span>
    </div>
  </div>

  <!-- Page 3: Dimensions A, B & C -->
  <div class="page">
    <div class="header">
      <span class="header-logo">LOVEBETTER</span>
      <span>The 6 Core Dimensions</span>
    </div>
    
    <div style="margin-top: 15mm;">
      <h1>The Core Dimensions of Parenting Wiring (A - C)</h1>
      
      <h2>Dimension A: Transgenerational Projection (The Ancestral Script)</h2>
      <p>This dimension measures the degree to which a parent projects their own unresolved childhood wounds, parental disapproval, or unmet emotional needs onto their child. It detects if they are using the child's achievements or behavior to validate their own worth or to "fix" their past.</p>
      <ul>
        <li><strong>Self-Validation Loops:</strong> Evaluating whether the child's behavior is treated as a direct reflection of the parent's value as a human.</li>
        <li><strong>Repetitive Projections:</strong> Swinging between replicating the critical parenting they received or over-compensating by removing all boundaries.</li>
      </ul>
      
      <h2>Dimension B: Autonomic Co-Regulation & Attachment Wiring</h2>
      <p>Evaluates the parent's physiological capacity to remain grounded (ventral vagal) during moments of child distress. When a child throws a tantrum or withdraws, does the parent co-regulate them or collide with them?</p>
      <ul>
        <li><strong>Trigger Threshold:</strong> Somatic activation (heart rate spikes, chest tightness) in response to the child's negative emotions.</li>
        <li><strong>Autonomic Defaults:</strong> Spikes into fight/flight (screaming, physical aggression) or collapses into dorsal freeze (stonewalling, walking away).</li>
      </ul>
      
      <h2>Dimension C: Boundaried Presence (Control vs. Authority)</h2>
      <p>Measures the parent's transition from traditional, fear-based control to calm, boundaried authority. We evaluate if rules are enforced through the currencies of shame and guilt, or through clear, respectful containment.</p>
      <ul>
        <li><strong>Rule Rigidness:</strong> Rules based on safety and respect vs. rules based on the parent's discomfort with lack of control.</li>
        <li><strong>Shame Currency:</strong> The frequency of character attacks ("Why are you so lazy?") instead of redirecting the behavior.</li>
      </ul>
    </div>
    
    <div class="footer">
      <span>LOVEBETTER by FOLA &copy; 2026</span>
      <span>Page 3 of 5</span>
    </div>
  </div>

  <!-- Page 4: Dimensions D, E & F -->
  <div class="page">
    <div class="header">
      <span class="header-logo">LOVEBETTER</span>
      <span>The 6 Core Dimensions</span>
    </div>
    
    <div style="margin-top: 15mm;">
      <h1>The Core Dimensions of Parenting Wiring (D - F)</h1>
      
      <h2>Dimension D: Reflective Attunement & Separation</h2>
      <p>Measures the parent's capacity for psychological differentiation. A differentiated parent can perceive and validate their child's feelings without taking those feelings personally, getting defensive, or trying to suppress them.</p>
      <ul>
        <li><strong>Reflective Functioning:</strong> The cognitive ability to see past the behavior and identify the underlying emotional need.</li>
        <li><strong>Somatic Separation:</strong> Feeling the child's pain or anger without letting it compromise the parent's own emotional equilibrium.</li>
      </ul>
      
      <h2>Dimension E: Legacy Resource Wiring (Poverty vs. Wealth Wiring)</h2>
      <p>Evaluates the financial and temporal programming the parent is transmitting. Aligns with FOLA's <em>Unwiring Poverty Mindedness</em>. Children copy how parents handle money, time, calendars, and risk.</p>
      <ul>
        <li><strong>Scarcity Language:</strong> Using financial anxiety and fear of ruin as a tool to control behavior.</li>
        <li><strong>Time Modeling:</strong> Modeling "time-poverty" (constant rush, exhaustion, calendar overload) as the normal state of adulthood.</li>
      </ul>
      
      <h2>Dimension F: The High-Performer Burden (Achievement Projection)</h2>
      <p>Specifically tailored for high-performing Black professionals. Measures if the parent is treating the child as a personal PR campaign or extension of their own social status, wiring conditional self-worth into the child.</p>
      <ul>
        <li><strong>Performance Mandate:</strong> Restricting affection or warmth based on the child's academic or extra-curricular metrics.</li>
        <li><strong>Excellence Anxiety:</strong> The parent's fear of their child being seen as "ordinary" or failing to perform in public settings.</li>
      </ul>
    </div>
    
    <div class="footer">
      <span>LOVEBETTER by FOLA &copy; 2026</span>
      <span>Page 4 of 5</span>
    </div>
  </div>

  <!-- Page 5: Diagnostic & Ascension -->
  <div class="page">
    <div class="header">
      <span class="header-logo">LOVEBETTER</span>
      <span>Diagnostic Scenarios & Ascension</span>
    </div>
    
    <div style="margin-top: 10mm;">
      <h1>Diagnostic Scenarios & Somatic Checks</h1>
      
      <table>
        <thead>
          <tr>
            <th>Scenario / Prompt</th>
            <th>Dimension Measured</th>
            <th>Somatic & Subconscious Indicator</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Your 7-year-old throws a tantrum in a public space. What is the very first physical sensation in your body?</td>
            <td>Dimension B: Co-Regulation</td>
            <td>Spikes in chest tightness, jaw clenching, or shallow breath indicate sympathetic hijack.</td>
          </tr>
          <tr>
            <td>When your child fails to meet a standard, your primary unspoken fear is...</td>
            <td>Dimension F: Achievement Burden</td>
            <td>Fears of public failure or family status decay indicate projection of parent's validation needs.</td>
          </tr>
          <tr>
            <td>Your child tells you "I hate you, you're ruining my life." You immediately...</td>
            <td>Dimension D: Reflective Separation</td>
            <td>Defending, shouting back, or emotional withdrawal indicate enmeshment and lack of attunement.</td>
          </tr>
        </tbody>
      </table>
      
      <h2>The Ascension Bridge to FOLA Ladderwork</h2>
      <p>The diagnostic results do not give behavioral tips. Instead, the final report delivers a stark realization: <strong>your parenting blocks are a mirror of your own unresolved childhood wounds.</strong> To heal the child's blueprint, we must regress and heal yours.</p>
      
      <div class="highlight-box" style="margin: 10px 0;">
        <p>"You cannot give your child what you do not have. You cannot lead them to a place of emotional safety you have not found yourself."</p>
      </div>
      
      <div class="cta-box">
        <h3>Initiate The Ladderwork Sequence</h3>
        <p>Connect high transgenerational projections to <strong>Session 1: Inner Child Healing</strong>, authority/control loops to <strong>Session 3: Establishing Authority</strong>, and scarcity wiring to <strong>Session 9: Unwiring Poverty Mindedness</strong>.</p>
      </div>
    </div>
    
    <div class="footer">
      <span>LOVEBETTER by FOLA &copy; 2026</span>
      <span>Page 5 of 5</span>
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

    // Save to home folder
    const pdfHomePath = "/Users/fola/parenting_assessment_blueprint.pdf";
    // Save to public folder
    const pdfPublicPath = "/Users/fola/fola-relationship-assessment-platform/public/parenting_assessment_blueprint.pdf";

    await page.pdf({
      path: pdfHomePath,
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
    });

    // Copy to public as well
    const fs = require("fs");
    fs.copyFileSync(pdfHomePath, pdfPublicPath);

    console.log("✅ PDF Parenting Assessment Blueprint successfully written to home and public directories!");
    await browser.close();
  } catch (err) {
    console.error("❌ Error generating PDF:", err);
  }
})();
