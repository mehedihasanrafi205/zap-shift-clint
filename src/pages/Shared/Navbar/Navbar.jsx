import React from "react";
import Logo from "../../../components/logo/Logo";
import { Link, NavLink } from "react-router";
import { FiArrowUpRight } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then()
      .catch((e) => console.log(e));
  };
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Services</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
      <li>
        <NavLink to={"/"}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={"/send-parcel"}>Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to={"/rider"}>Be a Rider</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={"/dashboard/my-parcels"}>My Parcels</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100  rounded-2xl py-3 px-6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"} className=" text-xl">
          <Logo />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end ">
        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-outline  rounded-lg"
          >
            Sign Out
          </button>
        ) : (
          <Link to={"/login"} className="btn btn-outline  rounded-lg">
            Sign In
          </Link>
        )}
        <Link
          to={"/rider"}
          className="btn btn-primary ms-2 text-[#1F1F1F] rounded-lg"
        >
          Be a Rider
        </Link>
        <button className="btn btn-secondary rounded-full text-primary font-bold">
          <FiArrowUpRight />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
