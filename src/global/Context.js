import React, { createContext } from "react";
import { auth } from "../../src/Config";
export const ContextProvider = createContext();

const Context = (props) => {
  const [model, setModel] = React.useState(false);
  const openModel = () => {
    setModel(true);
  };
  const closeModel = () => {
    setModel(false);
  };
  const register = async (user) => {
    const { username, email, password } = user;
    try {
      // console.log(firebasse);
      const res = await auth.createUserWithEmailAndPassword(email, password);
      res.user.updateProfile({ displayName: username });
      console.log(res);
      setModel(false);
    } catch (error) {
      console.log("error");
    }
  };

  const login = async (user) => {
    const { email, password } = user;
    const res = await auth.signInWithEmailAndPassword(email, password);
    setModel(false);
  };
  return (
    <ContextProvider.Provider
      value={{ model, openModel, closeModel, register, login }}
    >
      {props.children}
    </ContextProvider.Provider>
  );
};

export default Context;
