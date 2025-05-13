import CheckoutFormUi from "../components/dumb/CheckoutForm.ui"
import { useState } from "react"
import { useCartContext } from "../contexts/cartContext";
import { usePaymentContext } from "../contexts/paymentContext";
import { useNavigate } from "react-router-dom";


export default function Checkout() {

    const { cart, setCart } = useCartContext()
    const { paymentIntent } = usePaymentContext()
    const navigate = useNavigate()

    //calcola il totale da comprare
    let total = 0;

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



    const [checkout, setCheckout] = useState({
        username: '',
        user_last_name: '',
        useremail: '',
        cart: cart.userCart,
        amount: Number(total.toFixed(2))
    })

    const [shippingAddress, setShippingAddress] = useState({
        city: '',
        province: '',
        nation: '',
        street: '',
        civic: '',
        cap: ''
    })

    const [billingAddress, setBillingAddress] = useState({
        billing_city: '',
        billing_province: '',
        billing_nation: '',
        billing_street: '',
        billing_civic: '',
        billing_cap: ''
    })

    const [addressFlag, setAddressFlag] = useState(false)

    function handleChangeUser(key, value) {
        setCheckout({
            ...checkout,
            [key]: value
        })
    }

    function handleChangeShipping(key, value) {
        setShippingAddress({
            ...shippingAddress,
            [key]: value
        })
    }

    function handleChangeBilling(key, value) {
        setBillingAddress({
            ...billingAddress,
            [key]: value
        })
    }

    function handleSubmit() {
        console.log(addressFlag);

        const productsInfo = cart.userCart.map(item => {
            const prod = {
                item_slug: item.slug,
                item_quantity: item.cartQuantity
            }
            return prod
        })

        const billingData = addressFlag
            ? billingAddress
            : {
                billing_city: shippingAddress.city,
                billing_province: shippingAddress.province,
                billing_nation: shippingAddress.nation,
                billing_street: shippingAddress.street,
                billing_civic: shippingAddress.civic,
                billing_cap: shippingAddress.cap
            };

        const formToSend = {
            ...checkout,
            status: 'intent',
            products_info: productsInfo,
            ...shippingAddress,
            ...billingData
        }

        console.log(formToSend);

        paymentIntent(formToSend)

        setCheckout({
            username: '',
            user_last_name: '',
            useremail: '',
            amount: Number(total.toFixed(2))
        })
        setShippingAddress({
            city: '',
            province: '',
            nation: '',
            street: '',
            civic: '',
            cap: ''
        })
        setBillingAddress({
            billing_city: '',
            billing_province: '',
            billing_nation: '',
            billing_street: '',
            billing_civic: '',
            billing_cap: ''
        })
        navigate('/complete-checkout')

    }

    function handleAddress(flag) {
        setAddressFlag(flag)
    }

    return (
        <>
            <CheckoutFormUi
                checkout={checkout}
                shipping={shippingAddress}
                billing={billingAddress}
                onChangeUser={handleChangeUser}
                onChangeShipping={handleChangeShipping}
                onChangeBilling={handleChangeBilling}
                onsubmit={handleSubmit}
                addressFlag={addressFlag}
                handleAddress={handleAddress} />
        </>
    )
}