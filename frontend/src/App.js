import React from "react";
import Signup from "./components/user/Signup";
import { Route, Routes } from "react-router-dom";
import Login from "./components/user/Login";

import Protect from "./components/user/Protect";
import ErrorPage from "./components/user/ErrorPage";

import ChatApp from "./components/chat/ChatApp";
import GroupChat from "./components/chat/GroupChat";
import UserChat from "./components/chat/UserChat";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        <Route path="/chatapp" element={<Protect Component={ChatApp} />} />
        <Route path="/GROUPS/:name/:id" element={<GroupChat />} />
        <Route path="/USERS/:name/:id" element={<UserChat />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
