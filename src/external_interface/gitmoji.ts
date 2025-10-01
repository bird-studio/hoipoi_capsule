// deno-lint-ignore-file
export const fetchGitmojis = () =>
  import("npm:gitmojis").then((m) => m.gitmojis);
