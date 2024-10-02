import { useEffect, useState } from "react";
import { getTopics } from "../../api";
import { Link } from "react-router-dom";

function Topics({ setTopicInput, topicQuery }) {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const [dropdownOpen, setdropdownOpen] = useState(false)

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics)
      setError(null)
      if (topicQuery && !topics.some((topic) => topic.slug === topicQuery)) {
        setError("This topic does not exist. Please try again.");
      }
    }).catch(() => {
        setError("This topic does not exist. Please try again.");
      });
  }, [topicQuery]);

  function handleClick(topic) {
    setTopicInput(topic);
    setdropdownOpen(false)
  }

  function toggleDropdown() {
    setdropdownOpen((prev) => !prev);
  }

  return (
    <>
      {error ? (
            <p className="text-red-500 text-sm text-center">⚠️ {error}</p>
          ) : null}
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn btn-secondary" onClick={toggleDropdown}>
        Topics
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-30 p-2 shadow"
      >
        {topics.map((topic) => {
          return (
            <Link to={`/?topic=${topic.slug}`} key={topic.slug}>
              <li onClick={() => handleClick(topic.slug)}  >
                {topic.slug}
              </li>
            </Link>
          );
        })}
        <Link to="/">
          <li onClick={() => handleClick(null)} key="clear topics">clear</li>
        </Link>
      </ul>
    </div>
    </>
  );
}

export default Topics;
