
function OrderDropdown({ setOrder }) {
    return (
      <section className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-primary">
          Order
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
        >
          <li onClick={() => setOrder("DESC")}>⬇️ Descending</li>
          <li onClick={() => setOrder("ASC")}>⬆️ Ascending</li>
        </ul>
      </section>
    );
  }
  
  export default OrderDropdown;
  