export default function ProductImagesUi({ images, index }) {

    console.log(images[index].image);
    console.log(index);



    return (
        <>
            <div className="product_images">
                <img className="product_image" src={`http://localhost:3000/${images[index].image}`} alt="" />
            </div >
        </>
    )
}