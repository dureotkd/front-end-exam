import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";

import AppIndex from "./AppIndex";

import { ToastContainer } from "react-toastify";

function App() {
  const [loginUser, setLoginUser] = React.useState({});

  return (
    <React.Fragment>
      <AppIndex />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
