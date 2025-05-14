import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from '../components/smart/PaymentForm'
import { usePaymentContext } from '../contexts/paymentContext';
import Loader from '../components/dumb/Loader.ui';

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
    if (!client_secret) {
        console.error("Client secret is missing");
        return <h1>Error: Missing client secret</h1>;
    }

    switch (payment.state) {
        case 'loading':
            return (
                <>
                    <Loader />
                </>
            )
        case 'error':
            console.error('Payment Error:', payment.message);
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
                        <PaymentForm />
                    </Elements>
                </>
            )
    }
}