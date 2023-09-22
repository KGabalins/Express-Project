import "../styles/LoginForm.css";
import { useContext, useState } from "react";
import { LoginFormAttributes } from "../contexts/UserContextProvider";
import { UserContext } from "../contexts/UserContext";
import axiosInstance from "../configs/AxiosConfig";

export const LoginForm = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [loginFormAttributes, setLoginFormAttributes] =
    useState<LoginFormAttributes>({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  console.log();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosInstance
      .post(`/users/login`, loginFormAttributes)
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error: any) => {
        if (Array.isArray(error.response.data)) {
          setErrorMessage(error.response.data[0].message);
        } else {
          setErrorMessage(error.response.data.message);
        }
      });
  };

  return (
    <div className="loginDiv">
      <form className="loginForm" onSubmit={handleSubmit}>
        <label id="emailInput">
          Email{errorMessage && <span className="errorText">{` - ${errorMessage}`}</span>}
        </label>
        <input
          type="email"
          id="emailInput"
          placeholder="email"
          value={loginFormAttributes.email}
          onChange={(e) =>
            setLoginFormAttributes((prevState) => {
              return { ...prevState, email: e.target.value };
            })
          }
        />
        <label id="passwordInput">Password</label>
        <input
          type="password"
          id="passwordInput"
          placeholder="password"
          value={loginFormAttributes.password}
          onChange={(e) =>
            setLoginFormAttributes((prevState) => {
              return { ...prevState, password: e.target.value };
            })
          }
        />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};
