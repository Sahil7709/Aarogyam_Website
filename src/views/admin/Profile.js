import React, { useState, useEffect } from "react";
import { authAPI } from "utils/api";
import avtar from "../../assets/img/admin.jpg";

export default function Profile() {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "admin",
    createdAt: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await authAPI.getProfile();
      if (data) {
        // Handle both response formats: { user: {...} } and {...}
        const userData = data.user || data;
        setAdminData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          role: userData.role || "admin",
          createdAt: userData.createdAt || ""
        });
      } else {
        setError(error || "Failed to load profile");
      }
    } catch (err) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Remove token and redirect to login
    localStorage.removeItem("token");
    window.location.href = "/admin/auth/login";
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
          onClick={fetchAdminProfile}
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
            <h1 className="text-2xl font-bold text-white mb-6">Admin Profile</h1>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-8/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-green-700 text-xl font-bold">My Profile</h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  <h6 className="text-green-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Account Information
                  </h6>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-green-600 text-xs font-bold mb-2"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={adminData.name}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-green-600 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={adminData.email}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-green-600 text-xs font-bold mb-2"
                          htmlFor="phone"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          id="phone"
                          className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={adminData.phone || "Not provided"}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-green-600 text-xs font-bold mb-2"
                          htmlFor="role"
                        >
                          Role
                        </label>
                        <input
                          type="text"
                          id="role"
                          className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={adminData.role}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-green-600 text-xs font-bold mb-2"
                          htmlFor="created-at"
                        >
                          Member Since
                        </label>
                        <input
                          type="text"
                          id="created-at"
                          className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={adminData.createdAt ? new Date(adminData.createdAt).toLocaleDateString() : "Unknown"}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="mt-6 border-b-1 border-green-300" />

                  <h6 className="text-green-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Security
                  </h6>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-green-600 text-xs font-bold mb-2"
                          htmlFor="current-password"
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="current-password"
                          className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Current Password"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-green-600 text-xs font-bold mb-2"
                          htmlFor="new-password"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          id="new-password"
                          className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="New Password"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-green-600 text-xs font-bold mb-2"
                          htmlFor="confirm-password"
                        >
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirm-password"
                          className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Confirm New Password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      Logout
                    </button>
                    <button
                      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                      type="button"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 flex justify-center">
                    <div className="relative">
                      <img
                        alt="Admin Avatar"
                        src={avtar}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 text-center mt-30">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-green-600">
                          Admin
                        </span>
                        <span className="text-sm text-green-400">Role</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-xl font-semibold leading-normal mb-2 text-green-700 mb-2">
                    {adminData.name || "Admin User"}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-green-400 font-bold">
                    <i className="fas fa-envelope mr-2 text-lg text-green-400"></i>
                    {adminData.email}
                  </div>
                  <div className="mb-2 text-green-600">
                    <i className="fas fa-phone mr-2 text-lg text-green-400"></i>
                    {adminData.phone || "Not provided"}
                  </div>
                  <div className="mb-2 text-green-600">
                    <i className="fas fa-calendar-alt mr-2 text-lg text-green-400"></i>
                    Member since {adminData.createdAt ? new Date(adminData.createdAt).toLocaleDateString() : "Unknown"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}