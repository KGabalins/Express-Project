import { createContext } from "react";

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
  logoutUser: () => void;
  getCurrentUser: () => void;
};

export const UserContext = createContext({} as UserContextType);
