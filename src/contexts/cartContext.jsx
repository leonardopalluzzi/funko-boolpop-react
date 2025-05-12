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
    const [postCart, setPostCart] = useState({
        state: 'loading',
        data: []
    })


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
        if (cart.userCart.length < 1) {
            localStorage.removeItem('cart')
        }
    }, [cart])



    function handleCart(newItem, totalQuantity) {
        console.log(cart.userCart);

        //controlla inizialmente se la quantita e 0
        if (newItem.quantity == 0) {
            return setCart({
                ...cart,
                state: 'error',
                message: 'This item is no longer available',
            })
        }

        //controlla se e gia nel carrello
        const itemCheck = cart.userCart.find(item => item.slug == newItem.slug)
        if (itemCheck) {

            if (itemCheck.quantity == 0) {
                return setCart({
                    ...cart,
                    state: 'error',
                    message: 'This item is no longer available',
                })
            } else if (itemCheck.quantity <= totalQuantity) {
                addCartQuantity(itemCheck, totalQuantity)
                // itemCheck.quantity = newItem.quantity - 1
                // itemCheck.cartQuantity = newItem.cartQuantity + 1
                // const updatedCart = cart.userCart.map(item => {
                //     if (item.slug == newItem.slug) {
                //         return itemCheck
                //     } else {
                //         return item
                //     }
                // })
                // setCart({
                //     state: 'success',
                //     message: 'Product added to your cart again',
                //     cartItemNumber: cart.cartItemNumber + 1,
                //     userCart: updatedCart
                // })
            }
        } else {
            const itemToPush = { ...newItem }
            itemToPush.cartQuantity = 1
            itemToPush.quantity = newItem.quantity - 1


            setCart({
                state: 'success',
                message: 'Product added to your cart',
                cartItemNumber: cart.cartItemNumber + 1,
                userCart: [...cart.userCart, itemToPush]
            })

            console.log(cart);
        }
    }

    function deleteFromCart(itemToDelete) {

        const quantityToDelete = Number(itemToDelete.cartQuantity)

        const updatedCart = cart.userCart.filter(item => {
            if (item.slug !== itemToDelete.slug) {
                return {
                    ...item
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
                } else {
                    return item;
                }

            });


            setCart({
                state: 'success',
                message: 'Product subtracted',
                cartItemNumber: cart.cartItemNumber - 1,
                userCart: updatedCart
            });



        } else if (itemToChange.cartQuantity == 1) {
            deleteFromCart(itemToChange)
        }

    }

    function addCartQuantity(itemToChange, totalQunatity) {

        if (itemToChange.cartQuantity < totalQunatity) {
            const updatedCart = cart.userCart.map(item => {
                if (item.slug === itemToChange.slug) {
                    return {
                        ...item,
                        cartQuantity: itemToChange.cartQuantity + 1,
                        quantity: itemToChange.quantity - 1
                    };
                } else {
                    return item;
                }
            });


            setCart({
                state: 'success',
                message: 'Product added',
                cartItemNumber: cart.cartItemNumber + 1,
                userCart: updatedCart
            });



        } else if (itemToChange.quantity == 0) {

            setCart({
                state: 'error',
                message: 'Product no longer available',
                cartItemNumber: cart.cartItemNumber,
                userCart: cart.userCart
            })
        }

    }

    async function unloadCart() {
        await new Promise((resolve) => {

            let total = 0

            const priceArr = cart.userCart.map(item => {
                console.log(item);

                const basePrice = Number(item.price)
                const discount = Array.isArray(item.promotion) && item.promotion.length > 0 ? Number(item.promotion[0].discount) : 100
                const quantity = Number(item.cartQuantity)

                let price = (basePrice * discount / 100) * quantity;

                console.log(price);

                return Number(price)
            })
            priceArr.forEach(item => {
                total = total + item
            })

            setPostCart({
                state: 'success',
                amount: total,
                data: cart.userCart
            });
            resolve();
        });
        console.log(postCart);

        setCart(emptyCart)
    }




    return (
        <>
            <CartContext.Provider value={{ handleCart, cart, deleteFromCart, subtractCartQuantity, addCartQuantity, unloadCart, postCart }}>
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