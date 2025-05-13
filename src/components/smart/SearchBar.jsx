import { useState, useEffect } from 'react';
import SearchBarUi from '../dumb/SearchBar.ui';
import SearchResultsUi from '../dumb/SearchResults.ui';
import Loader from '../dumb/Loader.ui';

export default function SearchBar({ page = 1, limit = 10, display }) {

    const [searchText, setSearchText] = useState({
        name: ''
    });

    const [filteredFunko, setFilteredFunko] = useState({
        state: 'loading'
    });

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/funkoboolpop?page=${page}&limit=${limit}&name=${searchText.name}&searchOnly=true`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.results);
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

    switch (filteredFunko.state) {
        case 'loading':
            return (
                <>

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
                    <SearchBarUi
                        serachName={searchText.name}
                        serachDescription={searchText.description}
                        serachCategory={searchText.category}
                        onchange={handleChange}
                        handleSearch={handleSearch}
                    />
                    <div className={display == false ? 'd-block' : 'd-none'}>
                        {filteredFunko.data.results && filteredFunko.data.results.length > 0 ? (<><SearchResultsUi emptyResearch={emptyResearch} results={filteredFunko.data.results} /></>) : (<></>)}
                    </div>


                </>


            );
    }
}