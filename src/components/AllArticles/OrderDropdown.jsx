function OrderDropdown({ setOrder }) {
  return (
    <section className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-primary w-35">
        Order
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100  rounded-box z-[1] mt-3 w-40 p-2 shadow"
      >
        <li
          className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer"
          onClick={() => setOrder("ASC")}
        >
          ⬇️ A-Z
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer"
          onClick={() => setOrder("DESC")}
        >
          ⬆️ Z-A
        </li>
      </ul>
    </section>
  );
}

export default OrderDropdown;
