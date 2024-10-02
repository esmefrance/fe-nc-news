import { Link } from "react-router-dom";
function SortDropdown({ setSort }) {
  return (
    <section className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-accent">
        Sort By
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-30 p-2 shadow"
      >
        <li onClick={() => setSort("author")}>author</li>
        <li onClick={() => setSort("created_at")}>date</li>
        <li onClick={() => setSort("title")}>title</li>
        <li onClick={() => setSort("topic")}>topic</li>
        <li onClick={() => setSort("votes")}>votes</li>
        <Link to="/">
          <li onClick={() => setSort(null)}>clear</li>
        </Link>
      </ul>
    </section>
  );
}

export default SortDropdown;
