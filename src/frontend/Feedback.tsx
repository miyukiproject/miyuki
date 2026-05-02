import { useTranslation } from "react-i18next";
import { AnalysisResult, TestReport } from "yukigo";

type Props = {
  results: TestReport[] | null;
  expectations: AnalysisResult[] | null;
  error: Error | null;
};

const testsOk = (tests: TestReport[]) =>
  tests.every((res) => res.status === "passed");
const expectationsOk = (expectations: AnalysisResult[]) =>
  expectations.every((res) => res.passed);

type IconProps = {
  className?: string;
};

const colorStyles = {
  red: {
    container: "border-red-500 bg-red-50",
    text: "text-red-700",
  },
  yellow: {
    container: "border-yellow-500 bg-yellow-50",
    text: "text-yellow-700",
  },
  green: {
    container: "border-green-500 bg-green-50",
    text: "text-green-700",
  },
};

const ErrorIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    className={className}
    viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
  </svg>
);
const WarningIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    className={className}
    viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
  </svg>
);
const SuccessIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    className={className}
    viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
  </svg>
);
const CrossIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    className={className}
    viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
  </svg>
);
const CheckIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    className={className}
    viewBox="0 0 16 16">
    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
  </svg>
);

type FeedbackColor = "red" | "yellow" | "green";

type ContainerProps = {
  color: FeedbackColor;
  children: React.ReactNode;
};

const FeedbackContainer = ({ color, children }: ContainerProps) => (
  <div className={`border-l-4 p-4 mb-6 ${colorStyles[color].container}`}>
    {children}
  </div>
);
type TitleProps = {
  heading: string;
  color: FeedbackColor;
  icon: React.ReactNode;
};
const FeedbackTitle = ({ heading, color, icon }: TitleProps) => (
  <div className="flex gap-2 items-center mb-2">
    {icon}
    <h4 className={`${colorStyles[color].text} font-semibold`}>{heading}</h4>
  </div>
);
type MessageProps = {
  msg: string;
};
const FeedbackMessage = ({ msg }: MessageProps) => (
  <div className="bg-white p-2 border rounded">
    <span className="text-sm font-mono">{msg}</span>
  </div>
);

const TestReportRow = ({ name, status, message }: TestReport) => (
  <div className="bg-white p-2 flex flex-col">
    <div className="flex gap-2 items-center">
      {status === "passed" ? <CheckIcon /> : <CrossIcon />}
      <p>{name}</p>
    </div>
    {message && <p className="ml-8 text-sm text-gray-600">{message}</p>}
  </div>
);

const TestReportItem = (report: TestReport) =>
  report.children ? (
    <>
      {report.children.map((child, i) => (
        <TestReportRow key={i} {...child} />
      ))}
    </>
  ) : (
    <TestReportRow {...report} />
  );

export default function Feedback({ results, expectations, error }: Props) {
  console.log(results, expectations, error)
  const { t } = useTranslation(["translation", "yukigo"]);
  if (!results && !expectations && !error) return <></>;

  if (error)
    return (
      <FeedbackContainer color={"red"}>
        <FeedbackTitle
          heading={t("errored")}
          color={"red"}
          icon={<ErrorIcon className="fill-red-700" />}
        />
        <FeedbackMessage msg={error.message} />
      </FeedbackContainer>
    );

  if (results && !testsOk(results))
    return (
      <FeedbackContainer color={"red"}>
        <FeedbackTitle
          heading={t("failed")}
          color={"red"}
          icon={<ErrorIcon className="fill-red-700" />}
        />
        {results.map((report, i) => (
          <TestReportItem key={i} {...report} />
        ))}
      </FeedbackContainer>
    );

  if (expectations && !expectationsOk(expectations))
    return (
      <FeedbackContainer color={"yellow"}>
        <FeedbackTitle
          heading={t("failedExpectations")}
          color={"yellow"}
          icon={<WarningIcon className="fill-yellow-700" />}
        />
        <div className="bg-white border rounded p-3 text-sm font-mono">
          {expectations.map(({ rule, passed }, index) => {
            const {
              inspection,
              args,
              binding,
              expected,
              targetSuffix,
              matcher,
            } = rule;

            const hasTarget = args && args.length > 0;
            const suffix = hasTarget && targetSuffix ? `_${targetSuffix}` : "";
            const translationKey = `${inspection}${suffix}`;

            return (
              <span className="flex gap-2" key={index}>
                {passed ? <CheckIcon /> : <CrossIcon />}
                <p>
                  {t(`yukigo:${translationKey}`, {
                    binding: binding === "*" ? t("yukigo:solution") : binding,
                    must: t(expected ? "yukigo:must" : "yukigo:must_not"),
                    target: hasTarget ? args[0] : undefined,
                    matching: matcher
                      ? t(`yukigo:${matcher.type}`, { value: matcher.value })
                      : "",
                  })}
                </p>
              </span>
            );
          })}
        </div>
      </FeedbackContainer>
    );

  return (
    <FeedbackContainer color={"green"}>
      <FeedbackTitle
        heading={t("passed")}
        color={"green"}
        icon={<SuccessIcon className="fill-green-700" />}
      />
    </FeedbackContainer>
  );
}
