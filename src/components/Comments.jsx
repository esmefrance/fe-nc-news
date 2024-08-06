import { useEffect, useState } from "react";
import dateFormat from 'dateformat';
import { useParams } from "react-router-dom";
import { getCommentsByArticleId } from "../api";
import Loading from "./Loading";
function Comments (){
    const [commentList, setCommentList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { article_id } = useParams();
useEffect(() => {
    getCommentsByArticleId(article_id).then((data) => {
      setCommentList(data);
      setIsLoading(false)
    });
  }, []);
  if (isLoading) {
    return <Loading/>
  }
  return (
    <ul className="container mx-auto grid gap-[50px] grid-cols-1 ">
        <h3 className="card-title">🗨️ Comments</h3>
      {commentList.map((comment) => {
        const date =dateFormat(comment.created_at,"DDDD mmm dd yyyy h:MM TT")
        return (
              <li className="card bg-base-100 w-130 shadow-xl" key={comment.comment_id}>
                <article className="card-body">
                  <h4>{comment.author} </h4>
                  <h4>{date}</h4>
                  <p>{comment.body}</p>
                  <section className="card-actions justify-start">
                    <div className="badge badge-outline">
                    ❤️  {comment.votes}
                    </div>
                  </section>
                </article>
              </li>
        );
      })}
    </ul>
  );
}
export default Comments