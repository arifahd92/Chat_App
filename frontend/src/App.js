import React from "react";
import Signup from "./components/user/Signup";
import { Route, Routes } from "react-router-dom";
import Login from "./components/user/Login";

import Protect from "./components/user/Protect";
import ErrorPage from "./components/user/ErrorPage";
import ChatUI from "./components/chat/ChatUI";
import ChatApp from "./components/chat/ChatApp";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        <Route path="/*" element={<ErrorPage />} />
        <Route path="/chatapp" element={<Protect Component={ChatApp} />} />
      </Routes>
    </>
  );
}
