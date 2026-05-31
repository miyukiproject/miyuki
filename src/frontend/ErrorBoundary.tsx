import React, { Component, ErrorInfo, ReactNode } from "react";
import { withTranslation, WithTranslation } from "react-i18next";

interface Props extends WithTranslation {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const { t } = this.props;
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-mumuki-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t("unexpectedErrorTitle", "¡Ups! Algo salió mal")}
            </h1>
            <p className="text-gray-600 mb-8">
              {t("unexpectedErrorMessage", "Se ha producido un error inesperado en la aplicación.")}
            </p>
            <button
              className="w-full px-6 py-3 bg-mumuki-teal text-white font-semibold rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-mumuki-teal focus:ring-offset-2 transition-colors"
              onClick={() => window.location.reload()}
            >
              {t("reloadPage", "Recargar página")}
            </button>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 text-left">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Error Details (Dev Mode):</p>
                <pre className="p-4 bg-gray-100 rounded border border-gray-200 text-xs text-mumuki-rose overflow-auto max-h-40">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
