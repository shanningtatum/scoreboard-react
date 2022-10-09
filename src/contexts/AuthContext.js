import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // function to sign in anonymously
  const anonUser = () => {
    return signInAnonymously(auth);
  };

  // function to sign users out of the account
  const logoutUser = () => {
    return signOut(auth);
  };

  // function to sign users in the account
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // this will only run if the auth state changes (user signs in, signs out)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ loginUser, logoutUser, user, anonUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
