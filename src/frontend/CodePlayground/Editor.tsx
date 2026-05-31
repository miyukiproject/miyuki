import MonacoEditor, { OnMount } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePlayground } from "./PlaygroundContext";

type Props = {};

export default function Editor({}: Props) {
  const { t } = useTranslation();
  const { code, setCode, exercise } = usePlayground();

  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const editorRef = useRef<any>(null);

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
  };
  return (
    <div>
      {" "}
      <div className="flex gap-3 text-gray-600">
        <button
          onClick={() => setFullscreen(!fullscreen)}
          title={t("fullscreen")}>
          ⛶
        </button>
        <button
          onClick={() =>
            editorRef.current?.getAction("editor.action.formatDocument")?.run()
          }
          title={t("format")}>
          ⇥
        </button>
        <button onClick={() => setCode(exercise.default_content ?? "")} title={t("restart")}>
          ↺
        </button>
      </div>
      <MonacoEditor
        height={fullscreen ? "calc(100vh - 220px)" : "300px"}
        language="haskell"
        theme="vs-light"
        value={code}
        onChange={(v) => setCode(v ?? "")}
        onMount={handleEditorMount}
        options={{ minimap: { enabled: false }, wordWrap: "on" }}
      />
    </div>
  );
}
