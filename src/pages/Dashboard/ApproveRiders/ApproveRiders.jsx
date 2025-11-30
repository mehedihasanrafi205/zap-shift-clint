import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  const updateRiderStatus = (riser, status) => {
    const updateInfo = { status: status, email: riser.email };
    axiosSecure.patch(`/riders/${riser._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: `Rider has been ${status}`,
          icon: `${status === "approved" ? "success" : "error"}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  const handleApproval = (riser) => {
    updateRiderStatus(riser, "approved");
  };
  const handleRejection = (riser) => {
    updateRiderStatus(riser, "rejected");
  };
  return (
    <div>
      <h2>Riders Pending Approval:{riders.length} </h2>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td>
                  <p
                    className={`badge badge-md badge-soft ${
                      rider.status === "approved"
                        ? "badge-success"
                        : rider.status === "pending"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>{rider.workStatus}</td>
                <td className="space-x-2">
                  <button className="btn ">
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn "
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn "
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button className="btn ">
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApproveRiders;
