import React,{useState} from "react";
import ReorderIcon from "@material-ui/icons/Reorder";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { ContextProvider } from "../global/Context";
import { FcBusinessman } from "react-icons/fc";
import Nav from '../components/animatedNav/Nav'


// import { alpha, makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import Badge from '@material-ui/core/Badge';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';


import "./navbar2.css";



// const useStyles = makeStyles((theme) => ({
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(3),
//       width: 'auto',
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
//   sectionDesktop: {
//     display: 'none',
//     [theme.breakpoints.up('md')]: {
//       display: 'flex',
//     },
//   },
//   sectionMobile: {
//     display: 'flex',
//     [theme.breakpoints.up('md')]: {
//       display: 'none',
//     },
//   },
// }));


const Navbar2 = ({...props}) => {



  // const [anchorEl, setAnchorEl] = useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =useState(null);

  // const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   handleMobileMenuClose();
  // };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  // const menuId = 'primary-search-account-menu';
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  //   </Menu>
  // );

  // const mobileMenuId = 'primary-search-account-menu-mobile';
  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl={mobileMoreAnchorEl}
  //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     id={mobileMenuId}
  //     keepMounted
  //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >
  //     <MenuItem>
  //       <IconButton aria-label="show 4 new mails" color="inherit">
  //         <Badge badgeContent={4} color="secondary">
  //           <MailIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Messages</p>
  //     </MenuItem>
  //     <MenuItem>
  //       <IconButton aria-label="show 11 new notifications" color="inherit">
  //         <Badge badgeContent={11} color="secondary">
  //           <NotificationsIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Notifications</p>
  //     </MenuItem>
  //     <MenuItem onClick={handleProfileMenuOpen}>
  //       <IconButton
  //         aria-label="account of current user"
  //         aria-controls="primary-search-account-menu"
  //         aria-haspopup="true"
  //         color="inherit"
  //       >
  //         <AccountCircle />
  //       </IconButton>
  //       <p>Profile</p>
  //     </MenuItem>
  //   </Menu>
  // );















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
      <div className="chat-navigation">
        <div className="chat-toggle">
          <ReorderIcon className="chat-sideBar" onClick={toggleClose} />
        </div>

        <ul className="chat-for-ul">
          <li className="chat-for-li" onClick={() => navigate("/signup")}>
            <a href="#" />
            <span className="chat-icon">
              <PersonOutlineIcon style={{ color: "white" }} />
            </span>
            <span className="chat-title">New User</span>
          </li>

          <li className="chat-for-li" onClick={() => navigate("/profile")}>
            <a href="#" />
            <span className="chat-icon">
              <PersonOutlineIcon style={{ color: "white" }} />
            </span>
            <span className="chat-title">User Profile</span>
          </li>

          <li className="chat-for-li" onClick={() => navigate("/home")}>
            <span className="chat-icon icons">
              <HomeIcon style={{ color: "white" }} size={50} />
            </span>
            <span className="chat-title">Home</span>
          </li>
          <li className="chat-for-li" onClick={() => navigate("/create")}>
            <a href="#" />
            <span className="chat-icon">
              <PostAddIcon style={{ color: "white" }} />
            </span>
            <span className="chat-title">Post</span>
          </li>
          

          <li className="chat-for-li">
            <a href="#" />
            <span className="chat-icon">
              <HelpOutlineIcon style={{ color: "white" }} />
            </span>
            <span className="chat-title">Help</span>
          </li>
          <li className="chat-for-li" onClick={() => navigate("/settings")}>
            <a href="#" />
            <span className="chat-icon">
              <SettingsApplicationsIcon style={{ color: "white" }} />
            </span>
            <span className="chat-title">Settings</span>
          </li>

          <li className="chat-for-li" onClick={userLogout}>
            <a href="#" />
            <span className="chat-icon">
              <ExitToAppIcon style={{ color: "white" }} />
            </span>
            <span className="chat-title">Logout</span>
          </li>
        </ul>




        
      </div>
      <li>{checkUser()}
      <p>Chats</p>
      
      </li>

{/* 
<div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div> */}



    </>
  );
};

export default Navbar2;
