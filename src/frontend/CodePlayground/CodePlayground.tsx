import Editor from "./Editor";
import { usePlayground } from "./PlaygroundContext";

type Props = {};

export default function CodePlayground({}: Props) {
  const { submit, processing } = usePlayground();

  return (
    <div className="flex flex-col">
      <Editor />
      <SubmitButton onClick={submit} disabled={processing} />
    </div>
  );
}

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
