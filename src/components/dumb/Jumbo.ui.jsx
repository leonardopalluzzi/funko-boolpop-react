import { Link } from "react-router-dom"

export default function JumboUi({ productList, slideIndex, setIndex }) {
    return (
        <>

            <div className="jumbo_slide">
                <div className="row row-cols-1 row-cols-lg-2 align-items-center w-100 h-100 gap-5 m-auto">
                    <div className="col col-lg-3 jumbo_info">
                        <h1 className="jumbo-title">{productList[slideIndex].name}</h1>
                        <p className="pb-4 me-1 fs-6 d-none d-lg-block">{productList[slideIndex].description}</p>
                        <button className="btn btn-primary my-2">Details</button>
                    </div>
                    <div className="col col-lg-8">
                        <div className="img_jumbo_container">
                            <img className="jumbo_img" src={`http://localhost:3000/${productList[slideIndex].banner}`} alt="" />
                        </div>
                    </div>
                </div>

                <div className="dots">
                    <ul className="list-unstyled">
                        {productList.map((dot, i) => (

                            <li key={dot.item_number}>
                                {i == slideIndex ? (
                                    <>
                                        <button className="dot_btn" onClick={() => setIndex(i)}>
                                            <i className="bi bi-circle-fill"></i>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="dot_btn" onClick={() => setIndex(i)}>
                                            <i className="bi bi-circle"></i>
                                        </button>
                                    </>
                                )}
                            </li>

                        ))}
                    </ul>
                </div>
            </div >

        </>
    )
}
