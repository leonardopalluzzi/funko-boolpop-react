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
      <ul>
        {products.results.map((item, i) => (
          <>
            <li>
              <div className="d-flex">
                <div className={`col-4 ${styles.result_list_img} `}>
                  <ProductImages images={item.images} index={i} />
                </div>
                <div className="col-8 py-5">
                  <h2>{item.name}</h2>
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>



    </div>
  );
}
