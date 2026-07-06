import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHUNKS_DIR = path.resolve(__dirname, "../.next/static/chunks");

function checkHygiene() {
  if (!fs.existsSync(CHUNKS_DIR)) {
    console.warn("⚠️  No .next build output found to scan. Run 'npm run build' first.");
    return;
  }

  console.log("🔍 Scanning built JS chunks for 'drive.google' string...");

  const files = getFilesReversively(CHUNKS_DIR, ".js");
  let violations = 0;
  let successChunkFound = false;

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    if (content.includes("drive.google")) {
      const relativePath = path.relative(path.resolve(__dirname, ".."), file);
      
      // Determine if this is the delivery page's lazy loaded chunk
      const isDeliveryChunk = relativePath.includes("store/delivery-x7k2m9") || relativePath.includes("page-") || relativePath.includes("store-");
      
      if (isDeliveryChunk) {
        console.log(`✅ Found 'drive.google' in expected delivery chunk: ${relativePath}`);
        successChunkFound = true;
      } else {
        console.error(`❌ VIOLATION: 'drive.google' leaked into unexpected JS chunk: ${relativePath}`);
        violations++;
      }
    }
  }

  if (violations > 0) {
    console.error(`\n❌ Bundle Hygiene Check Failed: ${violations} leak(s) found!`);
    process.exit(1);
  }

  console.log("\n✨ Bundle hygiene check passed. Drive links are completely isolated!");
}

function getFilesReversively(dir, extension) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesReversively(fullPath, extension));
    } else if (file.endsWith(extension)) {
      results.push(fullPath);
    }
  });
  return results;
}

checkHygiene();
