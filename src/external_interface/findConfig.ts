import { Config } from "../type.ts";

type FindConfig = () => Promise<
  null | {
    config: Config;
  }
>;
export const findConfig: FindConfig = () =>
  import(
    "https://raw.githubusercontent.com/bird-studio/hoipoi_capsule/main/hoipoi_capsule.config.ts"
  ).catch(() => null);
