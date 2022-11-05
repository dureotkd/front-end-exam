import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";

import AppIndex from "./AppIndex";

import { ToastContainer } from "react-toastify";

import ajax from "./apis/ajax";
import { ModalContainer } from "./components";

export const UserContext = React.createContext({});

function App() {
  const [loginUser, setLoginUser] = React.useState({});

  React.useEffect(() => {
    (async () => {
      await ajax.get("/login").then(({ data: { code, user } }) => {
        if (code === "success") {
          setLoginUser(user);
        }
      });
    })();
  }, []);

  return (
    <React.Fragment>
      <UserContext.Provider value={loginUser}>
        <AppIndex />
      </UserContext.Provider>
      <ToastContainer />
      <ModalContainer />
    </React.Fragment>
  );
}

export default App;
