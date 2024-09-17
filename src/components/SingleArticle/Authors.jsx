//not sure why this component was created!!

import { useEffect, useState } from "react";
import { getAuthors } from "../api";
import { Link } from "react-router-dom";

function Authors({ setAuthorInput }) {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    getAuthors().then((authors) => {
      setAuthors(authors);
    });
  }, []);


  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-primary">
        Authors
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {authors.map((author) => {
          return (
            <li
              onClick={() => setAuthorInput(author.username)}
              key={author.username}
            >
              {author.username}
            </li>
          );
        })}
        <Link to="/">
          <li onClick={() => setAuthorInput(null)} key="clear authors">
            clear
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Authors;
