import { createContext, useContext, useState } from "react";

const CartContext = createContext()

function CartProvider({ children }) {

    const [cart, setCart] = useState({
        state: '',
        message: '',
        cartItemNumber: 0,
        userCart: []
    })

    function handleCart(newItem) {

        let itemOverFlag = false;

        if (newItem.quantity == 0) {
            return setCart({
                ...cart,
                state: 'error',
                message: 'This item is no longer available',
            })
        }


        const itemCheck = cart.userCart.find(item => item.slug == newItem.slug)

        if (itemCheck) {
            const currentQuantity = newItem.quantity
            const currentBuying = newItem.cartQuantity

            console.log(currentQuantity, currentBuying);


            if (currentBuying == currentQuantity) {
                itemOverFlag = true
            }
        }

        if (itemCheck) {
            const updatedCart = cart.userCart.map(item => {
                if (item.slug == newItem.slug) {
                    return {
                        ...item,
                        cartQuantity: Number(item.cartQuantity + 1),
                        quantity: item.quantity - 1
                    }
                } else {
                    return item
                }
            })
            setCart({
                state: 'success',
                message: 'Product added to your cart again',
                cartItemNumber: cart.cartItemNumber + 1,
                userCart: updatedCart
            })
        } else {
            newItem.cartQuantity = 1
            newItem.quantity = newItem.quantity - 1
            setCart({
                state: 'success',
                message: 'Product added to your cart',
                cartItemNumber: cart.cartItemNumber + 1,
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