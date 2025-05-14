import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const FiltersContext = createContext()

function FiltersProvider({ children }) {

    const navigate = useNavigate()

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const name = queryParams.get('name') || ''
    const description = queryParams.get('description') || ''
    const category = queryParams.get('category') || ''
    const attribute = queryParams.get('attribute') || ''
    const minPrice = Number(queryParams.get('minPrice')) || 0
    const maxPrice = Number(queryParams.get('maxPrice')) || 100

    const page = 1

    const [products, setProducts] = useState({
        state: "loading",
    });

    const [searhcOnly, setSearchOnly] = useState(true);


    //logica filtri
    const [searchText, setSearchText] = useState({
        name: '',
        category: '',
        description: '',
        minPrice: 0,
        maxPrice: 1000,
        promotion: '',
        attribute: ''
    });

    const [limit, setLimit] = useState(5)


    const live_url = `http://localhost:3000/api/v1/funkoboolpop?searchOnly=${searhcOnly}&page=${page}&limit=${limit}&name=${name}&description=${searchText.description}&category=${searchText.category}&attribute=${searchText.attribute}&minPrice=${searchText.minPrice}&maxPrice=${searchText.maxPrice}&promotion=${searchText.promotion}`

    const test_url = `http://localhost:3000/api/v1/funkoboolpop?searchOnly=${searhcOnly}&page=${page}&limit=${limit}&name=${name}&description=${description}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`

    useEffect(() => {
        console.log(searchText);

        fetch(test_url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                setProducts({
                    state: "success",
                    data: data,
                });
            })
            .catch((err) => {
                setProducts({
                    state: "error",
                    message: err.message,
                });
            });
    }, [handleSubmit]);

    function handleLimit(limitValue) {
        setLimit(limitValue)
    }


    //funzioni per i filtri di ricerca
    function handleChangeFilters(key, value) {
        setSearchText({
            ...searchText,
            [key]: value
        })

    }

    function handleSubmit() {
        const queryParts = []

        if (searchText.name != '') queryParts.push(`name=${encodeURIComponent(searchText.name)}`);
        if (searchText.description != '') queryParts.push(`description=${encodeURIComponent(searchText.description)}`);
        if (searchText.category != '') queryParts.push(`category=${encodeURIComponent(searchText.category)}`);
        if (searchText.attribute != '') queryParts.push(`attribute=${encodeURIComponent(searchText.attribute)}`);
        if (searchText.minPrice != 0) queryParts.push(`minPrice=${encodeURIComponent(searchText.minPrice)}`);
        if (searchText.maxPrice != 1000) queryParts.push(`maxPrice=${encodeURIComponent(searchText.maxPrice)}`);
        if (searchText.promotion != '') queryParts.push(`promotion=${encodeURIComponent(searchText.promotion)}`);

        const queryString = queryParts.join('&')
        const queryUrl = `/search-result`

        navigate(`${queryUrl}${queryString ? '?' + queryString : ''}`)

    }

    return (
        <>
            <FiltersContext.Provider value={{ products, handleLimit, handleChangeFilters, searchText, handleSubmit }}>
                {children}
            </FiltersContext.Provider>
        </>
    )
}

function useFiltersContext() {
    const context = useContext(FiltersContext)
    // if (!context) {
    //     throw new Error('useFiltersContext must be used within a FiltersProvider');
    // }
    return context
}

export { FiltersProvider, useFiltersContext }