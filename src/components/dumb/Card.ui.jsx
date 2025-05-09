import { Link } from "react-router-dom"
import ProductImages from "../smart/ProductImages"

export default function CardUi({ images, name, price, license, promotions, slug, quantity }) {


    console.log(images)

    return (
        <>
            <div className="col">
                <Link className="card_on_click" to={`/${slug}`}>
                    <div className="card w-100 h-100">
                        <div className="card-header p-0">
                            <ProductImages images={images} />
                        </div>
                        <div className="card-body p-3">
                            <span> {license} License</span>
                            <h4 className="pb-2 card-title">{name}</h4>
                            <div className="price_section_card">
                                {
                                    promotions.length > 0 ?
                                        (
                                            <>
                                                <label>
                                                    <div className="fw-bold text-promo">{promotions[0].name}</div>
                                                    <span className="fs-6 text-old-price">
                                                        <del>{price}€</del>
                                                    </span>
                                                    <span className="price_label_card text-price">
                                                        {
                                                            (price * promotions[0].discount / 100).toFixed(2)
                                                        }€
                                                    </span>
                                                </label>
                                            </>
                                        ) : (
                                            <>
                                                <label className="price_label_card text-price">
                                                    {funko.result.price}€
                                                </label>
                                            </>
                                        )
                                }
                            </div>
                            {/*<span className="d-block text-end pt-2"> <i class="bi bi-box-fill"></i> Available: {quantity}</span>*/}
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}