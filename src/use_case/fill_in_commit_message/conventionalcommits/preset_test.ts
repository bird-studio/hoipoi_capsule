import { assertEquals } from "@std/assert";
import { fixCommitMessageMap } from "./preset.ts";
import { skip } from "../util.ts";

Deno.test("scope: removes the skipped scope parentheses", () => {
  const out = fixCommitMessageMap.scope({
    answerMap: { scope: skip.value },
    commitMessage: `Fix(${skip.value}): summary`,
  });
  assertEquals(out, "Fix: summary");
});

Deno.test("scope: keeps the message when a scope is chosen", () => {
  const out = fixCommitMessageMap.scope({
    answerMap: { scope: "FrontEnd" },
    commitMessage: "Fix(FrontEnd): summary",
  });
  assertEquals(out, "Fix(FrontEnd): summary");
});

Deno.test("body: collapses the gap left by an empty body", () => {
  const out = fixCommitMessageMap.body({
    answerMap: { body: "" },
    commitMessage: "Fix: summary\n\n\nBREAKING CHANGE: x",
  });
  assertEquals(out, "Fix: summary\nBREAKING CHANGE: x");
});

Deno.test("breakingChange: drops the prefix and trailing newline when empty", () => {
  const out = fixCommitMessageMap.breakingChange({
    answerMap: { breakingChange: "" },
    commitMessage: "Fix: summary\nBREAKING CHANGE: \n",
  });
  assertEquals(out, "Fix: summary\n");
});
