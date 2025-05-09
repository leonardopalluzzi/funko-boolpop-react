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

            <div className='input-group'>
                <input
                    className="form-control searchbar"
                    type="text"
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                    className="btn custom-btn"
                    type="submit"
                >
                    <i className="bi bi-search"></i>
                </button>
            </div>
        </form>
    );
}