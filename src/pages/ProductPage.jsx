import styles from "../assets/css_modules/Product.module.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductImages from "../components/smart/ProductImages";
import { useCartContext } from "../contexts/cartContext";
import CarouselUi from "../components/dumb/Carousel.ui";
import List from "../components/smart/List";

export default function ProductPage() {
    const { handleCart, cart, subtractCartQuantity, addCartQuantity } = useCartContext();

    const navigate = useNavigate();

    const [products, setProducts] = useState({
        state: 'loading'
    })

    const [funko, setFunkos] = useState({
        state: "loading",
    });

    const [productQuantity, setProductQuantity] = useState(0)
    const [cartItem, setCartItem] = useState(null)
    const [pageTrans, setPageTrans] = useState(1); //definisce il numero della pagina visualizzata
    const [pageDate, setPageDate] = useState(1); //definisce il numero della pagina visualizzata
    const [limit, setLimit] = useState(4); // definisce il numero di elementi ricevuti dal db
    const date = 1; //imposta l'ordinamento per data

    const { slug } = useParams();


    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/funkoboolpop/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setFunkos({
                    state: "success",
                    result: data,
                });
            })
            .catch((err) => {
                setFunkos({
                    state: "error",
                    message: err.message,
                });
            });
    }, []);

    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:3000/api/v1/funkoboolpop?page=${pageTrans}&limit=${limit}&trans=2`).then(resTrans => resTrans.json()),
            fetch(`http://localhost:3000/api/v1/funkoboolpop?page=${pageDate}&limit=${limit}&date=1`).then(resDate => resDate.json()),
        ])
            .then(res => {
                console.log(res);


                setProducts({
                    state: 'success',
                    dataTrans: res[0],
                    dataDate: res[1]
                })

            })
            .catch(err => {
                console.log(err);
                setProducts({
                    state: 'error',
                    message: err.message
                })

            })
    }, [pageTrans, pageDate])

    useEffect(() => {
        if (funko.state === 'success') {

            const foundItem = cart.userCart.find(item => item.slug === funko.result.slug);
            foundItem != undefined ? setCartItem(foundItem) : setCartItem(null)
            setProductQuantity(
                foundItem ? foundItem.quantity : funko.result.quantity
            );
            console.log(productQuantity);

        }
    }, [funko, cart])



    switch (funko.state) {
        case "loading":
            return (
                <>
                    <h1>Loading...</h1>
                </>
            );
        case "error":
            return (
                <>
                    <h1>{funko.state}</h1>
                    <p>{funko.message}</p>
                </>
            );
        case "success":
            return (
                <>
                    <main>
                        <div className="container py-5 h-100">
                            <div className="row row-cols-1 row-cols-lg-2 ">
                                <div
                                    className=" col col-xs-12 col-sm-12 col-md-12 col-lg-6 "
                                    key={funko.result.slug}
                                >
                                    <div className="product_page_img border rounded-5 overflow-hidden">
                                        <ProductImages images={funko.result.images} />
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="">{funko.result.license.toUpperCase()}</label>
                                    <h2 className="mb-2">{funko.result.name}</h2>
                                    <div className="price_section">
                                        {/* <h2 className="mb-4">Price:</h2> */}
                                        <div>
                                            {funko.result.promotion.length > 0 ? (
                                                <>
                                                    <label>
                                                        <span className="text-secondary fs-5">
                                                            <del>{funko.result.price} €</del>
                                                        </span>
                                                        <span className={`${styles.price_label} mx-3`}>
                                                            {(
                                                                (funko.result.price *
                                                                    funko.result.promotion[0].discount) /
                                                                100
                                                            ).toFixed(2)}{" "}
                                                            €
                                                        </span>
                                                    </label>
                                                </>
                                            ) : (
                                                <>
                                                    <label className="price_label">
                                                        {funko.result.price} €
                                                    </label>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleCart(funko.result, funko.result.quantity)}
                                        className={`${styles.btn_add} btn btn_chart my-2 my-sm-0`}
                                        type="submit"
                                    >
                                        Add to cart
                                    </button>

                                    <div>
                                        {cartItem ? (
                                            <>
                                                <button className="btn btn-transparent" onClick={() => subtractCartQuantity(cartItem)}>-</button>
                                                {cartItem.cartQuantity}
                                                <button className="btn btn-transparent" onClick={() => addCartQuantity(cartItem, funko.result.quantity)}>+</button>
                                            </>
                                        ) : (<></>)}

                                    </div>
                                    <span className="mx-4">{cart.message}</span>

                                    <span className="d-block pt-4">
                                        {" "}
                                        <i class="bi bi-box-fill"></i> Available: {cartItem != null ? cartItem.quantity : funko.result.quantity}
                                    </span>

                                    <div className="product_description">
                                        <h4>Description:</h4>
                                        <p>{funko.result.description}</p>
                                    </div>
                                    <div
                                        className="accordion my-custom-accordion"
                                        id="accordionExample"
                                    >
                                        <div className="accordion-item ">
                                            <h2 className="accordion-header ">
                                                <button
                                                    className="accordion_button"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseOne"
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"
                                                >
                                                    Additional Information
                                                </button>
                                            </h2>
                                            <div
                                                id="collapseOne"
                                                className="accordion-collapse collapse"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <p>
                                                        <strong>Category:</strong> {funko.result.category}
                                                    </p>
                                                    <p>
                                                        <strong>License: </strong>
                                                        {funko.result.license}
                                                    </p>
                                                    <p>
                                                        <strong>Special Attributes:</strong>
                                                        <ul className="list-unstyled">
                                                            {funko.result.attributes.map((item) => (
                                                                <>
                                                                    <li className="mx-4">
                                                                        - <strong>{item.name.toUpperCase()}</strong>
                                                                    </li>
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
                            {products.state === 'success' ? (
                                <>
                                    <div className="carousel_productpage mb-5">
                                        <h1 className="fs-3">Guarda anche...</h1>
                                        <CarouselUi dataLength={products.dataDate.totalPages} page={pageDate} setPage={setPageDate} content={(
                                            <>
                                                <List products={products.dataDate} queryName={'date'} page={pageDate} query={date} />

                                            </>
                                        )} />
                                    </div>

                                </>
                            ) : (<></>)}

                        </div>
                    </main>
                </>
            );
    }
}
