import React, { useState, useEffect, useCallback, memo } from "react";
import { adminAPI, reportAPI } from "../../utils/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  // State for user authorization
  const [showAuthorizeModal, setShowAuthorizeModal] = useState(false);
  const [authorizeForm, setAuthorizeForm] = useState({
    name: "",
    phone: ""
  });
  // Add state for operation progress
  const [operationProgress, setOperationProgress] = useState({
    visible: false,
    message: '',
    percentage: 0
  });
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    bloodGroup: "",
    height: "",
    weight: "",
    allergies: "",
    location: "",
    additionalHealthInfo: []
  });
  const [reportUser, setReportUser] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    category: "blood-test",
    date: new Date().toISOString().split('T')[0],
    results: {},
    tempKeyValues: {},
    notes: ""
  });
  // Add state for storing user's medical reports
  const [userReports, setUserReports] = useState({});
  const [showViewReportsModal, setShowViewReportsModal] = useState(false);
  // Add state to track which users have reports
  const [usersWithReports, setUsersWithReports] = useState({});
  // Add state for detailed report view
  const [detailedReport, setDetailedReport] = useState(null);
  const [showDetailedReportModal, setShowDetailedReportModal] = useState(false);
  // Loading states for different operations
  const [creatingReport, setCreatingReport] = useState(false);
  const [deletingReport, setDeletingReport] = useState(false);
  const [fetchingReports, setFetchingReports] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");
      const { data, error } = await adminAPI.getUsers();
      if (data) {
        // Ensure isRegistered field is present for all users
        const usersWithRegistrationStatus = data.map(user => ({
          ...user,
          isRegistered: user.isRegistered !== undefined ? user.isRegistered : false
        }));
        setUsers(usersWithRegistrationStatus);
        // Fetch reports for each user to determine which users have reports
        data.forEach(user => {
          fetchUserReports(user._id);
        });
      } else {
        setError(error || "Failed to fetch users");
        // Clear error message after 5 seconds
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } catch (err) {
      setError("Failed to fetch users");
      // Clear error message after 5 seconds
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to fetch reports for a specific user
  const fetchUserReports = async (userId) => {
    setFetchingReports(true);
    try {
      const { data, error } = await adminAPI.getAllMedicalReports();
      if (data) {
        // Filter reports for this specific user
        const userReports = data.filter(report => report.userId && report.userId._id === userId);
        setUserReports(prev => ({ ...prev, [userId]: userReports }));
        // Update usersWithReports state
        setUsersWithReports(prev => ({ ...prev, [userId]: userReports.length > 0 }));
      } else {
        console.error("Failed to fetch reports:", error);
        setError(error || "Failed to fetch reports");
        // Clear error message after 5 seconds
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } catch (err) {
      console.error("Failed to fetch user reports:", err);
      setError("Failed to fetch user reports: " + err.message);
      // Clear error message after 5 seconds
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setFetchingReports(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle user authorization
  const handleAuthorizeSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await adminAPI.authorizeUser(authorizeForm);
      if (result.success) {
        setSuccessMessage(result.message || 'User authorized successfully');
        setShowAuthorizeModal(false);
        setAuthorizeForm({ name: '', phone: '' });
        // Refresh users list
        fetchUsers();
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setError(result.error || 'Failed to authorize user');
        // Clear error message after 5 seconds
        setTimeout(() => {
          setError('');
        }, 5000);
      }
    } catch (err) {
      setError('Failed to authorize user: ' + err.message);
      // Clear error message after 5 seconds
      setTimeout(() => {
        setError('');
      }, 5000);
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
      role: user.role,
      bloodGroup: user.bloodGroup || "",
      height: user.height || "",
      weight: user.weight || "",
      allergies: user.allergies || "",
      location: user.location || "",
      additionalHealthInfo: user.additionalHealthInfo || []
    });
  };

  const handleUpdate = useCallback(async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await adminAPI.updateUser(editingUser._id, editForm);
      if (data) {
        setUsers(users.map(user => user._id === editingUser._id ? { ...user, ...editForm } : user));
        setEditingUser(null);
        setEditForm({ 
          name: "", 
          email: "", 
          phone: "", 
          role: "",
          bloodGroup: "",
          height: "",
          weight: "",
          allergies: "",
          location: "",
          additionalHealthInfo: []
        });
      } else {
        setError(error || "Failed to update user");
      }
    } catch (err) {
      setError("Failed to update user");
    }
  }, [editingUser, editForm, users]);

  const cancelEdit = useCallback(() => {
    setEditingUser(null);
    setEditForm({ 
      name: "", 
      email: "", 
      phone: "", 
      role: "",
      bloodGroup: "",
      height: "",
      weight: "",
      allergies: "",
      location: "",
      additionalHealthInfo: []
    });
  }, []);

  // Handle additional health info changes
  const handleAdditionalHealthInfoChange = (index, field, value) => {
    const updatedInfo = [...editForm.additionalHealthInfo];
    updatedInfo[index] = { ...updatedInfo[index], [field]: value };
    setEditForm({
      ...editForm,
      additionalHealthInfo: updatedInfo
    });
  };

  // Add a new additional health info field
  const addAdditionalHealthInfoField = () => {
    setEditForm({
      ...editForm,
      additionalHealthInfo: [...editForm.additionalHealthInfo, { title: '', value: '' }]
    });
  };

  // Remove an additional health info field
  const removeAdditionalHealthInfoField = (index) => {
    const updatedInfo = [...editForm.additionalHealthInfo];
    updatedInfo.splice(index, 1);
    setEditForm({
      ...editForm,
      additionalHealthInfo: updatedInfo
    });
  };

  const handleFillReport = (user) => {
    setReportUser(user);
    setReportForm({
      category: "blood-test",
      date: new Date().toISOString().split('T')[0],
      results: {},
      notes: ""
    });
    setShowReportModal(true);
  };

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReportForm({ ...reportForm, [name]: value });
  };

  // Handle results input changes
  const handleResultsChange = (e) => {
    setReportForm({
      ...reportForm,
      results: {
        ...reportForm.results,
        [e.target.name]: e.target.value
      }
    });
  };

  // Add new result field
  const addResultField = () => {
    const newKey = `test_${Date.now()}`;
    setReportForm({
      ...reportForm,
      results: {
        ...reportForm.results,
        [newKey]: ''
      },
      tempKeyValues: {
        ...reportForm.tempKeyValues,
        [newKey]: ''
      }
    });
  };

  // Remove result field
  const removeResultField = (key) => {
    const newResults = { ...reportForm.results };
    delete newResults[key];
    const newTempKeyValues = { ...reportForm.tempKeyValues };
    delete newTempKeyValues[key];
    setReportForm({
      ...reportForm,
      results: newResults,
      tempKeyValues: newTempKeyValues
    });
  };

  // Update result field key
  const updateResultKey = (oldKey, newKey) => {
    if (oldKey === newKey) return;
    
    const newResults = { ...reportForm.results };
    newResults[newKey] = newResults[oldKey];
    delete newResults[oldKey];
    
    const newTempKeyValues = { ...reportForm.tempKeyValues };
    if (newTempKeyValues[oldKey] !== undefined) {
      newTempKeyValues[newKey] = newTempKeyValues[oldKey];
      delete newTempKeyValues[oldKey];
    }
    
    setReportForm({
      ...reportForm,
      results: newResults,
      tempKeyValues: newTempKeyValues
    });
  };

  // Update result field value
  const updateResultValue = (key, value) => {
    setReportForm({
      ...reportForm,
      results: {
        ...reportForm.results,
        [key]: value
      }
    });
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    setCreatingReport(true);
    setError("");
    setSuccessMessage("");
    
    try {
      // Create the report data
      const { tempKeyValues, ...reportData } = {
        ...reportForm,
        userId: reportUser._id
      };
      
      // Call the admin API to create the report
      const { data, error } = await adminAPI.createMedicalReportByAdmin(reportData);
      
      if (data) {
        setSuccessMessage(`Report created successfully for ${reportUser.name}`);
        setShowReportModal(false);
        // Refresh the users list and reports
        await fetchUsers();
        // Also refresh the specific user's reports in the view reports modal
        if (showViewReportsModal) {
          await fetchUserReports(reportUser._id);
        }
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        setError(error || "Failed to create report");
        // Clear error message after 5 seconds
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } catch (err) {
      setError("Failed to create report: " + err.message);
      // Clear error message after 5 seconds
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setCreatingReport(false);
    }
  };

  const handleViewReports = async (user) => {
    try {
      setError("");
      setSuccessMessage("");
      // Fetch fresh reports for the user
      await fetchUserReports(user._id);
      setReportUser(user);
      setShowViewReportsModal(true);
    } catch (err) {
      setError("Failed to fetch user reports: " + err.message);
    }
  };

  // Replace the renderResultsFields function with this simpler version
  const renderResultsFields = () => {
    return (
      <div className="space-y-4">
        {Object.keys(reportForm.results).length === 0 ? (
          <p className="text-gray-500 text-sm py-2">No test results added yet.</p>
        ) : (
          Object.entries(reportForm.results).map(([key, value]) => (
            <div key={key} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="w-full sm:flex-1">
                <input
                  type="text"
                  value={key.startsWith('test_') ? (reportForm.tempKeyValues?.[key] || '') : key}
                  onChange={(e) => {
                    if (key.startsWith('test_')) {
                      // Update the temporary value in the form state
                      setReportForm({
                        ...reportForm,
                        tempKeyValues: {
                          ...reportForm.tempKeyValues,
                          [key]: e.target.value
                        }
                      });
                    } else {
                      updateResultKey(key, e.target.value);
                    }
                  }}
                  onBlur={(e) => {
                    if (key.startsWith('test_') && e.target.value.trim()) {
                      // When the input loses focus, update the key permanently
                      updateResultKey(key, e.target.value);
                    }
                  }}
                  placeholder="Test name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>
              <div className="w-full sm:flex-1">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateResultValue(key, e.target.value)}
                  placeholder="Value"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>
              <div className="w-32 sm:w-auto">
                <button
                  type="button"
                  onClick={() => removeResultField(key)}
                  className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200 flex items-center justify-center"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="ml-2 hidden sm:inline">Remove</span>
                </button>
              </div>
            </div>
          ))
        )}
        <div className="pt-3">
          <button
            type="button"
            onClick={addResultField}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 flex items-center justify-center w-auto"
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Test Result
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        <span className="ml-3 text-gray-600">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl">{error}</div>
        <button
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchUsers}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Progress indicator */}
      {operationProgress.visible && (
        <div className="fixed top-4 right-4 z-50 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative max-w-sm">
          <div className="flex items-center">
            <div className="flex-1">
              <strong className="font-bold">{operationProgress.message}</strong>
              <div className="mt-1">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${operationProgress.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <button 
              className="ml-4 text-blue-700 hover:text-blue-900"
              onClick={() => setOperationProgress({ visible: false, message: '', percentage: 0 })}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="relative bg-green-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white mb-6">User Management</h1>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              onClick={() => setShowAuthorizeModal(true)}
            >
              Authorize New User
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        {/* Display success or error messages */}
        {successMessage && (
          <div className="rounded-md bg-green-50 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  {successMessage}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {error && !loading && (
          <div className="rounded-md bg-red-50 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
        
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
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
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
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-green-600 text-xs font-bold mb-2">
                            Phone
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-green-600 text-xs font-bold mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={editForm.location}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Health Information Section */}
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-12/12 px-4">
                        <h6 className="text-green-600 text-sm font-bold mb-3">
                          Health Information
                        </h6>
                      </div>
                      
                      <div className="w-full md:w-1/2 lg:w-6/12 px-2 mb-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-green-600 text-xs font-bold mb-2">
                            Blood Group
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={editForm.bloodGroup}
                            onChange={(e) => setEditForm({ ...editForm, bloodGroup: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/2 lg:w-6/12 px-2 mb-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-green-600 text-xs font-bold mb-2">
                            Height
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={editForm.height}
                            onChange={(e) => setEditForm({ ...editForm, height: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/2 lg:w-6/12 px-2 mb-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-green-600 text-xs font-bold mb-2">
                            Weight
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={editForm.weight}
                            onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/2 lg:w-6/12 px-2 mb-4">
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-green-600 text-xs font-bold mb-2">
                            Allergies
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={editForm.allergies}
                            onChange={(e) => setEditForm({ ...editForm, allergies: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      {/* Additional Health Information Section */}
                      <div className="w-full lg:w-12/12 px-4 mt-6">
                        <div className="flex justify-between items-center mb-3">
                          <h6 className="text-green-600 text-sm font-bold">
                            Additional Health Information
                          </h6>
                          <button
                            type="button"
                            className="bg-blue-500 text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                            onClick={addAdditionalHealthInfoField}
                          >
                            Add More
                          </button>
                        </div>
                        
                        {editForm.additionalHealthInfo.map((info, index) => (
                          <div key={index} className="flex flex-wrap -mx-2 mb-3 p-3 border border-gray-200 rounded">
                            <div className="w-full md:w-5/12 px-2 mb-2">
                              <input
                                type="text"
                                className="border-0 px-3 py-2 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Title (e.g., Blood Pressure)"
                                value={info.title}
                                onChange={(e) => handleAdditionalHealthInfoChange(index, 'title', e.target.value)}
                              />
                            </div>
                            <div className="w-full md:w-5/12 px-2 mb-2">
                              <input
                                type="text"
                                className="border-0 px-3 py-2 placeholder-green-300 text-green-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Value"
                                value={info.value}
                                onChange={(e) => handleAdditionalHealthInfoChange(index, 'value', e.target.value)}
                              />
                            </div>
                            <div className="w-full md:w-2/12 px-2 mb-2 flex items-center">
                              <button
                                type="button"
                                className="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-2 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                                onClick={() => removeAdditionalHealthInfoField(index)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        {editForm.additionalHealthInfo.length === 0 && (
                          <p className="text-gray-500 text-sm italic">No additional health information added.</p>
                        )}
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

        {/* Fill Report Modal */}
        {showReportModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowReportModal(false)}></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Fill Medical Report for {reportUser?.name}
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setShowReportModal(false)}
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <form onSubmit={handleReportSubmit}>
                    <div className="space-y-4">
                      {/* Display success or error messages */}
                      {successMessage && (
                        <div className="rounded-lg bg-green-100 p-4 border border-green-200">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-green-800">
                                {successMessage}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {error && (
                        <div className="rounded-lg bg-red-100 p-4 border border-red-200">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-red-800">
                                {error}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          name="category"
                          value={reportForm.category}
                          onChange={handleReportChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          required
                        >
                          <option value="blood-test">Hematology</option>
                          <option value="gut-test">Gastrointestinal</option>
                          {/* <option value="urine-test">Urological</option>
                          <option value="liver-function">Liver Health</option>
                          <option value="kidney-function">Kidney Health</option>
                          <option value="lipid-profile">Lipid Health</option>
                          <option value="thyroid-test">Thyroid Health</option>
                          <option value="diabetes-panel">Diabetes Health</option>
                          <option value="cardiac-markers">Cardiac Health</option>
                          <option value="inflammatory-markers">Inflammatory Health</option>
                          <option value="vitamin-levels">Vitamin Health</option>
                          <option value="mineral-levels">Mineral Health</option>
                          <option value="hormone-test">Hormone Health</option>
                          <option value="tumor-markers">Tumor Health</option>
                          <option value="allergy-test">Allergy Health</option>
                          <option value="immunology-test">Immunology Health</option>
                          <option value="coagulation-profile">Coagulation Health</option>
                          <option value="electrolyte-panel">Electrolyte Health</option> */}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                          type="date"
                          name="date"
                          value={reportForm.date}
                          onChange={handleReportChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          required
                        />
                      </div>
                      
                      <div>
                        <h4 className="block text-sm font-medium text-gray-700 mb-3">Test Results</h4>
                        {renderResultsFields()}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                          name="notes"
                          value={reportForm.notes}
                          onChange={handleReportChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          placeholder="Any additional notes about this report..."
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="mt-6 sm:flex sm:flex-row-reverse gap-3">
                      <button
                        type="submit"
                        disabled={creatingReport}
                        className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white font-medium transition duration-200 ${creatingReport ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}`}
                      >
                        {creatingReport ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating...
                          </>
                        ) : (
                          'Create Report'
                        )}
                      </button>
                      <button
                        type="button"
                        className="w-full sm:w-auto px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-200"
                        onClick={() => setShowReportModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Reports Modal */}
        {showViewReportsModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowViewReportsModal(false)}></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Medical Reports for {reportUser?.name}
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setShowViewReportsModal(false)}
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mt-4">
                    {fetchingReports ? (
                      <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
                        <span className="ml-2 text-gray-600">Loading reports...</span>
                      </div>
                    ) : userReports[reportUser?._id] && userReports[reportUser._id].length > 0 ? (
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {userReports[reportUser._id].map((report) => (
                          <div key={report._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900 capitalize text-lg">{report.category}</h4>
                                <p className="text-sm text-gray-500 mt-1">
                                  {new Date(report.date).toLocaleDateString()}
                                </p>
                              </div>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 capitalize">
                                {report.category}
                              </span>
                            </div>
                            
                            {/* Display key results for blood tests */}
                            {report.category === 'blood-test' && report.results && (
                              <div className="mt-3 bg-gray-50 rounded-lg p-4">
                                <h5 className="text-sm font-medium text-gray-700 mb-3">Key Results:</h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                  {Object.entries(report.results).slice(0, 6).map(([key, value]) => (
                                    <div key={key} className="flex justify-between py-1">
                                      <span className="text-sm text-gray-600 capitalize">{key}:</span>
                                      <span className="text-sm font-medium">{String(value)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Display key results for gut tests */}
                            {report.category === 'gut-test' && report.results && (
                              <div className="mt-3 bg-gray-50 rounded-lg p-4">
                                <h5 className="text-sm font-medium text-gray-700 mb-3">Key Results:</h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                  {Object.entries(report.results).slice(0, 6).map(([key, value]) => (
                                    <div key={key} className="flex justify-between py-1">
                                      <span className="text-sm text-gray-600 capitalize">{key}:</span>
                                      <span className="text-sm font-medium">{String(value)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="mt-4 flex space-x-3">
                              <button 
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200 text-sm"
                                onClick={() => {
                                  // Set the detailed report and open the modal
                                  setDetailedReport({
                                    ...report,
                                    user: reportUser
                                  });
                                  setShowDetailedReportModal(true);
                                }}
                              >
                                View Details
                              </button>
                              <button 
                                disabled={deletingReport}
                                className={`px-4 py-2 rounded-lg transition duration-200 text-sm ${deletingReport 
                                  ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                                  : 'bg-red-600 hover:bg-red-700 text-white'}`}
                                onClick={async () => {
                                  if (window.confirm('Are you sure you want to delete this report?')) {
                                    setDeletingReport(true);
                                    try {
                                      const { data, error } = await adminAPI.deleteMedicalReport(report._id);
                                      if (data) {
                                        // Refresh the reports list
                                        await fetchUserReports(reportUser._id);
                                        setSuccessMessage('Report deleted successfully');
                                        
                                        // Clear success message after 3 seconds
                                        setTimeout(() => {
                                          setSuccessMessage("");
                                        }, 3000);
                                      } else {
                                        setError(error || 'Failed to delete report');
                                        // Clear error message after 5 seconds
                                        setTimeout(() => {
                                          setError("");
                                        }, 5000);
                                      }
                                    } catch (err) {
                                      setError('Failed to delete report: ' + err.message);
                                      // Clear error message after 5 seconds
                                      setTimeout(() => {
                                        setError("");
                                      }, 5000);
                                    } finally {
                                      setDeletingReport(false);
                                    }
                                  }
                                }}
                              >
                                {deletingReport ? (
                                  <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Deleting...
                                  </>
                                ) : (
                                  'Delete'
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No reports</h3>
                        <p className="mt-1 text-sm text-gray-500">This user doesn't have any medical reports yet.</p>
                        <div className="mt-6">
                          <button
                            type="button"
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 flex items-center justify-center"
                            onClick={() => {
                              setShowViewReportsModal(false);
                              handleFillReport(reportUser);
                            }}
                          >
                            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Create Report
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full sm:w-auto px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-200"
                    onClick={() => setShowViewReportsModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Report Modal */}
        {showDetailedReportModal && detailedReport && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowDetailedReportModal(false)}></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Report Details for {detailedReport.user?.name}
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setShowDetailedReportModal(false)}
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Category</h4>
                        <p className="mt-1 text-lg font-medium text-gray-900 capitalize">{detailedReport.category}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Date</h4>
                        <p className="mt-1 text-lg font-medium text-gray-900">{new Date(detailedReport.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Patient</h4>
                      <p className="mt-1 text-lg font-medium text-gray-900">{detailedReport.user?.name}</p>
                    </div>
                    
                    {detailedReport.notes && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Notes</h4>
                        <p className="mt-1 text-lg font-medium text-gray-900">{detailedReport.notes}</p>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Test Results</h4>
                      <div className="mt-2 bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {Object.entries(detailedReport.results).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                              <span className="text-sm text-gray-600 capitalize">{key}:</span>
                              <span className="text-sm font-medium">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full sm:w-auto px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-200"
                    onClick={() => setShowDetailedReportModal(false)}
                  >
                    Close
                  </button>
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
                          #
                        </th>
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
                          Registration Status
                        </th>
                        <th className="px-4 sm:px-6 bg-green-50 text-green-500 align-middle border border-solid border-green-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user._id}>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {index + 1}
                          </td>
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
                            <span className={`px-2 py-1 text-xs rounded-full ${user.role === "admin"
                                ? "bg-red-200 text-red-800"
                                : user.role === "doctor"
                                  ? "bg-blue-200 text-blue-800"
                                  : "bg-green-200 text-green-800"
                              }`}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                          </td>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${user.isRegistered
                                ? "bg-green-200 text-green-800"
                                : "bg-yellow-200 text-yellow-800"
                              }`}>
                              {user.isRegistered ? "Complete" : "Incomplete"}
                            </span>
                          </td>
                          <td className="border-t-0 px-4 sm:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="flex flex-wrap gap-2">
                              <button
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 text-sm"
                                onClick={() => handleFillReport(user)}
                              >
                                Fill Report
                              </button>
                              <button
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200 text-sm"
                                onClick={() => handleEdit(user)}
                              >
                                Edit
                              </button>
                              <button
                                className={`px-4 py-2 rounded-lg transition duration-200 text-sm ${usersWithReports[user._id] 
                                  ? "bg-purple-600 hover:bg-purple-700 text-white" 
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                                onClick={() => usersWithReports[user._id] && handleViewReports(user)}
                                disabled={!usersWithReports[user._id]}
                              >
                                View Reports
                              </button>
                              <button
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200 text-sm"
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
      
      {/* Authorize User Modal */}
      {showAuthorizeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowAuthorizeModal(false)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Authorize New User
                    </h3>
                    <form onSubmit={handleAuthorizeSubmit}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          value={authorizeForm.name}
                          onChange={(e) => setAuthorizeForm({...authorizeForm, name: e.target.value})}
                          placeholder="Enter user's full name"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          value={authorizeForm.phone}
                          onChange={(e) => setAuthorizeForm({...authorizeForm, phone: e.target.value})}
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                      <div className="mt-6 sm:flex sm:flex-row-reverse gap-3">
                        <button
                          type="submit"
                          className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200"
                        >
                          Authorize User
                        </button>
                        <button
                          type="button"
                          className="w-full sm:w-auto px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-200"
                          onClick={() => setShowAuthorizeModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Users);