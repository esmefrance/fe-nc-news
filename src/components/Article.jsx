import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import dateFormat from 'dateformat';


function Article() {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();
  const date =dateFormat(article.created_at,"DDDD mmm dd yyyy h:MM TT")

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false)
    });
  }, []);

  if (isLoading) {
    return <p>Loading...<span className="loading loading-spinner text-primary"></span></p>
  }

  return (
    <section className="container mx-auto grid gap-[50px] grid-cols-1">
      <div className="card bg-base-100 w-150 shadow-xl">
        <article className="card-body">
         <div className="badge badge-secondary">{article.topic}</div>
          <h2 className="card-title">{article.title}</h2>
          <h3>{article.author}</h3>
          <h3>{date}</h3>
          <p>{article.body}</p>
          <section className="card-actions justify-start">
            <div className="badge badge-outline">❤️ {article.votes}</div>
            <div className="badge badge-outline">
              🗨️ {article.comment_count}
            </div>
          </section>
        </article>
      </div>
    </section>
  );
}

export default Article;
