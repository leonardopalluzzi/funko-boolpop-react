export default function ProductImagesUi({ images, index }) {
    return (
        <>
            <div className="product_images">
                <img className="product_image" src={images[index].image} alt="" />
            </div >
        </>
    )
}