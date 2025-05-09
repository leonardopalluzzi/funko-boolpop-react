
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import ProductImages from "../components/smart/ProductImages"
import { useCartContext } from "../contexts/cartContext"


export default function ProductPage() {

    const { handleCart, cart } = useCartContext()

    const navigate = useNavigate()

    const [funko, setFunkos] = useState({
        state: 'loading'
    })

    const { slug } = useParams()

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/funkoboolpop/${slug}`)
            .then(res => res.json())
            .then(data => {
                setFunkos({
                    state: 'success',
                    result: data
                })


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
                        <div className="container py-5 ">
                            <div className="row row-cols-1 row-cols-lg-2 ">
                                <div className=" col col-xs-12 col-sm-12 col-md-12 col-lg-6 " key={funko.result.slug}>
                                    <div className="product_page_img border rounded-5 overflow-hidden">
                                        <ProductImages images={funko.result.images} />
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="">{funko.result.license.toUpperCase()}</label>
                                    <h1 className="mb-5">{funko.result.name}</h1>
                                    <div className="price_section">
                                        {/* <h2 className="mb-4">Price:</h2> */}
                                        <div>
                                            {
                                                funko.result.promotion.length > 0 ?
                                                    (
                                                        <>
                                                            <label>
                                                                <span className="text-danger fs-5">
                                                                    <del>{funko.result.price} €</del>
                                                                </span>
                                                                <span className="price_label mx-3 text-success">
                                                                    {
                                                                        (funko.result.price * funko.result.promotion[0].discount / 100).toFixed(2)
                                                                    } €
                                                                </span>
                                                            </label>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <label className="price_label">
                                                                {funko.result.price} €
                                                            </label>
                                                        </>
                                                    )
                                            }
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleCart(funko.result)}
                                        className="btn btn_chart my-2 my-sm-0"
                                        type="submit">
                                        Add to cart
                                    </button>
                                    <span className="mx-4">{cart.message}</span>
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
                                            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
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