import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser, signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res);
        navigate(location?.state || "/");
      })
      .catch((e) => console.log(e));
  };
  const loginGoogle = () => {
    signInGoogle()
      .then((res) => {
        console.log(res);
        navigate(location?.state || "/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="w-full ">
      <h2 className="text-4xl font-extrabold mb-1">Welcome Back</h2>
      <p className="text-gray-500 mb-6">Login with ZapShift</p>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4  ">
        <label className="">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="input input-bordered w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">Email is required</p>
        )}
        <label className="">Password</label>
        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: 6,
            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
          })}
          placeholder="Password"
          className="input input-bordered w-full"
        />
        {errors.password?.type === "required" && (
          <p className="text-red-500 text-sm">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-500 text-sm">
            Password must be at least 6 characters
          </p>
        )}
        {errors.password?.type === "pattern" && (
          <p className="text-red-500 text-sm">
            Password must contain uppercase, lowercase, number, and special
            character
          </p>
        )}

        <div className="">
          <Link to={"/"} className="link link-hover hover:text-primary text-sm">
            Forgot Password?
          </Link>
        </div>

        <button className="btn btn-primary text-black w-full mt-2">
          Login
        </button>

        <p className="text-center text-gray-500 text-sm mt-2">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary font-medium">
            Register
          </Link>
        </p>

        <div className="divider">Or</div>
      </form>
      <button onClick={loginGoogle} className="btn btn-outline w-full">
        <FcGoogle size={18} />
        Login with Google
      </button>
    </div>
  );
};

export default Login;
