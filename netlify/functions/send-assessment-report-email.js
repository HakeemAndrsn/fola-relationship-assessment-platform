// netlify/functions/send-assessment-report-email.js
// Client-triggered Netlify function that emails a full copy of a generated
// assessment report via Brevo, independent of whether the /report or
// /individual-report page renders successfully. Always BCCs the practice
// owner so a durable record exists even if the client never receives it.

const OWNER_EMAIL = "hakeemandrsn@gmail.com";
// sender must stay the Brevo-verified address or delivery silently fails;
// replyTo can safely point to the monitored inbox
const SENDER = { name: "LOVEBETTER by FOLA", email: "decks@fola.co.za" };
const REPLY_TO = { name: "LOVEBETTER by FOLA", email: "admin@fola.co.za" };

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function riskColor(level) {
  if (level === "low" || level === "strength") return "#38a169";
  if (level === "medium" || level === "growth") return "#B8654A";
  return "#e53e3e";
}

function domainRow(label, aLabel, aScore, bLabel, bScore, alignmentPercent, riskLevel) {
  return `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #e2e8f0;">${escapeHtml(label)}</td>
      ${bLabel ? `<td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:center;">${escapeHtml(aScore)}</td>
      <td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:center;">${escapeHtml(bScore)}</td>` : `<td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:center;">${escapeHtml(aScore)}</td>`}
      <td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:center;">
        <span style="color:${riskColor(riskLevel)};font-weight:bold;">${escapeHtml(alignmentPercent)}%</span>
      </td>
    </tr>`;
}

function flagsHtml(flags) {
  if (!flags || flags.length === 0) return "";
  return `
    <h2 style="color:#121212;font-size:18px;border-bottom:2px solid #B8654A;padding-bottom:6px;">Clinical Flags</h2>
    ${flags.map((f) => `
      <div style="border-left:4px solid ${f.severity === "high" ? "#e53e3e" : "#B8654A"};background:#f7f8fc;padding:12px;margin-bottom:10px;">
        <p style="margin:0;font-size:12px;font-weight:bold;text-transform:uppercase;color:${f.severity === "high" ? "#e53e3e" : "#B8654A"};">${escapeHtml(f.type)} — ${escapeHtml(f.severity)} severity</p>
        <p style="margin:6px 0 0;font-size:14px;color:#2d3748;">${escapeHtml(f.message)}</p>
        <p style="margin:6px 0 0;font-size:14px;color:#4a5568;font-style:italic;">${escapeHtml(f.recommendation)}</p>
      </div>`).join("")}
  `;
}

function treatmentPlanHtml(plan) {
  if (!plan || plan.length === 0) return "";
  return `
    <h2 style="color:#121212;font-size:18px;border-bottom:2px solid #B8654A;padding-bottom:6px;">Clinical Pathway</h2>
    ${plan.map((phase) => `
      <div style="border:1px solid #e2e8f0;margin-bottom:14px;">
        <div style="background:#121212;color:#fff;padding:10px 14px;">
          <strong>Phase ${escapeHtml(phase.phase)}: ${escapeHtml(phase.title)}</strong>
          <span style="float:right;color:#a0aec0;font-size:12px;">${escapeHtml(phase.weeks)}</span>
        </div>
        ${phase.sessions.map((s) => `
          <div style="padding:10px 14px;border-bottom:1px solid #e2e8f0;">
            <p style="margin:0;font-size:14px;color:#2d3748;"><strong>${escapeHtml(s.description)}</strong> — R${Number(s.price).toLocaleString()}</p>
            <p style="margin:2px 0 0;font-size:12px;color:#718096;">Who: ${escapeHtml(s.target)}${s.why ? ` — ${escapeHtml(s.why)}` : ""}</p>
          </div>`).join("")}
      </div>`).join("")}
  `;
}

