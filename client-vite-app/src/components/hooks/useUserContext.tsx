import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const useUserContext = () => {
  return useContext(UserContext);
};

export default useUserContext;
