import Loader from "../dumb/Loader.ui"
import PromoBannerUi from "../dumb/PromoBanner/PromoBanner.ui"
import { useEffect, useState } from "react"

export default function PromoBanner() {

    const categoryToDisplay = 6

    const [products, setProducts] = useState({
        state: 'loading'
    })

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/funkoboolpop?license=${categoryToDisplay}&limit=5`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts({
                    state: 'success',
                    data: data
                })
            })
            .catch(err => {
                console.error(err)
                setProducts({
                    state: 'error',
                    message: err.message
                })
            })
    }, [])

    switch (products.state) {
        case 'laoding':
            return (
                <>
                    <Loader />
                </>
            )
        case 'error':
            return (
                <>
                    <h1>{products.state}</h1>
                    <p>{products.message}</p>
                </>
            )
        case 'success':
            return (
                <>
                    <PromoBannerUi products={products.data} />
                </>
            )
    }
}