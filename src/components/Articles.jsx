import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { useNavigate } from "react-router-dom";
import dateFormat from 'dateformat';
import Loading from "./Loading";


function Articles() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    getArticles().then((data) => {
      setArticleList(data);
      setIsLoading(false)
    });
  }, []);

  if (isLoading) {
    return <Loading/>
  }

  return (
    <ul className="container mx-auto grid gap-[50px] grid-cols-1">
      {articleList.map((article) => {
        const date =dateFormat(article.created_at,"DDDD mmm dd yyyy h:MM TT")
        return (
              <li className="card bg-base-100 w-150 shadow-xl" key={article.article_id}>
                <article className="card-body">
                  <h2 className="card-title">{article.title}</h2>
                  <h3>{article.author}</h3>
                  <h3>{date}</h3>
                  <div className="card-actions justify-start">
                    <div className="badge badge-secondary">{article.topic}</div>
                  </div>
                  <section className="card-actions justify-start">
                    <div className="badge badge-outline">
                      ❤️ {article.votes}
                    </div>
                    <div className="badge badge-outline">
                      🗨️ {article.comment_count}
                    </div>
                  </section>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={()=>navigate(`/${article.article_id}`)}>Read More</button>
                  </div>
                </article>
              </li>
        );
      })}
    </ul>
  );
}

export default Articles;
