import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBarUi({ searchName, onchange, handleSearch, searchDescription }) {

    const navigate = useNavigate();

    return (
        <form
            className="d-flex my-2 my-lg-0"
            role="search"
            onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}
        >

            <div className='input-group'>
                <input
                    className="form-control searchbar"
                    type="text"
                    placeholder="Search"
                    name='name'
                    value={searchName}
                    onChange={(e) => onchange(e.target.name, e.target.value)}
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

