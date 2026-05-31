import MonacoEditor, { OnMount } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePlayground } from "../PlaygroundContext";
import EditorButton from "./EditorButton";

type EditorProps = {};

export default function Editor({}: EditorProps) {
  const { t } = useTranslation();
  const { code, setCode, exercise } = usePlayground();

  const [fullscreen, setFullscreen] = useState<boolean>(false);

  // any deberia ser IStandaloneCodeEditor pero no puedo importarlo
  const editorRef = useRef<any>(null); 

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
  };
  return (
    <div className="flex border">
      <MonacoEditor
        height={fullscreen ? "calc(100vh - 220px)" : "300px"}
        language="haskell"
        theme="vs-light"
        value={code}
        onChange={(v) => setCode(v ?? "")}
        onMount={handleEditorMount}
        options={{ minimap: { enabled: false }, wordWrap: "on" }}
      />
      <div className="flex flex-col text-gray-600">
        <EditorButton
          title={t("fullscreen")}
          icon={"⛶"}
          onClick={() => setFullscreen(!fullscreen)}
        />
        <EditorButton
          title={t("format")}
          icon={"⇥"}
          onClick={() =>
            editorRef.current?.getAction("editor.action.formatDocument")?.run()
          }
        />
        <EditorButton
          title={t("restart")}
          icon={"↺"}
          onClick={() => setCode(exercise.default_content ?? "")}
        />
      </div>
    </div>
  );
}
