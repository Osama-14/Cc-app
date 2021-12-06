import React, {useContext, useState } from 'react'
import { FcLandscape } from "react-icons/fc";
import { ContextProvider } from '../global/Context';
import {auth,db, storage} from "../Config"

const Create = () => {
    const {create} = useContext(ContextProvider)
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    const handleImage = e => {
       setImage(e.target.files[0]);
    };

    const createPost = e => {
        e.preventDefault();
        create({title,image})
    }





    return (
        <div className="create">
        <form onSubmit={createPost}>
            <input
            type="text"
            className="create__input"
            placeholder="Whats New In your Mind !"
            onChange= {e => setTitle(e.target.value)}
            value={title}
            required
            
           />
           <div className="create__second">
               <div className="create__second-a">

                   <label htmlFor="file">
                       <FcLandscape className="gallery"/>
                       <p className="hover-underline-animation " style={{fontSize: "15px",fontWeight: "bold",marginTop: "-12%",marginLeft: "1%"}}>Images</p>
                       </label>
                   <input type="file" className="file" onChange={handleImage} id="file"/>

               </div>
               <div className="create__second-b">
                   <input type="submit" value="Post" className="btnC"/>


               </div>

           </div>


        </form>
            
        </div>
    )
}

export default Create
