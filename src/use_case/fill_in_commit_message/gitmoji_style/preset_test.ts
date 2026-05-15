import { assertEquals } from "@std/assert";
import { fixCommitMessageMap } from "./preset.ts";
import { skip } from "../util.ts";

Deno.test("issue: removes the skipped issue ref with no trailing space", () => {
  const out = fixCommitMessageMap.issue({
    answerMap: { issue: skip.value },
    commitMessage: `🎨\`xxx\`(scope): summary Close #${skip.value}\n\nbody`,
  });
  assertEquals(out, "🎨`xxx`(scope): summary\n\nbody");
});

Deno.test("issue: keeps the message when an issue is chosen", () => {
  const out = fixCommitMessageMap.issue({
    answerMap: { issue: "42" },
    commitMessage: "🎨`xxx`(scope): summary Close #42",
  });
  assertEquals(out, "🎨`xxx`(scope): summary Close #42");
});

Deno.test("body: collapses the gap left by an empty body", () => {
  const out = fixCommitMessageMap.body({
    answerMap: { body: "" },
    commitMessage: "🎨`xxx`(scope): summary\n\nbody-placeholder-removed",
  });
  assertEquals(out, "🎨`xxx`(scope): summary\nbody-placeholder-removed");
});
