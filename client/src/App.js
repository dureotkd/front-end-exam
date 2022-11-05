import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";

import AppIndex from "./AppIndex";

import { ToastContainer } from "react-toastify";

import ajax from "./apis/ajax";
import { Header, ModalContainer } from "./components";

export const UserContext = React.createContext({});

function App() {
  const [loginUser, setLoginUser] = React.useState({});
  const [showModal, setShowModal] = React.useState({
    show: false, // 모달 보여주는거 정의
    code: null, // state가 필요한 모달 컴포넌트 경우 케이스별로 달라짐
    component: null, // state가 필요없는 컴포넌트
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
