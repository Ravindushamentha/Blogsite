import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articles from "./Article-content";
import './Articlepage.css';
import NotFoundPage from "./404page";
import axios from 'axios';
import Commentlist from "../components/Commentlist";
import Addcommentform from "../components/Addcommentform";
import useUser from "../hooks/Useuser";

function Articlepage() {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] , canupvote: false});
    const {canupvote} = articleInfo;
    const { articleID } = useParams();

    const {user , isloading} = useUser();

    useEffect(() => {
        const loadArticleInfo = async () => {
            try {
                const token = user && await user.getIdToken();
                const headers = token ? {authtoken: token} : {};
                const response = await axios.get(`/api/articles/${articleID}`,{headers});
                const newArticleInfo = response.data;
                setArticleInfo(newArticleInfo);

            } catch (error) {
                console.error('Error fetching article info:', error);
            }};

        if(!isloading){
            loadArticleInfo();
        }
        
    }, [articleID , user , isloading]); // Add articleID as a dependency

    const addupvote = async () => {
        try {
            const token = user && await user.getIdToken();
            const headers = token ? {authtoken: token} : {};
            const response = await axios.put(`/api/articles/${articleID}/upvote`, null, {headers});
            const updatedArticle = response.data;
            setArticleInfo(updatedArticle);
        } catch (error) {
            console.error('Error adding upvote:', error);
        }
    };

    const article = articles.find(article => article.name === articleID);

    if (!article) {
        return (<NotFoundPage />);
    }

    return (
        <>
            <div className="article-container">
                <h1>{article.title}</h1>
                <div className="add-upvote">
                   {user
                   ? <button onClick={addupvote}>{canupvote ? 'Upvote' : 'Already upvoted'}</button>
                   : <button>Log in to Upvote</button>
                   }
                    <p>This article has {articleInfo.upvotes} upvotes. </p>
                </div>
                {article.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
                { user
                ? <Addcommentform 
                    articlename={articleID}
                    onArticleupdated={updatedArticle => setArticleInfo (updatedArticle)}/>
                :  <button className="login-comment">Log in to comment</button>
                }
                <Commentlist comments={articleInfo.comments} />
            </div>
        </>
    );
}

export default Articlepage;