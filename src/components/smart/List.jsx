import CardUi from "../dumb/Card.ui"
import { useState, useEffect } from "react"

export default function List({ query, scrollRef }) {

    const [products, setProducts] = useState({
        state: 'loading'
    })

    const [page, setPage] = useState(1)  //definisce il numero della pagina visualizzata
    const [limit, setLimit] = useState(5)  // definisce il numero di elementi ricevuti dal db

    useEffect(() => {
        console.log('fetch eseguito');

        fetch(`http://localhost:3000/api/v1/funkoboolpop?page=${page}&limit=${limit}&trans=${query}`)
            .then(res => res.json())
            .then(data => {
                setProducts({
                    state: 'success',
                    data: data
                })
                if (data.length < 1) {
                    setPage(1)
                }
            })
            .catch(err => {
                setProducts({
                    state: 'error',
                    message: err.message
                })
            })
    }, [page, limit])

    function handleLoadNext() {
        setPage(page + 1)

        if (scrollRef?.current) {
            scrollRef.current.scrollLeft = 0; // Resetta lo scroll
        }
        console.log(page);

    }

    switch (products.state) {
        case 'loading':
            return (
                <>
                    <h1>Loading...</h1>
                </>
            )
        case 'error':
            return (
                <>
                    <h1>{products.state}</h1>
                    <p>{products.message}</p>
                </>
            )
        case 'success':
            return (
                <>
                    <div className="page_counter d-flex align-items-center justify-content-center gap-4">
                        <div class="">
                            <label for="" class="form-label">select item number</label>
                            <select
                                class="form-select form-select-lg"
                                name=""
                                id=""
                                onChange={(e) => setLimit(Number(e.target.value))}
                            >
                                <option value='' selected>Select one</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>

                        <span>Page: {page}</span>
                    </div>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 flex-nowrap my-5">
                        {products.data.map(product => (
                            <>
                                <CardUi
                                    images={product.images}
                                    name={product.name}
                                    price={Number(product.price)}
                                    attributes={product.attributes}
                                    license={product.license}
                                    promotions={product.promotions}
                                    slug={product.slug}
                                />
                            </>
                        ))}
                        <button className="btn btn-primary" onClick={() => handleLoadNext()}>Load More</button>
                    </div>
                </>
            )
    }
}