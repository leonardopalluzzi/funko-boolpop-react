export default function AdvancedSearchUi({ searchDescription, searchCategory, onchange, handleSearch, categoryList }) {
    return (
        <>
            <div className="container">
                <div className="d-flex mx-3 align-items-center justify-content-start gap-4">

                    {/* filtro categoria  */}
                    <div class="mb-3">
                        <select
                            value={searchCategory}
                            onChange={(e) => onchange(e.target.name, e.target.value)}
                            class="form-select form-select-xs"
                            name="category"
                            id=""
                        >
                            <option selected>Select a category</option>

                            {/* fare map per le options  */}
                            {categoryList.map(item => (
                                <>
                                    <option value={item.name.toLowerCase().replaceAll(' ', '')}>{item.name}</option>
                                </>
                            ))}
                        </select>
                    </div>

                    {/* filtro descrizione  */}
                    <div class="mb-3">
                        <input
                            value={searchDescription}
                            onChange={(e) => onchange(e.target.name, e.target.value)}
                            type="text"
                            class="form-control"
                            name="description"
                            id=""
                            aria-describedby="helpId"
                            placeholder="Search for keywords"
                        />
                    </div>

                </div>
            </div>
        </>
    )
}