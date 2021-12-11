import { getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import React, {useState} from "react";
import { FcLandscape } from "react-icons/fc";
import { auth, db, storage,ref } from "../../../Config";
import { ContextProvider } from "../../../global/Context";
import "./post.css";

const Create = () => {


  const { createPosts, user } =
  React.useContext(ContextProvider);


  const [progress, setProgress] = useState(0)

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    upoadFiles(file);
  }


  const upoadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100

      );

      setProgress(prog)
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then(url => createPosts(url, user.email));

    }
    );
  }

 


  return (
    <div className="create">
      <div className="posting">
      <form onSubmit={formHandler}>
        <input type="file" className="input" />
        <button type="submit"> Upload</button>

      </form>

      
  <hr/>
  <h3>uploaded {progress} % </h3>

<img id="new-img"/>
  </div>



      {/* <form onSubmit={formHandler}>
        <input
          type="text"
          className="create__input"
          placeholder="Whats New In your Mind !"
          required
        />
        <div className="create__second">
          <div className="create__second-a">
            <label for="img">
              <FcLandscape className="gallery" />
              <p
                className="hover-underline-animation "
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginTop: "-12%",
                  marginLeft: "1%",
                }}
              >
                Images
              </p>
            </label>
            <input
              type="file"
              className="file"
            id="img"
            />
          </div>
          <div className="create__second-b">
            <input type="submit" value="Post" className="btnC" />
          </div>
        </div>
      </form> */}
    </div>
  );
};

export default Create;
