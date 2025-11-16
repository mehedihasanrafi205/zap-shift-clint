import React from "react";
import icon1 from "../../../assets/bookingIcon.png";
import icon2 from "../../../assets/cash-on-delivery.png";
import icon3 from "../../../assets/warehouse.png";
import icon4 from "../../../assets/booking.png";

const HowWorks = () => {
  const workInfo = [
    {
      icon: icon1,
      title: "Booking Pick & Drop",
      description:
        "Book a pickup anytime — we collect from your doorstep and deliver safely to the destination.",
    },
    {
      icon: icon2,
      title: "Cash On Delivery",
      description:
        "Receive your payments instantly with our fast and secure cash-on-delivery service.",
    },
    {
      icon: icon3,
      title: "Delivery Hub",
      description:
        "Easily send or receive parcels through our nearest delivery hub with reliable tracking.",
    },
    {
      icon: icon4,
      title: "Booking SME & Corporate",
      description:
        "Powering businesses with dedicated delivery solutions tailored for SMEs and corporate teams.",
    },
  ];

  return (
    <section className=" mt-20 md:mt-25">
        <h2 className="text-secondary font-extrabold text-3xl mb-6 md:mb-8">How it Works</h2>
      <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
        {workInfo.map((i) => (
          <div className="p-6 md:p-8 bg-[#f9f9fa] rounded-2xl space-y-4 md:space-y-6 ">
            <img className="w-14" src={i.icon} alt="" />
            <h3 className="text-xl font-bold text-secondary">{i.title}</h3>
            <p className="text-[#606060]">{i.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWorks;
