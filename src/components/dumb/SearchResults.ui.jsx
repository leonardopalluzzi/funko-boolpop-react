import { Link } from "react-router-dom"

export default function SearchResultsUi({ results }) {
    console.log(results);

    return (
        <>
            <div className="container">
                <div className="search_results_container">
                    <div className="search_results_body">
                        <ul className="">
                            {results.map(item => (
                                <>
                                    <li>
                                        <Link to={`/${item.slug}`}>
                                            <div className="d-flex">
                                                <img className="search_results_img" src={item.images[0].image} alt={item.name} />
                                                <p>{item.name}</p>
                                            </div>
                                        </Link>
                                    </li>
                                </>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}