import React, { useState, useEffect } from 'react';
import { reportAPI } from '../utils/api';

const MedicalReportForm = () => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);
  const [formData, setFormData] = useState({
    category: 'blood-test',
    date: '',
    results: {},
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch reports and stats when component mounts
  useEffect(() => {
    fetchReports();
    fetchStats();
  }, []);

  // Fetch user medical reports
  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await reportAPI.getReports();
    setLoading(false);
    
    if (data && data.reports) {
      setReports(data.reports);
    } else {
      setMessage(`Error fetching reports: ${error}`);
    }
  };

  // Fetch report statistics
  const fetchStats = async () => {
    const { data, error } = await reportAPI.getReportStats();
    
    if (data && data.stats) {
      setStats(data.stats);
    } else {
      setMessage(`Error fetching stats: ${error}`);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle results input changes
  const handleResultsChange = (e) => {
    setFormData({
      ...formData,
      results: {
        ...formData.results,
        [e.target.name]: e.target.value
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    const { data, error } = await reportAPI.createReport(formData);
    setLoading(false);
    
    if (data && data.report) {
      setMessage('Medical report added successfully!');
      setFormData({
        category: 'blood-test',
        date: '',
        results: {},
        notes: ''
      });
      // Refresh reports list and stats
      fetchReports();
      fetchStats();
    } else {
      setMessage(`Error adding report: ${error}`);
    }
  };

  // Delete a report
  const deleteReport = async (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setLoading(true);
      const { data, error } = await reportAPI.deleteReport(id);
      setLoading(false);
      
      if (data && data.message) {
        setMessage('Report deleted successfully!');
        // Refresh reports list and stats
        fetchReports();
        fetchStats();
      } else {
        setMessage(`Error deleting report: ${error}`);
      }
    }
  };

  // Render form fields based on report type
  const renderResultsFields = () => {
    return (
      <div className="space-y-3">
        {Object.keys(formData.results).length === 0 ? (
          <p className="text-gray-500 text-sm">No test results added yet.</p>
        ) : (
          Object.entries(formData.results).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={key.startsWith('test_') ? '' : key}
                  onChange={(e) => {
                    const newKey = e.target.value || `test_${Date.now()}`;
                    if (key === newKey) return;
                    
                    setFormData({
                      ...formData,
                      results: {
                        ...formData.results,
                        [newKey]: value,
                        [key]: undefined
                      }
                    });
                  }}
                  placeholder="Test name"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      results: {
                        ...formData.results,
                        [key]: e.target.value
                      }
                    });
                  }}
                  placeholder="Value"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    const newResults = { ...formData.results };
                    delete newResults[key];
                    setFormData({
                      ...formData,
                      results: newResults
                    });
                  }}
                  className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              const newKey = `test_${Date.now()}`;
              setFormData({
                ...formData,
                results: {
                  ...formData.results,
                  [newKey]: ''
                }
              });
            }}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Test Result
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Medical Reports</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="blood-test">Blood Test</option>
                <option value="gut-test">Gut Test</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Report Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Test Results</h3>
              {renderResultsFields()}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? 'Saving...' : 'Save Report'}
              </button>
            </div>
          </form>
        </div>
        
        <div>
          {stats && (
            <div className="bg-white shadow-md rounded p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Report Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Reports:</span>
                  <span className="font-bold">{stats.totalReports}</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">By Type:</h4>
                  <ul className="space-y-1">
                    {Object.entries(stats.byType).map(([type, count]) => (
                      <li key={type} className="flex justify-between">
                        <span>{type}:</span>
                        <span>{count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white shadow-md rounded p-6">
            <h3 className="text-lg font-bold mb-4">Recent Reports</h3>
            {loading ? (
              <p>Loading reports...</p>
            ) : stats && stats.recentReports.length > 0 ? (
              <div className="space-y-3">
                {stats.recentReports.map(report => (
                  <div key={report._id} className="border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between">
                      <h4 className="font-semibold capitalize">{report.category || report.reportType}</h4>
                      <button
                        onClick={() => deleteReport(report._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">{new Date(report.date).toLocaleDateString()}</p>
                    <p className="text-sm capitalize">{report.category || report.reportType}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reports yet.</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">All Reports</h3>
        
        {loading ? (
          <p>Loading reports...</p>
        ) : reports.length === 0 ? (
          <p>You have no medical reports.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map(report => (
              <div key={report._id} className="bg-white shadow rounded p-4">
                <h4 className="font-bold capitalize">{report.category || report.reportType}</h4>
                <p className="text-gray-600 text-sm">{new Date(report.date).toLocaleDateString()}</p>
                <p className="text-gray-800 capitalize">{report.category || report.reportType}</p>
                <button
                  onClick={() => deleteReport(report._id)}
                  disabled={loading}
                  className="mt-2 bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalReportForm;