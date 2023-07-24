import classes from "./LoginPage.module.css";
import { useRef } from "react";

const RegisterForm = (props) => {
  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const emailInputRef = useRef();
  const reemailInputRef = useRef();
  const passwordInputRef = useRef();
  const repasswordInputRef = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredReemail = reemailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredRepassword = repasswordInputRef.current.value;

    const registerError = document.getElementById("registerError");

    const userData = {
      name: enteredName,
      surname: enteredSurname,
      email: enteredEmail,
      reemail: enteredReemail,
      password: enteredPassword,
      repassword: enteredRepassword,
      role: "user",
    };

    props.onRegister(userData, registerError);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.loginContainer}>
        <p id="registerError" className={classes.error}>
          {" "}
        </p>
        <div className={classes.input}>
          <label>Name</label>
          <input
            type="text"
            placeholder="name"
            id="name"
            ref={nameInputRef}
            required
          ></input>
        </div>
        <div className={classes.input}>
          <label>Surname</label>
          <input
            type="text"
            placeholder="surname"
            id="surname"
            ref={surnameInputRef}
          ></input>
        </div>
        <div className={classes.input}>
          <label>Email</label>
          <input
            type="email"
            placeholder="email"
            id="email"
            ref={emailInputRef}
            required
          ></input>
        </div>
        <div className={classes.input}>
          <label>Email again</label>
          <input
            type="email"
            placeholder="email"
            id="reemail"
            ref={reemailInputRef}
            required
          ></input>
        </div>
        <div className={classes.input}>
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            ref={passwordInputRef}
            required
          ></input>
        </div>
        <div className={classes.input}>
          <label>Password again</label>
          <input
            type="password"
            placeholder="password"
            id="repassword"
            ref={repasswordInputRef}
            required
          ></input>
        </div>
        <div className={classes.button}>
          <button>Sign up</button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
