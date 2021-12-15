import { getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import React, { useState } from "react";
import firebase from "firebase/compat";
import { addDoc, collection, db, storage, ref,doc,getDocs } from "../../../Config";
import { ContextProvider } from "../../../global/Context";
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import "./post.css";



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



const Create = () => {

  const classes = useStyles();

  const { username } = React.useContext(ContextProvider);

  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    upoadFiles(file);
  };

  const upoadFiles = (file) => {
    if (!file) return;
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
              title: title,
              image: url,
              username: username,
              currentTime: firebase.firestore.FieldValue.serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          
        });
        
      }

      
    );
  };

  return (
    
    <div className="create">
      <div className="posting">
          <TextField id="standard-basic" label="What's new in your mind!" placeholder=""  onChange={(e) => setTitle(e.target.value)} />
        <form onSubmit={formHandler}>
          {/* <input type="file" className="input" /> */}
          <PhotoSizeSelectActualIcon type="file"/> 
          <button type="submit"> Upload</button>
        </form>
        <hr />
        <h3>uploaded {progress} % </h3>
      </div>






    </div>
    
  );
};

export default Create;
