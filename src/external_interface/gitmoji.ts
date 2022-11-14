import * as error from "~/src/util/error.ts";

export const fetchGitmojis = () =>
  import(
    "https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json",
    { assert: { type: "json" } }
  ).then((v) => v.default).catch(
    error.throwError,
  );
