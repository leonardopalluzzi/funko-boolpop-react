export default function JumboUi({ productList, slideIndex }) {

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
                                    {i == slideIndex ? (<><i class="bi bi-circle-fill"></i></>) : (<><i class="bi bi-circle"></i></>)}
                                </li>
                            </>
                        ))}
                    </ul>
                </div>
            </div >
        </>
    )
}