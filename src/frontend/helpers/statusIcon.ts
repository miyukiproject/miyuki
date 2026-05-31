import { SubmissionStatus } from "../model/submission";

export function statusIcon(status: SubmissionStatus) {
  switch (status) {
    case "passed":
      return "text-green-500";
    case "failed":
      return "text-red-500";
    default:
      return "text-gray-400";
  }
};