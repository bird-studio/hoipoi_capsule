import { colors, prompt, Table } from "../../deps.ts";
export { wait } from "../../deps.ts";
export { colors } from "../../deps.ts";

export const Input = prompt.Input;
export const Select = prompt.Select;

const _highlightColorSetter = colors.bold.bgGreen;
const _borderColorSetter = colors.green;

type TargetHighlighter = (
  p: {
    value: string;
    target: string;
  },
) => string;
const targetHighlighter: TargetHighlighter = (p) =>
  p.value
    .replace(p.target, _highlightColorSetter(p.target))
    .replace(new RegExp("{{", "g"), "")
    .replace(new RegExp("}}", "g"), "");

type Render = (
  p: { value: string; target: string },
) => void;
export const render: Render = (p) => {
  const body = targetHighlighter(p);

  new Table()
    .header(["Create a commit message."])
    .body([[body]])
    .chars({
      "top": _borderColorSetter("─"),
      "topMid": _borderColorSetter("┬"),
      "topLeft": _borderColorSetter("┌"),
      "topRight": _borderColorSetter("┐"),
      "bottom": _borderColorSetter("─"),
      "bottomMid": _borderColorSetter("┴"),
      "bottomLeft": _borderColorSetter("└"),
      "bottomRight": _borderColorSetter("┘"),
      "left": _borderColorSetter("│"),
      "leftMid": _borderColorSetter("├"),
      "mid": _borderColorSetter("─"),
      "midMid": _borderColorSetter("┼"),
      "right": _borderColorSetter("│"),
      "rightMid": _borderColorSetter("┤"),
      "middle": _borderColorSetter("│"),
    })
    .border(true)
    .render();
};
