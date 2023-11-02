import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UpdateEmailData, updateEmail } from "../../features/usersSlice";

export const UpdateEmailForm = () => {
  const [updateEmailForm, setUpdateEmailForm] = useState<UpdateEmailData>({
    newEmail: "",
    confirmNewEmail: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isActive, setIsActive] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateEmail(updateEmailForm));
  };

  const clearForm = () => {
    setUpdateEmailForm({ newEmail: "", confirmNewEmail: "", password: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateEmailForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const toggleDisplay = () => {
    const allButtons = document.querySelectorAll("button");

    setIsActive((prevState) => !prevState);

    allButtons.forEach((button) => {
      button.disabled = !button.disabled;
    });
  };

  return (
    <>
      <button
        className="bg-zinc-700 sm:w-44 text-base text-white rounded-full py-1"
        onClick={toggleDisplay}
      >
        Update email
      </button>
      <div
        className={`fixed shadow-xl transition-all duration-500 px-5 py-3 w-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col bg-neutral-200 ${
          isActive
            ? " opacity-100 visible place-self-center top-1/2"
            : "opacity-0 invisible top-[40%]"
        }`}
      >
        <button
          className="self-end font-bold hover:text-gray-600 active:text-gray-800"
          disabled={!isActive}
          onClick={toggleDisplay}
        >
          X
        </button>
        <h2 className="text-center font-bold text-2xl mb-5">Update email</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label htmlFor="newEmail">
            New Email
            {successMessage && (
              <span className="text-green-700">{` - ${successMessage}`}</span>
            )}
            {errorMessage && (
              <span className=" text-red-700">{` - ${errorMessage}`}</span>
            )}
          </label>
          <input
            type="text"
            id="newEmail"
            value={updateEmailForm.newEmail}
            placeholder="email@example.com"
            name="newEmail"
            onChange={handleChange}
          />
          <label htmlFor="confirmNewEmail">Confirm New Email</label>
          <input
            type="text"
            id="confirmNewEmail"
            value={updateEmailForm.confirmNewEmail}
            placeholder="email@example.com"
            name="confirmNewEmail"
            onChange={handleChange}
          />
          <label htmlFor="password">Current Password</label>
          <input
            type="password"
            id="password"
            value={updateEmailForm.password}
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <button
            className="bg-zinc-700 w-28 h-8 rounded-full self-center text-white my-2"
            disabled={!isActive}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};
