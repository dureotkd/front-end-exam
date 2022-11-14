import React from "react";
import { useParams } from "react-router-dom";

import CodePen from "../components/CodePen";

function MarkUpExam() {
  const { lang, seq } = useParams();

  return (
    <div>
      <CodePen />
    </div>
  );
}

export default MarkUpExam;
