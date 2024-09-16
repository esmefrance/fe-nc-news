import { useEffect, useState} from "react";
import { getAuthors } from "../api";
import { Link } from "react-router-dom";

function Authors({setAuthorInput}){
    const [authors, setAuthors] = useState([]);
 
    useEffect(() => {
        getAuthors().then((authors) => {
          setAuthors(authors);
        });
      }, []);
    
      function handleClick(username) {
        setAuthorInput(username);
      }
    
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
                  <li onClick={() => handleClick(author.username)} key={author.username} >
                    {author.username}
                  </li>
              );
            })}
            <Link to="/">
              <li onClick={() => handleClick(null) } key="clear authors">clear</li>
            </Link>
          </ul>
        </div>
      );
    }
    
    export default Authors;
    