import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from '../components/smart/PaymentForm'

export default function Payment() {

    const stripePromise = loadStripe('pk_live_51RKppyL1WbucwTe96tGRjDoGRLK2bczlROKQHcuWmshhl1iShdeIHj4AZDGXcdKaXKopwksWDcZZ03x2BpIlpxbK001ehElQdg');

    return (
        <>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm />
            </Elements>
        </>
    )
}