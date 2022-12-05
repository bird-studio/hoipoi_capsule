import { Config, userInterface } from "./hoipoi_capsule.ts";

export const config: Config = {
  color: {
    border: userInterface.prompt.colors.green,
    target: userInterface.prompt.colors.bold.green,
  },
};
