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
        clearForm()
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

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newEmail">
        New Email
        {successMessage && (
          <span className="successText">{` - ${successMessage}`}</span>
        )}
        {errorMessage && (
          <span className="errorText">{` - ${errorMessage}`}</span>
        )}
      </label>
      <input
        type="text"
        id="newEmail"
        value={updateEmailForm.newEmail}
        onChange={(e) =>
          setUpdateEmailForm((prevState) => {
            return { ...prevState, newEmail: e.target.value };
          })
        }
      />
      <label htmlFor="confirmNewEmail">Confirm New Email</label>
      <input
        type="text"
        id="confirmNewEmail"
        value={updateEmailForm.confirmNewEmail}
        onChange={(e) =>
          setUpdateEmailForm((prevState) => {
            return { ...prevState, confirmNewEmail: e.target.value };
          })
        }
      />
      <label htmlFor="password">Current Password</label>
      <input
        type="password"
        id="password"
        value={updateEmailForm.password}
        onChange={(e) =>
          setUpdateEmailForm((prevState) => {
            return { ...prevState, password: e.target.value };
          })
        }
      />
      <button className="acceptButton">Update</button>
    </form>
  );
};
