import React from "react";
import Settings from "./Settings";
import Navbar2 from "../Navbar2";
import "../../App.css"

const index = () => {
  return (
    <div style={{margin: '0 auto'}}>
      <div>
        <Navbar2 />
      </div>
      <div className="">
        <Settings />
      </div>
    </div>
  );
};

export default index;
