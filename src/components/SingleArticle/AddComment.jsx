import { useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import { postComment } from '../../api';
import { UserContext } from "../../context/User";
import Loading from "../Loading";

function AddComment({onAddComment}) {
    const { article_id } = useParams();
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
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
      setError(null)
      setIsLoading(true)
      onAddComment(newComment)
      setInput({
         body: "",
        author: user[0].username
      }) 
      setDisabled(false)
      }).catch((error) => {
        setError("Your comment was not added. Please check you are signed in!")
        setDisabled(false)
        setIsLoading(false)
      });
    }
    }

    if (isLoading) {
      return <Loading />;
    }
  

  return (
    <div className="bg-base-200 collapse space-y-2 shadow-xl">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-accent text-primary-content peer-checked:bg-primary peer-checked:text-secondary-content">
        Add a comment
      </div>
      <div className="collapse-content bg-primary text-primary-content peer-checked:bg-base-100 peer-checked:text-secondary-content">
        <form onSubmit={handleSubmit} className="space-y-2" >
        <label className="form-control w-full max-w-md">
          <div className="label">
            <span className="label-text ">Comment</span>
          </div>
          {error ? (
            <p className="text-red-500 text-sm text-center">⚠️ {error}</p>
          ) : null}
          <input
            type="text"
            placeholder="Enter your comment"
            className="input input-bordered w-full max-w-md text-base-content"
            name="body"
            value={input.body || ""} 
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="btn btn-accent" disabled={disabled}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddComment;
