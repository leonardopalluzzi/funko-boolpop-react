import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext()

function CartProvider({ children }) {

    const emptyCart = {
        state: '',
        message: '',
        cartItemNumber: 0,
        userCart: []
    }

    const checkForCart = JSON.parse(localStorage.getItem('cart'))

    const [cart, setCart] = useState(checkForCart ? checkForCart : emptyCart)


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
        if (cart.userCart.length < 1) {
            localStorage.removeItem('cart')
        }
    }, [cart])



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

            if (itemCheck.quantity == 0) {
                return setCart({
                    ...cart,
                    state: 'error',
                    message: 'This item is no longer available',
                })
            }

            //credo sia inutile sta roba ma non ricordo
            const currentQuantity = newItem.quantity
            const currentBuying = newItem.cartQuantity

            console.log(currentQuantity, currentBuying);


            if (currentBuying == currentQuantity) {
                itemOverFlag = true
            }
        }

        if (itemCheck) {
            newItem.quantity = newItem.quantity - 1
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

    function deleteFromCart(itemToDelete) {

        const quantityToDelete = Number(itemToDelete.cartQuantity)

        const updatedCart = cart.userCart.filter(item => {
            if (item.slug !== itemToDelete.slug) {
                return {
                    ...item,
                    cartQuantity: 0,
                    quantity: item.quantity
                }
            }
        })

        setCart({
            state: 'success',
            message: 'Product deleted from cart',
            cartItemNumber: cart.cartItemNumber - quantityToDelete,
            userCart: updatedCart
        })
    }

    function subtractCartQuantity(itemToChange) {

        if (itemToChange.cartQuantity > 1) {
            const updatedCart = cart.userCart.map(item => {
                if (item.slug === itemToChange.slug) {
                    return {
                        ...item,
                        cartQuantity: item.cartQuantity - 1,
                        quantity: item.quantity + 1
                    };
                }
                return item;
            });


            setCart({
                state: 'success',
                message: 'Product subtracted',
                cartItemNumber: cart.cartItemNumber - 1,
                userCart: updatedCart
            });



        } else {
            const quantityToDelete = Number(itemToChange.cartQuantity)

            const updatedCart = cart.userCart.filter(item => {
                if (item.slug !== itemToChange.slug) {
                    return {
                        ...item,
                        cartQuantity: 0,
                        quantity: item.quantity
                    }
                }
            })

            setCart({
                state: 'success',
                message: 'Product deleted from cart',
                cartItemNumber: cart.cartItemNumber - quantityToDelete,
                userCart: updatedCart
            })
        }

    }

    function addCartQuantity(itemToChange) {

        if (itemToChange.cartQuantity < itemToChange.quantity) {
            const updatedCart = cart.userCart.map(item => {
                if (item.slug === itemToChange.slug) {
                    return {
                        ...item,
                        cartQuantity: item.cartQuantity + 1,
                        quantity: item.quantity - 1
                    };
                }
                return item;
            });


            setCart({
                state: 'success',
                message: 'Product added',
                cartItemNumber: cart.cartItemNumber + 1,
                userCart: updatedCart
            });



        } else {

            setCart({
                state: 'error',
                message: 'Product no longer available',
                cartItemNumber: cart.cartItemNumber,
                userCart: cart.userCart
            })
        }

    }



    return (
        <>
            <CartContext.Provider value={{ handleCart, cart, deleteFromCart, subtractCartQuantity, addCartQuantity }}>
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