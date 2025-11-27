import React, { useState, useEffect } from "react";
import { adminAPI } from "../../utils/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: ""
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await adminAPI.getUsers();
      if (data) {
        setUsers(data);
      } else {
        setError(error || "Failed to fetch users");
      }
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const { data, error } = await adminAPI.deleteUser(userId);
        if (data) {
          setUsers(users.filter(user => user._id !== userId));
        } else {
          setError(error || "Failed to delete user");
        }
      } catch (err) {
        setError("Failed to delete user");
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email || "",
      phone: user.phone,
      role: user.role
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await adminAPI.updateUser(editingUser._id, editForm);
      if (data) {
        setUsers(users.map(user => user._id === editingUser._id ? { ...user, ...editForm } : user));
        setEditingUser(null);
        setEditForm({ name: "", email: "", phone: "", role: "" });
      } else {
        setError(error || "Failed to update user");
      }
    } catch (err) {
      setError("Failed to update user");
    }
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setEditForm({ name: "", email: "", phone: "", role: "" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl">{error}</div>
        <button 
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchUsers}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="relative bg-green-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <h1 className="text-2xl font-bold text-white mb-6">User Management</h1>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        {editingUser && (
          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-6 px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-lg text-green-700">
                        Edit User
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <form onSubmit={handleUpdate}>
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full md:w-1/2 lg:w-6/12 px-2 mb-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-green-600 text-xs font-bold mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 lg:w-6/12 px-2 mb-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-green-600 text-xs font-bold mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={editForm.email}
                            onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 lg:w-6/12 px-2 mb-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-green-600 text-xs font-bold mb-2">
                            Phone
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 lg:w-6/12 px-2 mb-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-green-600 text-xs font-bold mb-2">
                            Role
                          </label>
                          <select
                            className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={editForm.role}
                            onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                            required
                          >
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-end mt-6">
                      <div className="px-2 mb-2">
                        <button
                          type="button"
                          className="bg-gray-500 text-white active:bg-gray-600 text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 ease-linear transition-all duration-150"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="px-2 mb-2">
                        <button
                          type="submit"
                          className="bg-green-500 text-white active:bg-green-600 text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        >
                          Update User
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-lg text-green-700">
                      All Users
                    </h3>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                {/* Users table - Made responsive */}
                <div className="overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 sm:px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Name
                        </th>
                        <th className="px-4 sm:px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Email
                        </th>
                        <th className="px-4 sm:px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Phone
                        </th>
                        <th className="px-4 sm:px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Role
                        </th>
                        <th className="px-4 sm:px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {user.name}
                          </td>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {user.email || "N/A"}
                          </td>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {user.phone}
                          </td>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.role === "admin" 
                                ? "bg-red-200 text-red-800" 
                                : user.role === "doctor" 
                                  ? "bg-blue-200 text-blue-800" 
                                  : "bg-green-200 text-green-800"
                            }`}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                          </td>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="flex flex-wrap">
                              <button
                                className="bg-green-500 text-white active:bg-green-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                onClick={() => handleEdit(user)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                onClick={() => handleDelete(user._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}