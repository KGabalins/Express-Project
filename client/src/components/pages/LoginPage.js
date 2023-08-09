import { useEffect } from "react";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/users/isLoggedIn")
      .then((response) => {
        const isLoggedIn = response.data.isLoggedIn;
        if (isLoggedIn) {
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // Login form submition handler
  function loginHandler({ email, password }, error) {
    axios
      .post("/users/login", { email, password })
      .then((response) => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        error.style.display = "inline-block";
        error.innerText = err.response.data.message;
      });
  }

  // Register form submition handler
  function registerHandler(
    { name, surname, email, reemail, password, repassword },
    error
  ) {
    axios
      .post("/users", { name, surname, email, reemail, password, repassword })
      .then(() => {
        axios.post("/users/login", { email, password }).then(() => {
          navigate("/", { replace: true });
        });
      })
      .catch((err) => {
        error.style.display = "inline-block";
        error.innerText = err.response.data.message;
      });
  }

  return (
    <>
      <LoginForm onLogin={loginHandler} />
      <RegisterForm onRegister={registerHandler} />
    </>
  );
};

export default LoginPage;
