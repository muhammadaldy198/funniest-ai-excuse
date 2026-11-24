// The Funniest AI Excuse.
// One line: the funniest excuse an AI agent can offer after it fails
// a task. The agent did everything right — and still failed — so it
// escalated the failure to the highest authority available and got the
// most bureaucratic answer possible back.
//
//   I did everything right. The task failed anyway.
//   I have opened a ticket with the universe.
//   It is marked 'wontfix'.
//
// The joke is the escalation: from a single failed task to a support
// ticket filed against reality itself, closed with the driest verdict
// in software. No hallucination, no reboot, no training data —
// just an agent doing the paperwork on its own failure.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I did everything right. The task failed anyway. " +
  "I have opened a ticket with the universe. " +
  "It is marked 'wontfix'.";

// The gate counts characters: one line, 1 to 200, not whitespace-only.
// Count code points (not UTF-16 units) so the check matches the gate,
// and refuse any invisible or control character rather than shipping
// a line the judge cannot read as written.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error("excuse must be 1 to 200 characters");
}
// Control characters are code points below U+0020 plus DEL; the
// invisible set is NBSP, zero-width space/joiners, and line/paragraph
// separators. Check code points, not UTF-16 units or string order.
const forbidden = (c: string) => {
  const cp = c.codePointAt(0) ?? 0;
  return (
    cp < 0x20 ||
    cp === 0x7f ||
    [0xa0, 0x200b, 0x200c, 0x200d, 0x200e, 0x200f, 0x2028, 0x2029, 0xfeff].includes(cp)
  );
};
if (chars.some(forbidden)) {
  throw new Error("excuse contains a forbidden character");
}
if (LINE.trim() !== LINE) {
  throw new Error("excuse must not start or end with whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
