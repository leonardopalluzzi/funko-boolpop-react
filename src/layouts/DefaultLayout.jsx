import { Outlet } from "react-router-dom"
import Header from "../components/smart/Header"
import Footer from "../components/smart/Footer"

export default function () {
    return (
        <>
            <div className="app-layout">
                <Header />
                <main className="main-content">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}