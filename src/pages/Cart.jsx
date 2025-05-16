import { useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/cartContext";
import { useEffect, useState } from "react";
import styles from "../assets/css_modules/CartPage.module.css";

export default function Cart() {
  const { cart, deleteFromCart, subtractCartQuantity, addCartQuantity } =
    useCartContext();
  console.log(cart);

  const navigate = useNavigate();

  let total = 0;

  const priceArr = cart.userCart.map((item) => {
    console.log(item);

    const basePrice = Number(item.price);
    const discount =
      Array.isArray(item.promotion) && item.promotion.length > 0
        ? Number(item.promotion[0].discount)
        : 100;
    const quantity = Number(item.cartQuantity);

    let price = ((basePrice * discount) / 100) * quantity;

    console.log(price);

    return Number(price);
  });
  priceArr.forEach((item) => {
    total = total + item;
  });

  switch (true) {
    case cart.userCart.length == 0:
      return (
        <>
          <div className="container empty_cart">
            <h3>You don't have anything in your cart</h3>
            <p className="fs-2">
              <i class="bi bi-emoji-frown-fill"></i>
            </p>
            <button onClick={() => navigate("/")} className="btn btn-primary">
              Home Page
            </button>
          </div>
        </>
      );
    case cart.userCart.length > 0:
      return (
        <>
          <div className="container">
            <table
              class={`${styles.table_mobile} ${styles.table_border} table mt-3`}
            >
              <thead>
                <tr>
                  <th
                    className={styles.table_header}
                    scope="col"
                    style={{ width: "15%" }}
                  >
                    Product Image
                  </th>
                  <th className={styles.table_header} scope="col">
                    Product Name
                  </th>
                  <th className={styles.table_header} scope="col">
                    Promotions
                  </th>
                  <th className={styles.table_header} scope="col">
                    Quantity
                  </th>
                  <th className={styles.table_header} scope="col">
                    Price*
                  </th>
                  <th className={styles.table_header} scope="col">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.userCart.map((item) => (
                  <>
                    <tr>
                      <td
                        className={`${styles.td_img_container} ${styles.desktop}`}
                      >
                        <div className={`cart_img_container ${styles.desktop}`}>
                          <img
                            onClick={() => navigate(`/${item.slug}`)}
                            className="cart_img"
                            src={`http://localhost:3000/${item.images[0].image}`}
                            alt={item.name}
                          />
                        </div>
                      </td>{" "}
                      <td
                        className={`${styles.table_body} ${styles.mobile_name} ${styles.desktop}`}
                      >
                        {item.name}
                      </td>
                      {/* MOBILE */}
                      <div className={styles.mobile_header_row}>
                        <td className={styles.td_img_container}>
                          <div className="cart_img_container">
                            <img
                              onClick={() => navigate(`/${item.slug}`)}
                              className="cart_img"
                              src={`http://localhost:3000/${item.images[0].image}`}
                              alt={item.name}
                            />
                          </div>
                        </td>
                        <td
                          className={`${styles.table_body} ${styles.mobile_name}`}
                        >
                          {item.name}
                        </td>
                      </div>
                      {/* END MOBILE */}
                      <td className={`${styles.table_body} ${styles.td_promo}`}>
                        {item.promotion.length > 0 ? (
                          <>
                            <span>{item.promotion[0].name}: </span>
                            <span>{item.promotion[0].discount}%</span>
                          </>
                        ) : (
                          <>No promotions found</>
                        )}
                      </td>
                      <td className={`${styles.table_body} ${styles.desktop}`}>
                        <button
                          onClick={() => subtractCartQuantity(item)}
                          className="btn btn-transaprent fs-3 p-2"
                        >
                          -
                        </button>
                        X{item.cartQuantity}
                        <button
                          onClick={() =>
                            addCartQuantity(
                              item,
                              item.cartQuantity + item.quantity
                            )
                          }
                          className="btn btn-transaprent fs-4 p-2"
                        >
                          +
                        </button>
                        <p className={styles.add_message}>{cart.message}</p>
                      </td>
                      <td className={`${styles.table_body} ${styles.desktop}`}>
                        {item.promotion.length > 0 ? (
                          <>
                            <label>
                              <span className="price_label_card text-success">
                                {(
                                  (item.price * item.promotion[0].discount) /
                                  100
                                ).toFixed(2)}{" "}
                                €
                              </span>
                            </label>
                          </>
                        ) : (
                          <>
                            <label className="price_label_card">
                              {item.price} €
                            </label>
                          </>
                        )}
                      </td>
                      {/* MOBILE */}
                      <div className={styles.mobile_header_row}>
                        <td className={styles.table_body}>
                          <button
                            onClick={() => subtractCartQuantity(item)}
                            className="btn btn-transaprent fs-3 p-2"
                          >
                            -
                          </button>
                          X{item.cartQuantity}
                          <button
                            onClick={() =>
                              addCartQuantity(
                                item,
                                item.cartQuantity + item.quantity
                              )
                            }
                            className="btn btn-transaprent fs-4 p-2"
                          >
                            +
                          </button>
                          <p className={styles.add_message}>{cart.message}</p>
                        </td>
                        <td
                          className={`${styles.table_body} ${styles.price_tag}`}
                        >
                          {item.promotion.length > 0 ? (
                            <>
                              <label>
                                <span className="price_label_card text-success">
                                  {(
                                    (item.price * item.promotion[0].discount) /
                                    100
                                  ).toFixed(2)}{" "}
                                  €
                                </span>
                              </label>
                            </>
                          ) : (
                            <>
                              <label className="price_label_card">
                                {item.price} €
                              </label>
                            </>
                          )}
                        </td>
                      </div>
                      {/* END MOBILE */}
                      <td className={`${styles.vertical_align} text-center`}>
                        <button
                          onClick={() => deleteFromCart(item)}
                          className={`${styles.btn_delete} btn mx-2 `}
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                        <button
                          onClick={() => navigate(`/${item.slug}`)}
                          className={`${styles.btn_watch} btn `}
                        >
                          <i class="bi bi-eye"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <div className={`${styles.total_price} total`}>
              <h5>TOTAL:</h5>
              <h4 className={styles.price}>{total.toFixed(2)}€</h4>
            </div>
            <div className={styles.payment}>
              <button
                onClick={() => navigate(`/checkout`)}
                class={`${styles.btn_payment} btn fs-3 my-2 my-sm-0`}
                type="submit"
              >
                Procedi al pagamento
              </button>
            </div>
          </div>
        </>
      );
  }
}
