import { useState } from "react";
import AdvancedSearch from "../components/smart/AdvancedSearch";
import LayoutSearchedProducts from "../components/smart/LayoutSearchedProducts";
export default function SearchResult() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div>
      <div className="bg-custom-darker border-bottom">
        <button
          className="btn btn-link text-center w-100 filter-text"
          onClick={() => setShowFilters((prev) => !prev)}
          aria-expanded={showFilters}
          aria-controls="filterCollapse"
        >
          <span>
            <i className={`bi ${showFilters ? "bi-x-lg" : "bi-funnel"}`}></i>
          </span>{" "}
          {showFilters ? "Chiudi" : "Filtri di ricerca"}
        </button>

        <div
          className={`collapse${showFilters ? " show" : ""}`}
          id="filterCollapse"
        >
          <form className="container pb-4">
            <div className="row justify-content-center g-3 align-items-end">
              <div className="col-12 col-md-3">
                <label className="form-label w-100">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control mt-1"
                  />
                </label>
              </div>
              <div className="col-12 col-md-3">
                <label className="form-label w-100">
                  <input
                    type="number"
                    name="maxPrice"
                    min="0"
                    className="form-control mt-1"
                    placeholder="Max Price"
                  />
                </label>
              </div>
            </div>
            <AdvancedSearch />
            <div className="row justify-content-center">
              <div className="col-12 col-md-3">
                <button
                  type="submit"
                  className="btn btn-danger btn-sm w-100 mt-3"
                >
                  Applica filtri
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <main className="p-4">
        {/* Risultati della ricerca*/}
        <LayoutSearchedProducts />
      </main>
    </div>
  );
}
