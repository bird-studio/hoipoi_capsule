import { Config } from "../type.ts";

const configFile = `${Deno.cwd()}/hoipoi_capsule.config.ts`;

type FindConfig = () => Promise<
  null | {
    config: Config;
  }
>;
export const findConfig: FindConfig = () =>
  import(configFile).catch(() => null);
