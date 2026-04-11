import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const OAuthSuccess = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  console.log("OAuthSuccess hit:", token);
  if (token) {
    localStorage.setItem("token", token);
    login(token);
    window.history.replaceState({}, document.title, "/oauth-success");
    setTimeout(() => {
      navigate("/dashboard");
    }, 100);
  }
}, [login, navigate]);
  return <div>Logging you in...</div>;
};

export default OAuthSuccess;