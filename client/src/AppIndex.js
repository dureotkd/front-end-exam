import React from "react";

import { Routes, Route } from "react-router-dom";

import { Login, Join, Admin, Exam, AdminQuestion } from "./pages";

function AppIndex() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/join" element={<Join />} />
      <Route exact path="/exam">
        <Route path=":seq" element={<Exam />} />
      </Route>
      <Route exact path="/admin/exam" element={<Admin />} />
      <Route exact path="/admin/question" element={<AdminQuestion />} />
    </Routes>
  );
}

export default AppIndex;
