import { useEffect, useState } from "react"
import CollectionBanner from "../components/smart/CollectionBanner"
import Loader from "../components/dumb/Loader.ui"

export default function Collections() {

    const [licenses, setLicenses] = useState({
        state: 'loading'
    })

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/funkoboolpop?getLicense=true')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setLicenses({
                    state: 'success',
                    data: data
                })
            })
            .catch(err => {
                console.error(err)
                setLicenses({
                    state: 'error',
                    message: err.message
                })
            })
    }, [])

    switch (licenses.state) {
        case 'loading':
            return (
                <>
                    <Loader />
                </>
            )
        case 'error':
            return (
                <>
                    <h1>{licenses.state}</h1>
                    <p>{licenses.message}</p>
                </>
            )
        case 'success':
            return (
                <>
                    {
                        licenses.data.results.map(item => (
                            <>
                                <CollectionBanner licenseId={item.id} banner={item.image} />
                            </>
                        ))
                    }

                </>
            )
    }
}