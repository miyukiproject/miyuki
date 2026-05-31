import { useTranslation } from "react-i18next";
import { AnalysisResult, InspectionRule, TestReport } from "yukigo";
import { CheckIcon, CrossIcon, ErrorIcon, SuccessIcon, WarningIcon } from "./icons/Icons";

type Props = {
  results: TestReport[] | null;
  expectations: AnalysisResult[] | null;
  error: Error | null;
};
import { usePlayground } from "./CodePlayground/PlaygroundContext";

const testsOk = (tests: TestReport[]) =>
  tests.every((res) => res.status === "passed");
const expectationsOk = (expectations: AnalysisResult[]) =>
  expectations.every((res) => res.passed);

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
      {status === "passed" ? <CheckIcon width={20} height={20} /> : <CrossIcon width={20} height={20} />}
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

type ErrorFeedbackProps = {
  error: Error;
};

const ErrorFeedback = ({ error }: ErrorFeedbackProps) => {
  const { t } = useTranslation(["translation", "yukigo"]);

  return <FeedbackContainer color={"red"}>
    <FeedbackTitle
      heading={t("errored")}
      color={"red"}
      icon={<ErrorIcon width={20} height={20} className="fill-red-700" />}
    />
    <FeedbackMessage msg={error.message} />
  </FeedbackContainer>;
};

type TestsFeedbackProps = {
  results: TestReport[];
};

const TestsFeedback = ({ results }: TestsFeedbackProps) => {
  const { t } = useTranslation(["translation", "yukigo"]);
  return (
    <FeedbackContainer color={"red"}>
      <FeedbackTitle
        heading={t("failed")}
        color={"red"}
        icon={<ErrorIcon width={20} height={20} className="fill-red-700" />}
      />
      {results.map((report, i) => (
        <TestReportItem key={i} {...report} />
      ))}
    </FeedbackContainer>
  );
};

type ExpectationResultProps = {
  rule: InspectionRule;
  index: number;
  passed: boolean;
};

const ExpectationResult = ({ rule, index, passed }: ExpectationResultProps) => {
  const { t } = useTranslation(["translation", "yukigo"]);

  const { inspection, args, binding, expected, targetSuffix, matcher } = rule;

  const hasTarget = args && args.length > 0;
  const suffix = hasTarget && targetSuffix ? `_${targetSuffix}` : "";
  const translationKey = `${inspection}${suffix}`;

  return (
    <span className="flex gap-2" key={index}>
      {passed ? <CheckIcon width={20} height={20} /> : <CrossIcon width={20} height={20} />}
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
};

type ExpectationsFeedbackProps = {
  expectations: AnalysisResult[];
};

const ExpectationsFeedback = ({ expectations }: ExpectationsFeedbackProps) => {
  const { t } = useTranslation(["translation", "yukigo"]);
  return (
    <FeedbackContainer color={"yellow"}>
      <FeedbackTitle
        heading={t("failedExpectations")}
        color={"yellow"}
        icon={<WarningIcon width={20} height={20} className="fill-yellow-700" />}
      />
      <div className="bg-white border rounded p-3 text-sm font-mono">
        {expectations.map(({ rule, passed }, index) => (
          <ExpectationResult rule={rule} index={index} passed={passed} />
        ))}
      </div>
    </FeedbackContainer>
  );
};

const SuccessFeedback = () => {
  const { t } = useTranslation(["translation", "yukigo"]);

  return <FeedbackContainer color={"green"}>
    <FeedbackTitle
      heading={t("passed")}
      color={"green"}
      icon={<SuccessIcon width={20} height={20} className="fill-green-700" />}
    />
  </FeedbackContainer>;
};

export default function Feedback() {
  const {
    results: { tests, expectations, error },
  } = usePlayground();
  if (!tests && !expectations && !error) return <></>;

  if (error) return <ErrorFeedback error={error} />;

  if (tests && !testsOk(tests)) return <TestsFeedback results={tests} />;

  if (expectations && !expectationsOk(expectations))
    return <ExpectationsFeedback expectations={expectations} />;

  return <SuccessFeedback />;
}
