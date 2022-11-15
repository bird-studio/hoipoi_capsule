//  deno run --allow-net --allow-write --allow-run demo/fill_in_commit_message/conventionalcommits_style.ts

import { preset, useCase } from "~/mod.ts";

const commitMessageTemplate = `{{type}}({{scope}}): {{summary}}

{{body}}

BREAKING CHANGE: {{breakingChange}}`;

useCase.fillInCommitMessage.run({
  commitMessageTemplate,
  questionList: [
    {
      target: "type",
      q: preset.fillInCommitMessage.conventionalcommits.qMap.type,
    },
    {
      target: "scope",
      q: preset.fillInCommitMessage.conventionalcommits.qMap.scope,
      fixCommitMessage:
        preset.fillInCommitMessage.conventionalcommits.fixCommitMessageMap
          .scope,
    },
    {
      target: "summary",
      q: preset.fillInCommitMessage.conventionalcommits.qMap.summary,
    },
    {
      target: "body",
      q: preset.fillInCommitMessage.conventionalcommits.qMap.body,
      fixCommitMessage:
        preset.fillInCommitMessage.conventionalcommits.fixCommitMessageMap.body,
    },
    {
      target: "breakingChange",
      q: preset.fillInCommitMessage.conventionalcommits.qMap.breakingChange,
      fixCommitMessage:
        preset.fillInCommitMessage.conventionalcommits.fixCommitMessageMap
          .breakingChange,
    },
  ],
});
