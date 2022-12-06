import { parse } from "https://deno.land/std@0.66.0/flags/mod.ts";
import { Config } from "../type.ts";

// const configFile = "~/hoipoi_capsule.config.ts";

type FindConfig = () => Promise<
  null | {
    config: Config;
  }
>;
export const findConfig: FindConfig = () =>
  import(parse(Deno.args).a).then((v) => {
    // console.log({ configFile });
    console.log({ v });
    return v;
  }).catch((e) => {
    // console.log({ configFile });
    console.log({ e });
  });

// parse(Deno.args).a;
// console.log(parsedArgs.a);
// ❯ deno run "/Volumes/workspace/bird-studio/hoipoi_capsule/src/external_interface/findConfig.ts" --a="/Volumes/workspace/bird-studio/hoipoi_capsule/hoipoi_capsule.config.ts"
