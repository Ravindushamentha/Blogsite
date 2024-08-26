import React from "react";
import articles from "./Article-content";
import Articlelistcomp from "../components/Articlelist";
import './Articlelistpage.css';
const Articlelist = () => {
    return (
        <div className="article-list">
            <h1>Articles</h1>
           <Articlelistcomp articles = {articles}/>
        </div>
    );
}

export default Articlelist;