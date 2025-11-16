import React from "react";
import icon from "../../../assets/service.png";

const Services = () => {
  const serviceInfo = [
    {
      icon: icon,
      title: "Express  & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      icon: icon,
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      icon: icon,
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      icon: icon,
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      icon: icon,
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
    },

    {
      icon: icon,
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];
  return (
    <section className="py-20 md:py-25 bg-secondary rounded-2xl mt-20 md:mt-25">
      <h2 className="text-4xl text-white text-center font-extrabold">
        Our Services
      </h2>
      <p className="text-center text-[#DADADA] max-w-3xl mx-auto my-6">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  px-10">
        {serviceInfo.map((i, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl px-6 md:px-8 py-5 md:py-6 space-y-4 hover:bg-primary"
          >
            <img
              className="mx-auto p-6 rounded-full bg-linear-to-b from-[#EEEDFC] to-[#eeedfc00]"
              src={i.icon}
              alt=""
            />
            <h3 className="text-xl font-bold text-secondary text-center">
              {i.title}
            </h3>
            <p className="text-[#606060] text-center">{i.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
