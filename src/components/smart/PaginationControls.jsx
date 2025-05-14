import { useFiltersContext } from "../../contexts/filtersContext";
import { useState, useEffect } from "react";
import Loader from "../dumb/Loader.ui";

export default function PaginationControls() {

    const { handlePage, handleLimit, products, page, limit } = useFiltersContext()
    const [active, setActive] = useState(0)

    useEffect(() => {
        setActive(0)
    }, [limit])

    function handleLoadNext() {
        if (page < products.data.totalPages) {
            setPage(page + 1);
        } else {
            setPage(1);
        }
        console.log(page);
    }

    switch (products.state) {
        case 'loading':
            return (
                <>
                    <Loader />
                </>
            )
        case 'error':
            return (
                <>
                    <h1>{products.state}</h1>
                    <p>{products.message}</p>
                </>
            )
        case 'success':
            return (
                <>
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <div>
                            <label for="" className="form-label">select item number</label>

                            <select
                                className="form-select form-select-sm w-100"
                                name=""
                                id=""
                                onChange={(e) => handleLimit(Number(e.target.value))}
                            >
                                <option value="" selected>
                                    Products Number
                                </option>
                                <option value="4">4</option>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>

                        <div>
                            <span className="mx-4">Select Page</span>
                            {(() => {
                                const elements = [];
                                for (let i = 0; i < products.data.totalPages; i++) {
                                    elements.push(
                                        <button className={`btn ${active == i ? 'btn-outline-primary' : 'btn-transparent'}`} key={i} onClick={() => { handlePage(i + 1); setActive(i) }}>
                                            {i + 1}
                                        </button>
                                    );
                                }
                                return elements;
                            })()}
                            <span className="sm-font">
                                Page: {products.data.currentPage} / {products.data.totalPages}
                            </span>
                        </div>
                    </div>
                </>
            )
    }
}