export default function ProductImagesUi({ images, index }) {
    return (
        <>
            <div className="jumbo_slide">
                <img className="jumbo_img" src={images[index].image} alt="" />
            </div >
        </>
    )
}