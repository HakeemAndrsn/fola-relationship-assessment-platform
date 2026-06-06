#!/usr/bin/env node
/**
 * Google Drive CLI — list, search, read files from Drive.
 *
 * Usage:
 *   node scripts/google-drive.js list [folderId]
 *   node scripts/google-drive.js search <query>
 *   node scripts/google-drive.js read <fileId>
 *   node scripts/google-drive.js download <fileId> <destPath>
 */

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CREDENTIALS_PATH = path.resolve(__dirname, '../../.nanobot/workspace/credentials/google-service-account.json');

async function getDrive() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  return google.drive({ version: 'v3', auth });
}

async function listFiles(folderId) {
  const drive = await getDrive();
  const query = folderId
    ? `'${folderId}' in parents and trashed=false`
    : 'trashed=false';

  const res = await drive.files.list({
    q: query,
    pageSize: 30,
    fields: 'files(id, name, mimeType, size, modifiedTime, webViewLink)',
    orderBy: 'modifiedTime desc',
  });

  const files = res.data.files || [];
  if (files.length === 0) {
    console.log('No files found. Make sure you\'ve shared files/folders with the service account.');
    return;
  }

  console.log(`\n📁 Files (${files.length}):\n`);
  files.forEach(f => {
    const isFolder = f.mimeType === 'application/vnd.google-apps.folder';
    const icon = isFolder ? '📁' : '📄';
    const size = f.size ? ` (${(parseInt(f.size) / 1024).toFixed(1)} KB)` : '';
    console.log(`  ${icon} ${f.name}${size}`);
    console.log(`     ID: ${f.id}`);
    console.log(`     Type: ${f.mimeType}`);
    console.log(`     Modified: ${f.modifiedTime}`);
    console.log();
  });
}

async function searchFiles(query) {
  const drive = await getDrive();
  const res = await drive.files.list({
    q: `name contains '${query.replace(/'/g, "\\'")}' and trashed=false`,
    pageSize: 10,
    fields: 'files(id, name, mimeType, size, modifiedTime, webViewLink)',
    orderBy: 'modifiedTime desc',
  });

  const files = res.data.files || [];
  if (files.length === 0) {
    console.log(`No files matching "${query}"`);
    return;
  }

  console.log(`\n🔍 Results for "${query}":\n`);
  files.forEach(f => {
    console.log(`  📄 ${f.name}`);
    console.log(`     ID: ${f.id}`);
    console.log(`     Modified: ${f.modifiedTime}`);
    console.log();
  });
}

async function readFile(fileId) {
  const drive = await getDrive();

  const meta = await drive.files.get({
    fileId,
    fields: 'id, name, mimeType',
  });

  const mimeType = meta.data.mimeType;
  console.log(`\n📖 Reading: ${meta.data.name} (${mimeType})\n`);

  let content;
  if (mimeType === 'application/vnd.google-apps.document') {
    const res = await drive.files.export(
      { fileId, mimeType: 'text/plain' },
      { responseType: 'text' }
    );
    content = res.data;
  } else if (mimeType === 'application/vnd.google-apps.spreadsheet') {
    const res = await drive.files.export(
      { fileId, mimeType: 'text/csv' },
      { responseType: 'text' }
    );
    content = res.data;
  } else {
    const res = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'text' }
    );
    content = res.data;
  }

  // Show first 50 lines
  const lines = content.split('\n');
  console.log(lines.slice(0, 50).join('\n'));
  if (lines.length > 50) {
    console.log(`\n... (${lines.length - 50} more lines)`);
  }
}

async function downloadFile(fileId, destPath) {
  const drive = await getDrive();
  const dest = fs.createWriteStream(destPath);

  const res = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  );

  return new Promise((resolve, reject) => {
    res.data
      .pipe(dest)
      .on('finish', () => {
        console.log(`✅ Downloaded to ${destPath}`);
        resolve();
      })
      .on('error', reject);
  });
}

// --- CLI ---
const [,, command, ...args] = process.argv;

(async () => {
  try {
    switch (command) {
      case 'list':
        await listFiles(args[0]);
        break;
      case 'search':
        await searchFiles(args.join(' '));
        break;
      case 'read':
        if (!args[0]) { console.log('Usage: node scripts/google-drive.js read <fileId>'); process.exit(1); }
        await readFile(args[0]);
        break;
      case 'download':
        if (args.length < 2) { console.log('Usage: node scripts/google-drive.js download <fileId> <destPath>'); process.exit(1); }
        await downloadFile(args[0], args[1]);
        break;
      default:
        console.log(`
Google Drive CLI

Commands:
  node scripts/google-drive.js list [folderId]    — List files
  node scripts/google-drive.js search <query>      — Search files by name
  node scripts/google-drive.js read <fileId>       — Read file content
  node scripts/google-drive.js download <fileId> <dest>  — Download file
`);
    }
  } catch (err) {
    if (err.message?.includes('Drive API')) {
      console.error('❌ Drive API not enabled. Enable it at:');
      console.error('   https://console.developers.google.com/apis/api/drive.googleapis.com/overview?project=978867596518');
    } else if (err.message?.includes('Not Found') || err.code === 404) {
      console.error('❌ File not found. Make sure you\'ve shared it with:');
      console.error('   neopopakeys@gen-lang-client-0027798479.iam.gserviceaccount.com');
    } else {
      console.error('❌ Error:', err.message);
    }
    process.exit(1);
  }
})();
