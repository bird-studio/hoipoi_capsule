type ThrowError = (...p: unknown[]) => never;
export const throwError: ThrowError = (...p) => {
  console.error(...p);
  throw new Error(JSON.stringify(p));
};
