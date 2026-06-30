const puppeteer = require("puppeteer");
const { join } = require("path");

(async () => {
  console.log("🚀 Generating All-Encompassing Parenting Assessment Framework PDF...");

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The LoveBetter Parenting Diagnostic Framework</title>
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
      font-size: 36px;
      font-weight: 600;
      line-height: 1.15;
      margin: 0 0 20px 0;
      color: #ffffff;
    }
    
    .cover-subtitle {
      font-size: 15px;
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
      font-size: 24px;
      color: #080e1d;
      margin-top: 0;
      margin-bottom: 15px;
      line-height: 1.2;
    }
    
    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      color: #080e1d;
      margin-top: 16px;
      margin-bottom: 8px;
      border-bottom: 1px solid #edf2f7;
      padding-bottom: 4px;
    }
    
    p {
      font-size: 12px;
      line-height: 1.55;
      color: #4a5568;
      margin-top: 0;
      margin-bottom: 10px;
    }
    
    ul {
      margin-top: 0;
      margin-bottom: 12px;
      padding-left: 20px;
    }
    
    li {
      font-size: 11.5px;
      line-height: 1.55;
      color: #4a5568;
      margin-bottom: 5px;
    }
    
    strong {
      color: #080e1d;
      font-weight: 600;
    }
    
    .highlight-box {
      background-color: #f7fafc;
      border-left: 3px solid #d4af37;
      padding: 12px 18px;
      margin: 12px 0;
      border-radius: 0 8px 8px 0;
    }
    
    .highlight-box p {
      margin: 0;
      font-size: 12px;
      font-style: italic;
      color: #2d3748;
    }
    
    .cta-box {
      background-color: #080e1d;
      color: #ffffff;
      padding: 20px;
      border-radius: 12px;
      margin-top: 15px;
      text-align: center;
    }
    
    .cta-box h3 {
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      color: #ffffff;
      margin-top: 0;
      margin-bottom: 8px;
    }
    
    .cta-box p {
      color: #cbd5e0;
      font-size: 11.5px;
      margin-bottom: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      font-size: 10.5px;
    }
    
    th {
      background-color: #080e1d;
      color: #ffffff;
      text-align: left;
      padding: 8px;
      font-weight: 600;
    }
    
    td {
      padding: 8px;
      border-bottom: 1px solid #edf2f7;
      color: #4a5568;
    }
  </style>
