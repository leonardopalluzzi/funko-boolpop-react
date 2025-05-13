import GridLayout from "../dumb/GridLayout.ui";
import ListLayout from "../dumb/ListLayout.ui";
import { useState, useEffect } from "react";
import Loader from "../dumb/Loader.ui";

export default function LayoutSearchedProducts() {
  const [layout, setLayout] = useState("grid");
  const [products, setProducts] = useState({
    state: "loading",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/funkoboolpop")
      .then((res) => res.json())
      .then((data) => {
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
      return <Loader />;
    case "error":
      return <p>{products.message}</p>;
    case "success":
      return (
        <div className="container">
          <div className="layout-buttons">
            <button
              onClick={() => setLayout("grid")}
              className={`btn btn-grid ${layout === "grid" ? "active" : ""}`}
            >
              <i class="fa-solid fa-border-all"></i>
            </button>
            <button
              onClick={() => setLayout("list")}
              className={`btn btn-list ${layout === "list" ? "active" : ""}`}
            >
              <i class="fa-solid fa-list"></i>
            </button>
          </div>

          <div className={`items-container ${layout}`}>
            <GridLayout products={products.data} />
            <ListLayout products={products.data} />
          </div>
        </div>
      );
  }
}
