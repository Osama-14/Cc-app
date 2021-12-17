import React from "react";
import Profile from "./Profile";
import Navbar2 from "../Navbar2";
import "../../App.css";

const index = ({...props}) => {
  console.log("asdflklasjdf", props)
  return (
    <div>
      <div>
        <Navbar2 />
      </div>
      <div className="">
        <Profile />
      </div>
    </div>
  );
};

export default index;
