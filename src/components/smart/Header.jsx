import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header>
        <nav
          class="navbar navbar-expand-sm"
        >
          <div class="container">
            <Link to={'/'} className="navbar-brand">
              <img className="w-100" src="/logo.svg" alt="" />
            </Link>
            <button
              class="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavId"
              aria-controls="collapsibleNavId"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
              <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                <li class="nav-item">
                  <NavLink to={'/'} className="nav-link active">
                    Home
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to={'/'} className="nav-link">
                    Link
                  </NavLink>
                </li>
              </ul>
              <form class="d-flex my-2 my-lg-0">
                <input
                  class="form-control me-sm-2"
                  type="text"
                  placeholder="Search"
                />
                <button
                  class="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>

      </header>
    </>
  );
}
