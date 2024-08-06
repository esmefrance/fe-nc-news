import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="navbar bg-accent">
      <div className="flex-1">
        <Link to="/">
          <div className="btn btn-ghost text-xl"> 🗞️ News 🗞️ </div>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <div className="justify-between">Profile</div>
            </li>
            <li>
              <div>Sign in</div>
            </li>
            <li>
              <div>Logout</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
