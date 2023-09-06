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
  }

  render() {
    const { error } = this.state;

    if (error === true) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <img
            style={{ width: 300 }}
            src={`${process.env.PUBLIC_URL}/images/404_animation.gif`}
            alt="404페이지"
          />
          <h1>404 ERROR PAGE</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default React.memo(ErrorBoundary);
