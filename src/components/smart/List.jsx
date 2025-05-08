import CardUi from "../dumb/Card.ui"
import { useState, useEffect } from "react"

export default function List() {

    const [products, setProducts] = useState({
        state: 'loading'
    })

    //fetch con query costruita

    return (
        <>
            {products.map(product => (
                <>
                    <CardUi
                        images={product.images}
                        name={product.name}
                        price={product.price}
                        attributes={product.attributes}
                        license={product.license}
                        promotions={product.prmotions}
                    />
                </>
            ))}
        </>
    )
}