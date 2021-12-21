import React, { useEffect, useState } from "react";
import { db, getDocs, collection, query, where, auth } from "../../Config";
import Cover from "../../images/cover.jpg";
import Profile from "../../images/profile.jpeg";
import Prof from "../../images/prof.jpg";
import MessageIcon from '@material-ui/icons/Message';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useParams } from "react-router-dom";




import firebase from "firebase/compat";
import { getDownloadURL, uploadBytesResumable } from "@firebase/storage";

import {ref, storage, addDoc} from "../../Config"
import { ContextProvider } from "../../global/Context";
import ImageIcon from "@material-ui/icons/Image";
import { Modal, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import InputEmoji from "react-input-emoji";

import "./profile.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",

    width: "400px",
    height: "400px",
    objectFit: "cover",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Home = ({ ...props }) => {
  const classes = useStyles();
  const params = useParams();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(params);
    // getPostFromFirebase();
  }, []);

  useEffect(() => {
    getPostFromFirebase();
  }, [
    (params && params.uid !== undefined) ||
      (auth.currentUser && auth.currentUser.uid),
  ]);

  const getPostFromFirebase = async () => {
    setPosts([]);

    let uid;

    // console.log(props, auth.currentUser);
    if (params && params.uid !== undefined) {
      uid = params.uid;
    } else if (auth.currentUser && auth.currentUser.uid) {
      uid = auth.currentUser.uid;
    }

    if (uid && uid !== undefined) {
      const q = query(collection(db, "posts"), where("uid", "==", uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshotsi
        let obj = doc.data();
        obj.key = doc.id;
        console.log(doc.id, " => ", doc.data());
        console.log(obj);
        setPosts((earlierPosts) => [...earlierPosts, obj]);
      });
    }
  };



  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  function handleOnEnter(e) {
    console.log("enter", text);
    alert(e, "eeeeeeeee");
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { username } = React.useContext(ContextProvider);

  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    upoadFiles(file);
  };

  const upoadFiles = async(file) => {
    console.log(file)
    if (file && file.name) {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            try {
              const docRef = await addDoc(collection(db, "posts"), {
                title: text,
                image: url,
                username: username,
                uid: firebase.auth().currentUser.uid,
                currentTime: new Date().toTimeString(),
              });
              console.log("Document written with ID: ", docRef.id);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          });
        }
      );
    } else {
      try {
        const docRef = await addDoc(collection(db, "posts"), {
          title: text,
          image: "",
          username: username,
          uid: firebase.auth().currentUser.uid,
          currentTime: new Date().toTimeString()
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div className="containerr">
      <div className="profile-container">
        <img src={Cover} className="profile-img" />
        <div className="profile-details">
          <div className="pd-left">
            <div className="pd-row">
              <img src={Profile} className="mutual-friend" />

              <div>
                <h3>Unknown</h3>
                <p>123 friends - 40 mutual</p>
                <img src={Prof} className="prof"/>
                <img src={Prof} className="prof"/>
                <img src={Prof} className="prof"/>
                <img src={Prof} className="prof"/>

              </div>
            </div>
          </div>
          <div className="pd-right">
            <button className="addBtn" ><GroupAddIcon/> </button>
            <button className="addBtn"> < MessageIcon/></button>
          </div>
        </div>

        <div className="posting">
        <input
          onClick={handleShow}
          type="text"
          className="postsInp"
          placeholder=" Whats New In your mind!"
        />
      </div>

        <div className="profileinfo">
          <div className="info-col"></div>
          <div className="post-col">
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div className="post-head">
            <Modal.Title>Posts</Modal.Title>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className="post-inp-field">
            {/* <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="posting-text"
              placeholder="What's new in your mind!"
            /> */}

            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={upoadFiles}
              placeholder="Type a message"
            />
          </div>

          {/* <div className="form-field"> */}
          {/* <form onSubmit={formHandler} >
          
          <input type="file" className="input"  />
        
          <button type="submit"> Upload</button>
        </form> */}
          {/* </div> */}
        </Modal.Body>

        <Modal.Footer className="modal-foot">
          <div className="post-footer">
            <form onSubmit={formHandler}>
              <div>
                <input
                  type="file"
                  className="select-files"
                  style={{ display: "none" }}
                  id="choose-img"
                />
                <label for="choose-img">
                  <ImageIcon style={{ color: "#44d596", fontSize: "30px" }} />{" "}
                </label>
              </div>

              {/* <Button variant="secondary" onClick={handleClose}>
                Close
              </Button> */}
              <div>
                <Button
                  className="post_btn_modal"
                  variant="primary"
                  onClick={handleClose}
                  type="submit"
                >
                  Post
                </Button>
              </div>
            </form>
          </div>
        </Modal.Footer>
      </Modal>

      


          </div>

        </div>
      </div>

      {posts.map((val, ind) => {
        return (
          <div key={ind}>
            <Card className="card-bottom" className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                  ></Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={val.username}
                subheader={new Date(val.currentTime).toLocaleDateString()}
              />

              <CardMedia
                className={classes.media}
                image={val.image}
                title={val.title}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                ></Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph> {val.title}</Typography>

                  <Typography></Typography>
                </CardContent>
              </Collapse>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
