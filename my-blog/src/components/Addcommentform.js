import { useState } from "react";
import "./Addcommentform.css";
import axios from "axios";
import useUser from "../hooks/Useuser";
const Addcommentform = ({articlename , onArticleupdated}) => {
    const [name,setName] = useState('');
    const [commenttext,setcommenttext] = useState('');
    const {user}= useUser();


    const addcomment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token} : {};
        const response = await axios.post(`/api/articles/${articlename}/comments`,{
            postedBy : name , 
            text: commenttext,
        },{headers,});
        const updatedArticle = response.data;
        onArticleupdated(updatedArticle);
        setName('');
        setcommenttext('');

    }
    return(
        <div id="add-comment-form">
            <h3>Add a comment</h3>
           {user && <p>You are posting as {user.email}.</p>}
            <label>
                Comment:
                <textarea 
                value={commenttext}
                onChange={e => setcommenttext(e.target.value)}
                rows="4" cols="50"/>
            </label>
            <button onClick={addcomment} >Add comment</button>
        </div>

    );

}
export default Addcommentform 