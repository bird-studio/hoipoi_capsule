// deno run --allow-net --allow-write --allow-run --allow-read demo/fill_in_commit_message/conventionalcommits_style.ts
import * as hoipoiCapsule from "../../mod.ts";

const commitMessageTemplate = `{{type}}({{scope}}): {{summary}}

{{body}}

BREAKING CHANGE: {{breakingChange}}`;

hoipoiCapsule.useCase.fillInCommitMessage.run({
  commitMessageTemplate,
  questionList: [
    {
      target: "type",
      q: hoipoiCapsule.preset.fillInCommitMessage.conventionalcommits.qMap.type,
    },
    {
      target: "scope",
      q: hoipoiCapsule.preset.fillInCommitMessage.conventionalcommits.qMap
        .scope,
      fixCommitMessage:
        hoipoiCapsule.preset.fillInCommitMessage.conventionalcommits
          .fixCommitMessageMap
          .scope,
    },
    {
      target: "summary",
      q: hoipoiCapsule.preset.fillInCommitMessage.conventionalcommits.qMap
        .summary,
    },
    {
      target: "body",
      q: hoipoiCapsule.preset.fillInCommitMessage.conventionalcommits.qMap.body,
      fixCommitMessage:
        hoipoiCapsule.preset.fillInCommitMessage.conventionalcommits
          .fixCommitMessageMap.body,
    },
    {
      target: "breakingChange",
      q: hoipoiCapsule.preset.fillInCommitMessage.conventionalcommits.qMap
        .breakingChange,
      fixCommitMessage:
        hoipoiCapsule.preset.fillInCommitMessage.conventionalcommits
          .fixCommitMessageMap
          .breakingChange,
    },
  ],
});
