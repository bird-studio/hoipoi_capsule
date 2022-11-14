import * as path from "@/path/mod.ts";
import * as deno from "./deno.ts";
import * as error from "~/src/util/error.ts";

await Deno.writeTextFile("./a.txt", "Hello World!");

const commitEditMsgPath = path.join(
  ".git",
  "COMMIT_EDITMSG",
);

type SetCommitMessage = (p: { message: string }) => Promise<void>;
export const setCommitMessage: SetCommitMessage = (p) =>
  deno.writeTextFile({ path: commitEditMsgPath, data: p.message })
    .catch(
      error.throwError,
    );
