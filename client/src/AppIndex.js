import React from "react";

import { Routes, Route } from "react-router-dom";

import { Login, Join, Main } from "./pages";

function AppIndex() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/join" element={<Join />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppIndex;
