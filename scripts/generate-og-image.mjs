import sharp from "sharp";
import path from "node:path";

const src = path.join(process.cwd(), "public/images/speaker/marcello-agexport-closeup.jpg");
const out = path.join(process.cwd(), "public/og-image.jpg");

await sharp(src)
  .extract({ left: 0, top: 120, width: 2400, height: 1260 })
  .resize(1200, 630)
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(out);

console.log("OG image generated at", out);
