import { Link } from "react-router-dom";

export default function SearchResultsUi({ results }) {
  return (
    <>

      <div className="search_results_container">

        <div className="search_results_body">
          <h5 className="px-3 pt-3">Risultati:</h5>
          <ul className="">
            {results.map((item) => (
              <>
                <li>
                  <Link className="d-block" to={`/${item.slug}`}>
                    <div className="container-fluid">
                      <div className="row row-cols-2 align-items-center">
                        <div className="col-3">
                          <img
                            className="search_results_img"
                            src={`http://localhost:3000/${item.images[0].image}`}
                            alt={item.name}
                          />
                        </div>
                        <div className="col-8">
                          <p className="">{item.name}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}