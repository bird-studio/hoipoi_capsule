export type ColorSetter = (p: string) => string;

export type Config = {
  color: {
    border: ColorSetter;
    target: ColorSetter;
  };
};
