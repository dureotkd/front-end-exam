import React from "react";

import { Viewer } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { useParams } from "react-router-dom";
import ajax from "../apis/ajax";
import CodeMirrorComponent from "../components/CodeMirror";

const 에러로그보여줘 = (error) => {
  const my_log = document.getElementById("my_log");
  const div_log = document.createElement("pre");
  div_log.classList = "log-msg";
  div_log.innerText = error.stack;
  my_log.append(div_log);
};

const 이전로그다지워 = () => {
  const my_log = document.getElementById("my_log");

  while (my_log.firstChild) {
    my_log.removeChild(my_log.firstChild);
  }
};

function Exam() {
  const { seq } = useParams();

  const [exam, setExam] = React.useState(null);

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    (async () => {
      await ajax
        .get("/exam", {
          params: {
            seq: seq,
          },
        })
        .then(({ data }) => {
          if (!data) {
            return;
          }

          setExam(data);
        });
    })();
  }, [seq]);

  const [code, setCode] = React.useState("");
  const 코드작성 = React.useCallback((value) => {
    setCode(value);
  }, []);
  const 코드실행 = React.useCallback(() => {
    이전로그다지워();

    const 콘솔프로토타입상속 = `

      const c = window.console;

      const Console = function () {};
      const ConsoleObject = {
        log(s) {
          const my_log = document.getElementById("my_log");
          const div_log = document.createElement("pre");
          div_log.classList = "log-msg";
          div_log.innerText = JSON.stringify(s, undefined, 2);
          my_log.append(div_log);
          c.log(s);
        },
      };
      Console.prototype.__proto__ = ConsoleObject;
      const console = new Console();

    `;

    const 최종코드 = 콘솔프로토타입상속 + code;

    try {
      // eslint-disable-next-line no-new-func
      new Function(최종코드)();
    } catch (error) {
      에러로그보여줘(error);
    }
  }, [code]);

  React.useEffect(() => {
    const 키보드탐지 = (event) => {
      const key_code = event.keyCode;

      switch (key_code) {
        // F9 (코드실행)

        case 120:
        case 17:
          코드실행();
          break;

        default:
          break;
      }
    };

    window.addEventListener("keyup", 키보드탐지);

    return () => {
      window.removeEventListener("keyup", 키보드탐지);
    };
  }, [코드실행]);

  const [timer, setTimer] = React.useState(null);
  const 타이머시작 = React.useCallback(() => {
    setTimer(timer === null ? "00:00" : null);
  }, [timer]);
  React.useEffect(() => {
    if (timer === null) {
      return;
    }
    console.log(timer);

    const interval = setInterval(() => {
      const timmerArr = timer.split(":");

      const now_date = new Date(
        "2021",
        "07",
        "06",
        "1",
        timmerArr[0],
        parseInt(timmerArr[1]) + 1
      );

      let min = now_date.getMinutes();
      let sec = now_date.getSeconds();

      let res_min = min < 10 ? `0${min}` : min;
      let res_sec = sec < 10 ? `0${sec}` : sec;

      setTimer(`${res_min}:${res_sec}`);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  if (exam === null) {
    return <div>;;</div>;
  }

  return (
    <div style={{ backgroundColor: "#263747", height: "100vh" }}>
      <div
        style={{
          padding: 20,
          borderBottom: "1px solid #263238",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>{exam.title}</h2>
        <div className="margin-left-wrap" style={{ display: "flex" }}>
          <button type="button" className="exam-btn">
            단축키 설명
          </button>
          <button type="button" className="exam-btn" onClick={타이머시작}>
            {timer ? timer : "타이머"}
          </button>
        </div>
      </div>
      <div style={{ display: "flex", height: "85%" }}>
        <div
          className="scrollBar"
          style={{
            width: "45%",
            padding: 14,
            paddingLeft: 20,
            borderRight: "1px solid #263238",
            height: "100%",
            overflow: "scroll",
            overflowX: "hidden",
          }}
        >
          <Viewer initialValue={exam?.body || ""} />
        </div>

        <div
          id="code_mirror_wrap"
          style={{ padding: 20, height: "100%", flexDirection: "column" }}
        >
          <CodeMirrorComponent value={code} onChange={코드작성} />

          <div id="my_log" className="code_result"></div>
        </div>
      </div>
      <div
        style={{
          padding: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          className="exam-btn"
          style={{
            width: 120,
            height: 40,
            fontWeight: "bold",
            backgroundColor: "#263238",
            color: "#fff",
            fontSize: 16,
            borderRadius: 6,
          }}
        >
          질문하기
        </button>
        <div>
          <button className="exam-btn">코드실행</button>
          <button
            className="exam-btn"
            style={{ marginLeft: 12, backgroundColor: "#2146c7" }}
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Exam;
