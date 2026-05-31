import { UUID } from "./common";

export enum SubmissionStatus {
  Pending = "pending",
  Running = "running",
  Passed = "passed",
  PassedWithWarnings = "passed_with_warnings",
  Failed = "failed",
  Errored = "errored",
  Aborted = "aborted",
  Skipped = "skipped",
  ManualEvaluationPending = "manual_evaluation_pending"
}


export abstract class Submission {
  public readonly id: UUID = crypto.randomUUID();
  public status: SubmissionStatus = SubmissionStatus.Pending;
  public result?: string;

  abstract tryEvaluate(): { status: SubmissionStatus; result?: string };
}

export class SolutionSubmission extends Submission {
  constructor(public readonly content: string) {
    super();
  }

  tryEvaluate() {
    return {
      status: SubmissionStatus.Passed,
      result: ""
    };
  }
}

export class QuerySubmission extends Submission {
  constructor(
    public readonly query: string,
    public readonly cookie?: string
  ) {
    super();
  }

  tryEvaluate() {
    return {
      status: SubmissionStatus.Running
    };
  }
}
