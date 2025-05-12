import { useCartContext } from "../contexts/cartContext"
import OrderListUi from "../components/dumb/OrderList.ui"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessCheckout() {

    const { postCart, unloadCart } = useCartContext()
    console.log(postCart);
    const navigate = useNavigate()

    useEffect(() => {
        unloadCart()
    }, [])


    switch (postCart.state) {
        case 'loading':
            return (
                <>
                    <div className="container text-center my-5">
                        <h1>We recived your order correctly</h1>
                        <div><i class="bi bi-check-circle text-success fs-1"></i></div>
                        <h4>Check your email for further details</h4>
                        <div className="container">
                            <h3>Your order</h3>
                            <div className="border rounded-5 p-3 w-50 m-auto">
                                <h1>Loading...</h1>
                            </div>
                        </div>
                    </div>
                </>
            )
        case 'success':
            return (
                <>
                    <div className="container text-center my-5">
                        <h1>We recived your order correctly</h1>
                        <div><i class="bi bi-check-circle text-success fs-1"></i></div>
                        <h4>Check your email for further details</h4>
                        <div className="container">
                            <h3>Your order</h3>
                            <div className="border rounded-5 p-3 w-50 m-auto">
                                <OrderListUi orderList={postCart} />
                                <div>
                                    <h4>Tot: {postCart.amount.toFixed(2)} €</h4>
                                </div>
                            </div>
                            <button onClick={() => navigate('/')} className="btn btn-primary my-4 fs-3">Return to Home</button>
                        </div>
                    </div>
                </>
            )
    }
}