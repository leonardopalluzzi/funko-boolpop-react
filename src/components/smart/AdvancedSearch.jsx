import AdvancedSearchUi from "../dumb/AdvancedSearch.ui"
import { useState, useEffect } from 'react';
import SearchResultsUi from "../dumb/SearchResults.ui";

export default function AdvancedSearch() {

    const page = 1
    const limit = 10
    const [searchText, setSearchText] = useState({
        category: '',
        description: ''
    });

    const [filteredFunko, setFilteredFunko] = useState({
        state: 'loading'
    });

    const [categoryList, setCategoryList] = useState({
        state: 'loading'
    })

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

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/funkoboolpop?page=${page}&limit=${limit}&description=${searchText.description}&category=${searchText.category}&searchOnly=true`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setFilteredFunko({
                    state: 'success',
                    data: data,
                });
            })
            .catch((err) => {
                setFilteredFunko({
                    state: 'error',
                    message: err.message,
                });
            });
    }, [searchText])

    function handleChange(key, value) {
        setSearchText({
            ...searchText,
            [key]: value
        })

    }

    function handleSearch(searchText) {
        //inserire redirect ad una pagina con i risultati della ricerca al submit
    }

    function emptyResearch() {
        setSearchText({
            name: '',
            category: '',
            description: ''
        })
    }

    switch (categoryList.state) {
        case 'loading':
            return (
                <>
                    <h1>loading...</h1>
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
                            searchDescription={searchText.description}
                            searchCategory={searchText.category}
                            onchange={handleChange}
                            handleSearch={handleSearch}
                            categoryList={categoryList.data}
                        />

                        {filteredFunko.state == 'success' && filteredFunko.data.length > 0 ? (<><SearchResultsUi emptyResearch={emptyResearch} results={filteredFunko.data} /></>) : (<></>)}
                    </div>

                </>
            )
    }
}