import { assertEquals } from "@std/assert";
import { applyAnswer, fillInCommitMessage } from "./fill_in_commit_message.ts";

Deno.test("applyAnswer replaces every occurrence of the placeholder", () => {
  assertEquals(
    applyAnswer({
      commitMessage: "{{x}} and {{x}}",
      target: "x",
      answer: "Y",
      answerMap: { x: "Y" },
    }),
    "Y and Y",
  );
});

Deno.test("applyAnswer inserts `$&` literally (no regex substitution)", () => {
  assertEquals(
    applyAnswer({
      commitMessage: "price: {{summary}}",
      target: "summary",
      answer: "$5 for $& and $1",
      answerMap: { summary: "$5 for $& and $1" },
    }),
    "price: $5 for $& and $1",
  );
});

Deno.test("applyAnswer passes the accumulated answerMap to fixCommitMessage", () => {
  const out = applyAnswer({
    commitMessage: "{{scope}}: msg",
    target: "scope",
    answer: "__HOIPOI_SKIP__",
    answerMap: { type: "Fix", scope: "__HOIPOI_SKIP__" },
    fixCommitMessage: (p) => {
      assertEquals(p.answerMap, { type: "Fix", scope: "__HOIPOI_SKIP__" });
      return p.commitMessage.replace("__HOIPOI_SKIP__: ", "");
    },
  });
  assertEquals(out, "msg");
});

const withSilentConsole = async (fn: () => Promise<void>) => {
  const { clear, log } = console;
  console.clear = () => {};
  console.log = () => {};
  try {
    await fn();
  } finally {
    console.clear = clear;
    console.log = log;
  }
};

Deno.test("fillInCommitMessage folds the question list, threading answerMap", async () => {
  await withSilentConsole(async () => {
    const result = await fillInCommitMessage({
      answerMap: {},
      commitMessage: "{{type}}({{scope}}): {{summary}}",
      questionList: [
        { target: "type", q: () => Promise.resolve("Fix") },
        {
          target: "scope",
          q: () => Promise.resolve("__HOIPOI_SKIP__"),
          fixCommitMessage: (p) =>
            p.answerMap["scope"] === "__HOIPOI_SKIP__"
              ? p.commitMessage.replace("(__HOIPOI_SKIP__)", "")
              : p.commitMessage,
        },
        { target: "summary", q: () => Promise.resolve("do thing") },
      ],
    });
    assertEquals(result, "Fix: do thing");
  });
});

Deno.test("fillInCommitMessage returns the template unchanged for an empty list", async () => {
  await withSilentConsole(async () => {
    const result = await fillInCommitMessage({
      answerMap: {},
      commitMessage: "untouched {{x}}",
      questionList: [],
    });
    assertEquals(result, "untouched {{x}}");
  });
});
