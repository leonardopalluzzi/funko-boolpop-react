import { useNavigate } from "react-router-dom"
import { useCartContext } from "../contexts/cartContext"

export default function Cart() {

    const { cart } = useCartContext()

    const navigate = useNavigate()

    return (
        <>
            <div className="container">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Product Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">ACTIONS</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.userCart.map(item => (
                                <>
                                    <tr>
                                        <td>
                                            <div className="cart_img_container">
                                                <img className="cart_img" src={item.images[0].image} alt="" />
                                            </div>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.price} €</td>
                                        <td>
                                            <button className="btn btn-danger mx-2"><i class="bi bi-trash"></i></button>
                                            <button onClick={() => navigate(`/${item.slug}`)} className="btn btn-primary"><i class="bi bi-eye"></i></button>
                                        </td>

                                    </tr>
                                </>
                            ))
                        }

                    </tbody>
                </table>
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