import CardUi from "../dumb/Card.ui";
import { useState, useEffect } from "react";

export default function List({ query, scrollRef, queryName }) {
  const [products, setProducts] = useState({
    state: "loading",
  });

  const [active, setActive] = useState(0);

  const [page, setPage] = useState(1); //definisce il numero della pagina visualizzata
  const [limit, setLimit] = useState(5); // definisce il numero di elementi ricevuti dal db

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/v1/funkoboolpop?page=${page}&limit=${limit}&${queryName}=${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setProducts({
          state: "success",
          data: data,
        });

        if (data.length < 1) {
          setPage(1);
        }
      })
      .catch((err) => {
        setProducts({
          state: "error",
          message: err.message,
        });
      });
  }, [page, limit]);

  function handleLoadNext() {
    if (page < products.data.totalPages) {
      setPage(page + 1);
    } else {
      setPage(1);
    }

    if (scrollRef?.current) {
      scrollRef.current.scrollLeft = 0; // Resetta lo scroll
    }
    console.log(page);
  }

  switch (products.state) {
    case "loading":
      return (
        <>
          <h1>Loading...</h1>
        </>
      );
    case "error":
      return (
        <>
          <h1>{products.state}</h1>
          <p>{products.message}</p>
        </>
      );
    case "success":
      return (
        <>
          <div className="page_counter w-100 row">
            <div className="col-8">
              {(() => {
                const elements = [];
                for (let i = 0; i < products.data.totalPages; i++) {
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
                Page: {products.data.currentPage} / {products.data.totalPages}
              </span>
            </div>
          </div>
          <div className="home_p_list row row-cols-1 row-cols-md-2 row-cols-lg-4 align-items-center">
            {products.data.results.map((product) => (
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
            <button
              className="btn btn-transparent"
              onClick={() => handleLoadNext()}
            >
              {" "}
              <i className="bi bi-arrow-clockwise arrow-caro"></i> Load More
            </button>
          </div>
        </>
      );
  }
}
