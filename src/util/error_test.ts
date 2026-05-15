import { assertThrows } from "@std/assert";
import { throwError } from "./error.ts";

Deno.test("throwError keeps the message of an Error instance", () => {
  assertThrows(
    () => throwError(new Error("boom")),
    Error,
    "boom",
  );
});

Deno.test("throwError joins strings and Error messages", () => {
  assertThrows(
    () => throwError("context:", new Error("inner failure")),
    Error,
    "context: inner failure",
  );
});

Deno.test("throwError stringifies non-Error, non-string values", () => {
  assertThrows(
    () => throwError({ code: 1 }),
    Error,
    '{"code":1}',
  );
});
