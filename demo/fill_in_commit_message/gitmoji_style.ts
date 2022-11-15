//  deno run --allow-net --allow-write --allow-run demo/fill_in_commit_message/gitmoji_style.ts

import { useCase } from "~/mod.ts";
import * as gitmojiStyle from "~/src/use_case/fill_in_commit_message/gitmoji_style/mod.ts";

const commitMessageTemplate = `{{gitmoji}}: {{summary}} {{issue}}

{{body}}`;

useCase.fillInCommitMessage.run({
  commitMessageTemplate,
  questionList: [
    {
      target: "gitmoji",
      q: gitmojiStyle.qMap.gitmoji,
    },
    {
      target: "summary",
      q: gitmojiStyle.qMap.summary,
    },
    {
      target: "issue",
      q: gitmojiStyle.qMap.issue,
      fixCommitMessage: gitmojiStyle.fixCommitMessageMap.issue,
    },
    {
      target: "body",
      q: gitmojiStyle.qMap.bodyQ,
      fixCommitMessage: gitmojiStyle.fixCommitMessageMap.body,
    },
  ],
});
