type Answer = string | number;
export type CommitMessage = string;

export type QuestionList = ReadonlyArray<
  {
    target: string;
    q: () => Promise<Answer>;
    fixCommitMessage?: (
      p: { answerMap: Record<string, string>; commitMessage: CommitMessage },
    ) => CommitMessage;
  }
>;
