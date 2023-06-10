import { createContext, useContext, useState } from "react";
import { getUser, logIn, logOut } from "../services/userServices";

const authContext = createContext(null);
authContext.displayName = "auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  const refreshUser = () => {
    setUser(getUser());
  };

  const userLogin = async (user) => {
    const response = await logIn(user);
    refreshUser();
    return response;
  };

  const userLogOut = () => {
    logOut();
    refreshUser();
  };

  return (
    <authContext.Provider
      value={{ user, setUser, userLogin, userLogOut, refreshUser }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
