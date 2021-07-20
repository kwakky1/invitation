import React, {useState} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'
import img1 from "../../public/img/1.jpeg"
import img2 from "../../public/img/2.jpeg"
import img3 from "../../public/img/3.jpeg"
import img4 from "../../public/img/4.jpeg"
import img5 from "../../public/img/5.jpeg"
import img6 from "../../public/img/6.jpeg"
import img8 from "../../public/img/8.jpeg"
import {Box} from "@material-ui/core";

const Carousel = () => {
    const items = [
        { id: 1, img: img1},
        { id: 2, img: img2},
        { id: 3, img: img3},
        { id: 4, img: img4},
        { id: 5, img: img5},
        { id: 6, img: img8},
    ];

    const [nav1, setNav1] = useState<Slider>();
    const [nav2, setNav2] = useState<Slider>();

    return (
        <Box>
            <Slider
                asNavFor={nav2}
                ref={(slider1: Slider) => setNav1(slider1)}
                fade
                arrows
            >
                {items.map((item) => {
                    const { id, img } = item;
                    return (
                        <Box
                            key={id}
                            display={"flex"}
                        >
                            <Image src={img} width={"100%"} height={200}/>
                        </Box>
                    );
                })}
            </Slider>
            <Slider
                asNavFor={nav1}
                ref={(slider2: Slider) => setNav2(slider2)}
                slidesToShow={3}
                swipeToSlide
                focusOnSelect
                arrows
                className="arrow_slider"
            >
                {items.map((item) => {
                    const { id, img } = item;
                    return (
                        <Box
                            key={id}
                            display={"flex"}
                        >
                            <Image src={img} />
                        </Box>
                    );
                })}
            </Slider>
        </Box>
    );
};

export default Carousel;