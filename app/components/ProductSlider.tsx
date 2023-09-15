import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import ProductItem from "./ProductItem";
// import "./ProductSlider.css";

function ProductSlider() {
  return (
    <div className="container">
      <h1 className="heading">Flower Gallery</h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>dkkkkkkkkkd</SwiperSlide>
        <SwiperSlide>dkkkkkkkkkd</SwiperSlide>
        <SwiperSlide>dkkkkkkkkkd</SwiperSlide>
        <SwiperSlide>dkkkkkkkkkd</SwiperSlide>
        <SwiperSlide>dkkkkkkkkkd</SwiperSlide>
      </Swiper>

      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <FiArrowLeftCircle />
        </div>
        <div className="swiper-button-next slider-arrow">
          <FiArrowRightCircle />
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
}

export default ProductSlider;
