import { useTranslation } from "react-i18next";
import { AnalysisResult, TestReport } from "yukigo";

type Props = {
  results: TestReport[] | null;
  expectations: AnalysisResult[] | null;
};

const testsOk = (tests: TestReport[]) =>
  tests.every((res) => res.status === "passed");
const expectationsOk = (expectations: AnalysisResult[]) =>
  expectations.every((res) => res.passed);

export default function Feedback({ results, expectations }: Props) {
  const { t } = useTranslation();
  if(!results && !expectations) return <></>
  
  if (results && !testsOk(results)) {
    return (
      <div className="border-l-4 border-red-500 bg-red-50 p-4 mb-6">
        <h4 className="text-red-700 font-semibold mb-2">✖ {t("failed")}</h4>
        <div className="bg-white border rounded p-3 text-sm font-mono flex flex-col gap-2">
          {results.map((report) =>
            report.children!.map(({ name, status, message }) => (
              <div className="">
                <p key={name}>
                  {status === "passed" ? "✔" : "✖"} {report.name} {name}
                </p>
                <p className="ml-8" key={name}>
                  {message}
                </p>
              </div>
            )),
          )}
        </div>
      </div>
    );
  }

  if (expectations && !expectationsOk(expectations)) {
    return (
      <div className="border-l-4 border-red-500 bg-red-50 p-4 mb-6">
        <h4 className="text-red-700 font-semibold mb-2">
          ✖ {t("failedExpectations")}
        </h4>
        <div className="bg-white border rounded p-3 text-sm font-mono">
          {expectations.map(
            ({ rule: { inspection, args, binding }, passed, error }, index) => (
              <p key={index}>
                {passed ? "✔" : "✖"} {binding} {inspection} {args} {error}
              </p>
            ),
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="border-l-4 border-green-500 bg-green-50 p-4 mb-6">
      <h4 className="text-green-700 font-semibold">✔ {t("passed")}</h4>
    </div>
  );
}
