import { CodeIcon, PencilIcon, TerminalIcon } from "../icons/Icons";
import { usePlayground } from "./PlaygroundContext";
import { useTranslation } from "react-i18next";
import { PlaygroundViews } from "../model/common";

type Props = {};

export default function PlaygroundHeader({}: Props) {
  const { t } = useTranslation();
  const { exercise, activeView, setActiveView } = usePlayground();
  return (
    <div className="flex gap-6 items-center border-b px-3 py-2">
      <button onClick={() => setActiveView(PlaygroundViews.EDITOR)} className="flex items-center gap-1">
        <PencilIcon width={15} height={15} className="fill-mumuki-teal" />
        <span className="text-mumuki-teal">{t("solution")}</span>
      </button>
      {exercise.extra && (
        <button onClick={() => setActiveView(PlaygroundViews.LIBRARY)} className="flex items-center gap-1">
          <CodeIcon width={15} height={15} className="fill-mumuki-teal" />
          <span className="text-mumuki-teal">{t("library")}</span>
        </button>
      )}
      <button onClick={() => setActiveView(PlaygroundViews.CONSOLE)} className="flex items-center gap-1">
        <TerminalIcon width={15} height={15} className="fill-mumuki-teal" />
        <span className="text-mumuki-teal">{t("console")}</span>
      </button>
    </div>
  );
}
