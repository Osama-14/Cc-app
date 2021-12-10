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
} from "../Config";
export const ContextProvider = createContext();

const Context = (props) => {
  const [model, setModel] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [loader, setLoader] = React.useState(true);

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
      const displayName = { displayName: username };
      setModel(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const login = async (user) => {
    const { email, password } = user;
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
    setModel(false);
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

  const create = async (data) => {
    // const { title, image } = data;
    // const upload = storageRef(`images/${image.name}`).put(image);
    // upload.on(
    //   "state_changed",
    //   (snp) => {
    //     let progress = (snp.bytesTransferred / snp.totalBytes)*100;
    //     console.log(progress);
    //   },
    //   (err) => {
    //     console.log(err)
    //   },
    //   () => {

    //   }
    // )

    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
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
      }}
    >
      {props.children}
    </ContextProvider.Provider>
  );
};

export default Context;
