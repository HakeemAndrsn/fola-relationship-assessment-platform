/**
 * Netlify Function: log-report
 *
 * Called by the report page each time a FOLA assessment report is rendered.
 * Appends one row to the "Love Better — Report Audit Log" Google Sheet using
 * the Sheets API v4 with service-account authentication.
 *
 * Required environment variables (set in Netlify UI → Site settings → Env vars):
 *   GOOGLE_SHEETS_CREDENTIALS  – Full service-account JSON key, stringified
 *   GOOGLE_SHEET_ID            – The spreadsheet ID from the sheet URL
 *
 * Expected sheet column order (A→G):
 *   Submission Date | Couple Name | Partner A Email | Partner B Email |
 *   Phase Result    | Dimension Scores (JSON) | Report Generated (Y/N)
 */

import type { Handler, HandlerEvent } from "@netlify/functions";
import { google } from "googleapis";

interface LogReportPayload {
  reportId: string;
  submissionDate: string;
  coupleName: string;
  partnerAEmail: string;
  partnerBEmail: string;
  phaseResult: string;
  dimensionScores: string; // compact JSON string
  reportGenerated: "Y" | "N";
}

const SHEET_RANGE = "Sheet1!A:G";

const handler: Handler = async (event: HandlerEvent) => {
  // ── Method guard ──
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // ── Env-var guard ──
  const credentialsRaw = process.env.GOOGLE_SHEETS_CREDENTIALS;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!credentialsRaw || !sheetId) {
    console.error(
      "log-report: missing GOOGLE_SHEETS_CREDENTIALS or GOOGLE_SHEET_ID"
    );
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server misconfiguration: missing required environment variables",
      }),
    };
  }

  // ── Parse service-account credentials ──
  let serviceAccountKey: object;
  try {
    serviceAccountKey = JSON.parse(credentialsRaw);
  } catch {
    console.error("log-report: GOOGLE_SHEETS_CREDENTIALS is not valid JSON");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Invalid service account credentials" }),
    };
  }

  // ── Parse request body ──
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing request body" }),
    };
  }

  let payload: LogReportPayload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Request body must be valid JSON" }),
    };
  }

  // ── Validate required fields ──
  const required: Array<keyof LogReportPayload> = [
    "reportId",
    "submissionDate",
    "coupleName",
    "phaseResult",
    "dimensionScores",
    "reportGenerated",
  ];
  for (const field of required) {
    if (!payload[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Missing required field: ${field}` }),
      };
    }
  }

  // ── Authenticate & append row ──
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccountKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const row = [
      payload.submissionDate,           // A: Submission Date
      payload.coupleName,               // B: Couple Name
      payload.partnerAEmail ?? "",      // C: Partner A Email
      payload.partnerBEmail ?? "",      // D: Partner B Email
      payload.phaseResult,              // E: Phase Result
      payload.dimensionScores,          // F: Dimension Scores (JSON)
      payload.reportGenerated,          // G: Report Generated (Y/N)
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: SHEET_RANGE,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });

    console.log(`log-report: appended row for report ${payload.reportId}`);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, reportId: payload.reportId }),
    };
  } catch (err) {
    console.error("log-report: Google Sheets API error →", err);
    return {
      statusCode: 502,
      body: JSON.stringify({ error: "Failed to write to Google Sheets" }),
    };
  }
};

export { handler };
