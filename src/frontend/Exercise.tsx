import Editor, { OnMount } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { AnalysisResult, Analyzer, MulangAdapter, Tester, TestReport } from "yukigo";
import { YukigoHaskellParser } from "yukigo-haskell-parser";
import { InterpreterConfig } from "yukigo/dist/interpreter/components/RuntimeContext";
import { Description } from "./Description";
import { DeepPartial } from "./helpers/DeepPartial";
import { Main } from "./Main";
import { functional, pdep } from "./model/book";
import { Exercise as ExerciseModel } from "./model/guide";
import { ProgressBar } from "./ProgressBar";
import { ContentTitle } from "./Title";
import Feedback from "./Feedback";

type FeedbackData = Record<string, string>
const populate = (template: string, data: FeedbackData) => template.replace(/\${(\w+)}/g, (_, key) => data[key]);

const exerciseModules = import.meta.glob("../exercises/**/*", { eager: true });

const interpreterConfig: InterpreterConfig = {
  lazyLoading: true,
  mutability: false,
  debug: false,
  outputMode: "first",
};

const resultStatus = (reports: TestReport[]) =>
  reports.every((res) => res.status === "passed")
    ? "passed"
    : reports.every((res) => res.status === "error")
      ? "error"
      : "failed";

const SubmitButton: React.FC<{ onClick: () => void; disabled?: boolean }> = ({
  onClick,
  disabled,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-3 rounded font-semibold flex justify-center items-center gap-1 text-white ${
      disabled ? "bg-gray-400" : "bg-mumuki-rose hover:bg-mumuki-rose-darken"
    }`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="currentColor"
      className="bi bi-play-fill"
      viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
    </svg>
    <span>Enviar</span>
  </button>
);

// TODO next should be generic, not just exercise
function NextButton({
  nextExercise,
  onClick,
}: {
  nextExercise: DeepPartial<ExerciseModel>;
  onClick?: () => void;
}) {
  const { t } = useTranslation();
  const { lessonId, exerciseId } = useParams();

  return (
    <Link
      to={`/lessons/${lessonId}/exercises/${Number(exerciseId) + 1}`}
      className="hover:text-white block w-full mt-4 bg-mumuki-rose hover:bg-mumuki-rose-darken text-white py-3 rounded font-semibold text-center"
      onClick={onClick}>
      {t("navigationContinue", {
        kind: t("exercise"),
        name: nextExercise.name,
      })}{" "}
      →
    </Link>
  );
}

const Assignment: React.FC<{
  exercise: ExerciseModel;
  showHint: boolean;
  setShowHint: (value: boolean) => void;
}> = ({ exercise, showHint, setShowHint }) => {
  const { t } = useTranslation();
  return (
    <div className={`exercise-assignment ${layout.text[exercise.layout]}`}>
      <Description className="mb-4 text-justify">
        {exercise.description}
      </Description>
      {exercise.hint && (
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-blue-600 flex items-center gap-2 mb-2">
          💡 {t("needAHint")}
        </button>
      )}

      {showHint && (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded">
          {exercise.hint}
        </div>
      )}
    </div>
  );
};

const layout = {
  text: {
    input_right: "w-full lg:w-1/2",
    input_bottom: "w-full",
  },
  container: {
    input_right: "flex flex-col lg:flex-row",
    input_bottom: "flex flex-col",
  },
};

const Exercise: React.FC = () => {
  const { t } = useTranslation();
  const { lessonId, exerciseId } = useParams();

  const lessonUrl = functional.lessons[Number(lessonId) - 1];
  const lessonModule = exerciseModules[`../exercises/${lessonUrl}.json`];
  const lesson = lessonModule.default;
  const exercise = lesson.exercises[Number(exerciseId) - 1];
  const nextExercise = lesson.exercises[Number(exerciseId)];

  // Fake progress
  const progress = lesson.exercises.map((_: any, i: number) => ({
    lessonId: lessonId,
    exerciseId: i + 1,
    status: i < Number(exerciseId) ? "passed" : "pending",
  }));

  const [code, setCode] = useState<string>(exercise.defaultCode ?? "");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [results, setResults] = useState<TestReport[] | null>(null);
  const [expectations, setExpectations] = useState<AnalysisResult[] | null>(
    null,
  );
  const [error, setError] = useState<Error | null>(null);

  const [processing, setProcessing] = useState<boolean>(false);

  const editorRef = useRef<any>(null);

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

const submit = () => {
  setProcessing(true);
  setResults(null);
  setExpectations(null);
  setError(null);
  try {
    const parser = new YukigoHaskellParser();
    const ast = parser.parse(code);
    const tester = new Tester(ast, interpreterConfig);
    const testResults = tester.test(parser.parse(exercise.test));
    setResults(testResults);

    if (resultStatus(testResults) === "passed") {
      const analyzer = new Analyzer()
      const adapter = new MulangAdapter()
      const expectations = exercise.expectations.map((exp) => adapter.translateMulangInspection(exp)) || []
      const expectationResults = analyzer.analyze(ast, expectations);
      console.log(expectationResults)
      setExpectations(expectationResults);
    }
  } catch (err) {
    setError(err instanceof Error ? err : new Error(String(err)));
  } finally {
    setProcessing(false);
  }
};

  const currentProgressStatus = resultStatus(results || []);
  progress[Number(exerciseId) - 1] = {
    ...progress[Number(exerciseId) - 1],
    status: currentProgressStatus,
    active: true,
  };

  return (
    <Main
      fullscreen={fullscreen}
      book={pdep}
      chapter={functional}
      lesson={lesson}
      exercise={exercise}>
      <ContentTitle>
        {t("exerciseTitle", { number: 8, name: exercise.name })}
      </ContentTitle>

      {/* TODO: Save the progress? */}
      <ProgressBar items={progress} />

      <div className={`${layout.container[exercise.layout]} gap-6`}>
        <Assignment
          exercise={exercise}
          setShowHint={setShowHint}
          showHint={showHint}
        />

        <div
          className={`flex flex-col gap-4 rounded ${layout.text[exercise.layout]}`}>
          <div className="flex border flex-col">
            <div className="flex justify-between items-center border-b px-3 py-2">
              <div className="font-semibold">✏️ {t("solution")}</div>
              <div className="flex gap-3 text-gray-600">
                <button
                  onClick={() => setFullscreen(!fullscreen)}
                  title={t("fullscreen")}>
                  ⛶
                </button>
                <button
                  onClick={() =>
                    editorRef.current
                      ?.getAction("editor.action.formatDocument")
                      ?.run()
                  }
                  title={t("format")}>
                  ⇥
                </button>
                <button
                  onClick={() => setCode(exercise.defaultCode ?? "")}
                  title={t("restart")}>
                  ↺
                </button>
              </div>
            </div>

            <Editor
              height={fullscreen ? "calc(100vh - 220px)" : "300px"}
              language="haskell"
              theme="vs-light"
              value={code}
              onChange={(v) => setCode(v ?? "")}
              onMount={handleEditorMount}
              options={{ minimap: { enabled: false }, wordWrap: "on" }}
            />
          </div>
          <SubmitButton onClick={submit} disabled={processing} />
        </div>
      </div>

      <div className="mt-8">
        <Feedback results={results} expectations={expectations} error={error} />
        <NextButton
          nextExercise={nextExercise}
          onClick={() => {
            setProcessing(false);
            setResults(null);
          }}
        />
      </div>
    </Main>
  );
};

export default Exercise;
