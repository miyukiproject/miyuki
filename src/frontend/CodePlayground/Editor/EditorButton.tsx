import { JSX, MouseEventHandler } from "react";

type Props = {
  icon: string; // despues pasemoslo a JSX.Element con lucide-icons
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  title: string;
};

export default function EditorButton({ title, onClick, icon }: Props) {
  return (
    <button onClick={onClick} title={title}>
      {icon}
    </button>
  );
}
