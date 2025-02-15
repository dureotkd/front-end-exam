import React from "react";
import { UserContext } from "../App";

function AnswerSuccess({ last_yn, seq }) {
  const { setShowModal } = React.useContext(UserContext);

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
      <h2 className="text-2xl font-bold">정답입니다</h2>
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
}

export default AnswerSuccess;
