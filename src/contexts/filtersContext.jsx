import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const FiltersContext = createContext()

function FiltersProvider({ children }) {

    const navigate = useNavigate()

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const name = queryParams.get('name') || ''

    const [products, setProducts] = useState({
        state: "loading",
    });

    const [searchOnly, setSearchOnly] = useState(true);


    //logica filtri
    const [searchText, setSearchText] = useState({
        name: name,
        category: '',
        description: '',
        minPrice: 0,
        maxPrice: 1000,
        promotion: '',
        attribute: '',
        sortBydate: 0,
        sortBySales: 0
    });

    const [limit, setLimit] = useState(Number(queryParams.get('limit')) || 8)
    const [page, setPage] = useState(Number(queryParams.get('page')) || 1)
    const [queryString, setQueryString] = useState('')
    const [searchUrl, setSearchUrl] = useState('http://localhost:3000/api/v1/funkoboolpop?')


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const limitFromUrl = Number(queryParams.get('limit')) || 8; // default a 8
        const pageFromUrl = Number(queryParams.get('page')) || 1;

        setSearchUrl(`http://localhost:3000/api/v1/funkoboolpop${location.search}`)
        setLimit(limitFromUrl);
        setPage(pageFromUrl);
    }, [location.search]);


    const live_url = `http://localhost:3000/api/v1/funkoboolpop?searchOnly=${searchOnly}&page=${page}&limit=${limit}&name=${name}&description=${searchText.description}&category=${searchText.category}&attribute=${searchText.attribute}&minPrice=${searchText.minPrice}&maxPrice=${searchText.maxPrice}&promotion=${searchText.promotion}&date=${Number(searchText.sortBydate)}&sales=${Number(searchText.sortBySales)}`

    const test_url = `http://localhost:3000/api/v1/funkoboolpop?searchOnly=${searchOnly}`

    useEffect(() => {
        console.log(searchUrl);
        setSearchUrl(`http://localhost:3000/api/v1/funkoboolpop?searchOnly=${searchOnly}` + `&${queryString}`)

        fetch(searchUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.totalResults == 0) {
                    setProducts({
                        state: "empty",
                        data: data,
                    });
                } else {
                    setProducts({
                        state: "success",
                        data: data,
                    });
                }
            })
            .catch((err) => {
                setProducts({
                    state: "error",
                    message: err.message,
                });
            });
    }, [location.search, limit, page]);


    //funzioni per i filtri di ricerca
    function handleChangeFilters(key, value) {
        setSearchText({
            ...searchText,
            [key]: value
        })

    }

    function handleLimit(newLimit) {
        const queryParams = new URLSearchParams(location.search)
        queryParams.set('limit', newLimit)
        queryParams.set('page', 1) // reset page

        navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true })
        setLimit(newLimit)
        setPage(1)
    }

    function handlePage(newPage) {
        const queryParams = new URLSearchParams(location.search)
        queryParams.set('page', newPage)
        queryParams.set('limit', limit || 8) // fallback

        navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true })
        setPage(newPage)
    }

    function handleSubmit() {
        const queryParts = []

        if (searchText.name != '') queryParts.push(`name=${encodeURIComponent(searchText.name)}`);
        if (searchText.description != '') queryParts.push(`description=${encodeURIComponent(searchText.description)}`);
        if (searchText.category != '') queryParts.push(`category=${encodeURIComponent(searchText.category)}`);
        if (searchText.attribute != '') queryParts.push(`attribute=${encodeURIComponent(searchText.attribute)}`);
        if (searchText.minPrice) queryParts.push(`minPrice=${encodeURIComponent(searchText.minPrice)}`);
        if (searchText.maxPrice) queryParts.push(`maxPrice=${encodeURIComponent(searchText.maxPrice)}`);
        if (searchText.promotion != '') queryParts.push(`promotion=${encodeURIComponent(searchText.promotion)}`);
        // if (searchText.sortBySales == 1 || searchText.sortBySales == -1) queryParts.push(`sales=${encodeURIComponent(searchText.sortBySales)}`);
        // if (searchText.sortBydate == 1 || searchText.sortBydate == -1) queryParts.push(`date=${encodeURIComponent(searchText.sortBydate)}`);

        setQueryString(queryParts.join('&'))

        // const queryString = queryParts.join('&')
        const queryUrl = `/search-result`

        console.log(queryUrl);


        navigate(`${queryUrl}${queryString ? '?' + queryString : ''}`)
        // setSearchUrl(`http://localhost:3000/api/v1/funkoboolpop?searchOnly=${searchOnly}` + `&${queryString}`)

    }

    return (
        <>
            <FiltersContext.Provider value={{ products, handleLimit, handleChangeFilters, searchText, limit, handleSubmit, handlePage }}>
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