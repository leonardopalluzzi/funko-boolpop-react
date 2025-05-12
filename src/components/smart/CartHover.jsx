import { useCartContext } from "../../contexts/cartContext"
import { useNavigate } from "react-router-dom"

export default function CartHover() {

    const { cart, deleteFromCart, subtractCartQuantity, addCartQuantity } = useCartContext()
    const navigate = useNavigate()

    let total = 0

    const priceArr = cart.userCart.map(item => {
        console.log(item);

        const basePrice = Number(item.price)
        const discount = Array.isArray(item.promotion) && item.promotion.length > 0 ? Number(item.promotion[0].discount) : 100
        const quantity = Number(item.cartQuantity)

        let price = (basePrice * discount / 100) * quantity;

        console.log(price);

        return Number(price)
    })
    priceArr.forEach(item => {
        total = total + item
    })



    switch (cart.state) {
        case 'loading':
            return (
                <>
                    <h1>Loading...</h1>
                </>
            )
        case 'success':
            return (
                <>
                    <div className="hover_cart">
                        <div className="container">
                            <div className="hover_cart_body">
                                <h4>Your Cart</h4>
                                <div className="container">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ width: "15%" }}>Product Image</th>
                                                <th scope="col">Product Name</th>
                                                <th scope="col">Promo</th>
                                                <th scope="col">Price*</th>
                                                <th scope="col">ACTIONS</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.userCart.map(item => (
                                                    <>
                                                        <tr>
                                                            <td>
                                                                <div className="cart_img_container">
                                                                    <img onClick={() => navigate(`/${item.slug}`)} className="cart_img" src={`http://localhost:3000/${item.images[0].image}`} alt={item.name} />
                                                                </div>
                                                            </td>
                                                            <td>{item.name}</td>
                                                            <td>
                                                                {
                                                                    item.promotion.length > 0 ? (<><span>{item.promotion[0].name}: </span><span>{item.promotion[0].discount}%</span></>) : (<>No promotions found</>)
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.promotion.length > 0 ?
                                                                        (
                                                                            <>
                                                                                <label>
                                                                                    <span className="price_label_card text-success">
                                                                                        {
                                                                                            (item.price * item.promotion[0].discount / 100).toFixed(2)
                                                                                        } €
                                                                                    </span>
                                                                                </label>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <label className="price_label_card">
                                                                                    {item.price} €
                                                                                </label>
                                                                            </>
                                                                        )
                                                                }
                                                            </td>
                                                            <td className="d-flex flex-column align-items-center gap-2">
                                                                <button onClick={() => deleteFromCart(item)} className="btn btn-danger mx-2"><i class="bi bi-trash"></i></button>
                                                                <button onClick={() => navigate(`/${item.slug}`)} className="btn btn-primary"><i class="bi bi-eye"></i></button>
                                                            </td>

                                                        </tr>
                                                    </>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                    <div className="total">
                                        <h4>TOTAL:</h4>
                                        <h5>{total.toFixed(2)}€</h5>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/checkout`)}
                                        class="btn btn-success fs-3 my-2 my-sm-0"
                                        type="submit">
                                        Procedi al pagamento
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
    }

}