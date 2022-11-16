import { colors, prompt, Table } from "../../deps.ts";

export { wait } from "../../deps.ts";
export const Input = prompt.Input;
export const Select = prompt.Select;

const highlighter = (p: { value: string; target: string }) =>
  p.value
    .replace(p.target, colors.bold.bgGreen(p.target))
    .replace(new RegExp("{{", "g"), "")
    .replace(new RegExp("}}", "g"), "");

export const render = (p: { value: string; target: string }) => {
  const body = highlighter(p);
  new Table()
    .header(["Create a commit message."])
    .body([[body]])
    .chars({
      "top": colors.green("─"),
      "topMid": colors.green("┬"),
      "topLeft": colors.green("┌"),
      "topRight": colors.green("┐"),
      "bottom": colors.green("─"),
      "bottomMid": colors.green("┴"),
      "bottomLeft": colors.green("└"),
      "bottomRight": colors.green("┘"),
      "left": colors.green("│"),
      "leftMid": colors.green("├"),
      "mid": colors.green("─"),
      "midMid": colors.green("┼"),
      "right": colors.green("│"),
      "rightMid": colors.green("┤"),
      "middle": colors.green("│"),
    })
    .border(true)
    .render();
};
