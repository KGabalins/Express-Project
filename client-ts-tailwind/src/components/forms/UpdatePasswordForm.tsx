import { useState } from "react";
import axiosInstance from "../configs/AxiosConfig";

type UpdatePasswordFormAttributes = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const UpdatePasswordForm = () => {
  const [updatePasswordForm, setUpdatePasswordForm] =
    useState<UpdatePasswordFormAttributes>({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosInstance
      .put(`/users/changePassword`, updatePasswordForm)
      .then(() => {
        clearForm();
        setSuccessMessage("Password updated successfully!");
        setErrorMessage("");
      })
      .catch((error: any) => {
        setSuccessMessage("");
        if (Array.isArray(error.response.data)) {
          setErrorMessage(error.response.data[0].message);
        } else {
          setErrorMessage(error.response.data.message);
        }
      });
  };

  const clearForm = () => {
    setUpdatePasswordForm({
      newPassword: "",
      confirmNewPassword: "",
      oldPassword: "",
    });
  };

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatePasswordForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
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

      <button className="bg-zinc-700 text-white w-28 h-8 rounded-full self-center my-2">
        Update
      </button>
    </form>
  );
};
