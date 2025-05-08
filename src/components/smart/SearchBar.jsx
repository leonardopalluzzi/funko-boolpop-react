import React, { useState } from 'react';
import SearchBarUi from '../dumb/SearchBar.ui';

export default function SearchBar({ page = 1, limit = 10 }) {
    const [searchText, setSearchText] = useState('');
    const [filteredFunko, setFilteredFunko] = useState('');

    function handleSearch(searchText) {
        fetch(`http://localhost:3000/api/v1/funkoboolpop?page=${page}&limit=${limit}&search=${searchText}`)
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
    }

    return (
        <SearchBarUi
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
        />
    );
}