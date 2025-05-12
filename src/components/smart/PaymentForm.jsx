import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { redirect } from 'react-router-dom';
import { useCartContext } from '../../contexts/cartContext';

export default function PaymentForm({ clientSecret }) {

    const { unloadCart } = useCartContext()

    const stripe = useStripe()
    const elements = useElements()
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);


    if (!elements) {
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

        console.log(elements, clientSecret);

        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }

        //delocalizzare la funzione fetch per la creazione dell'intent qui, passare le info dal componente
        try {
            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: 'http://localhost:5173/success-checkout',
                },
            })

            if (error) {
                handleError(error)
            } else {

            }
        } catch (err) {
            console.log(err);
            handleError(err)
        }
    }

    return (
        <>
            <div className="container my-5">
                <form action="" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                    <PaymentElement />
                    <div className="container w-50">
                        <button onClick={() => unloadCart()} className='btn btn-primary my-4 w-100 fs-3' type="submit" disabled={!stripe || loading}>Pay Now</button>
                        {errorMessage && <div>{errorMessage}</div>}
                        <div>{errorMessage}</div>
                    </div>
                </form>
            </div>
        </>
    )
}