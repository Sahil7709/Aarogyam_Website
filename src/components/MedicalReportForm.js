import React, { useState, useEffect } from 'react';
import { reportAPI } from '../utils/api';

const MedicalReportForm = () => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    reportType: 'blood-test',
    date: '',
    doctor: '',
    hospital: '',
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
    
    if (data) {
      setReports(data);
    } else {
      setMessage(`Error fetching reports: ${error}`);
    }
  };

  // Fetch report statistics
  const fetchStats = async () => {
    const { data, error } = await reportAPI.getReportStats();
    
    if (data) {
      setStats(data);
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
    
    if (data) {
      setMessage('Medical report added successfully!');
      setFormData({
        title: '',
        reportType: 'blood-test',
        date: '',
        doctor: '',
        hospital: '',
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
      
      if (data) {
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
    switch (formData.reportType) {
      case 'blood-test':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hemoglobin">
                  Hemoglobin
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="hemoglobin"
                  value={formData.results.hemoglobin || ''}
                  onChange={handleResultsChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rbc">
                  RBC Count
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="rbc"
                  value={formData.results.rbc || ''}
                  onChange={handleResultsChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="wbc">
                  WBC Count
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="wbc"
                  value={formData.results.wbc || ''}
                  onChange={handleResultsChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="platelets">
                  Platelets
                </label>
                <input
                  type="number"
                  name="platelets"
                  value={formData.results.platelets || ''}
                  onChange={handleResultsChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="glucose">
                  Glucose
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="glucose"
                  value={formData.results.glucose || ''}
                  onChange={handleResultsChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cholesterol">
                  Cholesterol
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="cholesterol"
                  value={formData.results.cholesterol || ''}
                  onChange={handleResultsChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </>
        );
      case 'x-ray':
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="findings">
                Findings
              </label>
              <textarea
                name="findings"
                value={formData.results.findings || ''}
                onChange={handleResultsChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="impressions">
                Impressions
              </label>
              <textarea
                name="impressions"
                value={formData.results.impressions || ''}
                onChange={handleResultsChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
              />
            </div>
          </>
        );
      default:
        return (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="results">
              Results
            </label>
            <textarea
              name="results"
              value={JSON.stringify(formData.results, null, 2)}
              onChange={(e) => setFormData({...formData, results: JSON.parse(e.target.value || '{}')})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="5"
            />
          </div>
        );
    }
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Report Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reportType">
                Report Type
              </label>
              <select
                name="reportType"
                value={formData.reportType}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="blood-test">Blood Test</option>
                <option value="urine-test">Urine Test</option>
                <option value="x-ray">X-Ray</option>
                <option value="mri">MRI</option>
                <option value="ct-scan">CT Scan</option>
                <option value="ecg">ECG</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
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
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctor">
                  Doctor
                </label>
                <input
                  type="text"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hospital">
                Hospital/Clinic
              </label>
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                      <h4 className="font-semibold">{report.title}</h4>
                      <button
                        onClick={() => deleteReport(report._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">{new Date(report.date).toLocaleDateString()}</p>
                    <p className="text-sm capitalize">{report.reportType}</p>
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
                <h4 className="font-bold">{report.title}</h4>
                <p className="text-gray-600 text-sm">{new Date(report.date).toLocaleDateString()}</p>
                <p className="text-gray-800 capitalize">{report.reportType}</p>
                <p className="text-gray-600 text-sm">Dr. {report.doctor}</p>
                {report.hospital && (
                  <p className="text-gray-600 text-sm">{report.hospital}</p>
                )}
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