</head>
<body>

  <!-- Page 1: Cover Page -->
  <div class="cover-page">
    <div class="cover-top">
      <div class="cover-tag">LoveBetter Diagnostic Framework</div>
      <h1 class="cover-title">The Parenting Diagnostic</h1>
      <div class="cover-subtitle">An all-encompassing, first-principles clinical framework mapping the attunement, containment, stress, and coregulation blueprints across diverse family structures and global contexts.</div>
    </div>
    <div class="cover-bottom">
      <div class="cover-meta">
        <div class="meta-item">
          <strong>AUTHOR</strong>
          LoveBetter Research Team
        </div>
        <div class="meta-item" style="text-align: right;">
          <strong>ORGANIZATION</strong>
          LOVEBETTER
        </div>
      </div>
    </div>
  </div>

  <!-- Page 2: Core Philosophy & Structures -->
  <div class="page">
    <div class="header">
      <span class="header-logo">LOVEBETTER</span>
      <span>Diagnostic Framework & Structures</span>
    </div>
    
    <div style="margin-top: 15mm;">
      <h1>Core Philosophy: The Attuned System</h1>
      
      <div class="highlight-box">
        <p>"Parenting is not a set of management techniques; it is a relationship. Children do not develop secure attachment from rules, but from the quality of the parent’s presence, emotional regulation, and boundaries."</p>
      </div>
      
      <p>This assessment is built on the understanding that <strong>parenting friction is rarely about a "difficult child"—it is about a stressed system.</strong> When a parent is struggling with mental health, work-life balance, or financial anxiety, the child's nervous system detects the threat and reacts. By analyzing childhood templates, current stressors, and somatic defaults, this diagnostic shows parents why certain approaches aren't working.</p>
      
      <h2>Inclusive Family Structure Pathways</h2>
      <p>The assessment dynamically adapts based on the parent's specific caregiving structure:</p>
      <ul>
        <li><strong>Solo Caregiver (Single Parent / Divorcee):</strong> Focuses on time poverty, carrying dual-roles, decision fatigue, and lack of co-regulation support.</li>
        <li><strong>Blended or Co-Parenting Unit:</strong> Focuses on dual-authority friction, boundary clashes, biological vs. step-parent dynamics, and loyalty conflicts.</li>
        <li><strong>Traditional / Dual-Income Unit:</strong> Focuses on balancing work-life integration, joint resource management, and workplace stress transference.</li>
        <li><strong>Kinship Caregiver (Grandparents / Aunts / Uncles):</strong> Focuses on generational style gaps, energy constraints, and child identity gaps in parental absence.</li>
        <li><strong>Adoptive or Foster Parent:</strong> Focuses on attachment security, somatic safety, and managing expectations around biological lineage.</li>
        <li><strong>Grieving Parent (Widow / Widower):</strong> Focuses on holding space for child grief while processing personal grief, emotional overload, and solo pressure.</li>
      </ul>
    </div>
    
    <div class="footer">
      <span>LOVEBETTER &copy; 2026</span>
      <span>Page 2 of 5</span>
    </div>
  </div>

  <!-- Page 3: Dimensions 1, 2 & 3 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">LOVEBETTER</span>
      <span>The 6 Core Dimensions</span>
    </div>
    
    <div style="margin-top: 15mm;">
      <h1>The Core Dimensions of Parenting Wiring (1 - 3)</h1>
      
      <h2>Dimension 1: The Coping Mirror (Stress & Mental Health Transference)</h2>
      <p>Measures the degree to which a parent’s own stress, anxiety, depression, or burnout is being absorbed by the child's nervous system. It evaluates if the parent has "nothing left in the tank" for attunement at the end of the day, leading to behavioral outbursts in the child that reflect the parent's internal state.</p>
      <ul>
        <li><strong>Somatic Leakage:</strong> Irritability, snapping, or emotional withdrawal when overloaded.</li>
        <li><strong>Emotional Depletion:</strong> Transmitting flat or hyper-reactive signals due to nervous system fatigue.</li>
      </ul>
      
      <h2>Dimension 2: Resource Friction & Safety Wiring (Scarcity Somatics)</h2>
      <p>Evaluates how financial pressure and time instability shape the home's "felt sense of safety." This applies both to families struggling to make ends meet and middle-class families locked in time-famine. It assesses if children are learning that the world is a place of constant lack and unsafety.</p>
      <ul>
        <li><strong>Resource Tension:</strong> Arguing about money or modeling time-famine in front of children.</li>
        <li><strong>Scarcity Language:</strong> Using fear of lack to enforce behavioral compliance.</li>
      </ul>
      
      <h2>Dimension 3: The Childhood Lens & The Book-Borrowed Clash</h2>
      <p>Examines the conflict between the parent's childhood templates (how they were raised) and modern parenting concepts (borrowed from social media, books, or therapists) that feel unnatural or create intense guilt.</p>
      <ul>
        <li><strong>Reactivity Triggers:</strong> Reverting to harsh, traditional discipline under stress, followed by intense guilt.</li>
        <li><strong>Intellectualized Parenting:</strong> Trying to use cognitive "book rules" during a crisis instead of raw, somatic connection.</li>
      </ul>
    </div>
    
    <div class="footer">
      <span>LOVEBETTER &copy; 2026</span>
      <span>Page 3 of 5</span>
    </div>
  </div>

  <!-- Page 4: Dimensions 4, 5 & 6 -->
  <div class="page">
    <div class="header">
      <span class="header-logo">LOVEBETTER</span>
      <span>The 6 Core Dimensions</span>
    </div>
    
    <div style="margin-top: 15mm;">
      <h1>The Core Dimensions of Parenting Wiring (4 - 6)</h1>
      
      <h2>Dimension 4: Autonomic Co-Regulation (The Mirror Response)</h2>
      <p>Measures the parent’s physiological response to their child's emotional dysregulation (tantrums, crying, anger, withdrawal). Evaluates whether the parent co-regulates the child's nervous system or collides with it (matching the child's emotional activation with their own).</p>
      <ul>
        <li><strong>Limbic Collision:</strong> Spiking into fight/flight (screaming, physical control) in response to the child's emotional peaks.</li>
        <li><strong>Stonewall Defaults:</strong> Collapsing into freeze/collapse (ignoring the child, silence, withdrawing warmth) as a reaction to conflict.</li>
      </ul>
      
      <h2>Dimension 5: The Expectation Burden (Projections of Hope & Survival)</h2>
      <p>Measures the unconscious demands the parent places on the child's identity, choices, and path. For some parents, this is the burden of academic excellence. For others under stress, it is the burden of "not making trouble," being the "good child," or growing up too fast to help the parent cope.</p>
      <ul>
        <li><strong>Convenience Compliance:</strong> Valuing quietness and submission over healthy emotional expression.</li>
        <li><strong>Fear of Divergence:</strong> Parent's anxiety when the child's personality or choices do not match the parent's survival model.</li>
      </ul>

      <h2>Dimension 6: Relational Containment (Boundaries of Love)</h2>
      <p>Evaluates if the parent can maintain firm structure, rules, and boundaries without withdrawing love, using guilt, or attacking the child's character.</p>
      <ul>
        <li><strong>Shame Currency:</strong> Using character-damaging language ("Why are you so difficult?") to correct behavior.</li>
        <li><strong>Boundary Consistency:</strong> The stability of rules when the parent is tired, guilty, or stressed.</li>
      </ul>
    </div>
    
    <div class="footer">
      <span>LOVEBETTER &copy; 2026</span>
      <span>Page 4 of 5</span>
    </div>
  </div>

  <!-- Page 5: Scenarios & Ascension -->
  <div class="page">
    <div class="header">
      <span class="header-logo">LOVEBETTER</span>
      <span>Diagnostic Scenarios & Ascension</span>
    </div>
    
    <div style="margin-top: 10mm;">
      <h1>Projective Diagnostic Scenarios</h1>
      
      <table>
        <thead>
          <tr>
            <th>Scenario / Prompt</th>
            <th>Dimension Measured</th>
            <th>Default Indicators</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>You have had an exhausting day. You are worried about a bill/work, and your child refuses to eat and throws food. Your first response is...</td>
            <td>Dimension 1: Coping Mirror & Dimension 4: Autonomic Co-Regulation</td>
            <td>Spikes into screaming (Limbic Collision) vs. walking away to bedroom (Stonewall Default) vs. trying to use cognitive book rules while feeling intense internal frustration (Intellectualized).</td>
          </tr>
          <tr>
            <td>Your co-parent/partner corrects your child in a way that you feel is too harsh. The child looks at you for support. You...</td>
            <td>Co-Parenting Alignment (Path B)</td>
            <td>Intervening immediately (Undermining) vs. staying silent to avoid conflict but feeling resentment (Avoidant) vs. supporting the boundary and having a private discussion later (Aligned).</td>
          </tr>
        </tbody>
      </table>

      <h2>The Conversion Bridge: From Assessment to Breakthrough</h2>
      <p>The final report delivers a profound realization: <strong>your parenting approach isn't working because your system is running on empty.</strong> No parenting book can solve this. It requires restoring safety and peace to your own nervous system first.</p>
      
      <div class="highlight-box" style="margin: 8px 0;">
        <p>"You cannot give your child what you do not have. You cannot co-regulate your child from a state of chronic stress, financial anxiety, or historical guilt."</p>
      </div>
      
      <div class="cta-box">
        <h3>Ascension to the FOLA Breakthrough Session</h3>
        <p>This assessment acts as a diagnostic gateway. Parents are invited to a <strong>1:1 Breakthrough Session</strong> with Hakeem to release the childhood templates and stress loops hijacking their parenting.</p>
      </div>
    </div>
    
    <div class="footer">
      <span>LOVEBETTER &copy; 2026</span>
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

    // Save strictly locally (only in home directory, NOT committed, NOT in public website build path)
    const pdfPath = "/Users/fola/parenting_assessment_framework.pdf";
    
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
    });

    console.log("✅ PDF Parenting Assessment Framework successfully generated strictly locally at: " + pdfPath);
    await browser.close();
  } catch (err) {
    console.error("❌ Error generating PDF:", err);
  }
})();
