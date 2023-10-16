import { useContext, useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import axiosInstance from "../configs/AxiosConfig";

export type UserType = {
  email: string;
  name: string;
  surname?: string;
  role: string;
};

export type ErrorData = {
  type: string;
  message: string;
};

type UserContextType = {
  currentUser: UserType | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export type LoginFormAttributes = {
  email: string;
  password: string;
};

export type RegisterFormAttributes = {
  name: string;
  surname?: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

export const UserContext = createContext({} as UserContextType);

const UserContextProvider = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(
    {} as UserType
  );

  useEffect(() => {
    axiosInstance
      .get(`api/users`)
      .then((response) => {
        const userData: UserType = response.data;

        setCurrentUser(userData);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <Outlet />
      </UserContext.Provider>
    </>
  );
};

const logoutUser = (
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>
) => {
  axiosInstance
    .delete(`/api/users/logout`)
    .then(() => {
      setCurrentUser(null);
    })
    .catch(() => {
      setCurrentUser(null);
    });
};

const refreshUserData = (
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>
) => {
  axiosInstance
    .get(`/api/users`)
    .then((response) => {
      const userData: UserType = response.data;

      setCurrentUser(userData);
    })
    .catch(() => {
      setCurrentUser(null);
    });
};

const checkUserStatus = (
  currentUser: UserType | null,
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>
) => {
  axiosInstance.get(`users/isLoggedIn`).then((response) => {
    if (!response.data.isLoggedIn && currentUser) {
      setCurrentUser(null);
    }
  });
};

const loginUser = (
  loginFormAttributes: LoginFormAttributes,
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>
) => {
  axiosInstance
    .post(`/api/users/login`, loginFormAttributes)
    .then((response) => {
      setCurrentUser(response.data);
    })
    .catch((error: any) => {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        throw new Error(error.response.data[0].message);
      } else {
        throw new Error(error.response.data.message);
      }
    });
};

const registerUser = async (registerFormAttributes: RegisterFormAttributes) => {
  try {
    await axiosInstance.post("/api/users", registerFormAttributes);
  } catch (error: any) {
    if (Array.isArray(error.response.data)) {
      throw new Error(error.response.data[0].message);
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

const useUserContext = () => {
  return useContext(UserContext);
};

export {
  UserContextProvider,
  useUserContext,
  logoutUser,
  checkUserStatus,
  refreshUserData,
  loginUser,
  registerUser,
};
