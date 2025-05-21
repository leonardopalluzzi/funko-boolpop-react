import CarouselUi from "../dumb/Carousel.ui";
import Loader from "../dumb/Loader.ui";
import List from "./List";
import { useState, useEffect } from "react";
import BannerMiddleUi from "../dumb/BannerMiddle/BannerMiddle.ui";

export default function HomeCarousels() {
  const [products, setProducts] = useState({
    state: "loading",
  });

  const promotionToDisplay = 'Summer Sale'

  const [bannerProd, setBannerProd] = useState({
    state: 'loading'
  })

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



  // fetch per bannerino
  useEffect(() => {
    console.log('useeffect');

    fetch(`http://localhost:3000/api/v1/funkoboolpop?promotion=${promotionToDisplay}&limit=5`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setBannerProd({
          state: 'success',
          data: data
        })
      })
      .catch(err => {
        console.error(err)
        setBannerProd({
          state: 'error',
          message: err.message
        })
      })
  }, [])




  switch (products.state) {
    case "loading":
      return (
        <>
          <div className="container-fluid">
            {/*  ultimi arrivi */}
            <div className="my-5">
              <h1 className="home_list_title">ULTIMI ARRIVI</h1>
              <CarouselUi
                content={
                  <>
                    <Loader />
                  </>
                }
              />
            </div>
          </div>
          <div className="container-fluid">
            {/*  ultimi arrivi */}
            <div className="my-5">
              <h1 className="home_list_title">ULTIMI ARRIVI</h1>
              <CarouselUi
                content={
                  <>
                    <Loader />
                  </>
                }
              />
            </div>
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
          </div>


          {
            bannerProd.state == 'loading' && (<> <Loader /></>)
          }
          {
            bannerProd.state == 'error' && (
              <>
                <h1>{bannerProd.state}</h1>
                <p>{bannerProd.message}</p>
              </>
            )
          }
          {
            bannerProd.state == 'success' && (<> <BannerMiddleUi contentLeft={'Discover our latest Promotion'} contentRight={bannerProd} /></>)
          }


          <div className="container-fluid">
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
