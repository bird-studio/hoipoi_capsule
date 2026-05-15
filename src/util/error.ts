type ThrowError = (...p: unknown[]) => never;
export const throwError: ThrowError = (...p) => {
  console.error(...p);
  const message = p
    .map((x) =>
      x instanceof Error
        ? x.message
        : typeof x === "string"
        ? x
        : JSON.stringify(x)
    )
    .join(" ");
  throw new Error(message);
};
