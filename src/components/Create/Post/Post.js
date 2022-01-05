import { getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import React, { useState } from "react";
import firebase from "firebase/compat";
import {
  addDoc,
  collection,
  db,
  storage,
  ref,
  doc,
  getDocs,
} from "../../../Config";
import { ContextProvider } from "../../../global/Context";

import { makeStyles } from "@material-ui/core/styles";
import ImageIcon from "@material-ui/icons/Image";
import { Modal, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import InputEmoji from "react-input-emoji";
import livePng from "../../../images/live-video.png"
import photoPng from "../../../images/photo.png"
import watchPng from "../../../images/watch.png"


import "./post.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Create = () => {
  const classes = useStyles();
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
    <div className="create">
      <div className="posting">
        <input
          onClick={handleShow}
          type="text"
          className="postsInp"
          placeholder=" Whats New In your mind!"
        />
      </div>
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
                <img src={livePng}/>
                <img src={photoPng}/>
                <img src={watchPng}/>

              </div>

  
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
  );
};

export default Create;
