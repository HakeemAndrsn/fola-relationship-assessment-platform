#!/usr/bin/env node
const { google } = require("googleapis");
const fs = require("fs");

const creds = JSON.parse(
  fs.readFileSync(
    "/Users/fola/.nanobot/workspace/credentials/google-service-account.json",
    "utf-8"
  )
);

async function main() {
  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
  const drive = google.drive({ version: "v3", auth });

  const folderId = "1zKWuHYCG_ffGIdETBejuo_QoTOY1AQLN";

  const list = await drive.files.list({
    q: "'" + folderId + "' in parents and trashed = false",
    fields: "files(id, name, mimeType)",
  });

  for (const file of list.data.files) {
    console.log(file.name + " [" + file.mimeType + "] (" + file.id + ")");
    if (file.mimeType === "application/vnd.google-apps.folder") {
      const sub = await drive.files.list({
        q: "'" + file.id + "' in parents and trashed = false",
        fields: "files(id, name, mimeType)",
      });
      for (const s of sub.data.files) {
        console.log("  -> " + s.name + " [" + s.mimeType + "] (" + s.id + ")");
      }
    }
  }
}
main().catch(console.error);
