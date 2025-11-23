import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUsers, signInGoogle, updateUser, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  console.log(location);
  const handleRegister = (data) => {
    const profileImg = data.photo[0];

    registerUsers(data.email, data.password)
      .then(() => {
        // store the img and get the photo url
        const formData = new FormData();
        formData.append("image", profileImg);
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_image_host
            }`,
            formData
          )
          .then((res) => {
            const photoURL = res.data.data.url;

            // create user in database
            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: photoURL,
            };
            axiosSecure.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                console.log("User created in the database");
              }
            });
            // update user profile
            const userProfile = {
              displayName: data.name,
              photoURL: photoURL,
            };
            updateUser(userProfile)
              .then(() => {
                console.log(" User profile updated done");
                navigate(location?.state || "/");
              })
              .catch((e) => console.log(e));
          });
      })
      .catch((e) => console.log(e));
  };
  const registerGoogle = () => {
    signInGoogle()
      .then((res) => {
        const userInfo = {
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("google", res.data);
          navigate(location?.state || "/");
        });
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <div className="w-full ">
        <h2 className="text-4xl font-extrabold mb-1">Create an Account</h2>
        <p className="text-gray-500 mb-6">Register with ZapShift</p>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4  ">
          <label className="">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            placeholder="Your Photo"
            className="file-input input-bordered w-full"
          />
          {errors.photo && (
            <p className="text-red-500 text-sm">Photo is required</p>
          )}
          <label className="">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Your Name"
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
          <label className="">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="input input-bordered w-full"
          />

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
            <Link
              to={"/"}
              className="link link-hover hover:text-primary text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <button className="btn btn-primary text-black w-full mt-2">
            Register
          </button>

          <p className="text-center text-gray-500 text-sm mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>

          <div className="divider">Or</div>
        </form>
        <button
          state={location.state}
          onClick={registerGoogle}
          className="btn btn-outline w-full"
        >
          <FcGoogle size={18} />
          Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
