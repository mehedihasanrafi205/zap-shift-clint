import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const serviceCenter = useLoaderData();
  const regionsDuplicate = serviceCenter.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenter.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  //   console.log(regions);
  const handleSendParcel = (data) => {
    console.log(data);
    const parcelWeight = parseFloat(data.parcelWeight);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    console.log(cost);
    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: " I Agree !",
    }).then((result) => {
      if (result.isConfirmed) {
        
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };
  return (
    <div className="mt-10 py-15 px-20 bg-white rounded-2xl">
      <h2 className="text-5xl font-extrabold text-secondary ">Send A Parcel</h2>
      <h4 className="text-3xl text-secondary font-extrabold mt-12 pb-7">
        Enter your parcel details
      </h4>
      <form
        className="font-medium text-[#0F172A]"
        onSubmit={handleSubmit(handleSendParcel)}
      >
        {/* document */}
        <div className="border-t border-gray-500/20 pt-7 space-x-10">
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio  bg-gray-100 border-gray-300 checked:bg-gray-200 checked:text-green-600 checked:border-gRAY-600"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio  bg-gray-100 border-gray-300 checked:bg-gray-200 checked:text-green-600 checked:border-gRAY-600"
            />
            Non-Document
          </label>
        </div>
        {/* parcel Info: name, weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 py-7 border-b border-gray-500/20 pt-7">
          <fieldset className="fieldset">
            <label className="">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="">Parcel Weight (KG)</label>
            <input
              type="text"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight (KG)"
            />
          </fieldset>
        </div>
        {/* tow col  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {/* sender info */}
          <fieldset className="fieldset ">
            <h3 className="font-extrabold text-lg text-secondary my-7">
              Sender Details
            </h3>
            <label className="">Sender Name</label>
            <input
              type="text"
              {...register("senderName")}
              className="input w-full"
              placeholder="Sender Name"
            />
            <label className="">Sender Email</label>
            <input
              type="email"
              {...register("senderEmail")}
              className="input w-full"
              placeholder="Sender Email"
            />
            <label className="mt-4">Sender Region </label>
            <select
              {...register("senderRegion")}
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
            <label className="mt-4">Sender District</label>
            <select
              {...register("senderDistrict")}
              defaultValue="Pick a District"
              className="select w-full"
            >
              <option disabled={true}>Pick a District</option>
              {districtsByRegion(senderRegion).map((r, i) => (
                <option value={r} key={i}>
                  {r}
                </option>
              ))}
            </select>
            <label className="mt-4">Sender Address</label>
            <input
              type="text"
              {...register("senderAddress")}
              className="input w-full"
              placeholder="Sender Address"
            />
            <label className="mt-4">Sender Phone No</label>
            <input
              type="text"
              {...register("senderPhoneNo")}
              className="input w-full"
              placeholder="Sender Phone No"
            />

            <label className="mt-4 ">Pickup Instruction</label>

            <textarea
              {...register("senderPickupInstruction")}
              className=" w-full textarea h-24"
              placeholder="Pickup Instruction"
            />
          </fieldset>
          {/* receiver info  */}
          <fieldset className="fieldset ">
            <h3 className="font-extrabold text-lg text-secondary my-7">
              Receiver Details
            </h3>
            <label className="">Receiver Email</label>
            <input
              type="email"
              {...register("receiverEmail")}
              className="input w-full"
              placeholder="Sender Email"
            />
            <label className="">Receiver Name</label>
            <input
              type="text"
              {...register("receiverName")}
              className="input w-full"
              placeholder="Sender Name"
            />
            <label className="mt-4">Receiver Region </label>
            <select
              {...register("receiverRegion")}
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
            <label className="mt-4">Receiver District</label>
            <select
              {...register("receiverDistrict")}
              defaultValue="Pick a District"
              className="select w-full"
            >
              <option disabled={true}>Pick a District</option>
              {districtsByRegion(receiverRegion).map((r, i) => (
                <option value={r} key={i}>
                  {r}
                </option>
              ))}
            </select>
            <label className="mt-4">Receiver Address</label>
            <input
              type="text"
              {...register("receiverAddress")}
              className="input w-full"
              placeholder="Sender Address"
            />
            <label className="mt-4">Receiver Phone No</label>
            <input
              type="text"
              {...register("receiverPhoneNo")}
              className="input w-full"
              placeholder="Sender Phone No"
            />

            <label className="mt-4 ">Delivery Instruction</label>

            <textarea
              {...register("receiverDeliveryInstruction")}
              className=" w-full textarea h-24"
              placeholder="Delivery Instruction"
            />
          </fieldset>
        </div>
        <p className="my-5">* PickUp Time 4pm-7pm Approx.</p>
        <input
          type="submit"
          className="btn btn-primary text-black px-16"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
