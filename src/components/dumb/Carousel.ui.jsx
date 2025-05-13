import { useEffect, useRef, useState } from "react";


export default function CarouselUi({ content, page, setPage, dataLength }) {
    const scrollRef = useRef(0)
    const { current } = scrollRef;


    function scroll(direction) {
        const scrollAmount = 1000;
        console.log(current.scrollLeft);


        if (direction === 'left') {
            current.scrollLeft -= scrollAmount;
        } else {
            current.scrollLeft += scrollAmount;
        }

        if (current.scrollLeft + current.offsetWidth >= current.scrollWidth) {
            handleLoadNext();
        }

    }
    function handleLoadNext() {
        console.log('ciao');

        console.log(page);
        console.log(dataLength);



        if (page < dataLength) {
            setPage(page + 1);
        } else {
            setPage(1);
        }

        if (scrollRef?.current) {
            scrollRef.current.scrollLeft = 0;
        }
        console.log(page);
    }

    return (
        <>
            <div className="item_list w-100">
                <div className="container-fluid d-flex justify-content-between w-100 position-relative">
                    <button className="caro_btn" onClick={() => scroll('left')}><i className="bi bi-caret-left arrow-caro"></i></button>
                    <div ref={scrollRef} className="lists_scroll d-flex p-5">
                        {content}
                    </div >
                    <button className="caro_btn"
                        onClick={() => scroll('right')}>
                        <i className="bi bi-caret-right arrow-caro"></i></button>
                </div>
            </div >

        </>
    )
}