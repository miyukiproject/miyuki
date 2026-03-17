import React, { useState, useRef } from "react"
import Editor, { OnMount } from "@monaco-editor/react"
import { ProgressStatus } from "./ProgressStatus"
import { ProgressBar } from "./ProgressBar"
import { Topic } from "./model/topic"
import { Book } from "./model/book"
import { Guide, Exercise as ExerciseModel } from "./model/guide"
import { DeepPartial } from "./helpers/DeepPartial"
import { Main } from "./Main"
import { useTranslation } from "react-i18next"
import { Problem } from "./model/exercises"
import { ContentTitle } from "./Title"

// TODO extract
const book: DeepPartial<Book> = {
  name: "PdeP"
}

const chapter: DeepPartial<Topic> = {
  name: "Programación Funcional"
}

const lesson: DeepPartial<Guide> = {
  name: "Valores y Funciones",
  language: { name: "Haskell" }
}

const exercise: DeepPartial<Problem> = {
  name: "Múltiples parámetros",
  descriptionHtml: "¿Te imaginás cómo se puede escribir la función <code>areaRectangulo</code> que calcule el área de un rectángulo?",
  hint: "El área de un rectángulo se calcula multiplicando base por altura.",
  defaultCode: "areaRectangulo lado1 lado2 = lado1 * lado2"
}

const nextExercise: DeepPartial<ExerciseModel> = {
  name: "Combinando funciones",
}

type ResultStatus = "success" | "error" | null


const ExerciseResult: React.FC<{ status: ResultStatus }> = ({ status }) => {
  const { t } = useTranslation()
  if (!status) return null

  if (status === "success") {
    return (
      <div className="border-l-4 border-green-500 bg-green-50 p-4 mb-6">
        <h4 className="text-green-700 font-semibold">
          ✔ {t("passed")}
        </h4>
      </div>
    )
  }

  return (
    <div className="border-l-4 border-red-500 bg-red-50 p-4 mb-6">
      <h4 className="text-red-700 font-semibold mb-2">
        ✖ {t("aborted")}
      </h4>
      <div className="bg-white border rounded p-3 text-sm font-mono">
        Timed out connecting to server: &ltno reason&gt
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
function NextButton({ nextExercise }: { nextExercise: DeepPartial<ExerciseModel> }) {
  const { t } = useTranslation()

  return (
    <a
      href="#"
      className="block w-full mt-4 bg-pink-400 hover:bg-pink-500 text-white py-3 rounded font-semibold text-center"
    >
      {t("navigationContinue", { kind: t("exercise"), name: nextExercise.name })}  →
    </a>
  )
}

const Assignment: React.FC<{ showHint: boolean, setShowHint: (value: boolean) => void }> = ({ showHint, setShowHint }) => {
  const { t } = useTranslation()
  return (
    <div>
      <p className="mb-4" dangerouslySetInnerHTML={{
        __html: exercise.descriptionHtml!,
      }}>
      </p>

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

  const [code, setCode] = useState<string>(exercise.defaultCode ?? "")
  const [showHint, setShowHint] = useState<boolean>(false)
  const [fullscreen, setFullscreen] = useState<boolean>(false)
  const [result, setResult] = useState<ResultStatus>(null)
  const [processing, setProcessing] = useState<boolean>(false)

  const editorRef = useRef<any>(null)

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor
  }

  const submit = () => {
    setProcessing(true)
    setResult(null)

    setTimeout(() => {
      const success = Math.random() > 0.5
      setResult(success ? "success" : "error")
      setProcessing(false)
    }, 1500)
  }

  const currentProgressStatus: ProgressStatus = processing
    ? "processing"
    : result === "success"
      ? "passed"
      : result === "error"
        ? "failed"
        : "pending"

  return (
    <Main fullscreen={fullscreen} book={book} chapter={chapter} lesson={lesson} exercise={exercise}>
      <ContentTitle>
        {t("exerciseTitle", { number: 8, name: exercise.name })}
      </ContentTitle>

      <ProgressBar
        items={[
          { status: "passed" },
          { status: "passed" },
          { status: "passed" },
          { status: "passed" },
          { status: "passed" },
          { status: "passed" },
          { status: "passed" },
          { status: currentProgressStatus, active: true },
          { status: "pending" },
        ]}
      />


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Assignment setShowHint={setShowHint} showHint={showHint} />

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

      <div className="mt-8">
        <ExerciseResult status={result} />
        {result && <NextButton nextExercise={nextExercise} />}
      </div>
    </Main>
  )
}

export default Exercise
