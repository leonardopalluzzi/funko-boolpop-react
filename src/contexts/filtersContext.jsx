import { createContext, useContext, useEffect, useState } from "react";



const FiltersContext = createContext()

function FiltersProvider({ children }) {

    const page = 1

    const [products, setProducts] = useState({
        state: "loading",
    });


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


    const live_url = `http://localhost:3000/api/v1/funkoboolpop?searchOnly=true&page=${page}&limit=${limit}&name=${searchText.name}&description=${searchText.description}&category=${searchText.category}&attribute=${searchText.attribute}&minPrice=${searchText.minPrice}&maxPrice=${searchText.maxPrice}&promotion=${searchText.promotion}`

    const test_url = `http://localhost:3000/api/v1/funkoboolpop?searchOnly=true&page=${page}&limit=${limit}&name=${searchText.name}&description=${searchText.description}&category=${searchText.category}&minPrice=${searchText.minPrice}&maxPrice=${searchText.maxPrice}`

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
    }, [searchText]);

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

    return (
        <>
            <FiltersContext.Provider value={{ products, handleLimit, handleChangeFilters, searchText }}>
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