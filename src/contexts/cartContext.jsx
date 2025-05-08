import { createContext, useContext, useState } from "react";

const CartContext = createContext()

function CartProvider({ children }) {

    const [cart, setCart] = useState({
        state: '',
        message: '',
        userCart: []
    })

    function handleCart(newItem) {
        const itemCheck = cart.find(item => item.slug == newItem.slug)

        if (itemCheck) {
            setCart({
                ...cart,
                state: 'error',
                message: 'This product is already in your chart'
            })
        } else {
            setCart({
                ...cart,
                userChart: [...chart.userChart, newItem]
            })
        }
    }




    return (
        <>
            <CartContext.Provider value={{ handleCart, cart }}>
                {children}
            </CartContext.Provider>
        </>
    )
}


function useCartContext() {
    const context = useContext(CartContext)
    return context
}

export { CartProvider, useCartContext }