import { useState, useEffect } from 'react';
import SearchBarUi from '../dumb/SearchBar.ui';
import SearchResultsUi from '../dumb/SearchResults.ui';

export default function SearchBar({ page = 1, limit = 10 }) {

    const [searchText, setSearchText] = useState({
        name: '',
        category: '',
        description: ''
    });

    function handleChange(key, value) {
        setSearchText({
            ...searchText,
            [key]: value
        })

    }
    const [filteredFunko, setFilteredFunko] = useState({
        state: 'loading'
    });

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/funkoboolpop?page=${page}&limit=${limit}&name=${searchText.name}&description=${searchText.description}&category=${searchText.category}&searchOnly=true`)
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

    function handleSearch(searchText) {
        // fetch(`http://localhost:3000/api/v1/funkoboolpop?page=${page}&limit=${limit}&name=${searchText.name}&description=${searchText.description}&category=${searchText.category}`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data);
        //         setFilteredFunko({
        //             state: 'success',
        //             data: data,
        //         });
        //     })
        //     .catch((err) => {
        //         setFilteredFunko({
        //             state: 'error',
        //             message: err.message,
        //         });
        //     });
    }

    switch (filteredFunko.state) {
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
                    <SearchBarUi
                        serachName={searchText.name}
                        serachDescription={searchText.description}
                        serachCategory={searchText.category}
                        onchange={handleChange}
                        handleSearch={handleSearch}
                    />

                    <SearchResultsUi results={filteredFunko.data} />
                </>
            );
    }
}