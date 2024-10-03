import { useEffect, useState } from "react";
import { getTopics } from "../../api";
import { Link } from "react-router-dom";

function Topics({ setTopicInput, topicQuery }) {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const [dropdownOpen, setdropdownOpen] = useState(false);

  useEffect(() => {
    getTopics()
      .then((topics) => {
        setTopics(topics);
        setError(null);
        if (topicQuery && !topics.some((topic) => topic.slug === topicQuery)) {
          setError("This topic does not exist. Please try again.");
        }
      })
      .catch(() => {
        setError("This topic does not exist. Please try again.");
      });
  }, [topicQuery]);

  function handleClick(topic) {
    setTopicInput(topic);
    setdropdownOpen(false);
  }

  function toggleDropdown() {
    setdropdownOpen((prev) => !prev);
  }

  return (
    <>
      {error ? (
        <p className="text-red-500 text-sm text-center">⚠️ {error}</p>
      ) : null}
      <div className="dropdown dropdown-end ">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-secondary w-35"
          onClick={toggleDropdown}
        >
          Topics
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100  rounded-box z-[1] mt-3 w-35 p-2 shadow"
        >
          {topics.map((topic) => {
            return (
              <Link to={`/?topic=${topic.slug}`} key={topic.slug}>
                <li
                  className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                  onClick={() => handleClick(topic.slug)}
                >
                  {topic.slug}
                </li>
              </Link>
            );
          })}
          <Link to="/">
            <li
              className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer"
              onClick={() => handleClick(null)}
              key="clear topics"
            >
              clear
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Topics;
