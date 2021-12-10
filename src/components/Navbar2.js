import React from "react";
import ReorderIcon from "@material-ui/icons/Reorder";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import { ContextProvider } from "../global/Context";

import "./navbar2.css";
const Navbar2 = () => {
  const navigate = useNavigate();
  navigate("/create");
  const toggleClose = () => {};



//   const {model, openModel,user,loader,logout} = React.useContext(ContextProvider)
//   console.log("my model ", model);
//   const openForms = () => {
//     openModel();
//   }

//   const userLogout = () => {
//     logout()

//   }

// const checkUser = () => {

//   return (!loader ? !loader && user ?(
//     <li> <span>className="icn" onClick={openForms}{user.email}</span> <span onClick={userLogout}><button type="button" class="btn btn-danger own-btn">Logout</button></span></li>)
  
//    :(<li><span   className="icn" onClick={openForms}></span></li>): <span class="spinner-border text-danger" role="status"> </span>
 
        

//   )}



  




  
  return (
    <div>
      <div className="navigation">
        <div className="toggle">
          <ReorderIcon className="sideBar" onClick={toggleClose} />
        </div>

        <ul className="for-ul">
        <li className="for-li" onClick={() => navigate("/signup")}>
            <a href="#" />
            <span className="icon">

              
                <PersonOutlineIcon/>
            </span>
            <span className="title">Profile</span>
          </li>

          <li className="for-li">
            {/* <a className="for-a" href="#"/> */}
            <span className="icon icons">
              <HomeIcon size={50} color="white"/>
            </span>
            <span className="title">Home</span>
          </li>
          <li className="for-li" onClick={() => navigate('/create')}>
            <a href="#" />
            <span className="icon">
           < PostAddIcon/>
            </span>
            <span className="title">Post</span>
          </li>

          <li className="for-li">

            <a href="#" />
            <span className="icon">

            <HelpOutlineIcon/>
            </span>
            <span className="title">Help</span>
          </li>
          <li className="for-li">
            <a href="#" />
            <span className="icon">
                <SettingsApplicationsIcon/>
            </span>
            <span className="title">Settings</span>
          </li>

          <li className="for-li">
            <a href="#" />
            <span className="icon">
            <ExitToAppIcon/>

              
            </span>
            <span className="title">Logout</span>
          </li>

        </ul>

        
      </div>
      {/* <li>
      
      {checkUser()}
       </li> */}
    </div>
  );
};

export default Navbar2;
