import { createContext, useContext, useState } from "react";

const CartContext = createContext()

function CartProvider({ children }) {

    const [cart, setCart] = useState({
        state: '',
        message: '',
        userCart: []
    })

    function handleCart(newItem) {
        const itemCheck = cart.userCart.find(item => item.slug == newItem.slug)

        if (itemCheck) {
            setCart({
                state: 'error',
                message: 'This product is already in your chart',
                userCart: [...cart.userCart]
            })
        } else {
            setCart({
                state: 'success',
                message: 'Product added to your cart',
                userCart: [...cart.userCart, newItem]
            })
            console.log(cart);

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