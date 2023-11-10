import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ({ Component }) {
  const navigate = useNavigate();
  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login") || false);
    if (!login) {
      navigate("/");
    }
  });

  return <Component />;
}
