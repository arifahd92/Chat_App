import React from "react";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";

import Protect from "./components/Protect";
import Info from "./components/Info";
import ErrorPage from "./components/ErrorPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/info" element={<Protect Component={Info} />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
