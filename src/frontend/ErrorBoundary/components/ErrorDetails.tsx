import React from "react";

interface ErrorDetailsProps {
  error: unknown;
}

export const ErrorDetails: React.FC<ErrorDetailsProps> = ({ error }) => {
  if (process.env.NODE_ENV !== 'development' || !error) {
    return null;
  }

  return (
    <div className="mt-8 text-left">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        Error Details (Dev Mode):
      </p>
      <pre className="p-4 bg-gray-100 rounded border border-gray-200 text-xs text-mumuki-rose overflow-auto max-h-40">
        {String(error)}
      </pre>
    </div>
  );
};
