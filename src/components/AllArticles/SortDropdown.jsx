import { Link } from "react-router-dom";
function SortDropdown({ setSort }) {
  return (
    <section className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-accent w-35">
        Sort By
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100  rounded-box z-[1] mt-3 w-35 p-2 shadow"
      >
        <li className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer" onClick={() => setSort("author")}>author</li>
        <li className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer" onClick={() => setSort("created_at")}>date</li>
        <li className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer" onClick={() => setSort("title")}>title</li>
        <li className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer" onClick={() => setSort("topic")}>topic</li>
        <li className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer" onClick={() => setSort("votes")}>votes</li>
        <Link to="/">
          <li className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer" onClick={() => setSort(null)}>clear</li>
        </Link>
      </ul>
    </section>
  );
}

export default SortDropdown;
