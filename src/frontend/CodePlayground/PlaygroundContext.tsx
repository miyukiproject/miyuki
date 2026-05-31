import React, { createContext, ReactNode, useContext, useState } from "react";
import { ExerciseResult, PlaygroundViews } from "../model/common";
import { Analyzer, MulangAdapter, Tester, TestReport } from "yukigo";
import { YukigoHaskellParser } from "yukigo-haskell-parser";
import { InterpreterConfig } from "yukigo/dist/interpreter/components/RuntimeContext";

type Props = {
  exercise: any;
};

const interpreterConfig: InterpreterConfig = {
  lazyLoading: true,
  mutability: false,
  debug: false,
  outputMode: "first",
};

export const resultStatus = (reports: TestReport[]) =>
  reports.every((res) => res.status === "passed")
    ? "passed"
    : reports.every((res) => res.status === "error")
      ? "error"
      : "failed";

interface PlaygroundContextType {
  code: string;
  setCode: (code: string) => void;
  results: ExerciseResult;
  processing: boolean;
  activeView: PlaygroundViews;
  setActiveView: (view: PlaygroundViews) => void;
  exercise: any;
  submit: () => void;
  reset: () => void;
}

const PlaygroundContext = createContext<PlaygroundContextType | undefined>(
  undefined,
);

export const usePlayground = () => {
  const context = useContext(PlaygroundContext);
  if (!context)
    throw new Error("usePlayground debe usarse dentro de PlaygroundProvider");
  return context;
};
const baseResult: ExerciseResult = { tests: null, expectations: null, error: null };

export const PlaygroundProvider: React.FC<{
  exercise: any;
  children: ReactNode;
}> = ({ exercise, children }) => {
  const [code, setCode] = useState<string>(exercise.default_content ?? "");
  const [processing, setProcessing] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<PlaygroundViews>(
    PlaygroundViews.EDITOR,
  );
  const [results, setResults] = useState<ExerciseResult>({
    expectations: null,
    error: null,
    tests: null,
  });

  const reset = () => {
    setProcessing(false);
    setResults(baseResult);
  };

  const submit = () => {
    setProcessing(true);
    setResults(baseResult);
    try {
      const parser = new YukigoHaskellParser();
      const ast = parser.parse(
        exercise.extra ? exercise.extra.concat(code) : code,
      );
      const tester = new Tester(ast, interpreterConfig);
      const testResults = tester.test(parser.parse(exercise.test));
      setResults((results) => ({ ...results, tests: testResults }));

      if (resultStatus(testResults) === "passed") {
        const analyzer = new Analyzer();
        const adapter = new MulangAdapter();
        const expectations =
          exercise.expectations.map((exp) =>
            adapter.translateMulangInspection(exp),
          ) || [];
        const expectationResults = analyzer.analyze(ast, expectations);
        console.log(expectationResults);
        setResults((results) => ({
          ...results,
          expectations: expectationResults,
        }));
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setResults((results) => ({
        ...results,
        error,
      }));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <PlaygroundContext.Provider
      value={{
        code,
        setCode,
        results,
        processing,
        activeView,
        setActiveView,
        exercise,
        submit,
        reset
      }}>
      {children}
    </PlaygroundContext.Provider>
  );
};
