type Answer = string | number;
export type CommitMessage = string;

export type FixCommitMessage = (
  p: { answerMap: Record<string, string>; commitMessage: CommitMessage },
) => CommitMessage;
export type QuestionList = ReadonlyArray<
  {
    target: string;
    q: () => Promise<Answer>;
    fixCommitMessage?: FixCommitMessage;
  }
>;
