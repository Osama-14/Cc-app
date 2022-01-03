import React from "react";
import Home from "./Home";
import Navbar2 from "../Navbar2";
import "../../App.css";

const index = ({...props}) => {

  return (
    <div>
      <div>
        <Navbar2 />
      </div>
      <div className="">
        <Home />
      </div>
    </div>
  );
};

export default index;
