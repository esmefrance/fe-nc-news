import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/User";
import Loading from "../Loading";
import { postArticle } from "../../api";
import { useNavigate } from "react-router-dom";
import Topics from "../AllArticles/Topics";

function PostArticle() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [topicSelected, setTopicSelected] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    topic: "",
    article_img_url: "",
    author: "",
  });
  const topicsArray = ["coding", "football", "cooking"];

  useEffect(() => {
    if (!user || user[0].username === "") {
      setError("Please sign in before posting a new article.");
    }
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmitArticle(event) {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      author: user[0].username,
    };

    setIsLoading(true);
    postArticle(updatedFormData)
      .then((newArticle) => {
        navigate(`/${newArticle.article_id}`);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("An error occurred while adding the article.");
        console.error(error);
        setIsLoading(false);
      });

    setFormData({
      title: "",
      body: "",
      topic: "",
      article_img_url: "",
      author: "",
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="card bg-base-100 w-150 shadow-xl space-y-2 m-5">
        <form onSubmit={handleSubmitArticle} className="card-body">
          <h2 className="card-title">Add Article</h2>
          {error ? (
            <p className="text-red-500 text-sm text-center">⚠️ {error}</p>
          ) : null}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 h-[6rem]">
            <input
              type="text"
              className="grow"
              name="body"
              placeholder="Article Body"
              value={formData.body}
              onChange={handleChange}
              required
            />
          </label>
        
            <select
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled value="" key="clear">
                -- Select a Topic --
              </option>
              {topicsArray.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
       

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="url"
              className="grow"
              placeholder="Article Photo URL"
              name="article_img_url"
              value={formData.article_img_url}
              onChange={handleChange}
              required
            />
          </label>
          <label className="card-actions justify-end">
            <button
              disabled={!user || user[0].username === ""}
              type="submit"
              className="btn btn-accent"
            >
              Submit Article
            </button>
          </label>
        </form>
      </section>
    </>
  );
}

export default PostArticle;
