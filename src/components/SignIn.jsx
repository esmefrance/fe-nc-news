import { useState, useContext } from "react";
import { UserContext } from "../context/User";
import { getUserByUsername } from "../api";
import { useParams, useNavigate } from "react-router-dom";


function SignIn() {
  const { user, setUser } = useContext(UserContext);
  const [signInUsername, setSignInUsername] = useState("");
  const { username } = useParams();
  const navigate = useNavigate();

  function handleSignIn(event) {
    setSignInUsername(event.target.value);
  }

  function handleSubmitSignIn(event) {
    event.preventDefault();
    console.log(signInUsername)
    getUserByUsername(signInUsername).then((currUser) => {
        console.log(currUser)
      setUser([currUser]);
      navigate("/");
    });
  }

  return (
    <div>
      <form>
        <h1>Sign In</h1>
        <label className="form-control w-full max-w-xs">
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
    </div>
  );
}

export default SignIn;
