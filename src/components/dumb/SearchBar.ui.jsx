import React from 'react';

export default function SearchBarUi({ searchText, setSearchText, handleSearch }) {
    return (
        <form
            className="d-flex my-2 my-lg-0"
            role="search"
            onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchText);
                setSearchText('');
            }}
        >
            <input
                className="form-control me-sm-2 searchbar"
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button
                className="btn btn-outline-light my-2 my-sm-0  d-flex align-items-center"
                type="submit"
            >
                <i className="bi bi-search px-2"></i>
            </button>
        </form>
    );
}