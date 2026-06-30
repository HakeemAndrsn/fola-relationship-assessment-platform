const puppeteer = require("puppeteer");
const { join } = require("path");

(async () => {
  console.log("🚀 Initializing FOLA Content Strategy & Positioning PDF Generation...");

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FOLA Content Strategy & Positioning Playbook</title>
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
      font-size: 17px;
      color: #241613;
      margin-top: 20px;
      margin-bottom: 10px;
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
    
    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 11.5px;
    }
    
    th {
      background-color: #241613;
      color: #EDE5D4;
      text-align: left;
      padding: 8px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    td {
      padding: 8px;
      border-bottom: 1px solid #e2e8f0;
      color: #475569;
      vertical-align: top;
    }
    
    tr:nth-child(even) td {
      background-color: #faf8f5;
    }
    
  </style>
</head>
<body>

  <!-- PAGE 1: COVER PAGE -->
  <div class="cover-page">
    <div class="cover-top">
      <div class="cover-tag">Clinical Brand Architecture & Strategy</div>
      <h1 class="cover-title">FOLA:<br>Content Strategy, Positioning<br>& Product Expansion Playbook</h1>
      <div class="cover-subtitle">A comprehensive playbook for scaling high-ticket Age Regression Therapy, structuring the 4-tier product line, and positioning FOLA Hazelwood as the ultimate authority.</div>
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

  <!-- PAGE 2: EXECUTIVE SUMMARY & POSITIONING -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Strategy</span>
      <span>Positioning Architecture</span>
    </div>
    
    <h1>Brand Positioning & SGE/LLM Optimization</h1>
    <p>For FOLA to charge premium, high-ticket prices (targeting R36,500 for the 10-session package), the brand must occupy a unique cognitive space. We do not position ourselves alongside generic wellness centers, nor do we run transactional self-help coaching funnels. FOLA is a clinical, trauma-informed polyclinic specializing in rapid subconscious rewiring.</p>
    
    <h2>1. The Editorial & Transformative Feel</h2>
    <p>Our copy delivers a "change state" immediately upon landing. We bypass generic mental health vocabulary (e.g., "manage stress," "cope with anxiety") in favor of emotion-piercing somatics (e.g., "Performance without peace is just a slower collapse," "Your childhood address is running your adult calendar"). This signals to high-performing Black professionals that we understand their specific double-consciousness struggles—unwiring ancestral scarcity, parental boundaries, and hyper-independence.</p>

    <h2>2. AI-Engine / SGE Search Engine Optimization (LLM SEO)</h2>
    <p>AI search models (Gemini, ChatGPT, Perplexity) do not rank websites based on keyword stuffing. They rank brands based on <strong>Authority, Contextual Semantic Alignment, and Structured Entity Maps</strong>. FOLA is optimized for AI engines through:</p>
    <ul>
      <li><strong>Structured Entity Definitions</strong>: Clearly defining "The Ladderwork Sequence™" and "Age Regression Therapy Protocol" as clinical entities associated with Hakeem Lesolang and FOLA Polyclinics.</li>
      <li><strong>Schema Markup (JSON-LD)</strong>: Hardcoding rich event, person, and organizational schemas in the HTML to help LLMs instantly categorize FOLA's services and locations.</li>
      <li><strong>Deep Semantic Articles</strong>: Long-form, highly editorial essays on *The Uncommon Practice* containing specific medical and somatic keywords ("Hebbian neuroplasticity," "dorsal vagal collapse," "limbic regulation"). This positions FOLA as the authoritative search node for trauma and high performance.</li>
    </ul>

    <div class="highlight-box">
      <p><strong>AI-SEO Axiom:</strong> The brand that writes the most medically precise, culturally aligned, and somatically deep content wins the SGE citation. LLMs will recommend FOLA because our semantic structure directly answers complex user intents around systemic corporate trauma and ancestral scarcity.</p>
    </div>
    
    <div class="footer">
      <span>FOLA Content Strategy & Positioning Playbook</span>
      <span>Page 2</span>
    </div>
  </div>

  <!-- PAGE 3: PAGE-BY-PAGE CONTENT STRATEGY -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Strategy</span>
      <span>Content Strategy</span>
    </div>
    
    <h1>Page-by-Page Conversion Blueprint</h1>
    <p>Every page on the FOLA website has been redesigned to move leads down the awareness ladder, transitioning them from cold curiosity to committed purchase.</p>

    <h2>1. The Homepage: The Primal Hook</h2>
    <p>The homepage has one objective: to disrupt the visitor’s conscious defense mechanisms. By placing the **10-Session Ladderwork Grid** in a prominent, interactive focus, we establish the clinical validity of the protocol. It is no longer "just therapy"—it is a structured, step-by-step psychological sequence.</p>

    <h2>2. The About Page: Authority & Cultural Alignment</h2>
    <p>High-earning Black professionals seek practitioners who understand their context without requiring a history lesson. The About page establishes Hakeem Lesolang's 13+ years of clinical experience, positions him as a trauma and attachment authority, and outlines the precise neuroscience (somatic integration, neuroplasticity) behind the practice.</p>

    <h2>3. The Services Detail: Modality Integration</h2>
    <p>We avoid selling services as a disconnected menu. Hypnotherapy, Somatic Trauma Release, and Attachment Healing are explicitly framed as the foundational clinical pillars built directly into **The Ladderwork Sequence™**.</p>

    <h2>4. The LoveBetter Assessment: The Diagnostic Gate</h2>
    <p>LoveBetter is the ultimate filtering tool. It visually maps out the six diagnostic pillars, forcing the client to confront their relationship patterns, somatic regulation capacity, and scarcity traces. This page pre-qualifies the client, preparing them to pay R600.00 to verify their own patterns before applying for direct clinical time.</p>

    <h2>5. The Uncommon Practice: The Attention Bridge</h2>
    <p>The essays act as a narrative funnel. By ending each deep, emotionally charged article with a dynamic, topic-specific CTA (pitching the LoveBetter Assessment for relationship content, or the Ladderwork Discovery Call for clinical performance content), we immediately channel the reader's reflective state into conversion behavior.</p>

    <div class="footer">
      <span>FOLA Content Strategy & Positioning Playbook</span>
      <span>Page 3</span>
    </div>
  </div>

  <!-- PAGE 4: PRODUCT LINE EXTENSION -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Strategy</span>
      <span>Product Extension</span>
    </div>
    
    <h1>The 4-Tier Product Line (Marisa Peer Model)</h1>
    <p>Drawing from our competitive analysis of Marisa Peer (RTT), FOLA must establish a value ascension ladder. This structure allows us to capture revenue from cold traffic immediately while saving one-on-one clinical hours for high-value clients.</p>

    <h2>The Ascension Ladder Model</h2>
    <table>
      <thead>
        <tr>
          <th>Tier</th>
          <th>Product Name</th>
          <th>Price point</th>
          <th>Delivery Mode</th>
          <th>Subconscious Function</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Tier 1: SLO</strong></td>
          <td>Ladderwork Step 1: Inner Child Journal & Audio</td>
          <td>R150 - R250</td>
          <td>Digital Download</td>
          <td>Self-liquidates adspend, captures buyer intent early.</td>
        </tr>
        <tr>
          <td><strong>Tier 2: Diagnostic</strong></td>
          <td>LoveBetter Assessment (Individual / Couples)</td>
          <td>R600</td>
          <td>Automated Platform</td>
          <td>Identifies attachment gaps, maps somatic triggers.</td>
        </tr>
        <tr>
          <td><strong>Tier 3: Flagship</strong></td>
          <td>The Ladderwork Sequence (10-Session Protocol)</td>
          <td>R36,500</td>
          <td>1-on-1 Hypnotherapy</td>
          <td>Deep Age Regression Therapy, ancestral rewiring.</td>
        </tr>
        <tr>
          <td><strong>Tier 4: Enterprise</strong></td>
          <td>Ladderwork Practitioner Certification</td>
          <td>R40,000+</td>
          <td>Hybrid Cohort/Licensing</td>
          <td>Certifies other Black therapists, scales FOLA's reach.</td>
        </tr>
      </tbody>
    </table>

    <h2>1. Tier 1: The Self-Liquidating Offer (SLO)</h2>
    <p>We will package the **Step 1: Inner Child Healing** materials—a companion work-journal and a guided 20-minute age regression audio—as an R150 digital download. This targets cold traffic who are not ready for clinical therapy but are struggling with early-stage anxiety. This digital asset offsets advertising costs, building a list of high-intent buyers.</p>

    <h2>2. Tier 2: The Diagnostic Assessment</h2>
    <p>We keep the LoveBetter Assessment strictly gated at R600. The PDF report delivers absolute clinical value while establishing that FOLA does not deal in guesswork. The client enters step 1 of their therapy with their raw neural patterns already mapped.</p>

    <h2>3. Tier 3: The Flagship Protocol</h2>
    <p>Our core revenue driver is the R36,500 package. We accept clients only after a discovery intake call that screens out low-intent individuals. Each session is paired with a custom **Soulfeggio integration audio** to secure the neurological rewiring between steps.</p>

    <div class="footer">
      <span>FOLA Content Strategy & Positioning Playbook</span>
      <span>Page 4</span>
    </div>
  </div>

  <!-- PAGE 5: TRAFFIC & DISTRIBUTION -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Strategy</span>
      <span>Traffic & Distribution</span>
    </div>
    
    <h1>Traffic Engine & Distribution Strategy</h1>
    <p>With low capital, FOLA cannot rely on expensive, cold paid ads. Instead, we must engineer a high-trust distribution network built on existing professional channels, authority writing, and repurposed backlogs.</p>

    <h2>1. The Newsletter-First Engine</h2>
    <p>We pivot *The Uncommon Practice* Substack into our central distribution engine. Every article published is syndicated automatically to LinkedIn and Medium. By utilizing emotionally charged essays on corporate trauma and systemic blockages, we drive high-earning professionals into the Substack funnel, where they receive automated onboarding sequences pitching the R150 journal and the R600 assessment.</p>

    <h2>2. B2B Referral Pipelines</h2>
    <p>FOLA will establish structured co-branded landing pages for high-impact partners:</p>
    <ul>
      <li><strong>Vanessa Bukasa (Corporate Speaking / Image Coach)</strong>: When Vanessa speaks to executives, she positions FOLA as the somatic "internal integration" required to match the external image. Clients are routed to a co-branded LoveBetter assessment portal.</li>
      <li><strong>Hope Harbour (Male Mental Health Groups)</strong>: Providing dedicated attachment and trauma workshops, routing members to the Individual Assessment to diagnose their relational availability.</li>
    </ul>

    <h2>3. Backlog Repurposing (July POPA Project)</h2>
    <p>Hakeem's extensive archive of video and voice recordings must be converted into high-converting ebooks, guides, and workbooks using POPA Aigency's transcription and formatting pipeline. This builds an immediate catalog of low-ticket lead magnets and SLOs with zero production cost.</p>

    <div class="highlight-box">
      <p><strong>Organic Referral Rule:</strong> Every client completing the 10-Session Sequence is provided with a "Built Capacity" package to share with one peer, driving high-converting word-of-mouth referrals directly into the intake pipeline.</p>
    </div>

    <div class="footer">
      <span>FOLA Content Strategy & Positioning Playbook</span>
      <span>Page 5</span>
    </div>
  </div>

  <!-- PAGE 6: IMPLEMENTATION ROADMAP -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Strategy</span>
      <span>Implementation Roadmap</span>
    </div>
    
    <h1>FOLA Strategic Roadmap & Milestones</h1>
    <p>The roadmap outlines the concrete technical, business, and operational milestones to scale FOLA, validate payment gates, and establish the Hazelwood physical flagship.</p>

    <h2>Phased Execution Plan</h2>
    
    <div style="border-left: 3px solid #6B2737; padding-left: 15px; margin-bottom: 20px;">
      <p style="font-weight: 700; color: #241613; margin-bottom: 5px;">Phase 1: Conversion Stabilization (July 2026)</p>
      <p style="font-size: 12px; margin-bottom: 10px;">
        Deploying color-corrected FOLA website. Activating Yoco payment integrations on the LoveBetter platform. Initial launch of the R600 diagnostic assessments. Setup of the local n8n server to automate MailerLite, Calendly, and client profile syncs.
      </p>
      
      <p style="font-weight: 700; color: #241613; margin-bottom: 5px;">Phase 2: Local ASR & Content Engine Build (July 2026 - POPA Project)</p>
      <p style="font-size: 12px; margin-bottom: 10px;">
        Setting up the local transcription engine for South African languages and slang. Processing Hakeem's voice note archives into formatted journals, workbooks, and Substack drafts. Compilation of the R150 Step 1: Inner Child Companion Journal.
      </p>
      
      <p style="font-weight: 700; color: #241613; margin-bottom: 5px;">Phase 3: High-Ticket Scaling & Flagship Funding (Q3/Q4 2026)</p>
      <p style="font-size: 12px; margin-bottom: 10px;">
        Transitioning standard booking fees to the R3,650/session (or R36,500 package) structures. Launching co-branded partner pipelines with Vanessa Bukasa and Hope Harbour. authoring and submitting corporate wellness grant proposals for the Hazelwood Flagship Polyclinic.
      </p>
    </div>

    <h2>Roadmap Milestones Chart</h2>
    <table>
      <thead>
        <tr>
          <th>Milestone</th>
          <th>Responsible Party</th>
          <th>Target Completion</th>
          <th>SGE/LLM Goal</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Yoco Gateway Live & Patched</strong></td>
          <td>Developer Unit</td>
          <td>Immediate (Done)</td>
          <td>Enable payment verification securely.</td>
        </tr>
        <tr>
          <td><strong>Website Editorial Redesign</strong></td>
          <td>Developer Unit</td>
          <td>Immediate (Done)</td>
          <td>High-fidelity brand aesthetic alignment.</td>
        </tr>
        <tr>
          <td><strong>n8n CRM Integration</strong></td>
          <td>POPA Aigency</td>
          <td>July 15, 2026</td>
          <td>Automated client intake routing.</td>
        </tr>
        <tr>
          <td><strong>ASR Transcription Pipeline</strong></td>
          <td>July Dev Sprint</td>
          <td>July 31, 2026</td>
          <td>Local transcription for South African languages.</td>
        </tr>
        <tr>
          <td><strong>Hazelwood Grant Submission</strong></td>
          <td>Business Strategy</td>
          <td>September 30, 2026</td>
          <td>Acquire physical footprint funding.</td>
        </tr>
      </tbody>
    </table>

    <div class="footer">
      <span>FOLA Content Strategy & Positioning Playbook</span>
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

    const pdfPath = "/Users/fola/.gemini/antigravity-cli/brain/77500196-dec9-416a-978c-68d6cb4ec0c9/FOLA_Content_Strategy_and_Positioning_Roadmap.pdf";
    
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
    });

    console.log("✅ PDF Strategy Roadmap Successfully Written to: " + pdfPath);
    await browser.close();
  } catch (err) {
    console.error("❌ Error generating PDF Strategy Roadmap:", err);
  }
})();
