import CardUi from "../dumb/Card.ui";
import { useState, useEffect } from "react";

export default function List({ query, page, queryName, limit, products }) {




  // function handleLoadNext() {
  //   if (page < products.data.totalPages) {
  //     setPage(page + 1);
  //   } else {
  //     setPage(1);
  //   }

  //   if (scrollRef?.current) {
  //     scrollRef.current.scrollLeft = 0; // Resetta lo scroll
  //   }
  //   console.log(page);
  // }
  console.log(products);


  return (
    <>
      <div className="page_counter w-100 row">
        <div className="col-8">
          {(() => {
            const elements = [];
            for (let i = 0; i < products.totalPage; i++) {
              elements.push();

              {
                /* DA SPOSTARE NELLA PAGINA DI RICERCA */
              }
              // <button className={`btn ${active == i ? 'btn-outline-primary' : 'btn-transaprent'}`} key={i} onClick={() => { setPage(i + 1); setActive(i) }}>
              //     {i + 1}
              // </button>
            }
            return elements;
          })()}
        </div>
        <div className="col-4 d-flex gap-3 align-items-center justify-content-end">
          {/*<label for="" className="form-label">select item number</label>*/}

          {/* DA SPOSTARE NELLA PAGINA DI RICERCA */}
          {/* <select
                className="form-select form-select-sm w-50"
                name=""
                id=""
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value="" selected>
                  Select Products Number
                </option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select> */}
          <span className="sm-font">
            Page: {products.currentPage} / {products.totalPages}
          </span>
        </div>
      </div>
      <div className="home_p_list row row-cols-1 row-cols-md-2 row-cols-lg-4 align-items-center">
        {products.results.map((product) => (
          <CardUi
            key={`unique${product.slug}`}
            images={product.images}
            name={product.name}
            price={Number(product.price)}
            license={product.licenses}
            promotions={product.promotions}
            slug={product.slug}
            quantity={product.quantity}
          />
        ))}

      </div>
    </>
  );
}

