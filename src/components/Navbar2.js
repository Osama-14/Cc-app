import React from "react";
import ReorderIcon from "@material-ui/icons/Reorder";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { ContextProvider } from "../global/Context";
import { FcBusinessman, FcSms, FcMms, FcGlobe } from "react-icons/fc";

import "./navbar2.css";
const Navbar2 = () => {
  const navigate = useNavigate();
  const toggleClose = () => {};

  const { model, openModel, user, loader, logout, username } =
    React.useContext(ContextProvider);
  const openForms = () => {
    openModel();
  };

  const userLogout = () => {
    logout();
  };

  const checkUser = () => {
    return !loader ? (
      !loader && user ? (
        <li className="user_email">
          <FcBusinessman className="icn" onClick={openForms} />
          {username}
        </li>
      ) : (
        <li>
          <FcBusinessman className="icn" onClick={openForms} />
        </li>
      )
    ) : (
      <li class="spinner-border text-danger" role="status"></li>
    );
  };

  return (
    <>
      <div className="navigation">
        <div className="toggle">
          <ReorderIcon className="sideBar" onClick={toggleClose} />
        </div>

        <ul className="for-ul">
          <li className="for-li" onClick={() => navigate("/signup")}>
            <a href="#" />
            <span className="icon">
              <PersonOutlineIcon style={{ color: "white" }} />
            </span>
            <span className="title">Profile</span>
          </li>

          <li className="for-li" onClick={() => navigate("/home")}>
            <span className="icon icons">
              <HomeIcon style={{ color: "white" }} size={50} />
            </span>
            <span className="title">Home</span>
          </li>
          <li className="for-li" onClick={() => navigate("/create")}>
            <a href="#" />
            <span className="icon">
              <PostAddIcon style={{ color: "white" }} />
            </span>
            <span className="title">Post</span>
          </li>

          <li className="for-li">
            <a href="#" />
            <span className="icon">
              <HelpOutlineIcon style={{ color: "white" }} />
            </span>
            <span className="title">Help</span>
          </li>
          <li className="for-li" onClick={() => navigate("/settings")}>
            <a href="#" />
            <span className="icon">
              <SettingsApplicationsIcon style={{ color: "white" }} />
            </span>
            <span className="title">Settings</span>
          </li>

          <li className="for-li" onClick={userLogout}>
            <a href="#" />
            <span className="icon">
              <ExitToAppIcon style={{ color: "white" }} />
            </span>
            <span className="title">Logout</span>
          </li>
        </ul>




        
      </div>
      <li>{checkUser()}</li>
    </>
  );
};

export default Navbar2;
