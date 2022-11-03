import React from "react";

import { Routes, Route } from "react-router-dom";

import { Login, Join, Main, Admin, Exam } from "./pages";

function AppIndex() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/main" element={<Main />} />
      <Route exact path="/join" element={<Join />} />
      <Route exact path="/exam">
        <Route path=":seq" element={<Exam />} />
      </Route>
      <Route exact path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default AppIndex;
