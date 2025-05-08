import CheckoutFormUi from "../components/dumb/CheckoutForm.ui"
import { useState } from "react"


export default function Checkout() {
    const [checkout, setCheckout] = useState({
        userName: '',
        userLastName: '',
        phone: '',
        email: '',
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
        city: '',
        province: '',
        nation: '',
        street: '',
        civic: '',
        cap: ''
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