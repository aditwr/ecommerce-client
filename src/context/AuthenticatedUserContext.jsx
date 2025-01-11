import { createContext, useContext } from "react";

const AuthenticatedUserContext = createContext(null);

export const useAuthenticatedUser = () => {
  return useContext(AuthenticatedUserContext);
};

export const AuthenticatedUserProvider = ({ children, authenticatedUser }) => {
  return (
    <AuthenticatedUserContext.Provider value={authenticatedUser}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
