import React from "react";

import { Viewer } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { useParams } from "react-router-dom";
import ajax from "../apis/ajax";

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
          console.log(data);
          if (!data) {
            alert("..?");
            return;
          }

          setExam(data);
        });
    })();
  }, [seq]);

  if (exam === null) {
    return <div>;;</div>;
  }

  console.log(exam);

  return (
    <div style={{ backgroundColor: "#263747", height: "100vh" }}>
      <div style={{ padding: 20, borderBottom: "1px solid #263238" }}>
        <h2>{exam.title}</h2>
      </div>
      <div
        className="scrollBar"
        style={{
          width: "35%",
          padding: 20,
          borderRight: "1px solid #263238",
          height: "85%",
          maxHeight: 800,
          overflow: "scroll",
          overflowX: "hidden",
        }}
      >
        <Viewer initialValue={exam?.body || ""} />
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
