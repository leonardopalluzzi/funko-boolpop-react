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
                        <h4>{name}</h4>
                        <span>{promotions.length > 0 ? (<>{price} €</>) : (<>{price * 100 / promotions[0].disocunt} €</>)}</span>
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