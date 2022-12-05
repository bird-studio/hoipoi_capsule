import { findConfig as _findConfig } from "../external_interface/findConfig.ts";

type FindResult = Awaited<ReturnType<typeof _findConfig>>;
type Config = FindResult;

export class FindConfig {
  private static config: Config = null;
  private constructor() {}

  static async run() {
    if (FindConfig.config) {
      return FindConfig.config;
    }

    FindConfig.config = await _findConfig();
    return FindConfig.config;
  }
}
