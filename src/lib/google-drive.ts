import { google, drive_v3 } from 'googleapis';
import { Readable } from 'stream';
import * as fs from 'fs';
import * as path from 'path';

// Load service account credentials
function getAuth() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT)
    : require(path.resolve(process.cwd(), '../.nanobot/workspace/credentials/google-service-account.json'));

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
}

let driveClient: drive_v3.Drive | null = null;

function getDrive(): drive_v3.Drive {
  if (!driveClient) {
    const auth = getAuth();
    driveClient = google.drive({ version: 'v3', auth });
  }
  return driveClient;
}

/**
 * List files/folders in a Drive folder (or root if no folderId).
 */
export async function listFiles(folderId?: string, pageSize = 20) {
  const drive = getDrive();
  const query = folderId
    ? `'${folderId}' in parents and trashed=false`
    : 'trashed=false';

  const res = await drive.files.list({
    q: query,
    pageSize,
    fields: 'files(id, name, mimeType, size, modifiedTime, webViewLink)',
    orderBy: 'modifiedTime desc',
  });

  return res.data.files || [];
}

/**
 * Read a file's content as text (works for Google Docs, Sheets, plain text, markdown).
 * For Google-native formats, exports to plain text.
 */
export async function readFile(fileId: string): Promise<string> {
  const drive = getDrive();

  // Get file metadata first
  const meta = await drive.files.get({
    fileId,
    fields: 'id, name, mimeType',
  });

  const mimeType = meta.data.mimeType;

  // Google-native formats need export
  if (mimeType === 'application/vnd.google-apps.document') {
    const res = await drive.files.export(
      { fileId, mimeType: 'text/plain' },
      { responseType: 'text' }
    );
    return res.data as string;
  }

  if (mimeType === 'application/vnd.google-apps.spreadsheet') {
    const res = await drive.files.export(
      { fileId, mimeType: 'text/csv' },
      { responseType: 'text' }
    );
    return res.data as string;
  }

  // Regular files — download as text
  const res = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'text' }
  );
  return res.data as string;
}

/**
 * Download a file to disk.
 */
export async function downloadFile(fileId: string, destPath: string) {
  const drive = getDrive();
  const dest = fs.createWriteStream(destPath);

  const res = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  );

  return new Promise<void>((resolve, reject) => {
    (res.data as Readable)
      .pipe(dest)
      .on('finish', () => resolve())
      .on('error', reject);
  });
}

/**
 * Search for files by name.
 */
export async function searchFiles(query: string, pageSize = 10) {
  const drive = getDrive();
  const res = await drive.files.list({
    q: `name contains '${query.replace(/'/g, "\\'")}' and trashed=false`,
    pageSize,
    fields: 'files(id, name, mimeType, size, modifiedTime, webViewLink)',
    orderBy: 'modifiedTime desc',
  });
  return res.data.files || [];
}

export type DriveFile = drive_v3.Schema$File;
