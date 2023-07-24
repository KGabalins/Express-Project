import { useEffect, useState } from "react";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  // If currentUser state is trutsy then navigate to home screen
  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser]);

  // Login form submition handler
  function loginHandler({ email, password }, error) {
    axios.post("/users/login", { email, password }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    });
  }

  // Register form submition handler
  function registerHandler(
    { name, surname, email, reemail, password, repassword },
    error
  ) {
    axios
      .post("/users", { name, surname, email, password })
      .then((response) => {
        console.log(response)
      }).catch(error => {
        console.log(error);
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
