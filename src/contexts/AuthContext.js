import { createContext, useContext } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  console.log("aut context");
  const loginUser = (email, password) => {
    console.log(email, password);
    console.log("hello");
    return signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <UserContext.Provider value={{ loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
