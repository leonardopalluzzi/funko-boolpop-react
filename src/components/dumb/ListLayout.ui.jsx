import CardUi from "./Card.ui";
import styles from "../../assets/css_modules/GridList.module.css";

import { useNavigate } from "react-router-dom";
export default function ListLayout({ products }) {
  const navigate = useNavigate();

  if (!products || !products.results) {
    return (
      <div className="container">
        <p>No products available</p>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10">
          {" "}
          {/* Questo div limita la larghezza della lista */}
          <ul className="list-unstyled p-0 m-0">
            {products.results.map((item) => (
              <li
                onClick={() => navigate(`/${item.slug}`)}
                className={`${styles.card_list} order d-flex align-items-center mb-4 card_on_click`}
                key={item.slug}
              >
                <div
                  className="order_col text-center order_img"
                  style={{ width: "25%" }}
                >
                  <img
                    className="w-25"
                    src={`http://localhost:3000/${item.images[0].image}`}
                    alt=""
                  />
                </div>
                <div className="d-flex  align-items-center w-75 ps-4">
                  <div className="order_col">
                    <h5 className="mb-2">{item.name}</h5>
                  </div>
                  <div className="order_col text-end">
                    {item.promotions && item.promotions.length > 0 ? (
                      <label>
                        <div className="fw-bold text-danger price">
                          {item.promotions[0].name}
                        </div>
                        <span className="text-secondary price_original">
                          <del>{item.price}€</del>
                        </span>
                        <span className="price_label_card text-dark price_discount">
                          {(
                            (item.price * item.promotions[0].discount) /
                            100
                          ).toFixed(2)}
                          €
                        </span>
                      </label>
                    ) : (
                      <label className="price_label_card">{item.price}€</label>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
