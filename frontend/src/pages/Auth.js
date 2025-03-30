import React, { useEffect,useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import authAPI from '../api/authApi';
import { setCookie } from '../utils/cookie';
const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [sessionKey, setSessionKey] = useState(queryParams.get("sessionKey"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const hasRun = React.useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (sessionKey) {
      setCookie("sessionKey", sessionKey, { path: "/" });
    }
    authAPI.auth({ email: email, sessionKey: sessionKey }).then((res) => {
      console.log("Auth Response", res.detail);
      if (res.status === 200) {
        alert("Authentication successful");
        navigate("/");
      } else {
        navigate("/");
        alert(res.detail);
      }
    }).catch((error) => {
      console.error("Authentication error", error);
      localStorage.removeItem("email");
      setEmail(null);
      setSessionKey(null);
      document.cookie = `sessionKey=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      alert("Authentication failed");
      navigate("/");
    });
  }, [sessionKey, navigate]);
  
  return (
    <div>
      <h1>Authentication</h1>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <p>Redirecting...</p>
      </div>
    </div>
  );
};

export default Auth;