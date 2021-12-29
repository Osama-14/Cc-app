import React from "react";
import ChitLogo from "../../../src/logoo.png";
import { ContextProvider } from "../../global/Context";
import { FcBusinessman} from "react-icons/fc";

import { useNavigate } from "react-router-dom";

import "./nav.css";
const Nav = () => {
  const navigate = useNavigate();


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
    <div>
      <div class="page-wrapper">
        <div class="nav-wrapper">
          <div class="grad-bar"></div>
          <nav class="navbar">
            <img src={ChitLogo} alt="Company Logo" />
            <div class="menu-toggle" id="mobile-menu">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </div>
            <ul class="nav no-search">
              <li class="nav-item">
                <a href="#">Home</a>
              </li>
              <li class="nav-item">
                <a href="#">About</a>
              </li>
              <li class="nav-item">
                <a href="#">Work</a>
              </li>
              <li class="nav-item"  onClick={() => navigate("/signup")}>
                <a href="#">Sign</a>
              </li>
              <li class="nav-item"  onClick={userLogout}>
                <a href="#">Logout</a>
              </li>
              <p id="search-icon">l</p>
              <input class="search-input" type="text" placeholder="Search.." />
            </ul>
          </nav>
        <li>{checkUser()}</li>


        </div>
       

      </div>
    </div>
  );
};

export default Nav;
