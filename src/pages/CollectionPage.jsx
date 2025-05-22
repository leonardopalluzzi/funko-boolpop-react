import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Loader from "../components/dumb/Loader.ui"
import CollectioPageUi from "../components/dumb/CollectionPageUi/CollectionPage.ui"

export default function CollecitonPage() {

    const { slug } = useParams()
    const [pop, setPop] = useState({
        state: 'loading'
    })
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/funkopop?license=${slug}&limit=${limit}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setPop({
                    state: 'success',
                    data: data
                })
            })
            .catch(err => {
                setPop({
                    state: 'error',
                    message: err.message
                })
            })
    }, [])


    switch (pop.state) {
        case 'loading':
            return (
                <>
                    <Loader />
                </>
            )
        case 'error':
            return (
                <>
                    <h1>{pop.state}</h1>
                    <p>{pop.message}</p>
                </>
            )
        case 'success':
            return (
                <>
                    <CollectioPageUi pops={pop} setLimit={setLimit} setPage={setPage} />
                </>
            )
    }
}