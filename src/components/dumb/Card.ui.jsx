export default function CardUi({ images, name, price, attributes, license, promotions }) {
    return (
        <>
            <div className="col">
                <div className="card h-100">
                    <div className="card-header">
                        <img src="logo.svg" alt="" />
                    </div>
                    <div className="card-body">
                        <h2>{name}</h2>
                        <span>{promotions.length > 0 ? (<>{price}</>) : (<>{price * 100 / promotions[0].disocunt}</>)}</span>
                        <span>{attributes}</span>
                        <span>{license}</span>
                    </div>
                </div>
            </div>
        </>
    )
}