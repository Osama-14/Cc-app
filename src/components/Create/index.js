import React from "react";
import Post from "./Post/Post";
import Navbar2 from "../Navbar2";
import "../../App.css"

const index = () => {
  return (
    <div style={{margin: '0 auto'}}>
      <div>
        <Navbar2 />
      </div>
      <div className="post_main">
        <Post />
      </div>
    </div>
  );
};

export default index;
