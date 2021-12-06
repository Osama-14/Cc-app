import react, { useEffect, useState } from "react";
import React, { createContext } from "react";
import { auth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "../Config";
export const ContextProvider = createContext();


const Context = (props) => {
  const [model, setModel] = React.useState(false);
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
      const displayName = ({displayName: username});
      setModel(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const login = async (user) => {
    const { email, password } = user;
    const res = await signInWithEmailAndPassword( auth, email, password);
    setModel(false);
  };

  const logout = () => {
    
    auth.signOut().then(() => {
      setUser(null)

    })
  .catch((error) => {
    console.log(error)
  })

  }

const create = data =>{
  const {title,image} = data;
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
}





  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoader(false);
    });
  },[]);
  console.log("login user",user)







  return (
    <ContextProvider.Provider
      value={{ model, openModel, closeModel, register, login,user,loader,logout,create }}
    >
      {props.children}
    </ContextProvider.Provider>
  );
};

export default Context ;
