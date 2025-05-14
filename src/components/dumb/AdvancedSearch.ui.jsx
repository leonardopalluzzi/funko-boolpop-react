export default function AdvancedSearchUi({ searchName, searchDescription, searchCategory, searchMinPrice, searchMaxPrice, searchPromo, onchange, onsubmit, categoryList, promoList }) {
    return (
        <>
            <div className="container">
                <div className=" mx-3 mt-2">

                    <form className="mb-3" onSubmit={(e) => { e.preventDefault(); onsubmit() }}>

                        <div className="row justify-content-center ">
                            <div className="col-12 col-md-2 my-2">

                                {/*nome*/}
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="form-control custom-input"
                                    value={searchName}
                                    onChange={(e) => onchange(e.target.name, e.target.value)}
                                />

                            </div>
                            <div className="col-12 col-md-2 my-2">
                                {/*prezzo*/}
                                <input
                                    type="number"
                                    name="minPrice"
                                    min="0"
                                    max="1000"
                                    className="form-control custom-input"
                                    placeholder="Min Price"
                                    value={searchMinPrice}
                                    onChange={(e) => onchange(e.target.name, e.target.value)}
                                />
                            </div>

                            <div className="col-12 col-md-2 my-2 ">
                                {/*prezzo*/}
                                <input
                                    type="number"
                                    name="maxPrice"
                                    min="0"
                                    max="1000"
                                    className="form-control custom-input"
                                    placeholder="Max Price"
                                    value={searchMaxPrice}
                                    onChange={(e) => onchange(e.target.name, e.target.value)}
                                />
                            </div>


                            {/* filtro categoria  */}
                            <div className="col-12 col-md-2 my-2 ">
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

                            {/* filtro promozioni */}
                            <div className="col-12 col-md-2 my-2 ">
                                <select
                                    value={searchPromo}
                                    onChange={(e) => onchange(e.target.name, e.target.value)}
                                    className="form-select form-select-xs custom-input"
                                    name="promotion"

                                >
                                    <option value='' selected>Select a Promo</option>

                                    {/* fare map per le options  */}
                                    {promoList.map(item => (
                                        <>
                                            <option value={item.name.toLowerCase().replaceAll(' ', '')}>{item.name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>

                            {/* filtro descrizione  */}
                            <div className="col-12 col-md-2 my-2">
                                <input
                                    value={searchDescription}
                                    onChange={(e) => onchange(e.target.name, e.target.value)}
                                    type="text"
                                    className="form-control custom-input "
                                    name="description"
                                    id=""
                                    aria-describedby="helpId"
                                    placeholder="Search for keywords"
                                />
                            </div>

                            <div className="d-flex justify-content-center col-12 col-md-2 mt-2 mb-2">
                                <button
                                    type="submit"
                                    className="btn btn-warning px-3"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}