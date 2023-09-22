import "../styles/LoginForm.css";
import { useState } from "react";
import { RegisterFormAttributes } from "../contexts/UserContextProvider";
import axiosInstance from "../configs/AxiosConfig";

export const RegisterForm = () => {
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registerFormAttributes, setRegisterFormAttributes] =
    useState<RegisterFormAttributes>({
      name: "",
      surname: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosInstance
      .post(`/users`, registerFormAttributes)
      .then(() => {
        setSuccess("User succesfully registered!");
        setErrorMessage("");
        clearForm();
      })
      .catch((error: any) => {
        setSuccess("");
        if (Array.isArray(error.response.data)) {
          setErrorMessage(error.response.data[0].message);
        } else {
          setErrorMessage(error.response.data.message);
        }
      });
  };

  const clearForm = () => {
    setRegisterFormAttributes({
      name: "",
      surname: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="loginDiv">
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="registerName">
          Name
          {success && <span className="successText">{` - ${success}`}</span>}
          {errorMessage && <span>{` - ${errorMessage}`}</span>}
        </label>
        <input
          type="text"
          id="registerName"
          placeholder="name"
          value={registerFormAttributes.name}
          onChange={(e) =>
            setRegisterFormAttributes((prevState) => {
              return { ...prevState, name: e.target.value };
            })
          }
        />
        <label htmlFor="registerSurname">Surname</label>
        <input
          type="text"
          id="registerSurname"
          placeholder="surname"
          value={registerFormAttributes.surname}
          onChange={(e) =>
            setRegisterFormAttributes((prevState) => {
              return { ...prevState, surname: e.target.value };
            })
          }
        />
        <label htmlFor="registerEmail">Email</label>
        <input
          type="email"
          id="registerEmail"
          placeholder="email"
          value={registerFormAttributes.email}
          onChange={(e) =>
            setRegisterFormAttributes((prevState) => {
              return { ...prevState, email: e.target.value };
            })
          }
        />
        <label htmlFor="registerConfirmEmail">Confirm Email</label>
        <input
          type="email"
          id="registerConfirmEmail"
          placeholder="email"
          value={registerFormAttributes.confirmEmail}
          onChange={(e) =>
            setRegisterFormAttributes((prevState) => {
              return { ...prevState, confirmEmail: e.target.value };
            })
          }
        />
        <label htmlFor="registerPassword">Password</label>
        <input
          type="password"
          id="registerPassword"
          placeholder="password"
          value={registerFormAttributes.password}
          onChange={(e) =>
            setRegisterFormAttributes((prevState) => {
              return { ...prevState, password: e.target.value };
            })
          }
        />
        <label htmlFor="registerConfirmPassword">Confirm Password</label>
        <input
          type="password"
          id="registerConfirmPassword"
          placeholder="password"
          value={registerFormAttributes.confirmPassword}
          onChange={(e) =>
            setRegisterFormAttributes((prevState) => {
              return { ...prevState, confirmPassword: e.target.value };
            })
          }
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};
