import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../api";
import dateFormat from "dateformat";
import Comments from "./Comments";
import Loading from "../Loading";
import Vote from "./Vote";

function Article() {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const { article_id } = useParams();
  const date = dateFormat(article.created_at, "DDDD mmm dd yyyy h:MM TT");
  

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
      setError(null);
      setCommentCount(article.comment_count);
    }).catch(() => {
      setError("Article not found. Please try again.");
      setIsLoading(false); 
    });
  }, []);


  const updateCommentCount = (newCount) => {
    setCommentCount(newCount);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="badge badge-lg badge-error gap-2">⚠️ {error}</div>;
  }else {
  return (
    <section className="container mx-auto grid gap-[50px] grid-cols-1">
      
      <div className="card bg-base-100 w-150 shadow-xl">
        <article className="card-body">
          <div className="badge badge-lg badge-secondary">{article.topic}</div>
          <h2 className="card-title">{article.title}</h2>
          <h3>{article.author}</h3>
          <h3>{date}</h3>
          <img src={article.article_img_url} alt={article.title}></img>
          <p>{article.body}</p>
          <section className="card-actions justify-start">
         <Vote article={article} /> 
         </section>
        </article>
      </div>
      <div>
        <Comments onUpdateCommentCount={updateCommentCount} commentCount={commentCount}/>
      </div>
    </section>
  )
}
}

export default Article;
