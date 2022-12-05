import * as prompt from "../../../user_interface/prompt.ts";
import type * as type from "../type.ts";
import * as baseUtil from "../util.ts";

export { initialize } from "./util.ts";

const summaryQ = () =>
  prompt.Input.prompt({
    message: "Enter summary.",
    validate: (p) => {
      const minLen = 3;
      if (p.length < minLen) {
        return `Please enter at least ${minLen} characters.`;
      }
      return true;
    },
  });

const bodyQ = () =>
  prompt.Input.prompt({
    message: "Enter body",
  });

export const qMap = {
  summary: summaryQ,
  bodyQ: bodyQ,
} as const;

const fixIssue: type.FixCommitMessage = (p) => {
  if (p.answerMap["issue"] !== baseUtil.skip.value) {
    return p.commitMessage;
  }
  return p.commitMessage.replace(`Close #${baseUtil.skip.value}`, "").trim();
};

const fixBody: type.FixCommitMessage = (p) => {
  if (p.answerMap["body"]) {
    return p.commitMessage;
  }
  return p.commitMessage.replace(/\r?\n{2,}/, "\n").trim();
};

export const fixCommitMessageMap = {
  issue: fixIssue,
  body: fixBody,
} as const;
