import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router";
import rider from "../../assets/agent-pending.png";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const serviceCenter = useLoaderData();
  const regionsDuplicate = serviceCenter.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const region = useWatch({ control, name: "region" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenter.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleBeARider = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Your replication has been submitted. We will reach to you in 145 days",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  return (
    <div className="mt-10 py-15 px-20 bg-white rounded-2xl">
      <div>
        <h2 className="font-bold text-4xl text-secondary">Be a Rider</h2>
        <p className="max-w-[500px]">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <form
          className="font-medium text-[#0F172A]"
          onSubmit={handleSubmit(handleBeARider)}
        >
          {/* tow col  */}
          <div className="flex justify-between items-center gap-20">
            {/* sender info */}
            <fieldset className="fieldset flex-1">
              <h3 className="font-extrabold text-2xl text-secondary my-7">
                Rider Details
              </h3>
              <label className="">Your Name</label>
              <input
                type="text"
                {...register("name")}
                className="input w-full"
                defaultValue={user?.displayName}
                placeholder="Your Name"
              />
              <label className="">Your Email</label>
              <input
                type="email"
                {...register("email")}
                defaultValue={user?.email}
                className="input w-full"
                placeholder="Your Email"
              />
              <label className="mt-4">Your Region </label>
              <select
                {...register("region")}
                defaultValue="Pick a Region"
                className="select w-full"
              >
                <option disabled={true}>Pick a Region</option>

                {regions.map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
              <label className="mt-4">Your District</label>
              <select
                {...register("district")}
                defaultValue="Pick a District"
                className="select w-full"
              >
                <option disabled={true}>Pick a District</option>
                {districtsByRegion(region).map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
              <label className="mt-4">Sender Address</label>
              <input
                type="text"
                {...register("address")}
                className="input w-full"
                placeholder="Your Address"
              />
              <label className="mt-4">Sender Phone No</label>
              <input
                type="text"
                {...register("phoneNo")}
                className="input w-full"
                placeholder="Your Phone No"
              />
              <label className="mt-4">Driving License Number</label>
              <input
                type="text"
                {...register("drivingLicense")}
                className="input w-full"
                placeholder="Driving License Number"
              />
              <label className="mt-4">NID No</label>
              <input
                type="text"
                {...register("NID")}
                className="input w-full"
                placeholder="NID No"
              />
              <label className="mt-4">Bike Brand Model and Year</label>
              <input
                type="text"
                {...register("bikeBrandModel")}
                className="input w-full"
                placeholder="Bike Brand Model and Year"
              />
              <label className="mt-4">Bike Registration Number</label>
              <input
                type="text"
                {...register("bikeRegistration")}
                className="input w-full"
                placeholder="Bike Registration Number"
              />

              <label className="mt-4 ">Tell Us About Yourself</label>

              <textarea
                {...register("senderPickupInstruction")}
                className=" w-full textarea h-24"
                placeholder="aboutYourself"
              />
            </fieldset>
            {/* img   */}
            <div className="flex-1">
              <img src={rider} alt="" className=" w-full max-w-[500px]" />
            </div>
          </div>

          <input
            type="submit"
            className="btn btn-primary w-full text-black mt-5"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Rider;
