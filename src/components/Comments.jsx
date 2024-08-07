import { useEffect, useState, useContext } from "react";
import dateFormat from "dateformat";
import { useParams } from "react-router-dom";
import { getCommentsByArticleId, deleteCommentById } from "../api";
import Loading from "./Loading";
import AddComment from "./AddComment";
import { UserContext } from "../context/User";

function Comments({ commentCount, onUpdateCommentCount }) {
  const [commentList, setCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { article_id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((data) => {
      setCommentList(data);
      setIsLoading(false);
      onUpdateCommentCount(data.length); 
    });
  }, [article_id, onUpdateCommentCount]);

  const addNewComment = (newComment) => {
    setCommentList((prevComments) => [newComment, ...prevComments]);
    onUpdateCommentCount(commentList.length + 1); 
  };

  const deleteComment = (id) => {
    setError(null);
    deleteCommentById(id)
      .then(() => {
        setCommentList((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== id)
        );
        onUpdateCommentCount(commentList.length - 1); 
      })
      .catch((error) => {
        setError("Error deleting comment");
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ul className="container mx-auto grid gap-[50px] grid-cols-1">
      <section>
        <h4 className="card-title">🗨️ {commentCount} Comments</h4> 
      </section>
      <AddComment onAddComment={addNewComment} />
      {commentList.map((comment) => {
        const date = dateFormat(comment.created_at, "DDDD mmm dd yyyy h:MM TT");
        return (
          <li className="card bg-base-100 w-130 shadow-xl" key={comment.comment_id}>
            <article className="card-body">
              <h4>{comment.author}</h4>
              <h4>{date}</h4>
              <p>{comment.body}</p>
              <section className="card-actions justify-start">
                <div className="badge badge-outline">❤️ {comment.votes}</div>
              </section>
              {comment.author === user[0].username && (
                <button className="badge badge-primary" onClick={() => deleteComment(comment.comment_id)}>
                  🗑️ Delete
                </button>
              )}
              {error ? <div className="badge badge-error gap-2">⚠️ {error}</div> : null}
            </article>
          </li>
        );
      })}
    </ul>
  );
}

export default Comments;
