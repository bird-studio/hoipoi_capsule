//  deno run --allow-net --allow-write --allow-run demo/fill_in_commit_message/conventionalcommits_style.ts

import { useCase } from "~/mod.ts";
import * as conventionalcommits from "~/src/use_case/fill_in_commit_message/conventionalcommits/mod.ts";

const commitMessageTemplate = `{{type}}({{scope}}): {{summary}}

{{body}}

BREAKING CHANGE: {{breakingChange}}`;

useCase.fillInCommitMessage.run({
  commitMessageTemplate,
  questionList: [
    { target: "type", q: conventionalcommits.qMap.type },
    {
      target: "scope",
      q: conventionalcommits.qMap.scope,
      fixCommitMessage: conventionalcommits.fixCommitMessageMap.scope,
    },
    { target: "summary", q: conventionalcommits.qMap.summary },
    {
      target: "body",
      q: conventionalcommits.qMap.body,
      fixCommitMessage: conventionalcommits.fixCommitMessageMap.body,
    },
    {
      target: "breakingChange",
      q: conventionalcommits.qMap.breakingChange,
      fixCommitMessage: conventionalcommits.fixCommitMessageMap.breakingChange,
    },
  ],
});
