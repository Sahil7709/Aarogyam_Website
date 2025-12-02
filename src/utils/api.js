// API service for the Aarogyam web frontend

// Default API base includes the `/api` prefix and uses IPv4 loopback to avoid
// potential IPv6/localhost resolution issues on some systems.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:5000/api';

// Cache for GET requests
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const method = options.method || 'GET';
  
  // Create cache key for GET requests
  const cacheKey = `${method}:${url}`;
  
  // Check cache for GET requests
  if (method === 'GET' && apiCache.has(cacheKey)) {
    const { data, timestamp } = apiCache.get(cacheKey);
    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log(`Returning cached response for ${url}`);
      return { data, error: null };
    } else {
      // Remove expired cache entry
      apiCache.delete(cacheKey);
    }
  }
  
  console.log(`Making API request to: ${url}`, options);
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  
  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(url, config);
    console.log(`Response from ${url}:`, response.status, response.statusText);
    
    // Handle successful responses
    if (response.ok) {
      const data = await response.json();
      console.log(`Successful response from ${url}:`, data);
      
      // Cache GET responses
      if (method === 'GET') {
        apiCache.set(cacheKey, { data, timestamp: Date.now() });
      }
      
      return { data, error: null };
    }
    
    // Handle error responses
    const errorData = await response.json();
    console.log(`Error response from ${url}:`, errorData);
    
    // Clear cache on error for this endpoint
    apiCache.delete(cacheKey);
    
    return { data: null, error: errorData.message || 'An error occurred' };
  } catch (error) {
    console.error(`Network error for ${url}:`, error);
    // More detailed error logging
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('This may indicate that the server is not running or there is a network connectivity issue.');
      console.error('Please ensure the backend server is running on http://localhost:5000');
    }
    
    // Clear cache on network error
    apiCache.delete(cacheKey);
    
    return { data: null, error: 'Network error - please try again' };
  }
};

// Helper function to clear cache for a specific endpoint
export const clearCache = (endpoint) => {
  const keysToDelete = [];
  apiCache.forEach((value, key) => {
    if (key.endsWith(endpoint)) {
      keysToDelete.push(key);
    }
  });
  keysToDelete.forEach(key => apiCache.delete(key));
};

// Helper function to clear all cache
export const clearAllCache = () => {
  apiCache.clear();
};

