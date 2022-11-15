import * as prompt from "~/src/user_interface/prompt.ts";
import type * as type from "../type.ts";
import { initialize, skip } from "./util.ts";

const options = await initialize();

export const commitMessageTemplate = `{{gitmoji}}: {{subject}} {{issue}}

{{body}}`;

const gitmoji = () =>
  prompt.Select.prompt({
    message: "Select gitmoji.",
    search: true,
    options: options.gitmojis,
  });

const subject = () =>
  prompt.Input.prompt({
    message: "Enter subject.",
    validate: (p) => {
      const minLen = 3;
      if (p.length < minLen) {
        return `Please enter at least ${minLen} characters.`;
      }
      return true;
    },
  });

const issue = () =>
  prompt.Select.prompt({
    message: "Select issue.",
    search: true,
    options: options.issues,
  });

const body = () =>
  prompt.Input.prompt({
    message: "Enter body",
  });

export const questionList: type.QuestionList = [
  {
    target: "gitmoji",
    q: gitmoji,
  },
  {
    target: "subject",
    q: subject,
  },
  {
    target: "issue",
    q: issue,
    fixCommitMessage: (p) => {
      if (p.answerMap["issue"] !== skip.value) {
        return p.commitMessage;
      }
      return p.commitMessage.replace(skip.value, "");
    },
  },
  {
    target: "body",
    q: body,
    fixCommitMessage: (p) => {
      if (p.answerMap["body"]) {
        return p.commitMessage;
      }
      return p.commitMessage.replace(/\r?\n{2,}/, "\n").trim();
    },
  },
];
