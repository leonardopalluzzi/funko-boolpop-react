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
                    <h2>Loading...</h2>
                </>
            )
        case 'success':
            return (
                <>
                    <ul className="list-unstyled">
                        {orderList.data.map(item => (
                            <>
                                <li className="row row-cols-4 w-100 gap-4 border border-top-0 border-start-0 border-end-0 py-3 m-auto align-items-center justify-content-between px-4">
                                    <div className="col">
                                        <img className="w-100" src={`http://localhost:3000/${item.images[0].image}`} alt="" />
                                    </div>
                                    <div className="col">{item.name}</div>
                                    <div className="col">
                                        {
                                            item.promotion.length > 0 ?
                                                (
                                                    <>
                                                        <label>
                                                            <div className="fw-bold text-danger">{item.promotion[0].name}</div>
                                                            <span className="fs-6 text-secondary">
                                                                <del>{item.price}€</del>
                                                            </span>
                                                            <span className="price_label_card text-dark">
                                                                {
                                                                    (item.price * item.promotion[0].discount / 100).toFixed(2)
                                                                }€
                                                            </span>
                                                        </label>
                                                    </>
                                                ) : (
                                                    <>
                                                        <label className="price_label_card">
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