import React from "react";

import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";

import ajax from "../apis/ajax";

import {
  CodeMirror,
  ExecuteButton,
  Header,
  Horizontal,
} from "../components/index";

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
  const navigation = useNavigate;
  const { seq } = useParams();
  const { setShowModal } = React.useContext(UserContext);

  const [exam, setExam] = React.useState(null);
  const [code, setCode] = React.useState(
    "function solution() { \n\n}\n\nconsole.log(solution());"
  );

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      // const unresolve_exam_cookie = cookie_helper.get("unresolve_exam");
      // const a = unresolve_exam_cookie.replaceAll('"', "");

      // if (!empty(a)) {
      //   const c = a.replaceAll("SECRET_FORMAT_STRING_KAPA", ";");
      //   const f = c.replaceAll("\\n", "\n");
      //   setCode(f);
      // }

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

      setLoading(false);
    })();
  }, [seq]);

  React.useEffect(() => {
    window.onbeforeunload = async function () {
      const a = JSON.stringify(code).replaceAll(
        ";",
        "SECRET_FORMAT_STRING_KAPA"
      );

      // const b = a.replaceAll("'", '"');

      // const c = b.slice(0, -1);
      // const d = c.slice(1);

      // await ajax.post("/exam-result", {
      //   seq: seq,
      //   updateData: {
      //     body: d,
      //   },
      // });
      // cookie_helper.set("unresolve_exam", a, 1);
      // return "사이트에서 나가시겠습니까?";
    };
  }, [code, seq]);

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

  const 답제출 = React.useCallback(async () => {
    const 로그엘리먼트들 = document.querySelectorAll("#my_log .log-msg");

    const answer = [];

    if (로그엘리먼트들.length > 0) {
      로그엘리먼트들.forEach((item) => {
        answer.push(item.innerText.replaceAll('"', ""));
      });
    }

    await ajax
      .post("/answer", {
        seq: seq,
        answer: answer,
        code: code,
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
  }, [code, seq, setShowModal]);

  const 질문하기 = React.useCallback(() => {
    setShowModal({
      show: true,
      code: "QUESTION",
    });
  }, [setShowModal]);

  const 단축키알려줄게 = React.useCallback(() => {
    setShowModal({
      show: true,
      component: null,
    });
  }, [setShowModal]);

  if (loading === true) {
    return <div>;;</div>;
  }

  return (
    <div style={{ backgroundColor: "#263747", height: "100vh" }}>
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
          <div className="category-box">초급</div>
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
          <ExecuteButton text="코드실행" onClick={코드실행} />
          <ExecuteButton
            text="제출하기"
            onClick={답제출}
            style={{ marginLeft: 12, backgroundColor: "#2146c7" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Exam;
