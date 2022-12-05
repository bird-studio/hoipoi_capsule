import * as error from "../../util/error.ts";
import * as prompt from "../../user_interface/prompt.ts";
import * as git from "../../external_interface/git.ts";
import type * as type from "./type.ts";

type FillInCommitMessage = (p: {
  questionList: type.QuestionList;
  commitMessage: string;
  answerMap: Record<string, string>;
}) => Promise<type.CommitMessage>;
const fillInCommitMessage: FillInCommitMessage = async (p) => {
  console.clear();

  const [qObj, ...questionList] = p.questionList;
  if (qObj == null) {
    return p.commitMessage;
  }

  await prompt.render({
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
    questionList,
    commitMessage,
    answerMap,
  });
};

type Run = (
  p: {
    questionList: type.QuestionList;
    commitMessageTemplate: string;
  },
) => Promise<void>;
export const run: Run = (p) =>
  fillInCommitMessage({
    answerMap: {},
    questionList: p.questionList,
    commitMessage: p.commitMessageTemplate,
  })
    .then((commitMessage) => {
      git.setCommitMessage({ message: commitMessage });
    })
    .catch(error.throwError);
