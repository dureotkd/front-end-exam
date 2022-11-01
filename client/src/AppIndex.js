import React from "react";

import { Routes, Route } from "react-router-dom";

import { Login, Join, Main } from "./pages";

function AppIndex() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/join" element={<Join />} />
    </Routes>
  );
}

export default AppIndex;
