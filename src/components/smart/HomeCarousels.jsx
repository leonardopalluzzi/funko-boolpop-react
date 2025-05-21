import CarouselUi from "../dumb/Carousel.ui";
import Loader from "../dumb/Loader.ui";
import List from "./List";
import { useState, useEffect } from "react";

export default function HomeCarousels() {
  const [products, setProducts] = useState({
    state: "loading",
  });

  const [limit, setLimit] = useState(4); // definisce il numero di elementi ricevuti dal db
  const [pageTrans, setPageTrans] = useState(1); //definisce il numero della pagina visualizzata
  const [pageDate, setPageDate] = useState(1); //definisce il numero della pagina visualizzata


  useEffect(() => {
    Promise.all([
      fetch(
        `http://localhost:3000/api/v1/funkoboolpop?page=${pageTrans}&limit=${limit}&sales=1`
      ).then((resTrans) => resTrans.json()),
      fetch(
        `http://localhost:3000/api/v1/funkoboolpop?page=${pageDate}&limit=${limit}&date=1`
      ).then((resDate) => resDate.json()),
    ])
      .then((res) => {
        setProducts({
          state: "success",
          dataTrans: res[0],
          dataDate: res[1],
        });
      })
      .catch((err) => {
        console.log(err);
        setProducts({
          state: "error",
          message: err.message,
        });
      });
  }, [pageTrans, pageDate]);

  switch (products.state) {
    case "loading":
      return (
        <>
          <div className="my-5">
            <h1 className="home_list_title">PIU VENDUTI</h1>
            <CarouselUi
              content={
                <>
                  <Loader />
                </>
              }
            />
          </div>

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
          <div className="container-fluid">
            {/* piu venduti */}
            <div className="my-5">
              <h1 className="home_list_title">PIU VENDUTI</h1>
              <CarouselUi
                dataLength={products.dataTrans.totalPages}
                page={pageTrans}
                setPage={setPageTrans}
                content={
                  <>
                    <List
                      products={products.dataTrans}
                    />
                  </>
                }
              />
            </div>
            {/*  ultimi arrivi */}
            <div className="my-5">
              <h1 className="home_list_title">ULTIMI ARRIVI</h1>
              <CarouselUi
                dataLength={products.dataDate.totalPages}
                page={pageDate}
                setPage={setPageDate}
                content={
                  <>
                    <List
                      products={products.dataDate}
                    />
                  </>
                }
              />
            </div>
          </div>
        </>
      );
  }
}
