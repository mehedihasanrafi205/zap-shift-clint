import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  const handleParcelDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleParcelPayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };
    const res = await axiosSecure.post(
      `/payment-checkout-session`,
      paymentInfo
    );
    console.log(res.data.url);
    window.location.assign(res.data.url);
  };

  return (
    <div className="container mx-auto">
      <h2>MyParcels {parcels.length}</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Cost</th>
              <th>Payment </th>
              <th>Tracking ID</th>
              <th>Delivery Status</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {new Date(parcel.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>{parcel.cost}</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className=" badge bg-[#dff3e7] text-[#26AE60] font-medium">
                      Paid
                    </span>
                  ) : (
                    <button
                      onClick={() => handleParcelPayment(parcel)}
                      className="btn btn-sm btn-primary text-black"
                    >
                      Pay
                    </button>
                  )}
                </td>

                <td>{parcel.trackingId}</td>
                <td>{parcel.deliveryStatus}</td>

                <td className="space-x-1.5">
                  <button className="btn btn-square hover:btn-info">
                    <FaMagnifyingGlass />
                  </button>
                  <button className="btn btn-square hover:bg-primary">
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-square hover:btn-error"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
