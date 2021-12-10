import React from "react";
import {FaSistrix} from "react-icons/fa"
import { FcBusinessman,FcSms,FcMms,FcGlobe } from "react-icons/fc";
import { ContextProvider } from "../global/Context";
import log from "../images/logoo.png"
const Navbar = () => {

  const {model, openModel,user,loader,logout} = React.useContext(ContextProvider)
  console.log("my model ", model);
  const openForms = () => {
    openModel();
  }

  const userLogout = () => {
    logout()

  }

const checkUser = () => {

  return !loader ? !loader && user ?(
    <li><FcBusinessman  className="icn" onClick={openForms}/>{user.email}/ <span onClick={userLogout}><button type="button" class="btn btn-danger own-btn">Logout</button></span></li>)
  
   :(<li><FcBusinessman   className="icn" onClick={openForms}/></li>): <span class="spinner-border text-danger" role="status"> </span>
 
        

}

  return (
    <div className="navbarChat">
      <div className="navbarChat__first">
        <div className="navbarChat__firstlogo">

         <img src={log} style={{width: "57%",height: "44%",marginLeft: "-32%",marginTop: "5%"}}/>
        
        </div>
      </div>
      <div className="navbarChat__middle">
        <div className="navbarChat__middle-search">
          <input type="text" className="navbarChat__search" placeholder="Search" />
          <FaSistrix className="searchIcon"/>
        </div>
      </div>
      <div className="navbarChat__last">
        <li>
          <FcGlobe className="icn"/>
        </li>
        <li>
          <FcMms className="icn"/>
        </li>
        <li>
          <FcSms className="icn"/>
        </li>

        <li>
      
       {checkUser()}
        </li>
      
      </div>

    </div>




  );
};

export default Navbar;
