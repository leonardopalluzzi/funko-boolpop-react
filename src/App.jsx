import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import Home from "./pages/Home"


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            {/* pagine qui  */}
            <Route path="/" Component={Home} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
