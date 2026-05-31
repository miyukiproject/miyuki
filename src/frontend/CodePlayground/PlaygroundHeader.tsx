import React from "react";
import { CodeIcon, PencilIcon, TerminalIcon } from "../icons/Icons";
import { usePlayground } from "./PlaygroundContext";
import { useTranslation } from "react-i18next";

type Props = {};

export default function PlaygroundHeader({}: Props) {
  const { t } = useTranslation();
  const { exercise, activeView, setActiveView } = usePlayground();
  return (
    <div className="flex gap-4 justify-between items-center border-b px-3 py-2">
      <button className="flex items-center gap-1">
        <PencilIcon width={20} height={20} className="fill-mumuki-teal" />
        <span className="text-mumuki-teal">{t("solution")}</span>
      </button>
      {exercise.extra && (
        <button className="flex items-center gap-1">
          <CodeIcon width={20} height={20} className="fill-mumuki-teal" />
          <span className="text-mumuki-teal">{t("library")}</span>
        </button>
      )}
      <button className="flex items-center gap-1">
        <TerminalIcon width={20} height={20} className="fill-mumuki-teal" />
        <span className="text-mumuki-teal">{t("console")}</span>
      </button>
    </div>
  );
}
