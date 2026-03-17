import React from "react";
import { FallbackProps } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div>
      <span role="alert">Something went wrong: {error} </span>
      <button type="button" onClick={resetErrorBoundary}>
        Go back
      </button>
    </div>
  );
}

export default ErrorFallback;
