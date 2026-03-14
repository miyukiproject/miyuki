import Editor, { OnMount } from "@monaco-editor/react"
import React, { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router"
import { Analyzer, Tester, TestReport } from "yukigo"
import { YukigoHaskellParser } from "yukigo-haskell-parser"
import { InterpreterConfig } from "yukigo/dist/interpreter/components/RuntimeContext"
import { Description } from "./Description"
import { DeepPartial } from "./helpers/DeepPartial"
import { Main } from "./Main"
import { functional, pdep } from "./model/book"
import { Exercise as ExerciseModel } from "./model/guide"
import { ProgressBar } from "./ProgressBar"
import { ContentTitle } from "./Title"

const interpreterConfig: InterpreterConfig = {
  "lazyLoading": true,
  "mutability": false,
  "debug": false,
  "outputMode": "first"
}

const resultStatus = (reports: TestReport[]) => reports.every(res => res.status === "passed")
  ? 'passed'
  : reports.every(res => res.status === "error")
    ? 'error'
    : 'failed'


const ExerciseResult: React.FC<{ reports: TestReport[] }> = ({ reports }) => {
  const { t } = useTranslation()
  if (resultStatus(reports) === "passed") {
    return (
      <div className="border-l-4 border-green-500 bg-green-50 p-4 mb-6">
        <h4 className="text-green-700 font-semibold">
          ✔ {t("passed")}
        </h4>
      </div>
    )
  }

  if (resultStatus(reports) === "error") {
    return (
      <div className="border-l-4 border-red-500 bg-red-50 p-4 mb-6">
        <h4 className="text-red-700 font-semibold mb-2">
          ✖ {t("aborted")}
        </h4>
        <div className="bg-white border rounded p-3 text-sm font-mono">
          {"No results :("}
        </div>
      </div>
    )
  }

  return (
    <div className="border-l-4 border-red-500 bg-red-50 p-4 mb-6">
      <h4 className="text-red-700 font-semibold mb-2">
        ✖ {t("failed")}
      </h4>
      <div className="bg-white border rounded p-3 text-sm font-mono">
        {reports.map(report => (
          report.children!.map(({ name, status, message }) =>
            <p key={name}>{status === 'passed' ? '✔' : '✖'} {name} {message}</p>
          )
        ))}
      </div>
    </div>
  )
}

const SubmitButton: React.FC<{ onClick: () => void; disabled?: boolean }> = ({
  onClick,
  disabled,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-3 rounded font-semibold flex justify-center items-center gap-2 text-white ${disabled ? "bg-gray-400" : "bg-pink-500 hover:bg-pink-600"
      }`}
  >
    <span className={disabled ? "animate-spin" : ""}>↻</span> Enviar
  </button>
)

// TODO next should be generic, not just exercise
function NextButton({ nextExercise, onClick }: { nextExercise: DeepPartial<ExerciseModel>, onClick?: () => void }) {
  const { t } = useTranslation()
  const { lessonId, exerciseId } = useParams()

  return (
    <Link
      to={`/lessons/${lessonId}/exercises/${Number(exerciseId) + 1}`}
      className="block w-full mt-4 bg-pink-400 hover:bg-pink-500 text-white py-3 rounded font-semibold text-center"
      onClick={onClick}
    >
      {t("navigationContinue", { kind: t("exercise"), name: nextExercise.name })}  →
    </Link>
  )
}

const Assignment: React.FC<{ exercise: ExerciseModel, showHint: boolean, setShowHint: (value: boolean) => void }> = ({ exercise, showHint, setShowHint }) => {
  const { t } = useTranslation()
  return (
    <div>
      <Description className="mb-4">{exercise.description}</Description>

      <button
        onClick={() => setShowHint(!showHint)}
        className="text-blue-600 flex items-center gap-2 mb-2"
      >
        💡 {t("needAHint")}
      </button>

      {showHint && (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded">
          {exercise.hint}
        </div>
      )}
    </div>
  )
}

const Exercise: React.FC = () => {
  const { t } = useTranslation()
  const { lessonId, exerciseId } = useParams()

  const lessonUrl = functional.lessons[Number(lessonId) - 1]
  const lesson = require(`./exercises/${lessonUrl}`)
  const exercise = lesson.exercises[Number(exerciseId) - 1]
  const nextExercise = lesson.exercises[Number(exerciseId)]

  // Fake progress
  const progress = lesson.exercises.map((_: any, i: number) => ({ status: i < Number(exerciseId) ? "passed" : "pending" }))

  const [code, setCode] = useState<string>(exercise.defaultCode ?? "")
  const [showHint, setShowHint] = useState<boolean>(false)
  const [fullscreen, setFullscreen] = useState<boolean>(false)
  const [results, setResults] = useState<TestReport[] | null>(null)
  const [processing, setProcessing] = useState<boolean>(false)

  const editorRef = useRef<any>(null)

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor
  }

  const submit = () => {
    setProcessing(true)
    setResults(null)

    const parser = new YukigoHaskellParser();
    const ast = parser.parse(code);
    const tester = new Tester(ast, interpreterConfig);
    const tests = parser.parse(exercise.test);
    const testResults = tester.test(tests);

    console.log({ testResults })

    if (testResults[0].status === 'passed') {
      const analyzer = new Analyzer();
      // Expectations example:
      // [
      //   {
      //     "args": [{ "name": "cantidadDiasEnero" }],
      //     "inspection": "HasBinding",
      //     "expected": true
      //   }
      // ]
      const expectationResults = analyzer.analyze(ast, exercise.expectations || []);
      // TODO: setExpectations(expectationResults) and show them
      console.log({ expectationResults })
    }

    setResults(testResults)
    setProcessing(false)
  }

  const currentProgressStatus = resultStatus(results || [])
  progress[Number(exerciseId) - 1] = { status: currentProgressStatus, active: true }

  return (
    <Main fullscreen={fullscreen} book={pdep} chapter={functional} lesson={lesson} exercise={exercise}>
      <ContentTitle>
        {t("exerciseTitle", { number: 8, name: exercise.name })}
      </ContentTitle>

      {/* TODO: Save the progress? */}
      <ProgressBar items={progress} />


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Assignment exercise={exercise} setShowHint={setShowHint} showHint={showHint} />

        <div className="border rounded">
          <div className="flex justify-between items-center border-b px-3 py-2">
            <div className="font-semibold">✏️ {t("solution")}</div>
            <div className="flex gap-3 text-gray-600">
              <button onClick={() => setFullscreen(!fullscreen)} title={t("fullscreen")}>⛶</button>
              <button
                onClick={() => editorRef.current?.getAction("editor.action.formatDocument")?.run()}
                title={t("format")}
              >
                ⇥
              </button>
              <button onClick={() => setCode(exercise.defaultCode ?? "")} title={t("restart")}>↺</button>
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

          <div className="p-4">
            <SubmitButton onClick={submit} disabled={processing} />
          </div>
        </div>
      </div>

      {results &&
        <div className="mt-8">
          <ExerciseResult reports={results} />
          <NextButton nextExercise={nextExercise} onClick={() => { setProcessing(false); setResults(null) }} />
        </div>}
    </Main>
  )
}

export default Exercise
