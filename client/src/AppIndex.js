import React from "react";

import { Routes, Route } from "react-router-dom";

import { Login, Join, Admin, Exam, AdminQuestion, MarkUpExam } from "./pages";

function AppIndex() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/join" element={<Join />} />
      <Route path="/exam/:seq" element={<Exam />} />
      <Route path="/exam/:lang/:seq" element={<MarkUpExam />} />
      <Route exact path="/admin/exam" element={<Admin />} />
      <Route exact path="/admin/question" element={<AdminQuestion />} />
    </Routes>
  );
}

export default AppIndex;
