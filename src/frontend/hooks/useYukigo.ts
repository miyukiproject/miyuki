import { Analyzer, MulangAdapter, Tester, Interpreter, TestReport, AnalysisResult } from "yukigo";
import { AST } from "yukigo-ast";
import { YukigoHaskellParser } from "yukigo-haskell-parser";
import { InterpreterConfig } from "yukigo/dist/interpreter/components/RuntimeContext";

export const interpreterConfig: InterpreterConfig = {
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

export const useYukigo = () => {
  const evaluate = (code: string, extra: string, command: string) => {
    const parser = new YukigoHaskellParser();
    const ast = parser.parse((extra ? extra + "\n" : "") + code);
    const expression = parser.parseExpression(command);

    const interpreter = new Interpreter(ast, interpreterConfig);
    return interpreter.evaluate(expression);
  };

  const runTests = (code: string, extra: string, test: string) => {
    const parser = new YukigoHaskellParser();
    const ast = parser.parse((extra ? extra + "\n" : "") + code);
    const tester = new Tester(ast, interpreterConfig);
    const testResults = tester.test(parser.parse(test));
    return { ast, testResults };
  };

  const runAnalysis = (ast: AST, expectations: unknown[]): AnalysisResult[] => {
    const analyzer = new Analyzer();
    const adapter = new MulangAdapter();
    const translatedExpectations =
      expectations.map((exp) => adapter.translateMulangInspection(exp)) || [];
    return analyzer.analyze(ast, translatedExpectations);
  };

  return { evaluate, runTests, runAnalysis };
};
