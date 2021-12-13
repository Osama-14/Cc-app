import { getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import React, { useState } from "react";
import firebase from "firebase/compat";
import { addDoc, collection, db, storage, ref } from "../../../Config";
import { ContextProvider } from "../../../global/Context";
import "./post.css";

const Create = () => {
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
          // db.collection("posts").add({
          //   title:title,
          //   image:url,
          //   username:username,
          //   currentTime:firebase.firestore.FieldValue.serverTimestamp()
          // })

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
        <input
          type="text"
          className="input"
          onChange={(e) => setTitle(e.target.value)}
        />
        <form onSubmit={formHandler}>
          c<input type="file" className="input" />
          <button type="submit"> Upload</button>
        </form>
        <hr />
        <h3>uploaded {progress} % </h3>
      </div>
    </div>
  );
};

export default Create;
