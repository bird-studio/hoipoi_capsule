import { Config, userInterface } from "./mod.ts";

export const config: Config = {
  color: {
    border: userInterface.prompt.colors.green,
    target: userInterface.prompt.colors.bold.green,
  },
};
