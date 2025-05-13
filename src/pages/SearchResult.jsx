import { useState } from "react";
import AdvancedSearch from "../components/smart/AdvancedSearch"
import LayoutSearchProducts from '../components/smart/LayoutSearchedProducts'


export default function SearchResult() {

    const [showFilters, setShowFilters] = useState(false);

    return (
        <div>

            <div className="bg-custom-darker border-bottom">

                <button
                    className="btn btn-link text-center w-100 filter-text my-2"
                    onClick={() => setShowFilters((prev) => !prev)}
                    aria-expanded={showFilters}
                    aria-controls="filterCollapse"
                >
                    <span>
                        <i className={`bi ${showFilters ? "bi-x-lg" : "bi-funnel"}`}></i>
                    </span>{" "}
                    {showFilters ? "Chiudi" : "Filtri di ricerca"}
                </button>

                <div className={`collapse${showFilters ? " show" : ""}`} id="filterCollapse">

                    <AdvancedSearch />

                </div>
            </div>

            <main className="p-4">
                <h1>Search Page</h1>
                {/* Risultati della ricerca*/}
                <LayoutSearchProducts />
            </main>
        </div>
    );
}