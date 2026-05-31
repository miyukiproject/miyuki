import React from "react";
import { useTranslation } from "react-i18next";

interface ErrorActionsProps {
  onReset: () => void;
}

export const ErrorActions: React.FC<ErrorActionsProps> = ({ onReset }) => {
  const { t } = useTranslation();

  return (
    <button
      className="w-full px-6 py-3 bg-mumuki-teal text-white font-semibold rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-mumuki-teal focus:ring-offset-2 transition-colors"
      onClick={onReset}
    >
      {t("reloadPage", "Recargar página")}
    </button>
  );
};
