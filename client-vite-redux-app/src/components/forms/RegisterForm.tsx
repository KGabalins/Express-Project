import React, { useState } from "react";
import { RegisterFormAttributes } from "../contexts/UserContext";
import { registerUser } from "../utils/userFunctions";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await registerUser(registerFormAttributes);
      clearForm();
      setSuccess("User registered successfully!");
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterFormAttributes((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
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
    <div className="flex justify-center">
      <form
        className="flex flex-col border-none bg-white px-8 py-6 rounded-3xl mb-5 w-72"
        onSubmit={handleSubmit}
      >
        <label htmlFor="registerName">
          Name
          {success && (
            <span className="text-green-700 font-normal">{` - ${success}`}</span>
          )}
          {errorMessage && (
            <span className="text-red-700 font-normal">{` - ${errorMessage}`}</span>
          )}
        </label>
        <input
          type="text"
          id="registerName"
          placeholder="name"
          name="name"
          className="bg-neutral-200 px-2 mb-5 mt-1"
          value={registerFormAttributes.name}
          onChange={handleChange}
        />
        <label htmlFor="registerSurname">Surname</label>
        <input
          type="text"
          id="registerSurname"
          placeholder="surname"
          name="surname"
          className="bg-neutral-200 px-2 mb-5 mt-1"
          value={registerFormAttributes.surname}
          onChange={handleChange}
        />
        <label htmlFor="registerEmail">Email</label>
        <input
          type="email"
          id="registerEmail"
          placeholder="email"
          name="email"
          className="bg-neutral-200 px-2 mb-5 mt-1"
          value={registerFormAttributes.email}
          onChange={handleChange}
        />
        <label htmlFor="registerConfirmEmail">Confirm Email</label>
        <input
          type="email"
          id="registerConfirmEmail"
          placeholder="email"
          name="confirmEmail"
          className="bg-neutral-200 px-2 mb-5 mt-1"
          value={registerFormAttributes.confirmEmail}
          onChange={handleChange}
        />
        <label htmlFor="registerPassword">Password</label>
        <input
          type="password"
          id="registerPassword"
          placeholder="password"
          name="password"
          className="bg-neutral-200 px-2 mb-5 mt-1"
          value={registerFormAttributes.password}
          onChange={handleChange}
        />
        <label htmlFor="registerConfirmPassword">Confirm Password</label>
        <input
          type="password"
          id="registerConfirmPassword"
          placeholder="password"
          name="confirmPassword"
          className="bg-neutral-200 px-2 mb-5 mt-1"
          value={registerFormAttributes.confirmPassword}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="text-white bg-zinc-700 font-bold self-center px-10 py-1 text-xl rounded-3xl"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};
