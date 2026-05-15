import * as deno from "./deno.ts";
import * as error from "../util/error.ts";

type IssuesStruct = Array<{ number: number; title: string }>;
type FetchIssues = () => Promise<IssuesStruct>;

export const fetchIssues: FetchIssues = () =>
  deno.run({
    cmd: "gh",
    args: [
      "issue",
      "list",
      "--assignee=@me",
      "--json=number,title",
    ],
  })
    .then<IssuesStruct>((v) => JSON.parse(v))
    .catch(error.throwError);
