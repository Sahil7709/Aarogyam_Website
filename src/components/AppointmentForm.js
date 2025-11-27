import React, { useState, useEffect } from 'react';
import { appointmentAPI } from '../utils/api';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    reason: 'General Consultation',
    notes: ''
  });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch user appointments when component mounts
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch user appointments
  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await appointmentAPI.getAppointments();
    setLoading(false);
    
    if (data) {
      setAppointments(data);
    } else {
      setMessage(`Error fetching appointments: ${error}`);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.time) {
      setMessage('Please fill in all required fields');
      setLoading(false);
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    // Validate phone number (more comprehensive validation)
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setMessage('Please enter a valid phone number');
      setLoading(false);
      return;
    }
    
    // Validate date format
    const dateObj = new Date(formData.date);
    if (isNaN(dateObj.getTime())) {
      setMessage('Please enter a valid date');
      setLoading(false);
      return;
    }
    
    // Validate that appointment is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dateObj < today) {
      setMessage('Appointment date cannot be in the past');
      setLoading(false);
      return;
    }
    
    // Validate age (if provided)
    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) <= 0)) {
      setMessage('Please enter a valid age');
      setLoading(false);
      return;
    }
    
    // Use the public appointment endpoint for unauthenticated users
    const { data, error } = await appointmentAPI.createPublicAppointment(formData);
    setLoading(false);
    
    if (data) {
      setMessage('Appointment booked successfully!');
      setFormData({
        name: '',
        gender: '',
        age: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        reason: 'General Consultation',
        notes: ''
      });
      // Refresh appointments list
      fetchAppointments();
    } else {
      setMessage(`Error booking appointment: ${error}`);
    }
  };

  // Cancel an appointment
  const cancelAppointment = async (id) => {
    setLoading(true);
    const { data, error } = await appointmentAPI.cancelAppointment(id);
    setLoading(false);
    
    if (data) {
      setMessage('Appointment cancelled successfully!');
      // Refresh appointments list
      fetchAppointments();
    } else {
      setMessage(`Error cancelling appointment: ${error}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Book Appointment</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Male/Female/Other"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your age"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Date *
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
              Time *
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
            Reason for Visit
          </label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="General Consultation"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
            Message
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
            placeholder="Additional message"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>
      </form>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Your Appointments</h3>
        
        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p>You have no upcoming appointments.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map(appointment => (
              <div key={appointment._id} className="bg-white shadow rounded p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{appointment.name || 'Patient'}</h4>
                    <p className="text-gray-600">{new Date(appointment.date).toLocaleDateString()}</p>
                    <p className="text-gray-600">{appointment.time}</p>
                    <p className="text-gray-800">{appointment.reason}</p>
                    {appointment.notes && (
                      <p className="text-gray-600 italic">Notes: {appointment.notes}</p>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
                {appointment.status === 'pending' && (
                  <button
                    onClick={() => cancelAppointment(appointment._id)}
                    disabled={loading}
                    className="mt-2 bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-2 rounded"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;