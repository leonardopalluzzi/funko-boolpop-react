import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState, useEffect } from 'react'
import { redirect } from 'react-router-dom';
import { useCartContext } from '../../contexts/cartContext';
import LoaderUi from '../dumb/Loader.ui'
import { useNavigate } from 'react-router-dom';
import { usePaymentContext } from '../../contexts/paymentContext';
import OrderListUi from '../dumb/OrderList.ui'

export default function PaymentForm() {

    const { payment } = usePaymentContext()

    const { cart } = useCartContext()


    const navigate = useNavigate();

    const [recoverCart, setRecoverCart] = useState({
        state: 'loading'
    })

    useEffect(() => {

        const checkCart = JSON.parse(localStorage.getItem('cart'))


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


        console.log('Carrello recuperato:', checkCart);
        if (checkCart) {
            const parsedCart = checkCart;
            console.log('Parsed cart:', parsedCart);

            setRecoverCart({
                state: 'success',
                amount: total,
                data: checkCart.userCart
            })

            console.log(recoverCart);

        } else {
            setRecoverCart({
                state: 'error',
                message: 'no item in your cart',
                redirect_url: '/cart'
            })
            navigate('/cart')
        }


    }, [])


    const { unloadCart } = useCartContext()

    const stripe = useStripe()
    const elements = useElements()
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);


    if (!elements) {
        console.log('elemnt non presente');

        return
    }

    function handleError(error) {
        setLoading(false);
        setErrorMessage(error.message);
    }


    async function handleSubmit() {

        if (!stripe) {

            return;
        }

        setLoading(true)

        console.log(elements, payment.clientSecret);

        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }

        if (recoverCart.state != 'success') {
            return
        }

        try {

            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret: payment.clientSecret,
                confirmParams: {
                    return_url: 'http://localhost:5173/success-checkout',
                },
            })

            if (error) {
                handleError(error)
            } else {
                sessionStorage.removeItem('clientSecret')
            }
        } catch (err) {
            console.error(err);
            handleError(err)
        }
    }

    if (!stripe || !elements) {
        console.error('Stripe or Elements not initialized');
        return null;
    }

    switch (payment.state) {
        case 'loading':
            return (
                <>
                    <LoaderUi />
                </>
            )
        case 'error':
            console.log('Redirecting to: /cart');
            navigate('/cart');
            return null
        case 'success':
            return (
                <>
                    <div className="container my-5">
                        <div className="container cart_summary text-center my-5">
                            <h1>Cart Summary</h1>
                            <div className="container">

                                <div className="order_container border rounded-5 p-3 m-auto">
                                    <OrderListUi orderList={recoverCart} />
                                    <div>
                                        <h4>Tot: {recoverCart.amount.toFixed(2)} €</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form action="" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                            <PaymentElement />
                            <div className="container w-50">
                                <button className='btn btn-primary my-4 w-100 fs-3' type="submit" disabled={!stripe || loading}>Pay Now</button>
                                {errorMessage && <div>{errorMessage}</div>}
                                <div>{errorMessage}</div>
                            </div>
                        </form>
                    </div>
                </>
            )
    }


}