import { wait } from "../../../user_interface/prompt.ts";
import * as gitmoji from "../../../external_interface/gitmoji.ts";
import * as gitHub from "../../../external_interface/gitHub.ts";
import * as error from "../../../util/error.ts";
import * as util from "../util.ts";

const findSemver = (p: string | null) => {
  if (p === "patch") {
    return "x.x.o";
  }

  if (p === "minor") {
    return "x.o.x";
  }

  if (p === "major") {
    return "o.x.x";
  }

  return "x.x.x";
};

export const initialize = () => {
  console.clear();
  const spinner = wait("Initializing...").start();

  return Promise.all([
    gitmoji.fetchGitmojis(),
    gitHub.fetchIssues(),
  ])
    .then(
      ([gitmojis, issues]) => ({
        issues: [
          util.skip,
          util.separate,
          ...issues.map((v) => ({
            name: `${v.number} ${v.title}`,
            value: `${v.number}`,
          })),
        ],
        gitmojis: gitmojis
          .map((v) => ({
            ...v,
            semver: findSemver(v.semver),
          }))
          .map((v) => ({
            name: `${v.emoji}\`${
              v.semver.replaceAll(".", "")
            }\`: ${v.description}`,
            value: `${v.code}\`${v.semver}\``,
          })),
      }),
    )
    .catch(error.throwError)
    .finally(() => {
      spinner.stop();
    });
};
