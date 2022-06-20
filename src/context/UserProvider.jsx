import { createContext, useEffect, useState } from "react";
import firebaseApp from "../Firebase";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from "firebase/auth";
const auth = getAuth(firebaseApp);

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(false);

  // method to logout user
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        const { email, metadata, phoneNumber, photoURL, displayName, uid } =
          user;
        setUser({
          email,
          metadata,
          phoneNumber,
          photoURL,
          displayName,
          uid,
        });
      } else {
        setUser(null);
      }
    });
    return () => {
      unsuscribe();
    };
  }, []);

  // register user
  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // login user
  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // logout user
  const logoutUser = () => signOut(auth);

  // delete user
  const deleteUserWhitID = () => {
    const userTest = getAuth().currentUser;
    return deleteUser(userTest);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        logoutUser,
        deleteUserWhitID,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
