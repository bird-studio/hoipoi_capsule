type Run = (pa: {
  cmd: string;
  args: Array<string>;
}) => Promise<string>;
export const run: Run = async (pa) => {
  const cmd = new Deno.Command(pa.cmd, {
    stdout: "piped",
    stderr: "piped",
    args: pa.args,
  });

  const output = await cmd.output();
  if (!output.success) {
    const stderr = new TextDecoder().decode(output.stderr).trim();
    throw new Error(
      `\`${pa.cmd} ${pa.args.join(" ")}\` exited with code ${output.code}${
        stderr ? `: ${stderr}` : ""
      }`,
    );
  }

  return new TextDecoder().decode(output.stdout);
};

type WriteTextFile = (p: { path: string; data: string }) => Promise<void>;
export const writeTextFile: WriteTextFile = (p) =>
  Deno.writeTextFile(p.path, p.data);
