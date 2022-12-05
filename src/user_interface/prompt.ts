import { colors, prompt, Table } from "../../deps.ts";
export { wait } from "../../deps.ts";
export { colors } from "../../deps.ts";
import { FindConfig } from "../util/FindConfig.ts";
import type { ColorSetter } from "../type.ts";

export const Input = prompt.Input;
export const Select = prompt.Select;

const _highlightColorSetter = colors.bold.bgGreen;
const _borderColorSetter = colors.green;

type TargetHighlighter = (
  p: {
    value: string;
    target: string;
    highlightColorSetter: ColorSetter;
  },
) => string;
const targetHighlighter: TargetHighlighter = (p) =>
  p.value
    .replace(p.target, p.highlightColorSetter(p.target))
    .replace(new RegExp("{{", "g"), "")
    .replace(new RegExp("}}", "g"), "");

type Render = (
  p: { value: string; target: string },
) => Promise<void>;
export const render: Render = async (p) => {
  const r = await FindConfig.run();

  const colorSetter = r?.config
    ? {
      border: r.config.color.border,
      highlight: r.config.color.target,
    }
    : {
      border: _borderColorSetter,
      highlight: _highlightColorSetter,
    };

  const body = targetHighlighter({
    ...p,
    highlightColorSetter: colorSetter.highlight,
  });

  new Table()
    .header(["Create a commit message."])
    .body([[body]])
    .chars({
      "top": colorSetter.border("─"),
      "topMid": colorSetter.border("┬"),
      "topLeft": colorSetter.border("┌"),
      "topRight": colorSetter.border("┐"),
      "bottom": colorSetter.border("─"),
      "bottomMid": colorSetter.border("┴"),
      "bottomLeft": colorSetter.border("└"),
      "bottomRight": colorSetter.border("┘"),
      "left": colorSetter.border("│"),
      "leftMid": colorSetter.border("├"),
      "mid": colorSetter.border("─"),
      "midMid": colorSetter.border("┼"),
      "right": colorSetter.border("│"),
      "rightMid": colorSetter.border("┤"),
      "middle": colorSetter.border("│"),
    })
    .border(true)
    .render();
};
