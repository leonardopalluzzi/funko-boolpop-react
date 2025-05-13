export default function AdvancedSearchUi({ searchDescription, searchCategory, onchange, handleSearch, categoryList }) {
    return (
        <>
            <div className="container">
                <div className=" mx-3 mt-2">


                    <form className="mb-3">

                        <div className="row justify-content-center ">
                            <div className="col-12 col-md-2 my-2">

                                {/*nome*/}
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="form-control custom-input"
                                />

                            </div>
                            <div className="col-12 col-md-2 my-2">
                                {/*prezzo*/}
                                <input
                                    type="number"
                                    name="maxPrice"
                                    min="0"
                                    className="form-control custom-input"
                                    placeholder="Max Price"
                                />
                            </div>


                            {/* filtro categoria  */}
                            <div class="col-12 col-md-2 my-2 ">
                                <select
                                    value={searchCategory}
                                    onChange={(e) => onchange(e.target.name, e.target.value)}
                                    className="form-select form-select-xs custom-input"
                                    name="category"
                                    id=""
                                >
                                    <option value='' selected>Select a category</option>

                                    {/* fare map per le options  */}
                                    {categoryList.map(item => (
                                        <>
                                            <option value={item.name.toLowerCase().replaceAll(' ', '')}>{item.name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>

                            {/* filtro descrizione  */}
                            <div class="col-12 col-md-2 my-2">
                                <input
                                    value={searchDescription}
                                    onChange={(e) => onchange(e.target.name, e.target.value)}
                                    type="text"
                                    className="form-control custom-input"
                                    name="description"
                                    id=""
                                    aria-describedby="helpId"
                                    placeholder="Search for keywords"
                                />
                            </div>


                            <div className="col-12 col-md-2 mt-2 mb-2">
                                <button
                                    type="submit"
                                    className="btn btn-warning px-3"
                                >
                                    Applica filtri
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}