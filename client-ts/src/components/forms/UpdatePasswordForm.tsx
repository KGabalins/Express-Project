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

  return (
    <form onSubmit={handleSubmit} className="popupForm">
      <label htmlFor="password">
        Current Password
        {successMessage && (
          <span className="successText">{` - ${successMessage}`}</span>
        )}
        {errorMessage && (
          <span className="errorText">{` - ${errorMessage}`}</span>
        )}
      </label>
      <input
        type="password"
        id="password"
        value={updatePasswordForm.oldPassword}
        placeholder="password"
        onChange={(e) =>
          setUpdatePasswordForm((prevState) => {
            return { ...prevState, oldPassword: e.target.value };
          })
        }
      />
      <label htmlFor="newPassword">New Password</label>
      <input
        type="password"
        id="newPassword"
        value={updatePasswordForm.newPassword}
        placeholder="new password"
        onChange={(e) =>
          setUpdatePasswordForm((prevState) => {
            return { ...prevState, newPassword: e.target.value };
          })
        }
      />
      <label htmlFor="confirmNewPassword">Confirm New Password</label>
      <input
        type="password"
        id="confirmNewPassword"
        value={updatePasswordForm.confirmNewPassword}
        placeholder="new password"
        onChange={(e) =>
          setUpdatePasswordForm((prevState) => {
            return { ...prevState, confirmNewPassword: e.target.value };
          })
        }
      />

      <button className="acceptButton">Update</button>
    </form>
  );
};
