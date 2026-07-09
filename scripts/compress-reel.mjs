import ffmpegPath from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";

const input = "C:/Users/marce/Downloads/INNOVACIÓN INCÓMODA V2.mp4";
const output = "public/marcello-reel.mp4";

console.log("Encoding… (this can take a couple of minutes)");
execFileSync(
  ffmpegPath,
  [
    "-y",
    "-i", input,
    "-vf", "scale=-2:1080",
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "25",
    "-profile:v", "high",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "128k",
    "-movflags", "+faststart",
    output,
  ],
  { stdio: ["ignore", "inherit", "inherit"] },
);

const mb = (statSync(output).size / (1024 * 1024)).toFixed(1);
console.log(`\nDone → ${output} (${mb} MB)`);
