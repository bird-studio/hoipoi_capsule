//  deno run --allow-net --allow-write --allow-run demo/fill_in_commit_message/gitmoji_style.ts

import { preset, useCase } from "../../mod.ts";

const commitMessageTemplate = `{{gitmoji}}: {{summary}} Close #{{issue}}

{{body}}`;

useCase.fillInCommitMessage.run({
  commitMessageTemplate,
  questionList: [
    {
      target: "gitmoji",
      q: preset.fillInCommitMessage.gitmojiStyle.qMap.gitmoji,
    },
    {
      target: "summary",
      q: preset.fillInCommitMessage.gitmojiStyle.qMap.summary,
    },
    {
      target: "issue",
      q: preset.fillInCommitMessage.gitmojiStyle.qMap.issue,
      fixCommitMessage:
        preset.fillInCommitMessage.gitmojiStyle.fixCommitMessageMap.issue,
    },
    {
      target: "body",
      q: preset.fillInCommitMessage.gitmojiStyle.qMap.bodyQ,
      fixCommitMessage:
        preset.fillInCommitMessage.gitmojiStyle.fixCommitMessageMap.body,
    },
  ],
});
