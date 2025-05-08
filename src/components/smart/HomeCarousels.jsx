import CarouselUi from "../dumb/Carousel.ui"
import List from "./List"

export default function HomeCarousels() {

    const trans = 0; // definisce il numero di transazioni minimo che un elemento deve avere

    return (
        <>
            <div className="container">
                {/* piu venduti */}
                <h1>Piu venduti</h1>
                <CarouselUi content={(
                    <>
                        <List query={trans} />
                    </>
                )} />

                {/*  ultimi arrivi */}
                <h1>ultimi arrivi</h1>
                <CarouselUi content={(
                    <>
                        <List query={''} />
                    </>
                )} />
            </div>

        </>
    )
}