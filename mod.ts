import * as git from "~/src/external_interface/git.ts";
import * as gitHub from "~/src/external_interface/gitHub.ts";
import * as gitmoji from "~/src/external_interface/gitmoji.ts";
import * as prompt from "~/src/user_interface/prompt.ts";
import * as fillInCommitMessage from "~/src/use_case/fill_in_commit_message/mod.ts";
import * as conventionalcommits from "~/src/use_case/fill_in_commit_message/conventionalcommits/mod.ts";
import * as gitmojiStyle from "~/src/use_case/fill_in_commit_message/gitmoji_style/mod.ts";

export const externalInterface = {
  git,
  gitHub,
  gitmoji,
} as const;

export const userInterface = {
  prompt,
} as const;

export const useCase = {
  fillInCommitMessage,
} as const;

export const preset = {
  fillInCommitMessage: {
    conventionalcommits,
    gitmojiStyle,
  },
} as const;
