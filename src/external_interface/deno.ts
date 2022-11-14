type Run = (pa: {
  cmd: Array<string>;
}) => Promise<string | void>;
export const run: Run = async (pa) => {
  const p = Deno.run({
    cmd: pa.cmd,
    stdout: "piped",
    stderr: "piped",
  });

  await p.status().catch(console.error);
  p.close();

  return p.output()
    .then((v) => new TextDecoder().decode(v)).catch(console.error);
};

type WriteTextFile = (p: { path: string; data: string }) => Promise<void>;
export const writeTextFile: WriteTextFile = (p) =>
  Deno.writeTextFile(p.path, p.data);
