import { useCartContext } from "../../contexts/cartContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function CartHover() {

    const [display, setDisplay] = useState(0)

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

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    }



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

                    <div className="hover_cart" style={{ transform: `translate(0, ${display}%)` }}>
                        <div className="w-100 toggle_cart_container">
                            <button className="btn toggle_cart_btn" onClick={display == 86 ? () => setDisplay(0) : () => setDisplay(86)}><i class="bi bi-cart-fill"></i></button>
                        </div>
                        <div className="container">
                            <div className="hover_cart_body">
                                <h4>Your Cart</h4>
                                <div className="container">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" >Image</th>
                                                <th scope="col" className="cart_hover_display" >Name</th>
                                                <th scope="col" className="cart_hover_display" >Promo</th>
                                                <th scope="col" style={{ width: "20%" }}>Price*</th>
                                                <th scope="col" >Quantity</th>
                                                <th scope="col" >ACTIONS</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.userCart.map(item => (
                                                    <>
                                                        <tr>
                                                            <td className="w-100">
                                                                <div className="cart_img_container">
                                                                    <img onClick={() => navigate(`/${item.slug}`)} className="cart_img" src={`http://localhost:3000/${item.images[0].image}`} alt={item.name} />
                                                                </div>
                                                            </td>
                                                            <td className="cart_hover_display">{truncateText(item.name, 10)}</td>
                                                            <td className="cart_hover_display">
                                                                {
                                                                    item.promotion.length > 0 ? (<><span>{item.promotion[0].discount}%</span></>) : (<>No promotions found</>)
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.promotion.length > 0 ?
                                                                        (
                                                                            <>
                                                                                <label>
                                                                                    <span className="price_label_card text-success fs-6">
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
                                                            <td className="text-center">
                                                                X{item.cartQuantity}
                                                            </td>
                                                            <td className="text-center">
                                                                <div class="btn-group">
                                                                    <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        <i class="bi bi-three-dots"></i>
                                                                    </button>
                                                                    <ul class="dropdown-menu text-center">
                                                                        <button onClick={() => deleteFromCart(item)} className="btn btn-danger mx-2 my-2"><i class="bi bi-trash"></i></button>
                                                                        <button onClick={() => navigate(`/${item.slug}`)} className="btn btn-primary"><i class="bi bi-eye"></i></button>
                                                                    </ul>
                                                                </div>



                                                            </td>

                                                        </tr>
                                                    </>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                    <div className="total_hover_cart">
                                        <h5>TOTAL:</h5>
                                        <h6>{total.toFixed(2)}€</h6>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/checkout`)}
                                        className="btn btn-success fs-5 my-2 my-sm-0"
                                        type="submit">
                                        Proceed to payment
                                    </button>
                                    <button
                                        onClick={() => navigate(`/cart`)}
                                        className="btn btn-primary fs-5 my-2 my-sm-0 mx-3"
                                        type="submit">
                                        Show Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div >
                </>
            )
    }

}