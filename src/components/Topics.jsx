import { useEffect, useState } from "react";
import { getTopics } from "../api";
import { Link } from "react-router-dom";

function Topics({ setTopicInput }) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  function handleClick(topic) {
    setTopicInput(topic);
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  }

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-primary">
        Topics
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {topics.map((topic) => {
          return (
            <Link to={`/?topic=${topic.slug}`}>
              <li onClick={() => handleClick(topic.slug)} key={topic.slug}>
                {topic.slug}
              </li>
            </Link>
          );
        })}
        <Link to="/">
          <li onClick={() => handleClick(null)}>clear</li>
        </Link>
      </ul>
    </div>
  );
}

export default Topics;
