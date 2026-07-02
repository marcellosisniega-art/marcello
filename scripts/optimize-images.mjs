import sharp from "sharp";
import { readdir, writeFile, rename } from "node:fs/promises";
import path from "node:path";

const dir = path.join(process.cwd(), "public/images/speaker");
const files = (await readdir(dir)).filter((f) => /\.jpe?g$/i.test(f));

for (const file of files) {
  const filePath = path.join(dir, file);
  const tmpPath = filePath + ".optimized.jpg";
  const buffer = await sharp(filePath)
    .rotate()
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await writeFile(tmpPath, buffer);
  await rename(tmpPath, filePath);
  console.log(`optimized ${file}`);
}
