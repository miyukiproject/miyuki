import { CodeIcon, PencilIcon, TerminalIcon } from "../../icons/Icons";
import { usePlayground } from "../PlaygroundContext";
import { PlaygroundViews } from "../../model/common";
import { PlaygroundButton } from "./PlaygroundButton";

type PlaygroundHeaderProps = {};

export default function PlaygroundHeader({}: PlaygroundHeaderProps) {
  const { exercise, activeView, setActiveView } = usePlayground();
  return (
    <div className="flex items-center border-b">
      <PlaygroundButton
        icon={
          <PencilIcon width={15} height={15} className="fill-mumuki-teal" />
        }
        view={PlaygroundViews.EDITOR}
        translationKey="solution"
        activeView={activeView}
        setActiveView={setActiveView}
      />
      {exercise.extra && (
        <PlaygroundButton
          icon={
            <CodeIcon width={15} height={15} className="fill-mumuki-teal" />
          }
          view={PlaygroundViews.LIBRARY}
          translationKey="library"
          activeView={activeView}
          setActiveView={setActiveView}
        />
      )}
      <PlaygroundButton
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
