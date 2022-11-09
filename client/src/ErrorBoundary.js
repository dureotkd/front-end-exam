import React from "react";

import * as Sentry from "@sentry/browser";

class ErrorBoundary extends React.Component {
  state = { error: false, info: "" };

  static getDerivedStateFromError(error, info) {
    return { error: true, info: info };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === "production") {
    }

    Sentry.captureMessage("에러 메시지", {
      name: "성민",
      age: 20,
    });
  }

  render() {
    const { error } = this.state;

    if (error === true) {
      return (
        <div>
          <h2>Error Page!</h2>
        </div>
      );
    }
    return this.props.children;
  }
}

export default React.memo(ErrorBoundary);
