import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import Home from "./pages/Home"
import ProductPage from "./pages/ProductPage"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            {/* pagine qui  */}
            <Route path="/" Component={Home} />
            <Route path="/:slug" Component={ProductPage} />
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
