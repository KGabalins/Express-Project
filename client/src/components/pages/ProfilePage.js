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
    const reNewEmail = prompt("Re-enter your new email: ");
    axios
      .put(`/users`, { email: newEmail, reemail: reNewEmail })
      .then(() => {
        alert("Email changed successfully!");
        getUserData();
      })
      .catch((error) => {
        alert(error.response.data.message)
      });
  }

  function changePassword() {
    const newPassword = prompt("Enter your new password: ");
    const reNewPassword = prompt("Re-enter your new password: ")

    axios.put(`/users/${currUser.email}`, {password: newPassword, repassword: reNewPassword}).then(() => {
      alert("Password changed successfully!");
    }).catch(error => {
      alert(error.response.data.message)
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
