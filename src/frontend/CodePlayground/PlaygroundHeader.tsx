import { CodeIcon, PencilIcon, TerminalIcon } from "../icons/Icons";
import { usePlayground } from "./PlaygroundContext";
import { useTranslation } from "react-i18next";
import { PlaygroundViews } from "../model/common";
import { Dispatch, JSX, SetStateAction } from "react";

type Props = {};

export default function PlaygroundHeader({}: Props) {
  const { t } = useTranslation();
  const { exercise, activeView, setActiveView } = usePlayground();
  return (
    <div className="flex items-center border-b">
      <HeaderButton
        icon={
          <PencilIcon width={15} height={15} className="fill-mumuki-teal" />
        }
        view={PlaygroundViews.EDITOR}
        translationKey="solution"
        activeView={activeView}
        setActiveView={setActiveView}
      />
      {exercise.extra && (
        <HeaderButton
          icon={
            <CodeIcon width={15} height={15} className="fill-mumuki-teal" />
          }
          view={PlaygroundViews.LIBRARY}
          translationKey="library"
          activeView={activeView}
          setActiveView={setActiveView}
        />
      )}
      <HeaderButton
        icon={
          <TerminalIcon width={15} height={15} className="fill-mumuki-teal" />
        }
        view={PlaygroundViews.CONSOLE}
        translationKey="console"
        activeView={activeView}
        setActiveView={setActiveView}
      />
    </div>
  );
}

type ButtonProps = {
  translationKey: string;
  icon: JSX.Element;
  view: PlaygroundViews;
  activeView: PlaygroundViews
  setActiveView: (view: PlaygroundViews) => void;
};

const HeaderButton = ({
  translationKey,
  icon,
  view,
  activeView,
  setActiveView,
}: ButtonProps) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={() => setActiveView(view)}
      className={"flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-50 transition " + (activeView === view ? " border-x border-t bg-gray-100" : "")}>
      {icon}
      <span className="text-mumuki-teal">{t(translationKey)}</span>
    </button>
  );
};
