import { Config } from "../type.ts";

const configFile = `${Deno.cwd()}/hoipoi_capsule.config.ts`;

type FindConfig = () => Promise<
  null | {
    config: Config;
  }
>;
export const findConfig: FindConfig = () =>
  import(configFile).then((v) => {
    console.log({ configFile });
    console.log({ v });
    return v;
  }).catch((e) => {
    console.log({ configFile });
    console.log({ e });
  });
