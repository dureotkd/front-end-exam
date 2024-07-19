/* eslint-disable no-new-func */
import React from "react";

import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { useParams } from "react-router-dom";
import { UserContext } from "../App";

import ajax from "../apis/ajax";

import {
  CodeMirror,
  ExecuteButton,
  Header,
  Horizontal,
  PageLoading,
} from "../components/index";
import { empty } from "../helpers";

const 에러로그보여줘 = (error) => {
  이전로그다지워();
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
  const { setShowModal } = React.useContext(UserContext);

  const [loading, setLoading] = React.useState(true);
  const [exam, setExam] = React.useState(null);
  const [code, setCode] = React.useState("");

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
          setCode(data.start_code.replace(/\\n/g, "\n"));
        })
        .finally(() => {
          setLoading(false);
        });
    })();
  }, [seq]);

  const 코드작성 = React.useCallback((value) => {
    setCode(value);
  }, []);

  const 코드실행 = React.useCallback(() => {
    이전로그다지워();

    const 콘솔프로토타입상속 = `

      const c = window.console;

      function 로그HTML화면으로보여줘(s) {
        const my_log = document.getElementById("my_log");
        const div_log = document.createElement("pre");
        div_log.classList = "log-msg";
        div_log.innerText = JSON.stringify(s, undefined, 2);
        my_log.append(div_log);
        c.log(s);
      }

      const Console = function () {};
      const ConsoleObject = {
        log(s) {
          로그HTML화면으로보여줘(s);
        },
      };
      Console.prototype.__proto__ = ConsoleObject;
      let console = new Console();
    `;

    const 최종코드 = 콘솔프로토타입상속 + code;

    try {
      // eslint-disable-next-line no-new-func
      new Function(최종코드)();
    } catch (error) {
      에러로그보여줘(error);
    }
  }, [code]);

  const 제출하기 = React.useCallback(async () => {
    const 시험매게변수배열 = !empty(exam.request)
      ? JSON.parse(exam.request)
      : null;

    // =============================== 회원코드실행 ===============================

    let 사용자정답 = "";
    let 사용자정답코드 = `

        const USER_ANSWER = () => {
         
          ${code};
          
          return solution();
        }

        return USER_ANSWER;
    `;

    try {
      let 사용자정답가상머신 = new Function(사용자정답코드);
      사용자정답 = 사용자정답가상머신()();

      코드실행(사용자정답);
    } catch (error) {
      에러로그보여줘(error);
    }

    console.log(사용자정답);

    // =============================== 회원코드실행 ===============================

    /**
     *
     * 매게변수를 DB에 있는걸로 전환 후 비교해서
     * 사용자 정답과 Equl 해야한다
     */

    // =============================== 매게변수 ===============================

    const new_arguments = {};
    const result_codes = [];
    /**
     * [
     * "food=[1,2,3,4],asd=[1,2]",
     * "food=[1,3,4,6]"
     * ]
     */

    시험매게변수배열.forEach((items, index) => {
      for (let key in items) {
        if (empty(new_arguments[index])) {
          new_arguments[index] = `${key}=${JSON.stringify(items[key])}`;
        } else {
          new_arguments[index] += `,${key}=${JSON.stringify(items[key])}`;
        }
      }
    });

    // =============================== 매게변수 ===============================
    const match = code.match(/\(([^)]+)\)/);

    for (let x of Object.values(new_arguments)) {
      const 매게변수만바꾼함수_1 = code.replace(match[1], x);
      result_codes.push(매게변수만바꾼함수_1);
    }

    /**
     * 1. 회원 코드 실행
     *
     *
     */

    // =============================== 회원코드를 바탕으로 시험 매게변수 대입 ===============================

    const answer = [];

    for await (let f of result_codes) {
      try {
        let 시험정답코드 = ` 
        const EXAM_ANSWER = () => {
  
          ${f}
  
          return solution();
        }
  
        return EXAM_ANSWER;
      `;

        let 시험정답가상머신 = new Function(시험정답코드);
        let 시험정답 = 시험정답가상머신()();
        answer.push(시험정답);
      } catch (error) {
        에러로그보여줘(error);
      }
    }

    // =============================== 회원코드를 바탕으로 시험 매게변수 대입 ===============================

    await ajax
      .post("/answer", {
        seq: seq,
        answer: answer,
        code: code,
        user_answer: 사용자정답,
      })
      .then(async ({ data: { code, last_yn } }) => {
        if (code === "success") {
          setShowModal({
            show: true,
            component: () => {
              return (
                <div
                  className="modal-children-box"
                  style={{
                    minHeight: 280,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <h2>정답입니다</h2>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      className="exam-btn"
                      style={{ marginRight: 12 }}
                      onClick={() => {
                        setShowModal({
                          show: null,
                          component: null,
                        });
                      }}
                    >
                      머무르기
                    </button>
                    {last_yn === "N" && (
                      <button
                        className="exam-btn"
                        style={{ backgroundColor: "#2146c7" }}
                        onClick={() => {
                          window.location.href = `/exam/${parseInt(seq) + 1}`;
                        }}
                      >
                        다음 문제로 이동
                      </button>
                    )}
                  </div>
                </div>
              );
            },
          });
        }
      });
  }, [code, exam?.answer, exam?.request, seq, setShowModal, 코드실행]);

  React.useEffect(() => {
    const 키보드탐지 = (event) => {
      const key_code = event.keyCode;

      switch (key_code) {
        // F4 (제출하기)
        case 115:
          제출하기();
          break;

        // F9 (코드실행)
        case 120:
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
  }, [제출하기, 코드실행]);

  const [timer, setTimer] = React.useState(null);
  const 타이머시작 = React.useCallback(() => {
    setTimer(timer === null ? "00:00" : null);
  }, [timer]);
  React.useEffect(() => {
    if (timer === null) {
      return;
    }

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

  const 질문하기 = React.useCallback(() => {
    setShowModal({
      show: true,
      code: "QUESTION",
    });
  }, [setShowModal]);

  const 정답보기 = React.useCallback(() => {
    if (!window.confirm("답을 확인하시겠습니까?")) {
      return;
    }

    setShowModal({
      show: true,
      code: "ANOTHER_PEOPLE_ANSWER",
    });
  }, [setShowModal]);

  if (loading === true) {
    return <PageLoading />;
  }

  return (
    <div
      style={{
        overflow: "hidden",
        backgroundColor: "#263747",
        height: "100vh",
      }}
    >
      <Header navigation="Javascript > 알고리즘 문제" />
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid #263238",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>{exam.title}</h2>
        </div>
        <div className="margin-left-wrap" style={{ display: "flex" }}>
          <button type="button" className="exam-btn" onClick={타이머시작}>
            {timer ? timer : "타이머"}
          </button>
        </div>
      </div>
      <div className="exam_box" style={{ display: "flex", height: "80%" }}>
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
          <Viewer
            linkAttributes="rel"
            usageStatistics={false}
            initialValue={exam?.body || ""}
          />
        </div>
        <Horizontal />
        <div
          id="code_mirror_wrap"
          style={{
            padding: 20,
            width: "65%",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <CodeMirror value={code} onChange={코드작성} />
          <div id="my_log" className="code_result"></div>
        </div>
      </div>
      <div
        style={{
          padding: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          position: "absolute",
          bottom: 12,
        }}
      >
        <button
          onClick={질문하기}
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <ExecuteButton text="정답보기" onClick={정답보기} />
          <ExecuteButton
            text="코드실행 (F9)"
            onClick={코드실행}
            style={{ marginLeft: 12 }}
          />
          <ExecuteButton
            text="제출하기 (F4)"
            onClick={제출하기}
            style={{ marginLeft: 12, backgroundColor: "#2146c7" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Exam;
