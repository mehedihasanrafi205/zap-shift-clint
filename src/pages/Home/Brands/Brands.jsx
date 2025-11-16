import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import photo1 from "../../../assets/brands/amazon.png";
import photo2 from "../../../assets/brands/amazon_vector.png";
import photo3 from "../../../assets/brands/casio.png";
import photo4 from "../../../assets/brands/moonstar.png";
import photo5 from "../../../assets/brands/randstad.png";
import photo6 from "../../../assets/brands/star.png";
import photo7 from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const brandsLogo = [photo1, photo2, photo3, photo4, photo5, photo6, photo7];
const Brands = () => {
  return (
    <section className="mt-20 md:mt-25">
      <h3 className="font-extrabold text-secondary text-3xl text-center mb-10">
        We've helped thousands of sales teams
      </h3>
      <Swiper
        loop={true}
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        
        modules={[Autoplay]}
      >
        {brandsLogo.map((logo, i) => (
          <SwiperSlide key={i}>
            <img src={logo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Brands;
