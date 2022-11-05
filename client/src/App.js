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
  const [showModal, setShowModal] = React.useState({
    show: false,
    component: null,
  });

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
      <UserContext.Provider
        value={{
          loginUser,
          setShowModal,
        }}
      >
        <AppIndex />
      </UserContext.Provider>
      <ToastContainer />
      <ModalContainer showModal={showModal} setShowModal={setShowModal} />
    </React.Fragment>
  );
}

export default App;
