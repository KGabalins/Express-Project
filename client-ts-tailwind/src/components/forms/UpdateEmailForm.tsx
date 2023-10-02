import { useState } from "react";
import axiosInstance from "../configs/AxiosConfig";

type UpdateEmailFormAttributes = {
  newEmail: string;
  confirmNewEmail: string;
  password: string;
};

export const UpdateEmailForm = () => {
  const [updateEmailForm, setUpdateEmailForm] =
    useState<UpdateEmailFormAttributes>({
      newEmail: "",
      confirmNewEmail: "",
      password: "",
    });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosInstance
      .put(`/users/changeEmail`, updateEmailForm)
      .then(() => {
        setErrorMessage("");
        setSuccessMessage("Email updated successfully!");
        clearForm();
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
    setUpdateEmailForm({ newEmail: "", confirmNewEmail: "", password: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateEmailForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
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
      <button className="bg-zinc-700 w-28 h-8 rounded-full self-center text-white my-2">Update</button>
    </form>
  );
};
