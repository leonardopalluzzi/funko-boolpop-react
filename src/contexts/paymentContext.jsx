import { createContext, useContext, useState } from "react";

const PaymentContext = createContext()

function PaymentProvider({ children }) {
    return (
        <>
            <PaymentContext.Provider value={{}}>
                {children}
            </PaymentContext.Provider>
        </>
    )
}

function usePaymentContext() {
    const context = useContext(PaymentContext)
    return context
}