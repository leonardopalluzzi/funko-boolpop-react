import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CarouselUi({ images }) {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    return (
        <div style={{ width: "100%", padding: "0" }}>
            <Slider {...settings}>
                {images.map((src, i) => (
                    <div key={i}>
                        <img src={`http://localhost:3000/${src}`} alt={`Slide ${i}`} style={{ width: "100%", height: "auto" }} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
