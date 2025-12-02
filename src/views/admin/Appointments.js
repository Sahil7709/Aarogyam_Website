import React, { useState, useEffect, useCallback, memo } from "react";
import { adminAPI } from "../../utils/api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editForm, setEditForm] = useState({
    status: "",
    date: "",
    time: "",
    reason: ""
  });

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await adminAPI.getAllAppointments();
      if (data) {
        setAppointments(data);
      } else {
        setError(error || "Failed to fetch appointments");
      }
    } catch (err) {
      setError("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);



  const handleUpdate = useCallback(async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await adminAPI.updateAppointment(editingAppointment._id, editForm);
      if (data) {
        setAppointments(appointments.map(appt => 
          appt._id === editingAppointment._id ? { ...appt, ...editForm } : appt
        ));
        setEditingAppointment(null);
        setEditForm({ status: "", date: "", time: "", reason: "" });
      } else {
        setError(error || "Failed to update appointment");
      }
    } catch (err) {
      setError("Failed to update appointment");
    }
  }, [editingAppointment, editForm, appointments]);

  const cancelEdit = useCallback(() => {
    setEditingAppointment(null);
    setEditForm({ status: "", date: "", time: "", reason: "" });
  }, []);

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
          onClick={fetchAppointments}
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
            <h1 className="text-2xl font-bold text-white mb-6">Appointment Management</h1>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        {editingAppointment && (
          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-6 px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-lg text-green-700">
                        Edit Appointment
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
                            Date
                          </label>
                          <input
                            type="date"
                            className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={editForm.date}
                            onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 lg:w-6/12 px-2 mb-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-green-600 text-xs font-bold mb-2">
                            Time
                          </label>
                          <input
                            type="time"
                            className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={editForm.time}
                            onChange={(e) => setEditForm({...editForm, time: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 lg:w-6/12 px-2 mb-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-green-600 text-xs font-bold mb-2">
                            Status
                          </label>
                          <select
                            className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={editForm.status}
                            onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                            required
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 lg:w-6/12 px-2 mb-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-green-600 text-xs font-bold mb-2">
                            Reason
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={editForm.reason}
                            onChange={(e) => setEditForm({...editForm, reason: e.target.value})}
                            placeholder="Reason for appointment"
                          />
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
                          Update Appointment
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
                      All Appointments
                    </h3>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                {/* Appointments table - Made responsive */}
                <div className="overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 sm:px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Patient
                        </th>
                        <th className="px-4 sm:px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Date & Time
                        </th>
                        <th className="px-4 sm:px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Reason
                        </th>
                        <th className="px-4 sm:px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Status
                        </th>
                        <th className="px-4 sm:px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment._id}>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {appointment.name}
                          </td>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="text-sm">{new Date(appointment.date).toLocaleDateString()}</div>
                            <div className="text-xs text-gray-500">{appointment.time}</div>
                          </td>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {appointment.reason}
                          </td>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              appointment.status === "confirmed" 
                                ? "bg-green-200 text-green-800" 
                                : appointment.status === "pending" 
                                  ? "bg-yellow-200 text-yellow-800" 
                                  : "bg-red-200 text-red-800"
                            }`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </td>
                          {/* <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="flex flex-wrap">
                              <button
                                className="bg-green-500 text-white active:bg-green-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                onClick={() => handleEdit(appointment)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                onClick={() => handleDelete(appointment._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td> */}
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
};

export default memo(Appointments);