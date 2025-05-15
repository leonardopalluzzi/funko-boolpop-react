import { Outlet } from "react-router-dom"
import Header from "../components/smart/Header"
import Footer from "../components/smart/Footer"
import CartHover from "../components/smart/CartHover"
import CartOffcanvas from "../components/smart/CartOffcanvas"
import { useState } from "react"


export default function () {

    const [isCartOpen, setCartOpen] = useState(false)


    return (
        <>
            <div className="app-layout">
                <Header setCartOpen={setCartOpen} />
                <CartOffcanvas isOpen={isCartOpen} onClose={() => setCartOpen(false)}>
                    <h3>Your Cart</h3>
                    <CartHover onClose={() => setCartOpen(false)} />
                </CartOffcanvas>

                <main className="main-content">
                    <Outlet setCartOpen={setCartOpen} />
                </main>
                <Footer />
            </div >
        </>
    )
}