import React, { useState, useEffect } from "react";
import { adminAPI } from "../../utils/api";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);
  const [editForm, setEditForm] = useState({
    status: ""
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await adminAPI.getContactMessages();
      if (data) {
        setMessages(data);
      } else {
        setError(error || "Failed to fetch messages");
      }
    } catch (err) {
      setError("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const { data, error } = await adminAPI.deleteContactMessage(messageId);
        if (data) {
          setMessages(messages.filter(msg => msg._id !== messageId));
        } else {
          setError(error || "Failed to delete message");
        }
      } catch (err) {
        setError("Failed to delete message");
      }
    }
  };

  const handleEdit = (message) => {
    setEditingMessage(message);
    setEditForm({
      status: message.status
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await adminAPI.updateContactMessage(editingMessage._id, editForm);
      if (data) {
        setMessages(messages.map(msg => 
          msg._id === editingMessage._id ? { ...msg, ...editForm } : msg
        ));
        setEditingMessage(null);
        setEditForm({ status: "" });
      } else {
        setError(error || "Failed to update message");
      }
    } catch (err) {
      setError("Failed to update message");
    }
  };

  const cancelEdit = () => {
    setEditingMessage(null);
    setEditForm({ status: "" });
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
          onClick={fetchMessages}
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
            <h1 className="text-2xl font-bold text-white mb-6">Contact Messages</h1>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        {editingMessage && (
          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-6 px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-lg text-green-700">
                        Update Message Status
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
                            Status
                          </label>
                          <select
                            className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={editForm.status}
                            onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                            required
                          >
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
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
                          Update Status
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
                      All Contact Messages
                    </h3>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                {/* Messages table - Made responsive */}
                <div className="overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 sm:px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          From
                        </th>
                        <th className="px-4 sm:px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Subject
                        </th>
                        <th className="px-4 sm:px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Date
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
                      {messages.map((message) => (
                        <tr key={message._id} className={message.status === "unread" ? "bg-green-50" : ""}>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="font-medium">{message.name}</div>
                            <div className="text-green-400 text-xs">
                              {message.email}
                            </div>
                          </td>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {message.subject}
                          </td>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </td>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              message.status === "replied" 
                                ? "bg-green-200 text-green-800" 
                                : message.status === "unread" 
                                  ? "bg-yellow-200 text-yellow-800" 
                                  : "bg-blue-200 text-blue-800"
                            }`}>
                              {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                            </span>
                          </td>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="flex flex-wrap">
                              <button
                                className="bg-green-500 text-white active:bg-green-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                onClick={() => handleEdit(message)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                onClick={() => handleDelete(message._id)}
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