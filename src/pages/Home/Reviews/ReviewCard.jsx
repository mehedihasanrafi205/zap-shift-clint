import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, review: rev, user_photoURL } = review;
  return (
    <div>
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-lg mx-auto">
        {/* Quote Icon */}
        <FaQuoteLeft className="text-secondary/40 text-4xl mb-4" />

        {/* Description */}
        <p className=" mb-6">{rev}</p>

        {/* Divider */}
        <div className="border-t border-dashed border-secondary w-full my-4"></div>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary">
            <img className="rounded-full " src={user_photoURL} alt="" />
          </div>

          <div>
            <h4 className="text-secondary font-bold text-lg">{userName}</h4>
            <p className="text-gray-500 text-sm">Senior Product Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
