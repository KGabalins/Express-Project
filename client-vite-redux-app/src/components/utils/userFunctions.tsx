import axios from "axios";
import {
  LoginFormAttributes,
  RegisterFormAttributes,
  UserType,
} from "../contexts/UserContext";

const checkUserStatus = (
  currentUser: UserType | null,
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>
) => {
  axios.get(`users/isLoggedIn`).then((response) => {
    if (!response.data.isLoggedIn && currentUser) {
      setCurrentUser(null);
    }
  });
};

const loginUser = async (
  loginFormAttributes: LoginFormAttributes,
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>
) => {
  try {
    const response = await axios.post(`/api/users/login`, loginFormAttributes);
    setCurrentUser(response.data);
  } catch (error: any) {
    if (Array.isArray(error.response.data)) {
      throw new Error(error.response.data[0].message);
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

const registerUser = async (registerFormAttributes: RegisterFormAttributes) => {
  try {
    await axios.post("/api/users", registerFormAttributes);
  } catch (error: any) {
    if (Array.isArray(error.response.data)) {
      throw new Error(error.response.data[0].message);
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

const logoutUser = (
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>
) => {
  axios
    .delete(`/api/users/logout`)
    .then(() => {
      setCurrentUser(null);
    })
    .catch(() => {
      setCurrentUser(null);
    });
};

export { logoutUser, checkUserStatus, loginUser, registerUser };
