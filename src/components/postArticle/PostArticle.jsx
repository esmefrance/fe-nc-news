import { useEffect, useState } from "react";
import { UserContext } from "../../context/User";
import Loading from "../Loading";

function PostArticle() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  if (!user) {
    setError("Please sign in, before posting a new article!");
  }

  return (
    <>
      <div>
        {error ? (
          <div className="badge badge-lg badge-error gap-2">⚠️ {error}</div>
        ) : null}
      </div>
      <form>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Title" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Email" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Username" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input type="password" className="grow" value="password" />
        </label>
      </form>
    </>
  );
}

export default PostArticle;
