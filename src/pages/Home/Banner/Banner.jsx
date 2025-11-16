import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";
import { FiArrowUpRight } from "react-icons/fi";

const Banner = () => {
  return (
    <Carousel
    autoPlay
      infiniteLoop
      interval={3000}
      transitionTime={800}
      showStatus={false}
      emulateTouch
      swipeable
      showArrows={true}
      className="mt-8 rounded-2xl"
    >
      {/* Slide 1 */}
      <div className="relative">
        <img src={banner1} alt="Banner 1" />

        <div className="
          absolute 
          left-4 bottom-4 
          md:left-16 md:bottom-11 
          flex flex-wrap 
          gap-2 md:gap-4
        ">
          <button className="btn btn-primary rounded-full text-[#1F1F1F] font-bold border-secondary/10 btn-sm md:btn-lg">
            Track Your Parcel
          </button>

          <button className="btn btn-secondary rounded-full text-primary font-bold btn-sm md:btn-lg">
            <FiArrowUpRight className="text-xl" />
          </button>

          <button className="btn btn-outline rounded-lg font-bold btn-sm md:btn-lg">
            Be A Rider
          </button>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="relative">
        <img src={banner2} alt="Banner 2" />

        <div className="
          absolute 
          left-4 bottom-4 
          md:left-16 md:bottom-11 
          flex flex-wrap 
          gap-2 md:gap-4
        ">
          <button className="btn btn-primary rounded-full text-[#1F1F1F] font-bold border-secondary/10 btn-sm md:btn-lg">
            Track Your Parcel
          </button>

          <button className="btn btn-secondary rounded-full text-primary font-bold btn-sm md:btn-lg">
            <FiArrowUpRight className="text-xl" />
          </button>

          <button className="btn btn-outline rounded-lg font-bold btn-sm md:btn-lg">
            Be A Rider
          </button>
        </div>
      </div>

      {/* Slide 3 */}
      <div className="relative">
        <img src={banner3} alt="Banner 3" />

        <div className="
          absolute 
          left-4 bottom-4 
          md:left-16 md:bottom-11 
          flex flex-wrap 
          gap-2 md:gap-4
        ">
          <button className="btn btn-primary rounded-full text-[#1F1F1F] font-bold btn-sm md:btn-lg">
            Track Your Parcel
          </button>

          <button className="btn btn-secondary rounded-full text-primary font-bold btn-sm md:btn-lg">
            <FiArrowUpRight className="text-xl" />
          </button>

          <button className="btn btn-outline rounded-lg font-bold btn-sm md:btn-lg">
            Be A Rider
          </button>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
