export default function JumboUi({ productList, slideIndex, setIndex }) {

    return (
        <>
            <div className="jumbo_slide">
                <img className="jumbo_img" src={productList[slideIndex].images[0].image} alt="" />
                <div className="jumbo_info">
                    <h1>{productList[slideIndex].name}</h1>
                    <p>{productList[slideIndex].description}</p>
                </div>
                <div className="dots">
                    <ul className="list-unstyled">
                        {productList.map((dot, i) => (
                            <>
                                <li>
                                    {i == slideIndex ? (<><button className="dot_btn" onClick={() => setIndex(i)}><i class="bi bi-circle-fill"></i></button></>) : (<><button className="dot_btn" onClick={() => setIndex(i)}><i class="bi bi-circle"></i></button></>)}
                                </li>
                            </>
                        ))}
                    </ul>
                </div>
            </div >
        </>
    )
}