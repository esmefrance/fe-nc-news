import { useState, useContext } from "react";
import { UserContext } from "../context/User";
import { getUserByUsername } from "../api";
import {  useNavigate } from "react-router-dom";
import Loading from "./Loading";


function SignIn() {
  const { setUser } = useContext(UserContext);
  const [signInUsername, setSignInUsername] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleSignIn(event) {
    setSignInUsername(event.target.value);
  }

  function handleSubmitSignIn(event) {
    event.preventDefault();
    if (!signInUsername) {
      setError("Username cannot be blank! Try entering: cooljmessy");
    } else {
      setIsLoading(true); 
      getUserByUsername(signInUsername)
        .then((currUser) => {
          setUser([currUser]);
          setError(null);
          navigate("/");
        })
        .catch(() => {
          setError("This user does not exist. Please try again.");
        })
        .finally(() => {
          setIsLoading(false); 
        });
    }
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="space-y-2 m-5">
      <form >
        <h2>Sign In</h2>
        {error ? (
            <p className="text-red-500 text-sm text-center">⚠️ {error}</p>
          ) : null}
        <label className="form-control w-full max-w-xs ">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            onChange={handleSignIn}
            value={signInUsername}
            name="username"
            type="text"
            placeholder="Enter your username"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label "></div>
          <input
            onClick={handleSubmitSignIn}
            type="submit"
            value="Sign in"
            className="btn btn-accent"
          />
        </label>
      </form>
    </div>
  );
}

export default SignIn;
