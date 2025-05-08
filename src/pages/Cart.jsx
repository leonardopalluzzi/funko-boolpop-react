import { useNavigate } from "react-router-dom"
import { useCartContext } from "../contexts/cartContext"

export default function Cart() {

    const { cart } = useCartContext()

    const navigate = useNavigate()

    return (
        <>
            <div className="container">
                <ul className="list-unstyled">
                    {cart.userCart.map(item => (
                        <>
                            <li>{item.name}</li>
                        </>
                    ))}
                </ul>
                <button
                    onClick={() => navigate(`/${funko.result.slug}/checkout`)}
                    class="btn btn-success fs-3 my-2 my-sm-0"
                    type="submit">
                    Procedi al pagamento
                </button>
            </div>

        </>
    )
}