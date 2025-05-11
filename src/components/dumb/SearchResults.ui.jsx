import { Link } from "react-router-dom"

export default function SearchResultsUi({ results, emptyResearch }) {
    console.log(results);

    return (
        <>
            <h5 className="text-white d-md-none">Results:</h5>
            <div className="search_results_container">
                <div className="search_results_body">
                    <ul className="">

                        {results.map(item => (
                            <>
                                <li>
                                    <Link onClick={() => emptyResearch()} to={`/${item.slug}`}>
                                        <div className="d-flex gap-5 align-items-center">
                                            <img className="search_results_img" src={`http://localhost:3000/${item.images[0].image}`} alt={item.name} />
                                            <p>{item.name}</p>
                                        </div>
                                    </Link>
                                </li>
                            </>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}