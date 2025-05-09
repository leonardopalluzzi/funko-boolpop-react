import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import PaymentFormUi from '../dumb/PaymentForm.ui'

export default function PaymentForm() {
    return (
        <>

            <PaymentElement />
            <PaymentFormUi />
        </>
    )
}