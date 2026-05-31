import React, { ReactNode, ErrorInfo } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";

interface Props {
  children?: ReactNode;
}

const ErrorBoundary: React.FC<Props> = ({ children }) => {
  const handleError = (error: unknown, info: ErrorInfo) => {
    console.error("Uncaught error:", error, info);
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={handleReset}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
