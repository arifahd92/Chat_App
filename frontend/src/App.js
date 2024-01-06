import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy load components
const Signup = lazy(() => import("./components/user/Signup"));
const Login = lazy(() => import("./components/user/Login"));
const Protect = lazy(() => import("./components/user/Protect"));
const ErrorPage = lazy(() => import("./components/user/ErrorPage"));
const ChatApp = lazy(() => import("./components/chat/ChatApp"));
const GroupChat = lazy(() => import("./components/chat/GroupChat"));
const UserChat = lazy(() => import("./components/chat/UserChat"));

export default function App() {
  return (
    <>
      <Routes>
      
  <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<div>Loading...</div>}><Signup /></Suspense>} />

        <Route path="/chatapp" element={<Suspense fallback={<div>Loading...</div>}><Protect Component={ChatApp} /></Suspense>} />
        <Route path="/GROUPS/:name/:id" element={<Suspense fallback={<div>Loading...</div>}><GroupChat /></Suspense>} />
        <Route path="/USERS/:name/:id" element={<Suspense fallback={<div>Loading...</div>}><UserChat /></Suspense>} />
        <Route path="/*" element={<Suspense fallback={<div>Loading...</div>}><ErrorPage /></Suspense>} />
      </Routes>
      
    </>
  );
}
