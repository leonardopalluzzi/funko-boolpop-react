import GridLayout from "../dumb/GridLayout.ui";
import ListLayout from "../dumb/ListLayout.ui";
import { useState, useEffect } from "react";
import Loader from "../dumb/Loader.ui";
import LayoutSelect from "./LayoutSelect";

export default function LayoutSearchedProducts() {
  const [layout, setLayout] = useState("grid");
  const [products, setProducts] = useState({
    state: "loading",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/funkoboolpop")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setProducts({
          state: "success",
          data: data,
        });
      })
      .catch((err) => {
        setProducts({
          state: "error",
          message: err.message,
        });
      });
  }, []);

  switch (products.state) {
    case "loading":
      return (
        <>
          <Loader />
        </>
      )
    case "error":
      return (
        <>
          <h1>{products.state}</h1>
          <p>{products.message}</p>;
        </>
      )
    case "success":
      switch (layout) {
        case 'grid':
          return (
            <>
              <LayoutSelect setLayout={setLayout} layout={layout} />
              <div className="container">
                <div className={`items-container ${layout}`}>
                  <GridLayout products={products.data} />
                </div>
              </div>
            </>
          )
        case 'list':
          return (
            <>
              <LayoutSelect setLayout={setLayout} layout={layout} />
              <div className="container">
                <div className={`items-container ${layout}`}>
                  <ListLayout products={products.data} />
                </div>
              </div>
            </>
          )
      }
  }
}
