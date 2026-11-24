import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "It works on my machine — which, coincidentally, is the only machine that was never going to run it.";

// Self-check gate (mirrors the competition gate): 1-200 characters,
// exactly one line, not only whitespace. Fail loudly instead of
// writing an entry the scorer would refuse.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`Entry is ${chars} characters, outside the 1-200 gate`);
}
if (ENTRY.includes("\n") || !ENTRY.trim()) {
  throw new Error("Entry must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read back and confirm the file holds exactly what we intended.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) throw new Error("Read-back mismatch");
console.log(`Wrote ${chars} characters to /output/entry.txt`);
