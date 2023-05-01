import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { loginUser, verifyUser } from "./authUtils";
import {
  setUserToken,
  getUserToken,
  removeUserToken,
} from "./authLocalStorage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [shouldRefresh, setshouldRefresh] = useState(false);
  useEffect(() => {
    const userToken = getUserToken();
    setUser(userToken);
  }, [shouldRefresh]);

  useEffect(() => {
    const responseFetch = async () => {
      const verifiedUser = await verifyUser(user);
      if (verifiedUser.success) {
        setIsVerified(true);
      }
      if (
        verifiedUser.response &&
        verifiedUser.response.data.success === false
      ) {
        await logout();
      }
    };
    if (user) responseFetch();
  }, [user]);

  const login = async (data) => {
    setshouldRefresh(true);
    const loginResult = await loginUser(data);
    if (loginResult.success) {
      setUserToken(loginResult.token);
      setshouldRefresh(false);
      return loginResult.success;
    } else {
      setshouldRefresh(false);
      return loginResult.success;
    }
  };
  const logout = async () => {
    setshouldRefresh(true);
    const logoutResult = await removeUserToken();
    setIsVerified(false);
    setshouldRefresh(true);
    return logoutResult;
  };
  const value = useMemo(
    () => ({
      user,
      login,
      isVerified,
      logout,
    }),
    [user, isVerified]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, AuthContext, useAuth };
