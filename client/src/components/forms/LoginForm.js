import classes from "./LoginPage.module.css";
import { useRef } from "react";

const LoginForm = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const loginError = document.getElementById("loginError");

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    props.onLogin(userData, loginError);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.loginContainer}>
        <p id="loginError" className={classes.error}></p>
        <div className={classes.input}>
          <label>Email</label>
          <input
            type="email"
            placeholder="email"
            ref={emailInputRef}
            required
          ></input>
        </div>
        <div className={classes.input}>
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            ref={passwordInputRef}
            required
          ></input>
        </div>
        <div className={classes.button}>
          <button>Sign in</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
