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

    const { searchText, handleChangeFilters } = useFiltersContext()

    const [categoryList, setCategoryList] = useState({
        state: 'loading'
    })

    const [promoList, setPromoList] = useState({
        state: 'loading'
    })

    /*fetch promo*/
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/funkoboolpop?getCategory=true')//query da definire nella backend getPromo
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
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

    /*fetch category*/
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/funkoboolpop?getCategory=true')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
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

    // function emptyResearch() {
    //     setSearchText({
    //         name: '',
    //         category: '',
    //         description: '',
    //         minPrice: 0,
    //         maxPrice: 1000,
    //     })
    // }

    switch (categoryList.state) {
        case 'loading':
            return (
                <>
                    <Loader />
                </>
            )
        case 'error':
            return (
                <>
                    <h1>{filteredFunko.state}</h1>
                    <p>{filteredFunko.message}</p>
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
                            searchPromo={searchText.promo}
                            onchange={handleChangeFilters}
                            handleSearch={handleSearch}
                            categoryList={categoryList.data}
                            promoList={promoList.data}
                        />

                        {filteredFunko.state == 'success' && filteredFunko.data.results && filteredFunko.data.results.length > 0 ? (<><SearchResultsUi emptyResearch={emptyResearch} results={filteredFunko.data.results} /></>) : (<></>)}
                    </div>

                </>
            )
    }
}