import { useCase } from "~/mod.ts";
import * as gitmojiStyle from "~/src/use_case/fill_in_commit_message/gitmoji_style/mod.ts";

//  deno run --allow-net --allow-write --allow-run demo/fill_in_commit_message/gitmoji_style.ts
useCase.fillInCommitMessage.run({
  qList: gitmojiStyle.qList,
  commitMessageTemplate: gitmojiStyle.commitMessageTemplate,
});
