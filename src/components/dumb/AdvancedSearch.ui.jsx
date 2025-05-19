export default function AdvancedSearchUi({ searchName, searchDescription, searchCategory, searchMinPrice, searchMaxPrice, emptyQuery, searchPromo, onchange, onsubmit, categoryList, promoList, searchAttribute, sortValues, onchangeSort, attributeList }) {
    return (
        <>
            <div className="container">
                <div className=" mx-3 mt-2">

                    <form id="filtersForm" className="mb-3" onSubmit={(e) => { e.preventDefault(); onsubmit() }}>

                        <div className="row row-cols-1 row-cols-md-4 row-cols-lg-8 justify-content-center ">
                            {/* <div className="col my-2">

                                
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="form-control custom-input"
                                    value={searchName}
                                    onChange={(e) => onchange(e.target.name, e.target.value)}
                                    defaultValue=""
                                />

                            </div> */}
                            <div className="col my-2">
                                {/*prezzo*/}
                                <label className="text-white" htmlFor="">Prezzo Minimo</label>
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

                            <div className="col my-2 ">
                                {/*prezzo*/}
                                <label className="text-white" htmlFor="">Prezzo Massimo</label>
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
                            <div className="col my-2 ">
                                <label className="text-white" htmlFor="">Cerca per cateogria</label>
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
                                            <option value={item.name}>{item.name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>

                            {/* filtro promozioni */}
                            <div className="col my-2 ">
                                <label className="text-white" htmlFor="">Cerca per promozione</label>
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
                                            <option value={item.name}>{item.name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>


                            {/* filtro attributi */}
                            <div className="col my-2 ">
                                <label className="text-white" htmlFor="">Cerca per attributo</label>
                                <select
                                    value={searchAttribute}
                                    onChange={(e) => onchange(e.target.name, e.target.value)}
                                    className="form-select form-select-xs custom-input"
                                    name="attribute"

                                >
                                    <option value='' selected>Select an Attribute</option>

                                    {/* fare map per le options  */}
                                    {attributeList.map(item => (
                                        <>
                                            <option value={item.name}>{item.name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>


                            {/* filtro ordinamento */}
                            <div className="col my-2 ">
                                <label className="text-white" htmlFor="">Ordina per</label>
                                <select
                                    value={sortValues}
                                    onChange={(e) => onchangeSort(e.target.value)}
                                    className="form-select form-select-xs custom-input"
                                    name="promotion"

                                >
                                    <option value='' selected>Sort By</option>

                                    {/* fare map per le options  */}

                                    <option value="price=1">Sort By Price Cheaper</option>
                                    <option value="price=-1">Sort By Price Most Expensive</option>
                                    <option value="date=1">Sort By Date last Arrive</option>
                                    <option value="date=-1">Sort By Date Oldest</option>
                                    <option value="sales=1">Sort By Most Sold</option>
                                    <option value="sales=-1">Sort By Less Sold</option>

                                </select>
                            </div>

                            {/* filtro descrizione  */}
                            <div className="col my-2">
                                <label className="text-white" htmlFor="">Cerca per Parole chiave</label>
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
                        </div>
                        <div className="d-flex align-item-center justify-content-center w-100 gap-4 mt-2 mb-2">
                            <button
                                type="submit"
                                className="btn btn-warning px-3"
                            >
                                Applica
                            </button>
                            <button type="button" className="btn btn-warning px-3" onClick={() => emptyQuery()}>
                                Resetta Filtri
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}