function buildCouplesEmail(report) {
  const partnerA = report.couple?.partnerA || "Partner A";
  const partnerB = report.couple?.partnerB || "Partner B";
  const domainRows = (report.domainScores || [])
    .map((s) => domainRow(s.label, partnerA, `${s.partnerAScore}/10`, partnerB, `${s.partnerBScore}/10`, s.alignmentPercent, s.riskLevel))
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>FOLA Couples Relational Assessment Report</title></head>
    <body style="margin:0;padding:24px;background:#f7f8fc;font-family:Helvetica,Arial,sans-serif;color:#2d3748;">
      <div style="max-width:640px;margin:0 auto;background:#fff;padding:32px;border:1px solid #e2e8f0;">
        <h1 style="color:#121212;font-size:22px;margin-bottom:4px;">FOLA Couples Relational Assessment</h1>
        <p style="color:#718096;font-size:13px;margin-top:0;">Report ID: ${escapeHtml(report.id)} · ${escapeHtml(report.date)}</p>
        <p style="font-size:14px;">Partners: <strong>${escapeHtml(partnerA)} &amp; ${escapeHtml(partnerB)}</strong></p>
        <p style="font-size:16px;"><strong>Overall Alignment: ${escapeHtml(report.overallScore)}/100</strong></p>

        <div style="display:flex;gap:12px;margin:16px 0;">
          <div style="flex:1;background:#f0fdf4;border:1px solid #bbf7d0;padding:12px;">
            <p style="margin:0;font-size:11px;text-transform:uppercase;color:#15803d;font-weight:bold;">Primary Strength</p>
            <p style="margin:4px 0 0;font-size:14px;">${escapeHtml(report.primaryStrength?.label)} (${escapeHtml(report.primaryStrength?.alignmentPercent)}%)</p>
          </div>
          <div style="flex:1;background:#fef2f2;border:1px solid #fecaca;padding:12px;">
            <p style="margin:0;font-size:11px;text-transform:uppercase;color:#b91c1c;font-weight:bold;">Critical Fracture Point</p>
            <p style="margin:4px 0 0;font-size:14px;">${escapeHtml(report.criticalFracture?.label)} (${escapeHtml(report.criticalFracture?.alignmentPercent)}%)</p>
          </div>
        </div>

        <h2 style="color:#121212;font-size:18px;border-bottom:2px solid #B8654A;padding-bottom:6px;">Domain Scoring Matrix</h2>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead>
            <tr style="border-bottom:2px solid #121212;">
              <th style="text-align:left;padding:8px;">Domain</th>
              <th style="padding:8px;">${escapeHtml(partnerA)}</th>
              <th style="padding:8px;">${escapeHtml(partnerB)}</th>
              <th style="padding:8px;">Alignment</th>
            </tr>
          </thead>
          <tbody>${domainRows}</tbody>
        </table>

        ${flagsHtml(report.clinicalFlags)}
        ${treatmentPlanHtml(report.treatmentPlan)}

        <div style="background:#121212;color:#fff;padding:16px;margin-top:16px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#B8654A;text-transform:uppercase;letter-spacing:0.05em;">Estimated Total Investment</p>
          <p style="margin:6px 0 0;font-size:22px;font-weight:bold;">R${Number(report.totalInvestment || 0).toLocaleString()}</p>
        </div>

        <p style="font-size:11px;color:#a0aec0;margin-top:24px;">This report is a screening instrument and does not constitute a clinical diagnosis. LOVEBETTER by FOLA · Clinical Director: Hakeem.</p>
      </div>
    </body>
    </html>
  `;
}

function buildIndividualEmail(report) {
  const domainRows = (report.dimensionScores || [])
    .map((s) => domainRow(s.label, report.name, `${s.score}/100`, null, null, s.percentile, s.riskLevel))
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>FOLA Individual Growth Assessment Report</title></head>
    <body style="margin:0;padding:24px;background:#f7f8fc;font-family:Helvetica,Arial,sans-serif;color:#2d3748;">
      <div style="max-width:640px;margin:0 auto;background:#fff;padding:32px;border:1px solid #e2e8f0;">
        <h1 style="color:#121212;font-size:22px;margin-bottom:4px;">FOLA Individual Growth Assessment</h1>
        <p style="color:#718096;font-size:13px;margin-top:0;">Report ID: ${escapeHtml(report.id)} · ${escapeHtml(report.date)}</p>
        <p style="font-size:14px;">Client: <strong>${escapeHtml(report.name)}</strong></p>
        <p style="font-size:16px;"><strong>Overall Score: ${escapeHtml(report.overallScore)}/100</strong></p>
        <p style="font-size:13px;color:#4a5568;">Attachment: ${escapeHtml(String(report.attachmentStyle).toUpperCase())} · Change Readiness: ${escapeHtml(String(report.changeReadiness).toUpperCase())} · Love Language: ${escapeHtml(report.loveLanguage)}</p>

        <div style="display:flex;gap:12px;margin:16px 0;">
          <div style="flex:1;background:#f0fdf4;border:1px solid #bbf7d0;padding:12px;">
            <p style="margin:0;font-size:11px;text-transform:uppercase;color:#15803d;font-weight:bold;">Top Strength</p>
            <p style="margin:4px 0 0;font-size:14px;">${escapeHtml(report.topStrength?.label)} (${escapeHtml(report.topStrength?.score)}/100)</p>
          </div>
          <div style="flex:1;background:#fef2f2;border:1px solid #fecaca;padding:12px;">
            <p style="margin:0;font-size:11px;text-transform:uppercase;color:#b91c1c;font-weight:bold;">Primary Growth Edge</p>
            <p style="margin:4px 0 0;font-size:14px;">${escapeHtml(report.primaryGrowthEdge?.label)} (${escapeHtml(report.primaryGrowthEdge?.score)}/100)</p>
          </div>
        </div>

        <h2 style="color:#121212;font-size:18px;border-bottom:2px solid #B8654A;padding-bottom:6px;">Dimension Scoring</h2>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead>
            <tr style="border-bottom:2px solid #121212;">
              <th style="text-align:left;padding:8px;">Dimension</th>
              <th style="padding:8px;">Score</th>
              <th style="padding:8px;">Percentile</th>
            </tr>
          </thead>
          <tbody>${domainRows}</tbody>
        </table>

        ${flagsHtml(report.clinicalFlags)}
        ${treatmentPlanHtml(report.treatmentPlan)}

        <div style="background:#121212;color:#fff;padding:16px;margin-top:16px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#B8654A;text-transform:uppercase;letter-spacing:0.05em;">Estimated Total Investment</p>
          <p style="margin:6px 0 0;font-size:22px;font-weight:bold;">R${Number(report.totalInvestment || 0).toLocaleString()}</p>
        </div>

        <p style="font-size:11px;color:#a0aec0;margin-top:24px;">This report is a screening instrument and does not constitute a clinical diagnosis. LOVEBETTER by FOLA · Clinical Director: Hakeem.</p>
      </div>
    </body>
    </html>
  `;
}

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);
    const { reportType, email, report } = body;

    if (!reportType || !email || !report) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing reportType, email, or report" }) };
    }

    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "A valid email is required" }) };
    }

    if (reportType !== "couples" && reportType !== "individual") {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid reportType" }) };
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "Email provider not configured" }) };
    }

    const isCouples = reportType === "couples";
    const htmlContent = isCouples ? buildCouplesEmail(report) : buildIndividualEmail(report);
    const stripControlChars = (s) => String(s ?? "").replace(/[\r\n]+/g, " ");
    const subjectName = stripControlChars(
      isCouples
        ? `${report.couple?.partnerA || ""} & ${report.couple?.partnerB || ""}`
        : report.name || "Client"
    );

    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: SENDER,
        replyTo: REPLY_TO,
        to: [{ email }],
        bcc: [{ email: OWNER_EMAIL }],
        subject: `Your FOLA ${isCouples ? "Couples" : "Individual"} Assessment Report — ${subjectName}`,
        htmlContent,
      }),
    });

    const brevoData = await brevoRes.json();
    if (!brevoRes.ok) {
      console.error("Brevo API error:", JSON.stringify(brevoData));
      return { statusCode: 502, headers, body: JSON.stringify({ error: "Brevo delivery failed", details: brevoData }) };
    }

    console.log("Assessment report email sent! Message ID:", brevoData.messageId);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("send-assessment-report-email error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
