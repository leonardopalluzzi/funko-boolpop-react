import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import Home from "./pages/Home"
import ProductPage from "./pages/ProductPage"
import Checkout from "./pages/Checkout"
import { CartProvider } from "./contexts/cartContext"
import Cart from "./pages/Cart"


function App() {

  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              {/* pagine qui  */}
              <Route path="/" Component={Home} />
              <Route path="/:slug" Component={ProductPage} />
              <Route path="/cart" Component={Cart} />
              <Route path="/checkout" Component={Checkout} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App
