// deno run --allow-net --allow-write --allow-run --allow-read demo/fill_in_commit_message/gitmoji_style.ts

import * as hoipoiCapsule from "../../mod.ts";

const o = await hoipoiCapsule.preset.fillInCommitMessage.gitmojiStyle
  .initialize();

const line = {
  name: hoipoiCapsule.userInterface.prompt.colors.yellow("---------"),
  value: "",
  disabled: true,
};

const gitmojiQ = () =>
  hoipoiCapsule.userInterface.prompt.Select.prompt({
    message: "Select gitmoji.",
    search: true,
    options: o.gitmojis,
  });

const scopeQ = () =>
  hoipoiCapsule.userInterface.prompt.Select.prompt({
    message: "Select scope.",
    search: true,
    options: [
      { name: "_", value: "_" },

      line,
      { name: "conventionalcommits", value: "conventionalcommits" },
      { name: "gitmoji_style", value: "gitmoji_style" },
    ],
  });

const issueQ = () =>
  hoipoiCapsule.userInterface.prompt.Select.prompt({
    message: "Select issue.",
    search: true,
    options: o.issues,
  });

const commitMessageTemplate =
  `{{gitmoji}}({{scope}}): {{summary}} Close #{{issue}}

{{body}}`;

hoipoiCapsule.useCase.fillInCommitMessage.run({
  commitMessageTemplate,
  questionList: [
    {
      target: "gitmoji",
      q: gitmojiQ,
    },
    {
      target: "scope",
      q: scopeQ,
    },
    {
      target: "summary",
      q: hoipoiCapsule.preset.fillInCommitMessage.gitmojiStyle.qMap.summary,
    },
    {
      target: "issue",
      q: issueQ,
      fixCommitMessage: hoipoiCapsule.preset.fillInCommitMessage.gitmojiStyle
        .fixCommitMessageMap.issue,
    },
    {
      target: "body",
      q: hoipoiCapsule.preset.fillInCommitMessage.gitmojiStyle.qMap.bodyQ,
      fixCommitMessage: hoipoiCapsule.preset.fillInCommitMessage.gitmojiStyle
        .fixCommitMessageMap.body,
    },
  ],
});
