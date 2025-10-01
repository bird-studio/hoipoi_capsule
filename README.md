# hoipoi capsule

## What is this?

Create a commit message in an interactive format.

<video controls playsinline width="100%" autoplay loop muted="true" src="https://user-images.githubusercontent.com/92862731/201958468-dec2cf7a-8035-47b1-9668-d468641ce8be.mov" type="video/mp4" >
 Sorry, your browser doesn't support embedded videos.
</video>

## Try

```bash
# Go to git directory
brew install deno

deno run --allow-net --allow-write --allow-run "https://deno.land/x/hoipoi_capsule/demo/fill_in_commit_message/conventionalcommits_style.ts?source"
cat .git/COMMIT_EDITMSG
```

## Use

Run with Git hook.

It works without gh. gh is used to obtain github issues.Please complete the gh
setup in advance.

```bash
brew install deno gh
```

Prepare Git hook.

```bash
mkdir .githooks

cat <<EOF > .githooks/prepare-commit-msg
#!/bin/sh

exec < /dev/tty deno run --allow-net --allow-write --allow-run "https://deno.land/x/hoipoi_capsule/demo/fill_in_commit_message/conventionalcommits_style.ts?source"

EOF

git config --local core.hooksPath .githooks
chmod +x .githooks/prepare-commit-msg
```

Execution.

```bash
touch myFile.txt
git add myFile.txt
git commit
```

## Customize

Here is a reference.

- [conventionalcommits_style](https://github.com/bird-studio/hoipoi_capsule/blob/main/demo/fill_in_commit_message/conventionalcommits_style.ts)

```ts
import * as hoipoiCapsule from "https://deno.land/x/hoipoi_capsule/mod.ts";

const commitMessageTemplate = `{{type}}({{scope}}): {{summary}}

{{body}}

BREAKING CHANGE: {{breakingChange}}`;

hoipoiCapsule.useCase.fillInCommitMessage.run({
  commitMessageTemplate,
  questionList: [
    {
      /**
       * The answer applies to the {{type}} part of commitMessageTemplate.
       */
      target: "type",
      /**
       * Pre-prepared questions.
       */
      q: hoipoiCapsule.preset.fillInCommitMessage.conventionalcommits.qMap.type,

      /**
       * Thus, you can also create your own questions.
       */
      //   q: typeQ,

      /**
       * Modify the commit message.
       * Use this function when a message is unanswered, for example.
       */
      fixCommitMessage: (p) => {
        if (p.answerMap["type"] === "???") {
          return p.commitMessage.replace(/\r?\n{2,}/, "\n").trim();
        }
        return p.commitMessage;
      },
    },
  ],
});

/**
 * Please check here.
 * https://github.com/c4spar/deno-cliffy
 */
const typeQ = () =>
  hoipoiCapsule.userInterface.prompt.Select.prompt({
    message: "Select type.",
    search: true,
    options: [
      {
        name:
          "Build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
        value: "Build",
      },
      {
        name:
          "CI: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)",
        value: "CI",
      },
      { name: "Docs: Documentation only changes", value: "Docs" },
      { name: "Feat: A new feature", value: "Feat" },
      { name: "Fix: A bug fix", value: "Fix:" },
      { name: "Perf: A code change that improves performance", value: "Perf" },
      {
        name:
          "Refactor: A code change that neither fixes a bug nor adds a feature",
        value: "Refactor",
      },
      {
        name: "Test: Adding missing tests or correcting existing tests",
        value: "Test",
      },
    ],
  });
```

## Convenient Use

- [gitmoji_style](https://github.com/bird-studio/hoipoi_capsule/blob/main/demo/fill_in_commit_message/gitmoji_style.ts)

<video controls playsinline width="100%" autoplay loop muted="true" src="https://user-images.githubusercontent.com/92862731/202081954-dc908df9-70d8-436a-8ad9-fa5d91cd1280.mov" type="video/mp4" >
 Sorry, your browser doesn't support embedded videos.
</video>

~ ~ ~ ~
