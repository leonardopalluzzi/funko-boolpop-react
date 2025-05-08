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
                <h1>Piu venduti</h1>
                <CarouselUi scrollRef={scrollRefTrans} content={(
                    <>
                        <List scrollRef={scrollRefTrans} query={trans} />
                    </>
                )} />

                {/*  ultimi arrivi */}
                <h1>ultimi arrivi</h1>
                <CarouselUi scrollRef={scrollRefLast} content={(
                    <>
                        <List scrollRef={scrollRefLast} query={''} />
                    </>
                )} />
            </div>

        </>
    )
}