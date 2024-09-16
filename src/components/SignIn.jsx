import { useState, useContext } from "react";
import { UserContext } from "../context/User";
import { getUserByUsername } from "../api";
import { useParams, useNavigate } from "react-router-dom";


function SignIn() {
  const { user, setUser } = useContext(UserContext);
  const [signInUsername, setSignInUsername] = useState("");
  const [error, setError] = useState(null);


  const navigate = useNavigate();

  function handleSignIn(event) {
    setSignInUsername(event.target.value);
  }

  function handleSubmitSignIn(event) {
    event.preventDefault();
    if(!signInUsername){
      setError("Username cannot be blank! Try entering: cooljmessy")}else{
    getUserByUsername(signInUsername).then((currUser) => {
      setUser([currUser]);
      setError(null);
      navigate("/")
    }).catch(() => {
      setError("This user does not exist. Please try again.");
    });
  }
  }

  return (
    <div className="space-y-2 m-5">
      <form >
        <h1>Sign In</h1>
        <label className="form-control w-full max-w-xs ">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            onChange={handleSignIn}
            value={signInUsername}
            name="username"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label "></div>
          <input
            onClick={handleSubmitSignIn}
            type="submit"
            value="Sign in"
            className="btn btn-secondary"
          />
        </label>
      </form>
      {error ? (
          <div className="badge badge-lg badge-error gap-2">⚠️ {error}</div>
        ) : null}
    </div>
  );
}

export default SignIn;
