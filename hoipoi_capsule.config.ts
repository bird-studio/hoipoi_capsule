import { Config, userInterface } from "./mod.ts";

export const config: Config = {
  color: {
    border: userInterface.prompt.colors.red,
    target: userInterface.prompt.colors.bold.red,
  },
};
