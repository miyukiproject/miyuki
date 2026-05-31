import React from "react";
import { useTranslation } from "react-i18next";
import { FallbackProps } from "react-error-boundary";
import { ErrorIcon } from "./components/ErrorIcon";
import { ErrorDetails } from "./components/ErrorDetails";
import { ErrorActions } from "./components/ErrorActions";

export const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <ErrorIcon />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t("unexpectedErrorTitle", "¡Ups! Algo salió mal")}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {t("unexpectedErrorMessage", "Se ha producido un error inesperado en la aplicación.")}
        </p>
        
        <ErrorActions onReset={resetErrorBoundary} />
        
        <ErrorDetails error={error} />
      </div>
    </div>
  );
};
