import { useState, useEffect } from "react";
import AdvancedSearch from "../components/smart/AdvancedSearch"
import LayoutSearchProducts from '../components/smart/LayoutSearchedProducts'
import { useLocation, useNavigate } from "react-router-dom";


export default function SearchResult() {

    const [showFilters, setShowFilters] = useState(false);
    const VALID_QUERY = ['name', 'category', 'description', 'minPrice', 'maxPrice', 'promotion', 'attribute'];

    const navigate = useNavigate()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const keys = Array.from(searchParams.keys());

        // Caso 1: Nessuna query
        if (keys.length === 0) {
            navigate("/", { replace: true });
            return;
        }

        // Caso 2: Presenza di query non valide
        const hasInvalidQuery = keys.some(key => !VALID_QUERY.includes(key));
        if (hasInvalidQuery) {
            navigate("/", { replace: true });
        }

    }, [location.search, navigate]);


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
                    {showFilters ? "Close" : "Filters"}
                </button>

                <div className={`collapse${showFilters ? " show" : ""}`} id="filterCollapse">

                    <AdvancedSearch />

                </div>
            </div>

            <main className="p-4">
                <h1>Results</h1>
                {/* Risultati della ricerca*/}
                <LayoutSearchProducts />
            </main>
        </div>
    );
}