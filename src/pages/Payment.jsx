import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from '../components/smart/PaymentForm'
import { usePaymentContext } from '../contexts/paymentContext';

export default function Payment() {

    const { payment } = usePaymentContext()
    console.log(payment.client_secret);

    const client_secret = payment.clientSecret

    const options = {
        clientSecret: client_secret,
        appearance: {
            theme: 'minimal'
        }
    }


    const stripePromise = loadStripe('pk_test_51RKpq9Q6vBP0glqyfTSi0a2BNUEGYwoLm1tR8rkkRwcDRRdkqYaMgVX3bTnxuYG7A0odSoSqF0bzMNnV3TKyHqUf00xpcTWDMC');


    switch (payment.state) {
        case 'loading':
            return (
                <>
                    <h1>Loading...</h1>
                </>
            )
        case 'error':
            return (
                <>
                    <h1>{payment.state}</h1>
                    <p>{payment.message}</p>
                </>
            )
        case 'success':
            return (
                <>
                    <Elements stripe={stripePromise} options={options}>
                        <PaymentForm clientSecret={client_secret} />
                    </Elements>
                </>
            )
    }
}