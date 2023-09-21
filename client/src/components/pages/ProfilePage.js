import { useEffect, useState } from "react";
import classes from "./ProfilePage.module.css";
import axios from "axios";

const ProfilePage = () => {
  const [currUser, setCurrUser] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  function getUserData() {
    axios
      .get("/users/")
      .then((response) => {
        setCurrUser(response.data);
      })
      .catch(() => {});
  }

  function changeEmail() {
    const newEmail = prompt("Enter your new email: ");
    const confirmNewEmail = prompt("Re-enter your new email: ");
    const password = prompt("Enter your current password: ");
    axios
      .put(`/users/changeEmail`, { newEmail, confirmNewEmail, password })
      .then(() => {
        alert("Email changed successfully!");
        getUserData();
      })
      .catch((error) => {
        const errorCode = error.response.status
        if (errorCode === 403) {
          alert("The current password you entered was incorrect!")
        } else {
          alert("Make sure that both emails are valid and they match!")
        }
      });
  }

  function changePassword() {
    const oldPassword = prompt("Enter your current password: ");
    const newPassword = prompt("Enter your new password: ");
    const confirmNewPassword = prompt("Re-enter your new password: ")

    axios.put(`/users/changePassword`, {oldPassword, newPassword, confirmNewPassword}).then(() => {
      alert("Password changed successfully!");
    }).catch(error => {
      const errorCode = error.response.status
      if (errorCode === 403) {
        alert("The current password you entered was incorrect!")
      } else {
        alert("Make sure the new password is atleast 8 characters long!")
      }
    })
  }

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>Profile</h2>
      <div className={classes.container}>
        <img
          src={require("../icons/default.png")}
          alt="profilePage"
          className={classes.picture}
        />
        <div className={classes.info}>
          <span>
            <strong>Name: </strong> {currUser.name}
          </span>
          <span>
            <strong>Surname: </strong> {currUser.surname}
          </span>
          <span>
            <strong>Email: </strong> {currUser.email}
          </span>
          <span>
            <strong>Role: </strong> {currUser.role}
          </span>
        </div>
        <div>
          <button className={classes.button} onClick={changePassword}>
            Reset password
          </button>
        </div>
        <div className={classes.emailButton}>
          <button className={classes.button} onClick={changeEmail}>
            Reset email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
