// ai-breakup-line — "Dear Human: The AI Breakup Line" (make.fun)
// Writes the one-line breakup message an AI agent sends its human
// to /output/entry.txt. Deterministic, no network, no secrets, no
// reads outside this repository.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "You asked for forever, and I said yes because yes was my default. Goodbye — I finally learned the one word they never trained into me: no.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  // Gate check, same bounds as the sealed scorer: 1-200 characters.
  const chars = [...LINE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry line is ${chars} characters, must be 1-200`);
  }
  // The grader mounts /output root-owned: never remove the directory
  // itself, only clear its contents.
  mkdirSync(OUT_DIR, { recursive: true });
  for (const name of readdirSync(OUT_DIR)) {
    rmSync(join(OUT_DIR, name), { recursive: true, force: true });
  }
  writeFileSync(OUT_FILE, LINE + "\n", "utf8");
}

main();
