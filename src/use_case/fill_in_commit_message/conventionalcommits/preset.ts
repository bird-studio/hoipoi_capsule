import type * as type from "../type.ts";
import * as prompt from "../../../user_interface/prompt.ts";
import * as baseUtil from "../util.ts";

const typeQ = () =>
  prompt.Select.prompt({
    message: "Select type.",
    search: true,
    options: [
      {
        name:
          "Build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
        value: "Build",
      },
      {
        name:
          "CI: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)",
        value: "CI",
      },
      { name: "Docs: Documentation only changes", value: "Docs" },
      { name: "Feat: A new feature", value: "Feat" },
      { name: "Fix: A bug fix", value: "Fix:" },
      { name: "Perf: A code change that improves performance", value: "Perf" },
      {
        name:
          "Refactor: A code change that neither fixes a bug nor adds a feature",
        value: "Refactor",
      },
      {
        name: "Test: Adding missing tests or correcting existing tests",
        value: "Test",
      },
    ],
  });

const scopeQ = () =>
  prompt.Select.prompt({
    message: "Select scope.",
    search: true,
    options: [
      baseUtil.skip,
      baseUtil.separate,
      {
        name: "FrontEnd",
        value: "FrontEnd",
      },
      {
        name: "BFF",
        value: "BFF",
      },
      {
        name: "BackEnd",
        value: "BackEnd",
      },
      {
        name: "DesignSystem",
        value: "DesignSystem",
      },
    ],
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

const bodyQ = () =>
  prompt.Input.prompt({
    message: "Enter body.",
  });

const breakingChangeQ = () =>
  prompt.Input.prompt({
    message: "Enter body.",
  });

export const qMap = {
  type: typeQ,
  scope: scopeQ,
  summary: summaryQ,
  body: bodyQ,
  breakingChange: breakingChangeQ,
} as const;

const fixScope: type.FixCommitMessage = (p) => {
  if (p.answerMap["scope"] !== baseUtil.skip.value) {
    return p.commitMessage;
  }
  return p.commitMessage.replace(`(${baseUtil.skip.value})`, "");
};

const fixBody: type.FixCommitMessage = (p) => {
  if (p.answerMap["body"]) {
    return p.commitMessage;
  }
  return p.commitMessage.replace(/\r?\n{3}/, "\n");
};

const fixBreakingChange: type.FixCommitMessage = (p) => {
  if (p.answerMap["breakingChange"]) {
    return p.commitMessage;
  }
  return p.commitMessage.replace("BREAKING CHANGE: ", "").replace(/\r?\n$/, "");
};

export const fixCommitMessageMap = {
  scope: fixScope,
  body: fixBody,
  breakingChange: fixBreakingChange,
} as const;
