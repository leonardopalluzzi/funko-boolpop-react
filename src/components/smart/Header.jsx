import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  return (
    <>
      <header>
        <nav
          className="navbar navbar-expand-sm"
        >
          <div className="container">
            <Link to={'/'} className="navbar-brand">
              <img className="w-100" src="/logo.svg" alt="" />
            </Link>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavId"
              aria-controls="collapsibleNavId"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink to={'/'} className="nav-link active">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/'} className="nav-link">
                    Link
                  </NavLink>
                </li>
              </ul>
              <form className="d-flex my-2 my-lg-0">
                <input
                  className="form-control me-sm-2"
                  type="text"
                  placeholder="Search"
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
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
