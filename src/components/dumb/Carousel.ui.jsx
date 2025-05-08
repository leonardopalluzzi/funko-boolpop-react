

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

            <div className="item_list py-4 w-100">
                <div className="container-fluid d-flex justify-content-between py-4 w-100 position-relative">
                    <button className="caro_btn" onClick={() => scroll('left')}><i class="bi bi-caret-left"></i></button>
                    <div ref={scrollRef} className="lists_scroll d-flex p-4">
                        {content}
                    </div >
                    <button className="caro_btn" onClick={() => scroll('right')}><i class="bi bi-caret-right"></i></button>
                </div>
            </div>

        </>
    )
}