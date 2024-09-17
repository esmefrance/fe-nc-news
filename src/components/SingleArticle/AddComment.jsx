import { useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import { postComment } from '../../api';
import { UserContext } from "../../context/User";

function AddComment({onAddComment}) {
    const { article_id } = useParams();
    const { user } = useContext(UserContext);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [input, setInput] = useState({
        body: "",
        author: user[0].username
    });

   function handleChange(event){
    const {value} = event.target
      setInput({...input, body: value})
    }
  
    function handleSubmit(event){
      event.preventDefault();
      setDisabled(true);
      if(!input.body){
        setError("Comment cannot be blank!");
        setDisabled(false);
      }
      else{
      postComment(article_id, input).then((newComment)=>{
      setError(null);
      onAddComment(newComment)
      setInput({
         body: "",
        author: user[0].username
      }) 
      setDisabled(false)
      }).catch((error) => {
        setError("Your comment was not added. Please check you are signed in!")
        setDisabled(false)
      });
    }
    }

  return (
    <div className="bg-base-200 collapse space-y-2">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
        Add a comment
      </div>
      <div className="collapse-content bg-primary text-primary-content peer-checked:bg-base-100 peer-checked:text-secondary-content">
        <form onSubmit={handleSubmit} className="space-y-2" >
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text ">Comment</span>
          </div>
          <input
            type="text"
            placeholder="Enter your comment"
            className="input input-bordered w-full max-w-xs text-base-content"
            name="body"
            value={input.body || ""} 
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="btn btn-primary" disabled={disabled}>Submit</button>
        </form>
      </div>
      {error ? (
          <div className="badge badge-lg badge-error gap-2">⚠️ {error}</div>
        ) : null}
    </div>
  );
}

export default AddComment;