// Authentication API
export const authAPI = {
  // Register a new user
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  // Register a new admin
  registerAdmin: async (adminData) => {
    return apiRequest('/auth/register-admin', {
      method: 'POST',
      body: JSON.stringify(adminData),
    });
  },
  
  // Login user
  login: async (credentials) => {
    // Clear cache on login
    clearAllCache();
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  // Get user profile
  getProfile: async () => {
    return apiRequest('/auth/profile', {
      method: 'GET',
    });
  },
};

// Appointment API
export const appointmentAPI = {
  // Create a new appointment
  createAppointment: async (appointmentData) => {
    // Clear cache when creating appointment
    clearCache('/appointments');
    return apiRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },
  
  // Create a public appointment (no authentication required)
  createPublicAppointment: async (appointmentData) => {
    return apiRequest('/appointments/public', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },
  
  // Get user appointments
  getAppointments: async () => {
    return apiRequest('/appointments', {
      method: 'GET',
    });
  },
  
  // Update appointment status
  updateAppointment: async (id, status) => {
    // Clear cache when updating appointment
    clearCache('/appointments');
    return apiRequest(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
  
  // Cancel appointment
  cancelAppointment: async (id) => {
    // Clear cache when deleting appointment
    clearCache('/appointments');
    return apiRequest(`/appointments/${id}`, {
      method: 'DELETE',
    });
  },
};

// Medical Report API
export const reportAPI = {
  // Create a new medical report
  createReport: async (reportData) => {
    // Clear cache when creating report
    clearCache('/reports');
    return apiRequest('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  },
  
  // Get user medical reports
  getReports: async () => {
    return apiRequest('/reports', {
      method: 'GET',
    });
  },
  
  // Get specific medical report
  getReportById: async (id) => {
    return apiRequest(`/reports/${id}`, {
      method: 'GET',
    });
  },
  
  // Update medical report
  updateReport: async (id, reportData) => {
    // Clear cache when updating report
    clearCache('/reports');
    return apiRequest(`/reports/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reportData),
    });
  },
  
  // Delete medical report
  deleteReport: async (id) => {
    // Clear cache when deleting report
    clearCache('/reports');
    return apiRequest(`/reports/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Get medical report statistics
  getReportStats: async () => {
    return apiRequest('/reports/stats', {
      method: 'GET',
    });
  },
  
  // Get abnormal values in a report
  getReportAbnormalities: async (id) => {
    return apiRequest(`/reports/${id}/abnormalities`, {
      method: 'GET',
    });
  },
};

// Contact API
export const contactAPI = {
  // Submit contact message
  submitMessage: async (messageData) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  },
};

// Admin API
export const adminAPI = {
  // Get all users
  getUsers: async () => {
    return apiRequest('/admin/users', {
      method: 'GET',
    });
  },
  
  // Get user by ID
  getUser: async (id) => {
    return apiRequest(`/admin/users/${id}`, {
      method: 'GET',
    });
  },
  
  // Update user
  updateUser: async (id, userData) => {
    // Clear cache when updating user
    clearCache('/admin/users');
    return apiRequest(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
  
  // Delete user
  deleteUser: async (id) => {
    // Clear cache when deleting user
    clearCache('/admin/users');
    return apiRequest(`/admin/users/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Get all appointments
  getAllAppointments: async () => {
    return apiRequest('/admin/appointments', {
      method: 'GET',
    });
  },
  
  // Get appointment by ID
  getAppointment: async (id) => {
    return apiRequest(`/admin/appointments/${id}`, {
      method: 'GET',
    });
  },
  
  // Update appointment
  updateAppointment: async (id, appointmentData) => {
    // Clear cache when updating appointment
    clearCache('/admin/appointments');
    return apiRequest(`/admin/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    });
  },
  
  // Delete appointment
  deleteAppointment: async (id) => {
    // Clear cache when deleting appointment
    clearCache('/admin/appointments');
    return apiRequest(`/admin/appointments/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Get all contact messages
  getContactMessages: async () => {
    return apiRequest('/admin/contact-messages', {
      method: 'GET',
    });
  },
  
  // Update contact message
  updateContactMessage: async (id, messageData) => {
    // Clear cache when updating contact message
    clearCache('/admin/contact-messages');
    return apiRequest(`/admin/contact-messages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(messageData),
    });
  },
  
  // Delete contact message
  deleteContactMessage: async (id) => {
    // Clear cache when deleting contact message
    clearCache('/admin/contact-messages');
    return apiRequest(`/admin/contact-messages/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Create medical report by admin
  createMedicalReportByAdmin: async (reportData) => {
    // Clear cache when creating report
    clearCache('/reports');
    return apiRequest('/admin/medical-reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  },
  
  // Get all medical reports (Admin only)
  getAllMedicalReports: async () => {
    return apiRequest('/admin/medical-reports', {
      method: 'GET',
    });
  },
  
  // Get medical report by ID (Admin only)
  getMedicalReport: async (id) => {
    return apiRequest(`/admin/medical-reports/${id}`, {
      method: 'GET',
    });
  },
  
  // Update medical report (Admin only)
  updateMedicalReport: async (id, reportData) => {
    // Clear cache when updating report
    clearCache('/admin/medical-reports');
    return apiRequest(`/admin/medical-reports/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reportData),
    });
  },
  
  // Delete medical report (Admin only)
  deleteMedicalReport: async (id) => {
    // Clear cache when deleting report
    clearCache('/admin/medical-reports');
    return apiRequest(`/admin/medical-reports/${id}`, {
      method: 'DELETE',
    });
  },
};

// Utility function to set auth token
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

// Utility function to check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const api = {
  authAPI,
  appointmentAPI,
  reportAPI,
  contactAPI,
  adminAPI,
  setAuthToken,
  isAuthenticated,
};

export default api;