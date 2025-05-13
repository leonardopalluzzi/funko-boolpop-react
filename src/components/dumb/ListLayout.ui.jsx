import CardUi from "./Card.ui";
import styles from "../../assets/css_modules/GridList.module.css";
import ProductImages from "../smart/ProductImages";

import { useNavigate } from "react-router-dom";
export default function ListLayout({ products }) {

  const navigate = useNavigate();
  console.log(products);



  if (!products || !products.results) {
    return (
      <div className="container">
        <p>No products available</p>
      </div>
    );
  }

  return (
    <div className="container">
      <ul className="list-unstyled">
        {products.results.map((item, i) => (
          <>
            <li onClick={() => navigate(`/${item.slug}`)} className={styles.list_container}>
              <div className="row h-50">
                <div className={`col-3 ${styles.result_list_img} `}>
                  <ProductImages images={item.images} index={i} />
                </div>
                <div className="col-9 py-5">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>

                  <div>
                    {
                      item.promotions.length > 0 ?
                        (
                          <>
                            <label>
                              <div className="fw-bold text-promo">{item.promotions[0].name}</div>
                              <span className="fs-6 text-old-price">
                                <del>{item.price}€</del>
                              </span>
                              <span className="price_label_card text-price">
                                {
                                  (item.price * item.promotions[0].discount / 100).toFixed(2)
                                }€
                              </span>
                            </label>
                          </>
                        ) : (
                          <>
                            <label className="price_label_card text-price">
                              {item.price}€
                            </label>
                          </>
                        )
                    }
                  </div>

                </div>
              </div>
            </li>
          </>
        ))}
      </ul>



    </div>
  );
}
