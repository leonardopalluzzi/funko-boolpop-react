
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductImages from "../components/smart/ProductImages"


export default function ProductPage() {

    const [funko, setFunkos] = useState({
        state: 'loading'
    })

    const { slug } = useParams()
    console.log(slug);

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/funkoboolpop/${slug}`)
            .then(res => res.json())
            .then(data => {
                setFunkos({
                    state: 'success',
                    result: data
                })
                console.log(data);


            })
            .catch(err => {
                setFunkos({
                    state: 'error',
                    message: err.message
                })
            })
    }, [])


    switch (funko.state) {
        case 'loading':
            return (
                <>
                    <h1>Loading...</h1>
                </>
            )
        case 'error':
            return (
                <>
                    <h1>{funko.state}</h1>
                    <p>{funko.message}</p>
                </>
            )
        case 'success':
            return (
                <>
                    <main>
                        <div className="container py-5">
                            <div className="row row-cols-1 row-cols-sm-2 g-4">
                                <div className="col" key={funko.result.slug}>
                                    <div className="product_page_img border rounded-5 overflow-hidden">
                                        <ProductImages images={funko.result.images} />
                                    </div>
                                </div>
                                <div className="col">
                                    <h1 className="mb-5">{funko.result.name}</h1>
                                    <h2>Price: <label className="price_label" htmlFor="">{funko.result.price}</label> </h2>
                                    <button
                                        class="btn btn_chart my-2 my-sm-0"
                                        type="submit">
                                        Aggiungi al carrello
                                    </button>
                                    <div className="product_description">
                                        <h4>Description:</h4>
                                        <p>{funko.result.description}</p>
                                    </div>
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Additional Information
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <p>Category: {funko.result.category}</p>
                                                    <p>License: {funko.result.license}</p>
                                                    <p>
                                                        Special Attributes:
                                                        <ul className="list-unstyled">
                                                            {funko.result.attributes.map(item => (
                                                                <>
                                                                    <li className="mx-4">- <strong>{item.name.toUpperCase()}</strong></li>
                                                                </>
                                                            ))}
                                                        </ul>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </>
            )
    }
}