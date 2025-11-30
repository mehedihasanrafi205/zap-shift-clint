import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const handleMakeUser = (user, role) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make ${user.displayName} a ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, { role }).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              title: "Success!",
              text: `${user.displayName} is now an ${role}`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl"> Manage Users {users.length}</h2>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Admin Actions</th>
                <th>Others Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={user.photoURL} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.displayName}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleMakeUser(user, "user")}
                        className="btn btn-error"
                      >
                        <FiShieldOff />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeUser(user, "admin")}
                        className="btn btn-success"
                      >
                        <FaUserShield />
                      </button>
                    )}
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs"> Actions </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
