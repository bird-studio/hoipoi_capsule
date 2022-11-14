import { wait } from "@/wait";
import * as gitmoji from "~/src/external_interface/gitmoji.ts";
import * as gitHub from "~/src/external_interface/gitHub.ts";
import * as error from "~/src/util/error.ts";

const findSemver = (p: string | null) => {
  if (p === null) {
    return "x.x.x";
  }

  if (p === "patch") {
    return "x.x.o";
  }

  if (p === "minor") {
    return "x.o.x";
  }

  if (p === "major") {
    return "o.x.x";
  }

  return "_._._";
};

export const skip = { name: "-skip-", value: "-skip-" };

const separate = {
  name: "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  value: "",
  disabled: true,
};

export const initialize = () => {
  console.clear();
  const spinner = wait("Initializing...").start();

  return Promise.all([
    gitmoji.fetchGitmojis(),
    gitHub.fetchIssues(),
  ])
    .then(
      ([{ gitmojis }, issues]) => {
        return {
          issues: [
            skip,
            separate,
            ...issues.map((v) => ({
              name: `#${v.number} ${v.title}`,
              value: `Close #${v.number}`,
            })),
          ],
          gitmojis: gitmojis
            .map((v) => ({
              ...v,
              semver: findSemver(v.semver),
            }))
            .map((v) => ({
              name: `${v.emoji}[${
                v.semver.replaceAll(".", "")
              }]: ${v.description}`,
              value: `${v.code}[${v.semver}]`,
            })),
        };
      },
    )
    .catch(error.throwError)
    .finally(() => {
      spinner.stop();
    });
};
