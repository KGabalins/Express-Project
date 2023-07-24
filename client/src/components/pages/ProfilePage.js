import { useEffect, useState } from "react";
import classes from "./ProfilePage.module.css";
import axios from "axios";

const ProfilePage = () => {
  const [currUser, setCurrUser] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    axios
      .get("/user", { headers: { Authorization: token } })
      .then((response) => {
        setCurrUser(response.data);
      })
      .catch((error) => console.log(error));
  };

  const changeEmail = () => {
    const enteredEmail = prompt("Change email:");

    if (validEmail(enteredEmail)) {
      axios.get(`/user/perm/${enteredEmail}`).then((resp) => {
        if (resp.data.Items.length === 0) {
          axios.get(`/user/${enteredEmail}`).then((response) => {
            if (response.data.Items.length === 0) {
              axios
                .post(`/user/${currUser.email}`, { email: enteredEmail })
                .then((response) => {
                  setCurrUser(response.data.Items[0]);
                  localStorage.setItem(
                    "currentUser",
                    JSON.stringify(response.data.Items[0])
                  );
                });
            } else {
              alert("User with this email already exists!");
            }
          });
        } else {
          alert("User with this email already exists!");
        }
      });
    } else {
      alert("This is not a valid email!");
    }
  };

  const changePassword = () => {
    const enteredPassword = prompt("Change password:") || "";

    if (enteredPassword.length > 7) {
      axios
        .put(`/user/${currUser.email}`, { password: enteredPassword })
        .then(alert("Password changed succesfully!"));
    } else {
      alert("Your password should be atleast 8 characters long!");
    }
  };

  const validEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

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
