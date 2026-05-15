import * as error from "../../util/error.ts";
import * as prompt from "../../user_interface/prompt.ts";
import * as git from "../../external_interface/git.ts";
import type * as type from "./type.ts";

type ApplyAnswer = (p: {
  commitMessage: string;
  target: string;
  answer: string;
  answerMap: Record<string, string>;
  fixCommitMessage?: type.FixCommitMessage;
}) => string;
export const applyAnswer: ApplyAnswer = (p) => {
  const commitMessage = p.commitMessage.replaceAll(
    `{{${p.target}}}`,
    () => p.answer,
  );

  if (!p.fixCommitMessage) {
    return commitMessage;
  }

  return p.fixCommitMessage({
    answerMap: p.answerMap,
    commitMessage,
  });
};

type FillInCommitMessage = (p: {
  questionList: type.QuestionList;
  commitMessage: string;
  answerMap: Record<string, string>;
}) => Promise<type.CommitMessage>;
export const fillInCommitMessage: FillInCommitMessage = async (p) => {
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

  const commitMessage = applyAnswer({
    commitMessage: p.commitMessage,
    target: qObj.target,
    answer,
    answerMap,
    fixCommitMessage: qObj.fixCommitMessage,
  });

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
