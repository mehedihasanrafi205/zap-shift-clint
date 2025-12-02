import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver-assigned`
      );
      return res.data;
    },
  });
  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = { deliveryStatus: status, riderId: parcel.riderId };
    let message = ` Partial status is update with ${status
      .split("-")
      .join(" ")}`;
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div>
      <h2> Personal pending pickup: {parcels.length} </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Rider Name</th>
              <th>Confirm</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.riderName}</td>
                <td>
                  {parcel.deliveryStatus === "driver-assigned" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider-arriving")
                        }
                        className="btn-primary btn text-black"
                      >
                        Accept
                      </button>
                      <button className="btn-error btn text-black">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>Accepted</span>
                  )}
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, "parcel-picked-up")
                    }
                    className="btn-warning btn "
                  >
                    Mark As Picked Up
                  </button>
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, "parcel-delivered")
                    }
                    className="btn-primary btn text-black"
                  >
                    Mark as Delivered
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

export default AssignDeliveries;
