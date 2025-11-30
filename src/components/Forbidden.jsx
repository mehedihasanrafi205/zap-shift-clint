import Lottie from "lottie-react";
import forbiddenAnimation from "../assets/json/forbidden.json";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie
        animationData={forbiddenAnimation}
        loop
        className="w-56"
      />

      <h1 className="text-3xl font-bold text-red-500 mt-4">
        You Are Forbidden to Access This Page
      </h1>

      <p className="text-gray-600 mt-2">
        Please contact the administrator if you believe this is an error.
      </p>

      <div className="flex gap-3 mt-4">
        <Link to="/" className="btn btn-primary text-black">
          Go Home
        </Link>
        <Link to="/dashboard" className="btn btn-secondary">
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
