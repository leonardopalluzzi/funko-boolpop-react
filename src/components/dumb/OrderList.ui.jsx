import Loader from "./Loader.ui";

export default function OrderListUi({ orderList }) {

    console.log(orderList);


    if (orderList.data.state == 'success' && orderList.data.length == 0) {
        return (
            <>
                <h2>No orders found</h2>
            </>
        )
    }

    switch (orderList.state) {
        case 'loading':
            return (
                <>
                    <Loader />
                </>
            )
        case 'success':
            return (
                <>
                    <ul className="list-unstyled w-100 text-dark">
                        {orderList.data.map(item => (
                            <>
                                <li className="order">
                                    <div className="order_col  order_img" style={{ width: "25%" }}>
                                        <img className="w-100" src={`http://localhost:3000/${item.images[0].image}`} alt="" />
                                    </div>
                                    <div className="order_col">{item.name}</div>
                                    <div className="order_col">X{item.cartQuantity}</div>
                                    <div className="order_col">
                                        {
                                            item.promotions.length > 0 ?
                                                (
                                                    <>
                                                        <label>
                                                            <div className="fw-bold text-danger price">{item.promotions[0].name}</div>
                                                            <span className="text-secondary price_original">
                                                                <del>{item.price}€</del>
                                                            </span>
                                                            <span className="fs-5 mx-2 text-dark ">
                                                                {
                                                                    (item.price - (item.price * item.promotions[0].discount / 100)).toFixed(2)
                                                                }€
                                                            </span>
                                                        </label>
                                                    </>
                                                ) : (
                                                    <>
                                                        <label className="fs-5 mx-2 text-dark ">
                                                            {item.price}€
                                                        </label>
                                                    </>
                                                )
                                        }
                                    </div>
                                </li>
                            </>
                        ))}
                    </ul>
                </>
            )
    }
}