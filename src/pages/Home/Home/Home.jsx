import React from "react";
import Banner from "../Banner/Banner";
import HowWorks from "../HowWorks/HowWorks";
import Services from "../Servicrs/Services";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";
const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowWorks></HowWorks>
      <Services></Services>
      <Brands></Brands>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  );
};

export default Home;
