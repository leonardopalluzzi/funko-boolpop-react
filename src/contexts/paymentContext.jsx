import { createContext, useContext, useState } from "react";

const PaymentContext = createContext()

function PaymentProvider({ children }) {

    const [payment, setPayment] = useState({
        state: 'laoding',
    })

    function paymentIntent(form) {
        fetch('http://localhost:3000/api/v1/transactions', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPayment({
                    state: 'success',
                    client_secret: data.clientSecret
                })

            })
            .catch(err => {
                console.error(err)
                setPayment({
                    state: 'error',
                    messaage: err.message
                })
            })
    }

    return (
        <>
            <PaymentContext.Provider value={{ paymentIntent, payment }}>
                {children}
            </PaymentContext.Provider>
        </>
    )
}

function usePaymentContext() {
    const context = useContext(PaymentContext)
    return context
}

export { PaymentProvider, usePaymentContext }