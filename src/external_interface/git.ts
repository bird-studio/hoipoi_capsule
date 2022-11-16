import { path } from "../../deps.ts";
import * as deno from "./deno.ts";
import * as error from "../util/error.ts";

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
