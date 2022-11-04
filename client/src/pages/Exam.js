import React from "react";

import { Viewer } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { useParams } from "react-router-dom";
import ajax from "../apis/ajax";
import CodeMirrorComponent from "../components/CodeMirror";

function Exam() {
  const { seq } = useParams();

  const [exam, setExam] = React.useState(null);

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
            alert("..?");
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
    // eslint-disable-next-line no-eval
    // eval(code);
    // eslint-disable-next-line no-new-func
    const a = new Function(code)();
    console.log(a);
  }, [code]);

  React.useEffect(() => {
    const 키보드탐지 = (event) => {
      // Should do nothing if the default action has been cancelled
      if (event.defaultPrevented) {
        return;
      }

      const key_code = event.keyCode;

      switch (key_code) {
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
  }, [코드실행]);

  if (exam === null) {
    return <div>;;</div>;
  }

  return (
    <div style={{ backgroundColor: "#263747", height: "100vh" }}>
      <div style={{ padding: 20, borderBottom: "1px solid #263238" }}>
        <h2>{exam.title}</h2>
      </div>
      <div style={{ display: "flex", height: "85%" }}>
        <div
          className="scrollBar"
          style={{
            width: "45%",
            padding: 20,
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

          <div>
            <h1>{code}</h1>
          </div>
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
