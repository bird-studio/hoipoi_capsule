import * as deno from "./deno.ts";
import * as error from "../util/error.ts";

type IssuesStruct = Array<{ body: string; number: number; title: string }>;
type FetchIssues = () =>
  | Promise<
    {
      number: number;
      title: string;
      body: string;
    }[]
  >
  | never;

export const fetchIssues: FetchIssues = () =>
  deno.run({
    cmd: ["gh", "issue", "list", "--assignee=@me", "--json=number,title"],
  })
    .then<IssuesStruct>((v) => {
      if (typeof v !== "string") {
        error.throwError("It was not a STRING type.", v);
      }
      return JSON.parse(v);
    }).catch(error.throwError);
