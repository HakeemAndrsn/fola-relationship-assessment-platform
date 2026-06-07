import puppeteer from "puppeteer";
import { execSync, spawn } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

// 1. Build the app
console.log("📦 Building Next.js...");
execSync("npm run build", { cwd: projectRoot, stdio: "inherit" });

// 2. Start the server
console.log("🚀 Starting server on port 3999...");
const server = spawn("npx", ["next", "start", "-p", "3999"], {
  cwd: projectRoot,
  stdio: "pipe",
  detached: false,
});

// Wait for server to be ready
await new Promise((resolve) => setTimeout(resolve, 8000));

try {
  // 3. Launch Puppeteer with local Chrome
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // 4. Mock data for couples report
  const mockCouplesReport = {
    id: "MOCK-2026-0606-001",
    date: "6 June 2026",
    couple: { partnerA: "Alex", partnerB: "Jordan" },
    overallScore: 62,
    domainScores: [
      { domain: "communication", label: "Communication & Conflict", partnerAScore: 6, partnerBScore: 4, alignmentPercent: 55, gap: 2, riskLevel: "high", clinicalWeight: "critical" },
      { domain: "attachment", label: "Attachment Style", partnerAScore: 7, partnerBScore: 5, alignmentPercent: 65, gap: 2, riskLevel: "medium", clinicalWeight: "high" },
      { domain: "trauma", label: "Trauma & History", partnerAScore: 5, partnerBScore: 3, alignmentPercent: 45, gap: 2, riskLevel: "high", clinicalWeight: "critical" },
      { domain: "adhd", label: "Neurodivergence", partnerAScore: 8, partnerBScore: 7, alignmentPercent: 82, gap: 1, riskLevel: "low", clinicalWeight: "moderate" },
      { domain: "values", label: "Values & Vision", partnerAScore: 9, partnerBScore: 8, alignmentPercent: 88, gap: 1, riskLevel: "low", clinicalWeight: "high" },
      { domain: "changeReadiness", label: "Change Readiness", partnerAScore: 6, partnerBScore: 8, alignmentPercent: 70, gap: 2, riskLevel: "medium", clinicalWeight: "moderate" },
      { domain: "futureVision", label: "Future Vision", partnerAScore: 7, partnerBScore: 6, alignmentPercent: 72, gap: 1, riskLevel: "medium", clinicalWeight: "moderate" },
      { domain: "prejudices", label: "Prejudices & Biases", partnerAScore: 8, partnerBScore: 7, alignmentPercent: 78, gap: 1, riskLevel: "low", clinicalWeight: "moderate" },
    ],
    primaryStrength: { domain: "values", label: "Values & Vision", partnerAScore: 9, partnerBScore: 8, alignmentPercent: 88, gap: 1, riskLevel: "low", clinicalWeight: "high" },
    criticalFracture: { domain: "trauma", label: "Trauma & History", partnerAScore: 5, partnerBScore: 3, alignmentPercent: 45, gap: 2, riskLevel: "high", clinicalWeight: "critical" },
    clinicalFlags: [
      { type: "Trauma Discrepancy", severity: "high", message: "Significant gap in trauma history awareness between partners. Partner B reports higher adverse experiences with limited disclosure to Partner A.", recommendation: "Individual trauma-informed sessions recommended before joint work. Consider Age Regression Therapy for Partner B." },
      { type: "Communication Breakdown", severity: "high", message: "Conflict resolution patterns show escalation risk. Both partners report feeling unheard during disagreements.", recommendation: "Begin with Communication Rewiring protocol in Phase 1." },
      { type: "Attachment Insecurity", severity: "medium", message: "Anxious-avoidant attachment dynamic detected. Partner A (anxious) pursues; Partner B (avoidant) withdraws under stress.", recommendation: "Attachment-focused sessions recommended in Phase 2." },
    ],
    treatmentPlan: [
      {
        phase: 1,
        title: "Stabilisation & Safety",
        weeks: "Weeks 1-4",
        sessions: [
          { description: "Breakthrough Session (Joint)", target: "Establish therapeutic alliance and safety", price: 2700 },
          { description: "Individual Session — Partner B", target: "Trauma history mapping", price: 2700 },
          { description: "Communication Rewiring Session", target: "De-escalation tools and active listening", price: 2700 },
        ],
      },
      {
        phase: 2,
        title: "Deepening & Repair",
        weeks: "Weeks 5-10",
        sessions: [
          { description: "Attachment-Focused Session", target: "Pattern interruption and secure bonding", price: 2700 },
          { description: "Age Regression Therapy — Partner B", target: "Childhood trauma processing", price: 4000 },
          { description: "Values & Vision Integration", target: "Shared future narrative", price: 2700 },
        ],
      },
      {
        phase: 3,
        title: "Integration & Maintenance",
        weeks: "Weeks 11-16",
        sessions: [
          { description: "Maintenance Session", target: "Relapse prevention and skill consolidation", price: 2000 },
          { description: "Quarterly Re-assessment", target: "Progress measurement and plan adjustment", price: 2700 },
        ],
      },
    ],
    totalInvestment: 22200,
    dynamicPrice: 2500,
    priceBreakdown: "Base price R2,500 (dynamic pricing applied based on clinical complexity)",
  };

  // 5. Mock data for individual report
  const mockIndividualReport = {
    id: "MOCK-IND-2026-0606-001",
    date: "6 June 2026",
    name: "Sam",
    overallScore: 58,
    dimensionScores: [
      { dimension: "selfAwareness", label: "Self-Awareness", score: 6, maxScore: 10, percentile: 40, riskLevel: "growth", clinicalWeight: "high" },
      { dimension: "attachment", label: "Attachment Style", score: 5, maxScore: 10, percentile: 30, riskLevel: "priority", clinicalWeight: "critical" },
      { dimension: "trauma", label: "Trauma & History", score: 4, maxScore: 10, percentile: 20, riskLevel: "priority", clinicalWeight: "critical" },
      { dimension: "adhd", label: "Neurodivergence", score: 7, maxScore: 10, percentile: 60, riskLevel: "strength", clinicalWeight: "moderate" },
      { dimension: "communication", label: "Communication Patterns", score: 6, maxScore: 10, percentile: 40, riskLevel: "growth", clinicalWeight: "high" },
      { dimension: "values", label: "Values & Vision", score: 8, maxScore: 10, percentile: 75, riskLevel: "strength", clinicalWeight: "moderate" },
      { dimension: "changeReadiness", label: "Change Readiness", score: 7, maxScore: 10, percentile: 60, riskLevel: "strength", clinicalWeight: "moderate" },
      { dimension: "emotionalRegulation", label: "Emotional Regulation", score: 5, maxScore: 10, percentile: 30, riskLevel: "priority", clinicalWeight: "high" },
      { dimension: "selfConcept", label: "Self-Concept", score: 6, maxScore: 10, percentile: 40, riskLevel: "growth", clinicalWeight: "moderate" },
      { dimension: "prejudices", label: "Prejudices & Biases", score: 8, maxScore: 10, percentile: 80, riskLevel: "strength", clinicalWeight: "low" },
    ],
    topStrength: { dimension: "values", label: "Values & Vision", score: 8, maxScore: 10, riskLevel: "low", clinicalWeight: "moderate", insight: "You have a strong sense of purpose and direction. This anchors your growth journey." },
    primaryGrowthEdge: { dimension: "trauma", label: "Trauma & History", score: 4, maxScore: 10, riskLevel: "high", clinicalWeight: "critical", insight: "Unresolved trauma patterns are impacting your emotional regulation and relationships." },
    clinicalFlags: [
      { type: "Unresolved Trauma", severity: "high", message: "Elevated ACE score with limited processing. Avoidance patterns detected in emotional regulation.", recommendation: "Individual Age Regression Therapy recommended as priority intervention." },
      { type: "Attachment Insecurity", severity: "high", message: "Anxious attachment pattern with fear of abandonment. Impacts communication and emotional regulation.", recommendation: "Attachment-focused individual sessions recommended." },
    ],
    treatmentPlan: [
      {
        phase: 1,
        title: "Foundation & Safety",
        weeks: "Weeks 1-3",
        sessions: [
          { description: "Breakthrough Session", target: "Assessment review and goal setting", price: 2700 },
          { description: "Age Regression Therapy", target: "Core trauma processing", price: 4000 },
        ],
      },
      {
        phase: 2,
        title: "Deepening & Integration",
        weeks: "Weeks 4-8",
        sessions: [
          { description: "Attachment-Focused Session", target: "Pattern awareness and repair", price: 2700 },
          { description: "Emotional Regulation Session", target: "Somatic tools and nervous system regulation", price: 2700 },
          { description: "Values & Vision Session", target: "Life direction clarity", price: 2700 },
        ],
      },
      {
        phase: 3,
        title: "Maintenance & Growth",
        weeks: "Weeks 9-12",
        sessions: [
          { description: "Maintenance Session", target: "Relapse prevention and skill consolidation", price: 2000 },
          { description: "Peak Performance Session", target: "Thriving beyond healing", price: 2700 },
        ],
      },
    ],
    totalInvestment: 19500,
    dynamicPrice: 600,
    priceBreakdown: "Assessment fee R600 (one-time)",
    loveLanguage: "qualityTime",
    attachmentStyle: "anxious",
    changeReadiness: "contemplative",
  };

  // 6. Generate couples report PDF
  console.log("📄 Loading couples report page...");
  // Navigate to same origin first to set up sessionStorage
  await page.goto("http://localhost:3999/", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  // Inject data into sessionStorage
  await page.evaluate((mockData) => {
    sessionStorage.setItem("fola-report", JSON.stringify(mockData));
  }, mockCouplesReport);
  // Now navigate to the report page
  await page.goto("http://localhost:3999/report", {
    waitUntil: "networkidle0",
    timeout: 30000,
  });

  const couplesPdfPath = join(projectRoot, "mock-couples-report.pdf");
  await page.pdf({
    path: couplesPdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
  });
  console.log(`✅ Couples report: ${couplesPdfPath}`);

  // 7. Generate individual report PDF
  console.log("📄 Loading individual report page...");
  // Navigate to the same origin first so sessionStorage is available
  await page.goto("http://localhost:3999/", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  // Set sessionStorage on the origin
  await page.evaluate((mockData) => {
    sessionStorage.setItem("folaIndividualReport", JSON.stringify(mockData));
  }, mockIndividualReport);
  // Now navigate to the report page — data will be there
  await page.goto("http://localhost:3999/individual-report", {
    waitUntil: "networkidle0",
    timeout: 30000,
  });

  const indPdfPath = join(projectRoot, "mock-individual-report.pdf");
  await page.pdf({
    path: indPdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
  });
  console.log(`✅ Individual report: ${indPdfPath}`);

  await browser.close();
} finally {
  server.kill("SIGTERM");
  console.log("🏁 Done");
}
