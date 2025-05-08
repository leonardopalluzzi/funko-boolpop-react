import React, { useState } from 'react';

export default function SearchBarUi({ }) {


    return (

        <form className="d-flex my-2 my-lg-0">
            <input
                className="form-control me-sm-2"
                type="text"
                placeholder="Search"
            />
            <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
            >
                Search
            </button>
        </form>
    )
}