import CarouselUi from "../dumb/Carousel.ui"
import List from "./List"
import { useRef, useState } from "react";

export default function HomeCarousels() {

    const [scrollRefTrans, setScrollRefTrans] = useState(useRef())
    const [scrollRefLast, setScrollRefLast] = useState(useRef())

    const trans = 0; // definisce il numero di transazioni minimo che un elemento deve avere

    return (
        <>
            <div className="container">
                {/* piu venduti */}
                <div className="mt-5">
                    <h1 className="fs-3">Più venduti</h1>
                    <CarouselUi scrollRef={scrollRefTrans} content={(
                        <>
                            <List scrollRef={scrollRefTrans} query={trans} />
                        </>
                    )} />
                </div>
                {/*  ultimi arrivi */}
                <div className="mb-5">
                    <h1 className="fs-3">Ultimi arrivi</h1>
                    <CarouselUi scrollRef={scrollRefLast} content={(
                        <>
                            <List scrollRef={scrollRefLast} query={''} />
                        </>
                    )} />
                </div>
            </div>

        </>
    )
}