import * as prompt from "../../../user_interface/prompt.ts";
import type * as type from "../type.ts";
import * as util from "./util.ts";
import * as baseUtil from "../util.ts";

const options = await util.initialize();

const gitmojiQ = () =>
  prompt.Select.prompt({
    message: "Select gitmoji.",
    search: true,
    options: options.gitmojis,
  });

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

const issueQ = () =>
  prompt.Select.prompt({
    message: "Select issue.",
    search: true,
    options: options.issues,
  });

const bodyQ = () =>
  prompt.Input.prompt({
    message: "Enter body",
  });

export const qMap = {
  gitmoji: gitmojiQ,
  summary: summaryQ,
  issue: issueQ,
  bodyQ: bodyQ,
} as const;

const fixIssue: type.FixCommitMessage = (p) => {
  if (p.answerMap["issue"] !== baseUtil.skip.value) {
    return p.commitMessage;
  }
  return p.commitMessage.replace(baseUtil.skip.value, "");
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
