import { useNavigate } from "react-router-dom"
import ProductImages from "../smart/ProductImages"

export default function CardUi({ images, name, price, attributes, license, promotions, slug }) {

    const navigate = useNavigate()

    return (
        <>
            <div className="col">
                <div className="card w-100 h-100">
                    <div className="card-header p-0">
                        <ProductImages images={images} />
                    </div>
                    <div className="card-body p-3">
                        <h4 className="mb-4">{name}</h4>
                        <div className="price_section_card">
                            {
                                promotions.length > 0 ?
                                    (
                                        <>
                                            <label>
                                                <span className="text-danger fs-6">
                                                    <del>{price} €</del>
                                                </span>
                                                <span className="price_label_card text-success">
                                                    {
                                                        (price * promotions[0].discount / 100).toFixed(2)
                                                    } €
                                                </span>
                                            </label>
                                        </>
                                    ) : (
                                        <>
                                            <label className="price_label_card">
                                                {funko.result.price} €
                                            </label>
                                        </>
                                    )
                            }
                        </div>
                        <span>{attributes}</span>
                        <span>{license}</span>
                    </div>
                    <div className="card-footer">
                        <button onClick={() => navigate(`/${slug}`)} className="btn btn-primary">Buy</button>
                    </div>
                </div>
            </div>
        </>
    )
}