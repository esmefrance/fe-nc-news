import { Link } from "react-router-dom";
import { UserContext } from "../context/User";
import { useContext, useState } from "react";

function Nav() {
  const [dropdownOpen, setdropdownOpen] = useState(false)

  const { user, setUser } = useContext(UserContext);
  const avatar = user[0].avatar_url;

  function handleSignOut() {
    setUser([
      {
        username: "",
        name: "",
        avatar_url: "./avatar.png"
      }
    ]);
    setdropdownOpen(false)
  }

  function toggleDropdown() {
    setdropdownOpen((prev) => !prev);
  }

  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <Link to="/">
          <h1 className="btn btn-ghost text-xl"> 🗞️ News 🗞️ </h1>
        </Link>
      </div>
      <Link to="/add-article">
        <div className="btn btn-accent btn-sm ">
          + article
        </div>
      </Link>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            onClick={toggleDropdown}
            >
            <div className="w-10 rounded-full">
              <img alt="Avatar" src={avatar} />
            </div>
          </div>
          {dropdownOpen && ( <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow"
            >
            <Link to="/signin">
              <li>
                <div onClick={toggleDropdown}>Sign in</div>
              </li>
            </Link>
            <li>
              <div onClick={handleSignOut}>Sign out</div>
            </li>
          </ul>
          )}
          </div>
      </div>
    </div>
  );
}

export default Nav;
