const puppeteer = require("puppeteer");
const { join } = require("path");

(async () => {
  console.log("🚀 Initializing PDF Generation...");

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Marisa Peer & RTT Competitor Analysis</title>
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
      background-color: #0a1628;
      color: #ffffff;
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
      border-left: 4px solid #d4af37;
      padding-left: 20px;
    }
    
    .cover-tag {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #d4af37;
      margin-bottom: 10px;
    }
    
    .cover-title {
      font-family: 'Playfair Display', serif;
      font-size: 38px;
      font-weight: 700;
      line-height: 1.15;
      margin: 0 0 15px 0;
      color: #ffffff;
    }
    
    .cover-subtitle {
      font-size: 16px;
      font-weight: 300;
      color: #94a3b8;
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
      color: #64748b;
    }
    
    .meta-item strong {
      color: #cbd5e1;
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
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    
    .header-logo {
      font-weight: 700;
      color: #0a1628;
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
      color: #94a3b8;
    }
    
    /* Typography */
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 26px;
      color: #0a1628;
      margin-top: 0;
      margin-bottom: 15px;
      border-bottom: 2px solid #f1f5f9;
      padding-bottom: 8px;
    }
    
    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      color: #0a1628;
      margin-top: 25px;
      margin-bottom: 10px;
    }
    
    p {
      font-size: 13.5px;
      line-height: 1.6;
      margin-top: 0;
      margin-bottom: 12px;
      color: #334155;
      text-align: justify;
    }
    
    ul {
      margin-top: 0;
      margin-bottom: 15px;
      padding-left: 20px;
    }
    
    li {
      font-size: 13px;
      line-height: 1.55;
      margin-bottom: 8px;
      color: #334155;
    }
    
    /* Highlight blocks */
    .highlight-box {
      background-color: #f8fafc;
      border-left: 3px solid #d4af37;
      padding: 15px;
      margin: 15px 0;
      border-radius: 0 8px 8px 0;
    }
    
    .highlight-box p {
      margin: 0;
      font-style: italic;
      color: #0f172a;
      font-size: 13px;
    }
    
    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      font-size: 12px;
    }
    
    th {
      background-color: #0a1628;
      color: #ffffff;
      text-align: left;
      padding: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    td {
      padding: 10px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
      vertical-align: top;
    }
    
    tr:nth-child(even) td {
      background-color: #f8fafc;
    }
    
    .badge {
      display: inline-block;
      padding: 3px 6px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .badge-primary { background-color: #e0f2fe; color: #0369a1; }
    .badge-success { background-color: #dcfce7; color: #15803d; }
    .badge-warning { background-color: #fef9c3; color: #a16207; }
    
  </style>
</head>
<body>

  <!-- PAGE 1: COVER PAGE -->
  <div class="cover-page">
    <div class="cover-top">
      <div class="cover-tag">Strategic Intelligence Briefing</div>
      <h1 class="cover-title">Marisa Peer & RTT:<br>Competitor Analysis &<br>Strategic Blueprint for FOLA</h1>
      <div class="cover-subtitle">Deconstructing the RTT empire's product ascension model, copywriting formulas, and marketing channels to accelerate FOLA's path to R40k packages.</div>
    </div>
    
    <div class="cover-bottom">
      <div class="cover-meta">
        <div class="meta-item">
          <strong>Prepared For</strong>
          Hakeem Lesolang<br>Founder, FOLA Polyclinics
        </div>
        <div class="meta-item">
          <strong>Prepared By</strong>
          POPA Aigency Research Unit
        </div>
        <div class="meta-item">
          <strong>Date</strong>
          June 27, 2026
        </div>
      </div>
    </div>
  </div>

  <!-- PAGE 2: EXECUTIVE SUMMARY -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Intelligence</span>
      <span>Executive Summary</span>
    </div>
    
    <h1>Executive Summary & Key Takeaways</h1>
    <p>Marisa Peer has built one of the world's most commercially successful modern hypnotherapy brands. Her method, branded as **Rapid Transformational Therapy (RTT®)**, and her consumer movement, **"I Am Enough,"** generate millions in annual revenue. By analyzing her model, FOLA can bypass typical startup friction and construct a highly optimized, high-ticket pathway targeting Black professionals.</p>
    
    <h2>The RTT Empire Core Metrics</h2>
    <ul>
      <li><strong>Proprietary Framework</strong>: Peer transformed standard hypnotherapy into a branded, proprietary method (RTT), creating perceived uniqueness and allowing premium pricing.</li>
      <li><strong>Low-Ticket Lead Generation (SLO)</strong>: Massive free content lists feed into $90–$200 digital programs, which self-liquidate adspend and filter buyers early.</li>
      <li><strong>High-Ticket B2B Scaling</strong>: The ultimate profit engine is not one-on-one therapy sessions, but training and licensing thousands of other therapists ($5,000–$13,000+ per student).</li>
    </ul>

    <div class="highlight-box">
      <p><strong>The Core Formula to Steal:</strong> Standout brands in this space do not sell generic "hypnotherapy" or hourly "sessions." They sell a branded, time-bound transformation (a "Sequence") backed by a simple, emotional hook, and monetize it via a structured value ascension funnel.</p>
    </div>

    <h2>Top 3 Strategic Moves for FOLA</h2>
    <table>
      <thead>
        <tr>
          <th>RTT Strategy</th>
          <th>What FOLA Should Steal</th>
          <th>Strategic Impact</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>"Rapid Transformational Therapy"</strong></td>
          <td>Branding the 10 sessions as <strong>"The Ladderwork Sequence™"</strong></td>
          <td>Shifts FOLA from an hourly service to a proprietary clinical method.</td>
        </tr>
        <tr>
          <td><strong>"$90–$200 Self-Hypnosis Audios"</strong></td>
          <td>Implementing <strong>R150–R250 SLO companion workbooks & audios</strong></td>
          <td>Creates a self-liquidating engine that covers adspend and builds a buyer list.</td>
        </tr>
        <tr>
          <td><strong>"I Am Enough" emotional hook</strong></td>
          <td><strong>"Unwiring Generational Scarcity"</strong> positioning for Black professionals</td>
          <td>Direct emotional hook mapping to imposter syndrome, wealth wiring, and guilt.</td>
        </tr>
      </tbody>
    </table>
    
    <div class="footer">
      <span>FOLA Competitor Analysis: Marisa Peer & RTT</span>
      <span>Page 2</span>
    </div>
  </div>

  <!-- PAGE 3: THE RTT ECOSYSTEM -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Intelligence</span>
      <span>The Product Ecosystem</span>
    </div>
    
    <h1>The RTT Product & Verticals Ecosystem</h1>
    <p>Marisa Peer’s product suite is structured to capture leads at multiple price sensitivities and guide them along an ascension curve. Understanding how she distributes value allows us to segment FOLA’s future products correctly.</p>

    <h2>1. The Consumer Ecosystem (B2C)</h2>
    <p>Peer segments her B2C offerings into distinct lifestyle verticals. Each vertical has dedicated self-hypnosis audios, books, and courses:</p>
    <ul>
      <li><strong>Self-Esteem & Confidence</strong>: The "I Am Enough" brand. A massive hook for general audiences.</li>
      <li><strong>Wealth & Abundance</strong>: Audios and courses focused on "wiring the brain for wealth" and "unwiring money blockages." (This perfectly corresponds to FOLA's Ladderwork Steps 9 & 10).</li>
      <li><strong>Relationships & Love</strong>: Guided hypnosis for attracting love, healing past romance, and establishing self-relationship.</li>
      <li><strong>Health & Weight Loss</strong>: Rewiring eating habits and physical health.</li>
    </ul>

    <h2>2. The Professional Ecosystem (B2B)</h2>
    <p>This is where RTT achieves massive scale and profitability. The **RTT Academy** trains and certifies individuals to become licensed practitioners.</p>
    <ul>
      <li><strong>High-Ticket Certification</strong>: The course costs between $5,000 and $13,000 USD. It requires no previous therapeutic background, opening it to career switchers.</li>
      <li><strong>Built-in Brand Affiliation</strong>: Students pay to learn the method, then use the RTT brand to market themselves, reinforcing Marisa Peer’s position as the global authority.</li>
      <li><strong>Affiliate Pipelines</strong>: Practitioners act as unpaid marketing extensions, writing blogs, publishing videos, and driving global awareness of RTT.</li>
    </ul>

    <h2>Ecosystem Comparison: RTT vs. FOLA</h2>
    <table>
      <thead>
        <tr>
          <th>Ecosystem Tier</th>
          <th>RTT Offering</th>
          <th>FOLA Equivalent (Planned)</th>
          <th>Revenue Model</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Low-Ticket (SLO)</strong></td>
          <td>$49–$99 Hypnosis Audios</td>
          <td>R150–R250 Ladderwork Audios & Journals</td>
          <td>Instant conversion to offset adspend</td>
        </tr>
        <tr>
          <td><strong>Mid-Ticket (Assessment)</strong></td>
          <td>$99 Self-Guided Courses</td>
          <td>R600 LoveBETTER Assessment Funnel</td>
          <td>Pre-qualifies leads for Discovery Calls</td>
        </tr>
        <tr>
          <td><strong>High-Ticket (Service)</strong></td>
          <td>$300–$600 Therapy Sessions (by grads)</td>
          <td>R36,500 10-Session Ladderwork Package</td>
          <td>Core one-on-one premium clinical work</td>
        </tr>
        <tr>
          <td><strong>Enterprise (B2B)</strong></td>
          <td>$10,000+ Practitioner Academy</td>
          <td>Ladderwork Sequence Practitioner Licensing</td>
          <td>Scale POPA Aigency via certification</td>
        </tr>
      </tbody>
    </table>

    <div class="footer">
      <span>FOLA Competitor Analysis: Marisa Peer & RTT</span>
      <span>Page 3</span>
    </div>
  </div>

  <!-- PAGE 4: THE MARKETING FUNNEL -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Intelligence</span>
      <span>Funnel Architecture</span>
    </div>
    
    <h1>Funnel Architecture & Lead Acquisition</h1>
    <p>Marisa Peer uses a sophisticated, multi-channel marketing engine. The key to her low customer acquisition cost (CAC) is her use of value-first challenge funnels that filter traffic based on intent.</p>

    <h2>The Challenge-Based Ascension Funnel</h2>
    <p>Instead of pitching a high-ticket program to cold traffic, Peer runs rotating **5-Day Domain Challenges** (e.g., *The 5-Day Wealth Challenge*, *The 5-Day Relationship Reset*). Here is the sequence:</p>
    
    <div style="margin: 20px 0; border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; background-color: #f8fafc;">
      <p style="font-weight:600; color:#0a1628; margin-bottom: 8px;">The RTT Challenge Funnel Stages:</p>
      <ol style="margin:0; padding-left: 20px; font-size: 12px; color:#475569;">
        <li style="margin-bottom:6px;"><strong>Ad Traffic (Cold)</strong>: Low CPL ads hook users on a specific domain pain point (e.g., "Why you struggle to charge what you're worth").</li>
        <li style="margin-bottom:6px;"><strong>5-Day Free Challenge (Warm-up)</strong>: Users opt-in. Every day, they get a 10-minute training video and a small action item. This builds intense trust and authority.</li>
        <li style="margin-bottom:6px;"><strong>The SLO Pivot (Day 5)</strong>: On the final day, users are offered a R150/R250 Companion Guide or deep-dive guided audio set to keep their momentum.</li>
        <li style="margin-bottom:6px;"><strong>High-Ticket Pitch (Backend)</strong>: Those who buy the SLO are immediately routed to a booking funnel or application page for the core therapeutic packages or RTT Academy.</li>
      </ol>
    </div>

    <h2>Marketing Channels FOLA Can Leverage</h2>
    <ul>
      <li><strong>Substack / Newsletter-First Engine</strong>: Mirroring Peer's authority positioning. Write long-form, trauma-informed essays on *The Uncommon Practice*, inserting mid-text CTAs for the R150 workbook, leading to the R600 LoveBETTER assessment.</li>
      <li><strong>Referral Partnerships (Vanessa Bukasa / Hope Harbour)</strong>: Establish a high-trust pipeline where referrers are equipped with custom co-branded pages (similar to how RTT graduates run co-branded RTT landing pages).</li>
      <li><strong>YouTube & Voice Note BACKLOGS</strong>: Transcribe your existing videos and audio recordings into ebooks, workbooks, and guides using POPA Aigency tools, publishing them as free/low-cost lead magnets.</li>
    </ul>

    <div class="highlight-box">
      <p><strong>FOLA Funnel Rule:</strong> Never send cold traffic directly to your R36,500 package. Send them to a Substack article or a free checklist, upsell them to the R150 workbook (SLO), guide them to the R600 assessment, and close them on a Discovery Call.</p>
    </div>

    <div class="footer">
      <span>FOLA Competitor Analysis: Marisa Peer & RTT</span>
      <span>Page 4</span>
    </div>
  </div>

  <!-- PAGE 5: COPYWRITING ANALYSIS -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Intelligence</span>
      <span>Copywriting & Positioning</span>
    </div>
    
    <h1>Copywriting Analysis & Psychological Hooks</h1>
    <p>Marisa Peer’s copy is deceptively simple. It focuses on primal emotional states rather than clinical jargon. By understanding her copy hooks, FOLA can structure landing pages that hit the core psychological triggers of high-earning Black professionals.</p>

    <h2>1. The "I Am Enough" Formula</h2>
    <p>Peer’s central thesis is that almost all human suffering, addiction, and under-earning stem from a single, deep-seated belief: **"I am not enough."**</p>
    <ul>
      <li><strong>The Psychological Hook</strong>: It is simple, universal, and easily remembered. It bypasses the conscious mind and speaks directly to the inner child.</li>
      <li><strong>The Strategy</strong>: The client is told to write "I Am Enough" on their mirrors, phones, and computers to constantly reprogram their subconscious.</li>
    </ul>

    <h2>2. Subconscious Reprogramming Copy</h2>
    <p>Peer’s copy constantly uses linguistic patterns that make change feel automatic and rapid:</p>
    <ul>
      <li><strong>"Rapid" and "Permanent"</strong>: Words that contrast with traditional talk therapy (which is positioned as slow and expensive).</li>
      <li><strong>"Your Mind Does What It Thinks You Want It To Do"</strong>: Shifting agency to the client while positioning hypnotherapy as the "instruction manual" for the brain.</li>
    </ul>

    <h2>Mapping RTT Hooks to FOLA (Black Professionals)</h2>
    <p>Black professionals face unique systemic and ancestral pressures. FOLA's positioning should map directly to these psychological realities:</p>
    
    <table>
      <thead>
        <tr>
          <th>RTT Primal Hook</th>
          <th>FOLA Equivalent for Black Professionals</th>
          <th>Clinical / Copy Rationale</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>"I am not enough."</strong></td>
          <td><strong>"I must carry it all alone." (Built Capacity)</strong></td>
          <td>Addresses hyper-independence and the trauma of being the "first" or "only" in corporate spaces.</td>
        </tr>
        <tr>
          <td><strong>"Wealth blockages."</strong></td>
          <td><strong>"Generational Scarcity / Poverty Mindedness"</strong></td>
          <td>Step 9 of the Ladderwork. Unwires the guilt of success and the pressure of family support.</td>
        </tr>
        <tr>
          <td><strong>"Low confidence."</strong></td>
          <td><strong>"The Impostor Syndrome (Calendar/Bank/Friends)"</strong></td>
          <td>Step 8 of the Ladderwork. Focuses on feeling like a fraud despite massive professional achievement.</td>
        </tr>
        <tr>
          <td><strong>"Parental conflict."</strong></td>
          <td><strong>"Overcoming Parental Harm & Lineage Guilt"</strong></td>
          <td>Step 2. Focuses on boundaries, establishing peer-level authority, and releasing family expectations.</td>
        </tr>
      </tbody>
    </table>

    <div class="footer">
      <span>FOLA Competitor Analysis: Marisa Peer & RTT</span>
      <span>Page 5</span>
    </div>
  </div>

  <!-- PAGE 6: THE FOLA PLAYBOOK -->
  <div class="page">
    <div class="header">
      <span class="header-logo">FOLA Intelligence</span>
      <span>Strategic Playbook</span>
    </div>
    
    <h1>The FOLA Playbook: What to Steal & Adapt</h1>
    <p>To scale FOLA to R40k packages and eventually establish your physical flagship in Hazelwood, Tshwane, we must execute these four strategic transitions modeled on Marisa Peer's success:</p>

    <h2>1. Productize the "Ladderwork Sequence™"</h2>
    <p>Stop describing FOLA as "therapy." Describe it as a proprietary clinical protocol: **The Ladderwork Sequence™**.</p>
    <ul>
      <li><strong>The Delivery</strong>: Clients do not just book "sessions." They enroll in a 10-step protocol designed to rewire the relationship with self and lineage.</li>
      <li><strong>Integration Audios</strong>: Just like RTT, every client gets a specific, high-quality **Soulfeggio integration audio** following each session. They must listen to this audio for 21 days between steps to cement the rewiring. This justifies the premium R3,650–R4,000 session price.</li>
    </ul>

    <h2>2. Launch the "Inner Child" SLO Funnel</h2>
    <p>Build a low-cost, self-liquidating offer to fund your adspend and capture leads:</p>
    <ul>
      <li><strong>The Asset</strong>: *The Ladderwork Step 1: Inner Child Companion Journal & Guided Regression Audio* (Priced at R150.00 / $10).</li>
      <li><strong>The Funnel</strong>: Promote this journal on Substack and via social media. Once purchased, route the buyer to the R600 LoveBETTER assessment as their next logical step, and then to the Discovery Call booking.</li>
    </ul>

    <h2>3. Pre-Qualifying Funnel (LoveBETTER)</h2>
    <p>Keep the LoveBETTER assessment strictly priced at R600. Use the newly fixed Yoco payment gate to enforce value. Use the qualifying questions to redirect low-budget leads to your R150 workbook, reserving your 90-minute Discovery Calls only for leads who state they are ready to invest in the full sequence.</p>

    <h2>4. Scale via POPA Aigency</h2>
    <p>Once FOLA Hazelwood is established, scale your revenue using Peer's B2B model: **The Ladderwork Practitioner Academy**. Train other Black therapists, coaches, and practitioners to deliver the Sequence. They pay you for certification, and you license the method to them, creating a massive, scalable enterprise.</p>
    
    <div class="footer">
      <span>FOLA Competitor Analysis: Marisa Peer & RTT</span>
      <span>Page 6</span>
    </div>
  </div>

</body>
</html>
  `;

  try {
    // Launch Puppeteer with local Chrome path
    const browser = await puppeteer.launch({
      executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfPath = "/Users/fola/.gemini/antigravity-cli/brain/77500196-dec9-416a-978c-68d6cb4ec0c9/Marisa_Peer_Competitor_Analysis.pdf";
    
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" }, // Zero margin so CSS defines full boundaries
    });

    console.log("✅ PDF Successfully Written to: " + pdfPath);
    await browser.close();
  } catch (err) {
    console.error("❌ Error generating PDF:", err);
  }
})();
