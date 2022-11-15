import * as error from "~/src/util/error.ts";
import * as prompt from "~/src/user_interface/prompt.ts";
import * as git from "~/src/external_interface/git.ts";
import type * as type from "./type.ts";

type FillInCommitMessage = (p: {
  qList: type.QList;
  commitMessage: string;
  answerMap: Record<string, string>;
}) => Promise<type.CommitMessage>;
const fillInCommitMessage: FillInCommitMessage = async (p) => {
  console.clear();

  const [qObj, ...qList] = p.qList;
  if (qObj == null) {
    return p.commitMessage;
  }

  prompt.render({
    value: p.commitMessage,
    target: qObj.target,
  });

  const answer = await qObj.q().then((v) => v.toString()).catch(
    error.throwError,
  );
  const answerMap = {
    ...p.answerMap,
    [qObj.target]: answer,
  };

  const commitMessage = (() => {
    const _commitMessage = p.commitMessage.replace(
      `{{${qObj.target}}}`,
      answer,
    );

    if (!qObj.fixCommitMessage) {
      return _commitMessage;
    }

    return qObj.fixCommitMessage({
      answerMap,
      commitMessage: _commitMessage,
    });
  })();

  return fillInCommitMessage({
    qList,
    commitMessage,
    answerMap,
  });
};

type Run = (
  p: Pick<Parameters<FillInCommitMessage>[0], "qList"> & {
    commitMessageTemplate: Parameters<FillInCommitMessage>[0]["commitMessage"];
  },
) => Promise<void>;
export const run: Run = (p) =>
  fillInCommitMessage({
    answerMap: {},
    qList: p.qList,
    commitMessage: p.commitMessageTemplate,
  })
    .then((commitMessage) => {
      git.setCommitMessage({ message: commitMessage });
    })
    .catch(error.throwError);
