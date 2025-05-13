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
                    <p>DEBUG: Sono nel cart-offcanvas!</p>
                    <CartHover />
                </CartOffcanvas>

                <main className="main-content">
                    <Outlet />
                </main>
                <Footer />
            </div >
        </>
    )
}