import { useEffect, useState } from "react";
import { getArticles } from "../api";

function Articles() {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    getArticles().then((data) => {
      setArticleList(data);
    });
  }, []);

  return (
    <div className="container mx-auto grid gap-[50px] grid-cols-1">
      {articleList.map((article) => {
        return (
          <div key={article.id}>
            <div className="card bg-base-100 w-150 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{article.title}</h2>
                <h3>{article.author}</h3>
                <div className="card-actions justify-start">
                  <div className="badge badge-secondary">{article.topic}</div>
                </div>
                <div className="card-actions justify-start">
                  <div className="badge badge-outline">❤️ {article.votes}</div>
                </div>
                <div className="card-actions justify-start">
                  <div className="badge badge-outline">
                    🗨️ {article.comment_count}
                  </div>
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Read More</button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Articles;
