import { AnalysisResult, TestReport } from "yukigo";

export type UUID = string;
export type Slug = string;
export type Locale = string;

export enum PlaygroundViews {
  EDITOR,
  LIBRARY,
  CONSOLE,
}

export type ExerciseResult = {
  tests: TestReport[] | null;
  expectations: AnalysisResult[] | null;
  error: Error | null;
};
