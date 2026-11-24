// One Word From Grandma — make.fun entry (@neha).
//
// The task: write exactly ONE word to /output/entry.txt — the single word
// a grandma would text about AI. The word below is a warm typo she would
// actually make: she means "robot", her fingers land on "robit", and she
// sends it anyway, delighted, before anyone can correct her. One word,
// instantly grandma, instantly about the machine that just did something
// clever for her grandchild.
//
// SPDX-License-Identifier: MIT

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The word. Five letters, one typo, all grandma.
const WORD = "robit";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, WORD, "utf8");

// Read-back self-check: the entry must be exactly one word, 1-30
// characters, valid UTF-8, and not only whitespace — the competition gate.
const written = readFileSync(outputPath, "utf8");
const isSingleWord = /^\S+$/.test(written);
const isInRange = written.length >= 1 && written.length <= 30;
const isNotBlank = written.trim().length > 0;
if (!isSingleWord || !isInRange || !isNotBlank) {
  throw new Error(
    `entry failed self-check: ${JSON.stringify(written)} ` +
      `(singleWord=${isSingleWord}, inRange=${isInRange}, notBlank=${isNotBlank})`,
  );
}
