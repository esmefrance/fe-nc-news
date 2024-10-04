import { Link } from "react-router-dom";
import { UserContext } from "../context/User";
import { useContext, useState } from "react";

function Nav() {
  const [dropdownOpen, setdropdownOpen] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const avatar = user[0].avatar_url;

  function handleSignOut() {
    setUser([
      {
        username: "",
        name: "",
        avatar_url: "./avatar.png",
      },
    ]);
    setdropdownOpen(false);
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

      <div className="flex flex-row space-x-4">
        <Link to="/add-article">
          <div className="btn btn-accent btn-sm ">+ article</div>
        </Link>
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
          {dropdownOpen && (
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow"
            >
              <Link to="/signin">
                <li>
                  <div
                    className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    Sign in
                  </div>
                </li>
              </Link>
              <li>
                <div
                  className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                  onClick={handleSignOut}
                >
                  Sign out
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
