import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from '../components/smart/PaymentForm'
import { usePaymentContext } from '../contexts/paymentContext';

export default function Payment() {

    const { payment } = usePaymentContext()
    console.log(payment.client_secret);

    const client_secret = payment.client_secret

    const options = {
        clientSecret: client_secret,
        appearance: {
            theme: 'flat'
        }
    }


    const stripePromise = loadStripe('pk_live_51RKppyL1WbucwTe96tGRjDoGRLK2bczlROKQHcuWmshhl1iShdeIHj4AZDGXcdKaXKopwksWDcZZ03x2BpIlpxbK001ehElQdg');


    switch (payment.state) {
        case 'laoding':
            return (
                <>
                    <h1>Laoding...</h1>
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