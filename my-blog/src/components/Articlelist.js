import { Link } from "react-router-dom";
import './Articlelistpage.css'; 
const Articlelistcomp = ({articles}) => {
return(<>
    {articles.map(article => 
        <div key={article.name} className="article">
            <Link to={`/articles/${article.name}`} className="article-link">
                <h3 className="article-title">{article.title}</h3>
            </Link>
            <p className="article-content">
                {article.content[0].substring(0, 150)}...
            </p>
        </div>
    )}</>
);

}
export default Articlelistcomp