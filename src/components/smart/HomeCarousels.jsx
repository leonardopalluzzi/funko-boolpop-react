import CarouselUi from "../dumb/Carousel.ui"
import List from "./List"

export default function HomeCarousels() {
    return (
        <>
            <CarouselUi content={(
                <>
                    <List query={''} />
                </>
            )} />
        </>
    )
}