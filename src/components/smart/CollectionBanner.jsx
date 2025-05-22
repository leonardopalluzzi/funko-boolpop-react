import { useEffect, useState } from "react"
import Loader from "../dumb/Loader.ui"
import CollectionBannerUi from "../dumb/CollectionBannerUi/CollectionBanner.ui"

export default function CollectionBanner({ licenseId, banner }) {

    const [products, setProducts] = useState({
        state: 'loading'
    })

    //fetch con la licensa fornita
    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/funkoboolpop?license=${licenseId}&limit=5&page=1`)
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
        case 'loading':
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

            switch (products.data.results.length > 0) {
                case true:
                    return (
                        <>
                            <CollectionBannerUi product={products.data} banner={banner} />
                        </>
                    )
                case false:
                    return (
                        <>

                        </>
                    )
            }
    }
}