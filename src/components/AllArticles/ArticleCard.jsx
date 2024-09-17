import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom";
import { getUserByUsername } from "../../api";
import { useEffect, useState } from "react";

function ArticleCard({ article }) {
  const navigate = useNavigate();
  const date = dateFormat(article.created_at, "DDDD mmm dd yyyy h:MM TT");
  const [author, setAuthor] = useState(null); 


  useEffect(() => {
    getUserByUsername(article.author)
      .then((userData) => {
        setAuthor(userData); 
      })
      .catch((error) => {
        console.error("Error getting author data:", error)
      });
  }, [article.author]);

  return (
    <li className="card bg-base-100 w-150 shadow-xl">
      <article className="card-body">
        <h2 className="card-title">{article.title}</h2>
        {author && 
          <div className="avatar w-8 h-8 ">
            <img src={author.avatar_url} alt="author's avatar" className="w-8 h-8 rounded-full object-cover" />
          </div>
       } 
        <h3>{article.author}</h3>
        <h3>{date}</h3>
        <div className="card-actions justify-start">
          <div className="badge badge-lg badge-secondary">{article.topic}</div>
        </div>
        <section className="card-actions justify-start">
          <div className="badge badge-lg badge-outline">🗨️ {article.comment_count}</div>
          <div className="badge badge-lg badge-outline">❤️ {article.votes}</div>
        </section>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => navigate(`/${article.article_id}`)}>
            Read More
          </button>
        </div>
      </article>
    </li>
  );
}

export default ArticleCard;
