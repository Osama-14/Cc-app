import React from "react";
import Home from "./Home";
import Navbar2 from "../Navbar2";
import "../../App.css"

const index = () => {
  return (
    <div style={{margin: '0 auto'}}>
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
