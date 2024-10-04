import { useEffect, useState, useContext } from "react";
import dateFormat from "dateformat";
import { useParams } from "react-router-dom";
import {
  getCommentsByArticleId,
  deleteCommentById,
  getUserByUsername,
} from "../../api";
import Loading from "../Loading";
import AddComment from "./AddComment";
import { UserContext } from "../../context/User";

function Comments({ commentCount, onUpdateCommentCount }) {
  const [commentList, setCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authors, setAuthors] = useState({});;
  const { article_id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article_id)
      .then((data) => {
        setCommentList(data);
        onUpdateCommentCount(data.length);
        fetchAuthors(data)
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching comments");
        setIsLoading(false);
      });
  }, [article_id, onUpdateCommentCount]);

 
  const fetchAuthors = (comments) => {
    const uniqueAuthors = [
      ...new Set(comments.map((comment) => comment.author)),
    ];
    uniqueAuthors.forEach((username) => {
      if (!authors[username]) {
        getUserByUsername(username)
          .then((userData) => {
            setAuthors((prevAuthors) => ({
              ...prevAuthors,
              [username]: userData,
            }));
          })
          .catch((error) => {
            console.error("Error getting author data:", error);
          });
      }
    });
  };

  const addNewComment = (newComment) => {
    setCommentList((prevComments) => [newComment, ...prevComments]);
    onUpdateCommentCount(commentList.length + 1);
    fetchAuthors([newComment]);
  };

  const deleteComment = (id) => {
    setError(null)
    setIsLoading(true);
    deleteCommentById(id)
      .then(() => {
        setCommentList((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== id)
        );
        onUpdateCommentCount(commentList.length - 1)
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error deleting comment")
        setIsLoading(false);
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
        const author = authors[comment.author];
        return (
          <li
            className="card bg-base-100 w-130 shadow-xl"
            key={comment.comment_id}
          >
            <article className="card-body">
              <div className="flex flex-row space-x-2">
                {author && (
                  <div className="avatar w-8 h-8 rounded-full ring-1 ring-black">
                    <img
                      src={author.avatar_url}
                      alt="author's avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                )}
                <h3>{comment.author}</h3>
              </div>
              <p>{date}</p>
              <p>{comment.body}</p>
              <section className="card-actions justify-start">
                <div className="badge badge-outline">❤️ {comment.votes}</div>
              </section>
              {comment.author === user[0].username && (
                <button
                  className="badge badge-primary"
                  onClick={() => deleteComment(comment.comment_id)}
                >
                  🗑️ Delete
                </button>
              )}
              {error ? (
                <div className="text-red-500 text-sm text-center">
                  ⚠️ {error}
                </div>
              ) : null}
            </article>
          </li>
        );
      })}
    </ul>
  );
}

export default Comments;
