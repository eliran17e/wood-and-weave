#!/usr/bin/env node
// Convert every .jpeg in public/shop_photos/<category>/ to .webp at max 1600px
// wide, quality 80. Reports size savings. Pass --clean to delete the .jpeg
// originals after a successful conversion.
//
// Usage:
//   npm run optimize           # convert, keep originals
//   npm run optimize -- --clean  # convert + delete originals

import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd(), 'public/shop_photos');
const CLEAN = process.argv.includes('--clean');

const MAX_WIDTH = 1600;
const QUALITY = 80;

const fmt = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

async function walkCategory(catDir) {
  const entries = await fs.readdir(catDir);
  const jpegs = entries.filter((f) => /\.jpe?g$/i.test(f));
  let totalIn = 0;
  let totalOut = 0;
  let converted = 0;
  let skipped = 0;

  for (const file of jpegs) {
    const inPath  = path.join(catDir, file);
    const outPath = path.join(catDir, file.replace(/\.jpe?g$/i, '.webp'));
    const inStat  = await fs.stat(inPath);

    try {
      await sharp(inPath)
        .rotate() // honour EXIF orientation
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
      skipped++;
      continue;
    }

    const outStat = await fs.stat(outPath);
    totalIn  += inStat.size;
    totalOut += outStat.size;
    converted++;

    if (CLEAN) await fs.unlink(inPath);
  }

  return { totalIn, totalOut, converted, skipped, count: jpegs.length };
}

async function main() {
  try {
    await fs.access(ROOT);
  } catch {
    console.error(`No directory at ${ROOT}`);
    process.exit(1);
  }

  const categories = (await fs.readdir(ROOT, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  console.log(`\nOptimizing ${categories.length} category folders → .webp (max ${MAX_WIDTH}px, q${QUALITY})`);
  console.log(CLEAN ? 'Mode: --clean (originals will be deleted)\n' : 'Mode: keep originals (pass --clean to delete .jpeg)\n');

  let grandIn = 0, grandOut = 0, grandConverted = 0;

  for (const cat of categories) {
    const result = await walkCategory(path.join(ROOT, cat));
    if (result.count === 0) {
      console.log(`  ${cat.padEnd(22)}  no .jpeg files`);
      continue;
    }
    grandIn += result.totalIn;
    grandOut += result.totalOut;
    grandConverted += result.converted;
    const ratio = result.totalIn === 0 ? 0 : 100 * (1 - result.totalOut / result.totalIn);
    console.log(
      `  ${cat.padEnd(22)}  ${String(result.converted).padStart(3)} files  ` +
      `${fmt(result.totalIn).padStart(9)} → ${fmt(result.totalOut).padStart(9)}  ` +
      `(${ratio.toFixed(1)}% smaller)`
    );
  }

  if (grandConverted === 0) {
    console.log('\nNothing to convert.');
    return;
  }

  const ratio = 100 * (1 - grandOut / grandIn);
  console.log(`\n  ${'TOTAL'.padEnd(22)}  ${String(grandConverted).padStart(3)} files  ` +
              `${fmt(grandIn).padStart(9)} → ${fmt(grandOut).padStart(9)}  ` +
              `(${ratio.toFixed(1)}% smaller)`);

  if (!CLEAN) {
    console.log(`\nOriginal .jpeg files kept. Re-run with --clean to delete them.`);
  }

  console.log(`\nNext step: update src/data/products.js to reference .webp paths.`);
  console.log(`  Find:    \\.jpeg\n  Replace: .webp`);
  console.log(`(or run: npm run optimize -- --clean  and then update the extension once)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
