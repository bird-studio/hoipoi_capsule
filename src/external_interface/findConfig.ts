import { Config } from "../type.ts";

const configFile = `${Deno.cwd()}/hoipoi_capsule.config.ts`;

console.log({ configFile });

type FindConfig = () => Promise<
  null | {
    config: Config;
  }
>;
export const findConfig: FindConfig = () =>
  import(configFile).catch(() => null);
