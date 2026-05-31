import { Exercise } from "./guide";
import { Submission, SubmissionStatus } from "./submission";


export class Assignment {
  public attempts = 0;
  public submission?: Submission;

  constructor(
    public readonly exercise: Exercise
  ) { }

  submit(submission: Submission): Submission {
    this.submission = submission;
    const result = submission.tryEvaluate();
    submission.status = result.status;
    submission.result = result.result;
    this.attempts += 1;
    return submission;
  }

  completed() {
    return this.submissionStatus === SubmissionStatus.Passed || this.submissionStatus === SubmissionStatus.Skipped
  }

  get submissionStatus() {
    // TODO this should not be necessary anymore
    return this.submission?.status ?? SubmissionStatus.Pending
  }
}