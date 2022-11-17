//  deno run --allow-net --allow-write --allow-run demo/fill_in_commit_message/gitmoji_style.ts

import * as hoipoiCapsule from "../../mod.ts";

const commitMessageTemplate = `{{gitmoji}}: {{summary}} Close #{{issue}}

{{body}}`;

hoipoiCapsule.useCase.fillInCommitMessage.run({
  commitMessageTemplate,
  questionList: [
    {
      target: "gitmoji",
      q: hoipoiCapsule.preset.fillInCommitMessage.gitmojiStyle.qMap.gitmoji,
    },
    {
      target: "summary",
      q: hoipoiCapsule.preset.fillInCommitMessage.gitmojiStyle.qMap.summary,
    },
    {
      target: "issue",
      q: hoipoiCapsule.preset.fillInCommitMessage.gitmojiStyle.qMap.issue,
      fixCommitMessage:
        hoipoiCapsule.preset.fillInCommitMessage.gitmojiStyle
          .fixCommitMessageMap.issue,
    },
    {
      target: "body",
      q: hoipoiCapsule.preset.fillInCommitMessage.gitmojiStyle.qMap.bodyQ,
      fixCommitMessage:
        hoipoiCapsule.preset.fillInCommitMessage.gitmojiStyle
          .fixCommitMessageMap.body,
    },
  ],
});
