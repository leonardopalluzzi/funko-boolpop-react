import ProductImages from "../../smart/ProductImages"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import style from './card.module.css'

export default function CardUi({ images, name, price, license, promotions, slug }) {
    const navigate = useNavigate()


    return (
        <>
            <div className="col h-100">
                <div className={`card ${style.card_custom}`}>
                    <div className="card-header border-0 p-0">
                        <Link to={`/${slug}`}>
                            <ProductImages images={images} />
                        </Link>
                    </div>
                    <div className="card-body border-0">
                        <span className={style.card_license}> {license.name.toUpperCase()}</span>
                        <h4 className={style.card_title}>{name}</h4>
                        <div>
                            {
                                promotions.length > 0 ?
                                    (
                                        <>
                                            <label>
                                                <div className={style.card_promo}>{promotions[0].name}</div>
                                                <span className="fs-5 text-old-price">
                                                    <del>{price}€</del>
                                                </span>
                                                <span className={style.card_total}>
                                                    {
                                                        (price * promotions[0].discount / 100).toFixed(2)
                                                    }€
                                                </span>
                                            </label>
                                        </>
                                    ) : (
                                        <>
                                            <label className={style.card_total}>
                                                {funko.result.price}€
                                            </label>
                                        </>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}