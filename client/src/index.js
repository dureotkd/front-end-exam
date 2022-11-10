import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import ErrorBoundary from "./ErrorBoundary";

// Sentry.init({
//   dsn: "https://03f24499f2134fcfa0bbc1f65efd4d42@o1216417.ingest.sentry.io/4504127013978112",
//   integrations: [new BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
//   autoSessionTracking: false,
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>
);
