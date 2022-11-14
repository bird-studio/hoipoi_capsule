import * as prompt from "~/src/user_interface/prompt.ts";

export const gitmoji = () =>
  prompt.Select.prompt({
    message: "gitmoji Pick a color",
    search: true,
    options: [
      { name: "Red", value: "#ff0000" },
      { name: "Blue", value: "#0000ff" },
      { name: "White", value: "#ffffff" },
      { name: "Black", value: "#000000" },
    ],
  });

export const subject = () =>
  prompt.Select.prompt({
    message: "subject Pick a color",
    search: true,
    options: [
      { name: "Red", value: "#ff0000" },
      { name: "Blue", value: "#0000ff" },
      { name: "White", value: "#ffffff" },
      { name: "Black", value: "#000000" },
    ],
  });
