import React, { useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";

import authAPI from '../api/authApi';
import {setCookie} from '../utils/cookie';
const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sessionKey = queryParams.get("sessionKey");
  const email = localStorage.getItem("email");

  useEffect(() => {
      let isMounted = true; // Prevents running logic if component unmounts
      if (sessionKey) {
        setCookie("sessionKey", sessionKey, { path: "/" });
      }
      authAPI.auth({ email: email, sessionKey: sessionKey }).then((res) => {
        if (isMounted) {
          console.log("Auth Response", res.detail);
          if (res.status === 200) {
            alert("Authentication successful");
            navigate("/");
          } else {
            navigate("/");
            alert(res.detail);

          }
        }
      }).catch((error) => {
        if (isMounted) {
          console.error("Authentication error", error);    
          localStorage.removeItem("email");
          document.cookie = `sessionKey=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          alert("Authentication failed");
          navigate("/");
        }
      });
      return () => {
        isMounted = false; // Cleanup to prevent side effects
      };
    }, [email, sessionKey]); // Dependency array ensures this runs only when email or sessionKey changes

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