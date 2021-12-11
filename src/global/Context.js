import react, { useEffect, useState } from "react";
import React, { createContext } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  addDoc,
  db,
  ref,
  storage,
  getDocs,
  where,
  query,
} from "../Config";
export const ContextProvider = createContext();

const Context = (props) => {
  const [model, setModel] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [loader, setLoader] = React.useState(true);
  const [username, setUsername] = React.useState("");

  const openModel = () => {
    setModel(true);
  };
  const closeModel = () => {
    setModel(false);
  };
  const register = async (user) => {
    const { username, email, password } = user;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      create(username, email);
      const displayName = { displayName: username };
      setModel(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const login = async (user) => {
    const { username, email, password } = user;
    const res = await signInWithEmailAndPassword(auth, email, password);
    //  res.user.updateProfile({displayName:username})

    getUser(email);

    setModel(false);
  };

  const getUser = async (email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUsername(doc.data().username);
      console.log(doc.id, " => ", doc.data());
    });
  };

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const create = async (username, email) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        username: username,
        email: email,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };


  const createPosts = async (url, email) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        url: url,
        email: email,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const testStorage = () => {
    const imagesRef = ref(storage, "images");
    const spaceRef = ref(storage, "images/space.jpg");
  };

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoader(false);
      console.log("");
      if (user) {
        getUser(user.email);
      }
    });
  }, []);

  return (
    <ContextProvider.Provider
      value={{
        model,
        openModel,
        closeModel,
        register,
        login,
        user,
        loader,
        logout,
        username,
        createPosts
      }}
    >
      {props.children}
    </ContextProvider.Provider>
  );
};

export default Context;
