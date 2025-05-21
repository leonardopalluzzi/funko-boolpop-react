import { useNavigate } from "react-router-dom"
import AutoCarouselUi from './AutoCarouosel.ui'

export default function JumboUi({ productList, slideIndex, setIndex }) {

    const navigate = useNavigate()

    return (
        <>

            <div className="jumbo_slide">
                <div className="row row-cols-1 row-cols-lg-2 align-items-center w-100 h-100 gap-5 m-auto">
                    <div className="col col-lg-4 jumbo_info d-flex flex-column justify-content-between align-items-start">
                        <h1 className="jumbo-title">{productList[slideIndex].name}</h1>
                        <p className="pb-4 me-1 fs-6 d-none d-lg-block">{productList[slideIndex].description}</p>
                        <button onClick={() => navigate(`/${productList[slideIndex].slug}`)} className="btn btn-dark my-2 fs-3">Details</button>
                    </div>
                    <div className="col col-lg-7">
                        <div className="img_jumbo_container">
                            {/* <AutoCarouselUi images={images} /> */}
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
