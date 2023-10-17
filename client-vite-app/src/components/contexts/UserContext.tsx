import { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

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
  refreshUsers: () => void;
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
    axios
      .get(`api/users`)
      .then((response) => {
        const userData: UserType = response.data;

        setCurrentUser(userData);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  const refreshUsers = () => {
    axios
      .get(`api/users`)
      .then((response) => {
        const userData: UserType = response.data;

        setCurrentUser(userData);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  };

  return (
    <>
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          refreshUsers,
        }}
      >
        <Outlet />
      </UserContext.Provider>
    </>
  );
};

export { UserContextProvider };
