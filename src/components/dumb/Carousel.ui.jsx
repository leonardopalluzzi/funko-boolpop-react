export default function CarouselUi({ content, scrollRef }) {

    function scroll(direction) {
        const { current } = scrollRef;
        const scrollAmount = 1000;

        if (direction === 'left') {
            current.scrollLeft -= scrollAmount;
        } else {
            current.scrollLeft += scrollAmount;
        }
    }

    return (
        <>
            <div className="item_list w-100">
                <div className="container-fluid d-flex justify-content-between w-100 position-relative">
                    <button className="caro_btn" onClick={() => scroll('left')}><i className="bi bi-caret-left arrow-caro"></i></button>
                    <div ref={scrollRef} className="lists_scroll d-flex p-5">
                        {content}
                    </div >
                    <button className="caro_btn" onClick={() => scroll('right')}><i className="bi bi-caret-right arrow-caro"></i></button>
                </div>
            </div>

        </>
    )
}