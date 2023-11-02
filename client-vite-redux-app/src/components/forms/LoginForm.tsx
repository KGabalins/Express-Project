import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { LoginUserData, loginUser } from "../../features/usersSlice";

export const LoginForm = () => {
  const [loginFormAttributes, setLoginFormAttributes] = useState<LoginUserData>(
    { email: "", password: "" }
  );

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(loginUser(loginFormAttributes));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormAttributes((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const canSubmit = () => {
    return Object.values(loginFormAttributes).every(Boolean);
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col border-none bg-white px-8 py-6 rounded-3xl mb-14 w-72"
        aria-label="login-form"
        onSubmit={handleSubmit}
      >
        <label id="emailInput">Email</label>
        <input
          type="email"
          id="emailInput"
          placeholder="email"
          className="bg-neutral-200 px-2 mb-5 mt-1"
          value={loginFormAttributes.email}
          name="email"
          onChange={handleChange}
        />
        <label id="passwordInput">Password</label>
        <input
          type="password"
          id="passwordInput"
          placeholder="password"
          name="password"
          className="bg-neutral-200 px-2 mb-5 mt-1"
          value={loginFormAttributes.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="text-white bg-zinc-700 font-bold self-center px-10 py-1 text-xl rounded-3xl disabled:opacity-80"
          disabled={!canSubmit()}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};
