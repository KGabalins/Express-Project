import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  UpdatePasswordData,
  resetStatuses,
  selectUpdatePasswordStatus,
  selectUserError,
  updatePassword,
} from "../../features/usersSlice";

export const UpdatePasswordForm = () => {
  const [updatePasswordForm, setUpdatePasswordForm] =
    useState<UpdatePasswordData>({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isActive, setIsActive] = useState(false);

  const dispatch = useAppDispatch();
  const status = useAppSelector(selectUpdatePasswordStatus);
  const error = useAppSelector(selectUserError);

  console.log(error);

  // useEffect(() => {
  //   // if (status === "succeeded") {
  //   //   setSuccessMessage("Password updated successfully!");
  //   //   setErrorMessage("");
  //   //   clearForm();
  //   // } else if (status === "failed") {
  //   //   setSuccessMessage("");
  //   //   const errorCode = error?.substr(-3);
  //   //   console.log(errorCode);
  //   //   if (errorCode === "422")
  //   //     setErrorMessage("Incorrectly filled input fields!");
  //   //   else if (errorCode === "403") {
  //   //     setErrorMessage("Incorect old password!");
  //   //   }
  //   // } else {
  //   //   setErrorMessage("");
  //   //   setSuccessMessage("");
  //   // }
  // }, [status, error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updatePassword(updatePasswordForm));
  };

  const clearForm = () => {
    setUpdatePasswordForm({
      newPassword: "",
      confirmNewPassword: "",
      oldPassword: "",
    });
  };

  const toggleDisplay = () => {
    const allButtons = document.querySelectorAll("button");

    setIsActive((prevState) => !prevState);

    allButtons.forEach((button) => {
      button.disabled = !button.disabled;
    });

    dispatch(resetStatuses());
  };

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatePasswordForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      <button
        className="bg-zinc-700 sm:w-44 text-base text-white rounded-full py-1"
        onClick={toggleDisplay}
      >
        Update password
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
        <h2 className="text-center font-bold text-2xl mb-5">Update password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label htmlFor="oldPassword">
            Current Password
            {successMessage && (
              <span className="text-green-700">{` - ${successMessage}`}</span>
            )}
            {errorMessage && (
              <span className="text-red-700">{` - ${errorMessage}`}</span>
            )}
          </label>
          <input
            type="password"
            id="oldPassword"
            value={updatePasswordForm.oldPassword}
            placeholder="password"
            name="oldPassword"
            onChange={handelChange}
          />
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={updatePasswordForm.newPassword}
            placeholder="new password"
            name="newPassword"
            onChange={handelChange}
          />
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            value={updatePasswordForm.confirmNewPassword}
            placeholder="new password"
            name="confirmNewPassword"
            onChange={handelChange}
          />

          <button
            className="bg-zinc-700 text-white w-28 h-8 rounded-full self-center my-2"
            disabled={!isActive}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};
