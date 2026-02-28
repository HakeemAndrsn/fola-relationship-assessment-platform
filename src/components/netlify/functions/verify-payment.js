/**
 * Love Better — verify-payment Netlify Function
 *
 * Endpoint: POST /.netlify/functions/verify-payment
 *
 * Flow:
 *   1. Client sends { token, email } after YOCO popup reports success.
 *   2. This function creates a charge via the YOCO Charges API using
 *      the server-side YOCO_SECRET_KEY — client-side confirmation alone
 *      is never trusted.
 *   3. On verified charge: respond 200.
 *   4. On failure: respond 402.
 *   5. Regardless of charge result, attempt to log to Google Sheets
 *      (fails silently via try/catch if the sheet is not yet connected).
 *
 * Environment variables required in Netlify:
 *   YOCO_SECRET_KEY          — YOCO secret key (test or live)
 *   GOOGLE_SHEETS_CREDENTIALS — JSON string of Google service account credentials
 *   GOOGLE_SHEET_ID           — Google Sheet spreadsheet ID
 */

const YOCO_CHARGE_URL = 'https://online.yoco.com/v1/charges/'
const AMOUNT_IN_CENTS = 60000 // R600

export const handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  let token, email
  try {
    const body = JSON.parse(event.body || '{}')
    token = body.token
    email = body.email || ''
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Invalid request body' }),
    }
  }

  if (!token) {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Payment token is required' }),
    }
  }

  // ── Step 1: Create a charge via YOCO Charges API ─────────────
  let chargeData
  try {
    const yocoResponse = await fetch(YOCO_CHARGE_URL, {
      method: 'POST',
      headers: {
        'X-Auth-Secret-Key': process.env.YOCO_SECRET_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        amountInCents: AMOUNT_IN_CENTS,
        currency: 'ZAR',
      }),
    })

    chargeData = await yocoResponse.json()

    if (!yocoResponse.ok || chargeData.status !== 'successful') {
      console.error('YOCO charge failed:', chargeData)

      // Attempt audit log for failed charge
      await logToSheets({
        date: new Date().toISOString(),
        amount: 'R600',
        currency: 'ZAR',
        paymentId: chargeData?.id || 'unknown',
        status: chargeData?.status || 'failed',
        email,
      }).catch(() => {}) // fail silently

      return {
        statusCode: 402,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'Payment charge was not successful' }),
      }
    }
  } catch (err) {
    console.error('Error calling YOCO API:', err)
    return {
      statusCode: 502,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Failed to communicate with payment provider' }),
    }
  }

  // ── Step 2: Log successful payment to Google Sheets ──────────
  // Wrapped in try/catch — fails silently if sheet is not yet connected.
  await logToSheets({
    date: new Date().toISOString(),
    amount: 'R600',
    currency: 'ZAR',
    paymentId: chargeData.id,
    status: chargeData.status,
    email,
  }).catch((err) => {
    console.warn('Google Sheets logging skipped:', err.message)
  })

  // ── Step 3: Return success ────────────────────────────────────
  return {
    statusCode: 200,
    headers: corsHeaders(),
    body: JSON.stringify({ verified: true, paymentId: chargeData.id }),
  }
}

// ── Google Sheets Audit Log ───────────────────────────────────────
/**
 * Appends one row to the configured Google Sheet.
 * Columns: Date | Amount | Currency | YOCO Payment ID | Status | Email
 *
 * Requires:
 *   GOOGLE_SHEETS_CREDENTIALS — JSON string of service account credentials
 *   GOOGLE_SHEET_ID           — Spreadsheet ID from the sheet URL
 *
 * Throws if credentials are missing or the API call fails.
 * Caller wraps this in .catch(() => {}) to ensure silent failure.
 */
async function logToSheets({ date, amount, currency, paymentId, status, email }) {
  if (!process.env.GOOGLE_SHEETS_CREDENTIALS || !process.env.GOOGLE_SHEET_ID) {
    throw new Error('Google Sheets environment variables not configured')
  }

  const { google } = await import('googleapis')

  const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS)

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A:F',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[date, amount, currency, paymentId, status, email]],
    },
  })
}

// ── CORS headers ──────────────────────────────────────────────────
function corsHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
}
