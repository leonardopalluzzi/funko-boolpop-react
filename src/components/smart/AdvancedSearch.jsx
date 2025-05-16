import AdvancedSearchUi from "../dumb/AdvancedSearch.ui"
import { useState, useEffect } from 'react';
import SearchResultsUi from "../dumb/SearchResults.ui";
import Loader from "../dumb/Loader.ui";
import { useFiltersContext } from "../../contexts/filtersContext";

export default function AdvancedSearch() {

    const context = useFiltersContext()

    //aspetto che il context sia disponibile
    if (!context) {
        return <Loader />
    }

    console.log(context);

    const { searchText, handleChangeFilters, handleSubmit, sortValues, handleChangeSort, handleEmptyQuery } = useFiltersContext()

    const [categoryList, setCategoryList] = useState({
        state: 'loading'
    })

    const [promoList, setPromoList] = useState({
        state: 'loading'
    })

    const [attributeList, setAttributeList] = useState({
        state: 'loading'
    })

    /*fetch promo*/
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/funkoboolpop?getPromo=true')//query da definire nella backend getPromo
            .then((res) => res.json())
            .then((data) => {
                setPromoList({
                    state: 'success',
                    data: data,
                });
            })
            .catch((err) => {
                setPromoList({
                    state: 'error',
                    message: err.message,
                });
            });
    }, [])

    //filtri attributes
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/funkoboolpop?getAttribute=true')
            .then((res) => res.json())
            .then((data) => {
                console.log(`lista attributei: ${data}`);
                setAttributeList({
                    state: 'success',
                    data: data,
                });
            })
            .catch((err) => {
                setAttributeList({
                    state: 'error',
                    message: err.message,
                });
            });
    }, [])

    /*fetch category*/
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/funkoboolpop?getCategory=true')
            .then((res) => res.json())
            .then((data) => {
                setCategoryList({
                    state: 'success',
                    data: data,
                });
            })
            .catch((err) => {
                setCategoryList({
                    state: 'error',
                    message: err.message,
                });
            });
    }, [])

    function handleSearch(searchText) {
        //inserire redirect ad una pagina con i risultati della ricerca al submit
    }

    switch (categoryList.state && promoList.state && attributeList.state) {
        case 'loading':
            return (
                <>
                    <Loader />
                </>
            )
        case 'error':
            return (
                <>
                    <h1>{categoryList.state}</h1>
                    <p>{categoryList.message}</p>
                </>
            )
        case 'success':
            return (
                <>
                    <div className="container">
                        <AdvancedSearchUi
                            searchName={searchText.name}
                            searchDescription={searchText.description}
                            searchCategory={searchText.category}
                            searchMinPrice={searchText.minPrice}
                            searchMaxPrice={searchText.maxPrice}
                            searchPromo={searchText.promotion}
                            searchAttribute={searchText.attribute}
                            onchange={handleChangeFilters}
                            onsubmit={handleSubmit}
                            categoryList={categoryList.data}
                            promoList={promoList.data}
                            sortValues={sortValues}
                            onchangeSort={handleChangeSort}
                            attributeList={attributeList.data}
                            emptyQuery={handleEmptyQuery}
                        />
                    </div>

                </>
            )
    }
}