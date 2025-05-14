import GridLayout from "../dumb/GridLayout.ui";
import ListLayout from "../dumb/ListLayout.ui";
import { useState, useEffect } from "react";
import Loader from "../dumb/Loader.ui";
import LayoutSelect from "./LayoutSelect";
import { useFiltersContext } from "../../contexts/filtersContext";
import PaginationControls from "./PaginationControls";

export default function LayoutSearchedProducts() {

  const { products } = useFiltersContext()
  console.log(products);


  const [layout, setLayout] = useState(() => {
    return sessionStorage.getItem('layout') || 'grid';
  });

  useEffect(() => {
    sessionStorage.setItem('layout', layout);
  }, [layout]);



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
    case 'empty':
      return (
        <>
          <div className="container flex-column d-flex align-items-center justify-content-center">
            <h1 className="text-secondary">No results Found</h1>
            <p className="fs-1"><i class="bi bi-emoji-frown"></i></p>
          </div>

        </>
      )
    case "success":
      switch (layout) {
        case 'grid':
          return (
            <>
              <div className="w-100">
                <div className="layout_switch">
                  <LayoutSelect setLayout={setLayout} layout={layout} />

                </div>
              </div>

              <div className="container">
                <div className={`items-container ${layout}`}>
                  <PaginationControls />
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
                  <PaginationControls />
                  <ListLayout products={products.data} />
                </div>
              </div>
            </>
          )
      }
  }
}
