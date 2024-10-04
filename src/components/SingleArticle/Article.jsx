import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getUserByUsername } from "../../api";
import dateFormat from "dateformat";
import Comments from "./Comments";
import Loading from "../Loading";
import Vote from "./Vote";

function Article() {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const { article_id } = useParams();
  const date = dateFormat(article.created_at, "DDDD mmm dd yyyy h:MM TT");

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
        setError(null);
        setCommentCount(article.comment_count);
        fetchAuthor(article)
      })
      .catch(() => {
        setError("Article not found. Please try again.");
        setIsLoading(false);
      });
  }, []);

  const fetchAuthor = (article) => {
        getUserByUsername(article.author)
          .then((userData) => {
            setAuthor(userData) 
          })
          .catch((error) => {
            console.error("Error getting author data:", error);
          });
      }
    
  

  const updateCommentCount = (newCount) => {
    setCommentCount(newCount);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-sm text-center">⚠️ {error}</div>;
  } else {
    return (
      <section className="container mx-auto grid gap-[50px] grid-cols-1">
        <div className="card bg-base-100 w-150 shadow-xl">
          <article className="card-body">
            <h2 className="card-title">{article.title}</h2>
            <div className="badge badge-lg badge-secondary">
              {article.topic}
            </div>
            <div className="flex flex-row space-x-2">
              {author && (
                <div className="avatar w-8 h-8 rounded-full ring-1 ring-black ">
                  <img
                    src={author.avatar_url}
                    alt="author's avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
              )}
              <h3>{article.author}</h3>
            </div>
            <p>{date}</p>
            <img src={article.article_img_url} alt={article.title}></img>
            <p>{article.body}</p>
            <section className="card-actions justify-start">
              <Vote article={article} />
            </section>
          </article>
        </div>
        <div>
          <Comments
            onUpdateCommentCount={updateCommentCount}
            commentCount={commentCount}
          />
        </div>
      </section>
    );
  }
}

export default Article;
