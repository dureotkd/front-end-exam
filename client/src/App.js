import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";

import AppIndex from "./AppIndex";

import { ToastContainer } from "react-toastify";

import ajax, { baseURL } from "./apis/ajax";
import { ModalContainer } from "./components";
import { io } from "socket.io-client";
import { empty } from "./helpers";

export const UserContext = React.createContext({});

function App() {
  const [socketObj, setSocketObj] = React.useState({});
  const [loginUser, setLoginUser] = React.useState({});
  const [showModal, setShowModal] = React.useState({
    show: false, // 모달 보여주는거 정의
    code: null, // state가 필요한 모달 컴포넌트 경우 케이스별로 달라짐
    component: null, // state가 필요없는 컴포넌트
  });

  React.useEffect(() => {
    (async () => {
      await ajax.get("/login").then(({ data: { code, user } }) => {
        const pathname = window.location.pathname.split("/");
        const 로그인되어있으면접근안되는주소 = ["", "join"];

        // 로그인 되어있으면
        if (로그인되어있으면접근안되는주소.includes(pathname[1]) && user) {
          window.location.href = "/exam/1";
        }

        if (code === "success") {
          const socket = io(baseURL);
          socket.emit("클라이언트방에넣기", user);
          setSocketObj(socket);
          setLoginUser(user);
        }
      });
    })();
  }, []);

  const [alarmData, setAlarmData] = React.useState({
    isAlaram: false,
    data: [],
  });
  React.useEffect(() => {
    (async () => {
      if (!empty(loginUser)) {
        await ajax.get("/alaram").then(({ data }) => {
          if (!empty(data)) {
            const res_data = [];

            data.forEach((row) => {
              res_data.push({
                body: row.answer_body,
                item: row,
              });
            });

            setAlarmData((prev) => {
              return {
                isAlaram: true,
                data: res_data,
              };
            });
          }
        });
      }
    })();
  }, [loginUser]);
  React.useEffect(() => {
    if (empty(socketObj)) {
      return;
    }

    socketObj.on("질문답변", async ({ body, item, now_date }) => {
      item.now_date = now_date;

      const cloneAlarmData = { ...alarmData };
      cloneAlarmData.isAlaram = true;
      cloneAlarmData.data.unshift({
        body: body,
        item: item,
      });
      setAlarmData(cloneAlarmData);

      setTimeout(() => {
        setAlarmData((prev) => {
          prev.isAlaram = false;
          return {
            ...prev,
          };
        });
      }, 60000 * 5);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketObj]);

  return (
    <React.Fragment>
      <UserContext.Provider
        value={{
          loginUser,
          setShowModal,
          socketObj,
          alarmData,
          setAlarmData,
        }}
      >
        <AppIndex />
        <ModalContainer showModal={showModal} />
      </UserContext.Provider>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
