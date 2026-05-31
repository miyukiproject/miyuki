import { JSX } from "react";
import { PlaygroundViews } from "../../model/common";
import { useTranslation } from "react-i18next";

type ButtonProps = {
  translationKey: string;
  icon: JSX.Element;
  view: PlaygroundViews;
  activeView: PlaygroundViews;
  setActiveView: (view: PlaygroundViews) => void;
};

export const PlaygroundButton = ({
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
      className={
        "flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-50 transition " +
        (activeView === view ? " border-x border-t bg-gray-100" : "")
      }>
      {icon}
      <span className="text-mumuki-teal">{t(translationKey)}</span>
    </button>
  );
};
