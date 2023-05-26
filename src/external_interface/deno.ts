type Run = (pa: {
  cmd: string;
  args: Array<string>;
}) => Promise<string | void>;
export const run: Run = (pa) => {
  const cmd = new Deno.Command(pa.cmd, {
    stdout: "piped",
    stderr: "piped",
    args: pa.args,
  });

  return cmd.output()
    .then((v) => new TextDecoder().decode(v.stdout)).catch(console.error);
};

type WriteTextFile = (p: { path: string; data: string }) => Promise<void>;
export const writeTextFile: WriteTextFile = (p) =>
  Deno.writeTextFile(p.path, p.data);
