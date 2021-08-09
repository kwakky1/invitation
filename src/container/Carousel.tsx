import React, {useState} from 'react';
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import SwiperClass from 'swiper/types/swiper-class';
import img_1 from '../../public/img/img_1.jpg'
import img_2 from '../../public/img/img_2.jpg'
import img_3 from '../../public/img/img_3.jpg'
import img_4 from '../../public/img/img_4.jpg'
import img_5 from '../../public/img/img_5.jpg'
import img_6 from '../../public/img/img_6.jpg'
import img_7 from '../../public/img/img_7.jpg'
import img_8 from '../../public/img/img_8.jpg'

const Carousel = () => {
    SwiperCore.use([Navigation, Thumbs]);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

    const image = [img_1, img_2, img_3, img_6, img_4, img_5,  img_7, img_8]

    const imageRender =  image.map((item, index)=>{
        return  (
            <SwiperSlide key={`swiper-${index}`}>
                <Image src={item}/>
            </SwiperSlide>
        )
    })

    return (
        <>
            <Swiper
                slidesPerView={1}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                loop
            >
                {imageRender}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode
                watchSlidesVisibility
                watchSlidesProgress
                >
                {imageRender}
            </Swiper>
        </>
    );
};

export default Carousel;