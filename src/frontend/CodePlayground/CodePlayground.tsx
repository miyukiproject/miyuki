import { PlayIcon } from "../icons/Icons";
import { PlaygroundViews } from "../model/common";
import Console from "./Console/Console";
import Editor from "./Editor/Editor";
import Library from "./Library";
import { usePlayground } from "./PlaygroundContext";

export default function CodePlayground({}) {
  const { submit, processing, activeView } = usePlayground();

  return (
    <div className="flex flex-col">
      <PlaygroundView activeView={activeView} />
      <SubmitButton onClick={submit} disabled={processing} />
    </div>
  );
}

type PlaygroundViewProps = {
  activeView: PlaygroundViews;
};

const PlaygroundView = ({ activeView }: Props) => {
  switch (activeView) {
    case PlaygroundViews.EDITOR:
      return <Editor />;
    case PlaygroundViews.CONSOLE:
      return <Console />;
    case PlaygroundViews.LIBRARY:
      return <Library />;
  }
};

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
    <PlayIcon width={25} height={25} />
    <span>Enviar</span>
  </button>
);
