import JumboUi from "../dumb/Jumbo.ui"
import CarouselUi from "../dumb/Carousel.ui"
import { useState, useEffect } from "react"

export default function Jumbo() {

    const [funkos, setFunkos] = useState({
        state: 'loading'
    })

    const page = 1
    const limit = 5

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/funkoboolpop?page=${page}&limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                setFunkos({
                    state: 'success',
                    data: data
                })
            })
            .catch(err => {
                setFunkos({
                    state: 'error',
                    message: err.message
                })
            })
    }, [])

    //logica per carosello

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (funkos.state == 'success') {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) => prevIndex === funkos.data.length - 1 ? 0 : prevIndex + 1)

            }, 4000)
            return () => clearInterval(timer)
        }
    }, [funkos.state, currentIndex])


    switch (funkos.state) {
        case 'loading':
            return (
                <>
                    <h1>loading...</h1>
                </>
            )
        case 'error':
            return (
                <>
                    <h1>{funkos.state}</h1>
                    <p>{funkos.message}</p>
                </>
            )
        case 'success':
            return (
                <>
                    <JumboUi productList={funkos.data} slideIndex={currentIndex} setIndex={setCurrentIndex} />
                </>
            )
    }
}