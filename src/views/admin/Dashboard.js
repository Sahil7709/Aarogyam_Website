import React, { useState, useEffect } from "react";
import { adminAPI } from "utils/api";
import Chart from "chart.js";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    appointments: 0,
    contacts: 0,
    pendingAppointments: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch all data in parallel
        const [usersRes, appointmentsRes, contactsRes] = await Promise.all([
          adminAPI.getUsers(),
          adminAPI.getAllAppointments(),
          adminAPI.getContactMessages()
        ]);

        if (usersRes.data && appointmentsRes.data && contactsRes.data) {
          setUsersData(usersRes.data);
          setAppointmentsData(appointmentsRes.data);
          
          setStats({
            users: usersRes.data.length,
            appointments: appointmentsRes.data.length,
            contacts: contactsRes.data.length,
            pendingAppointments: appointmentsRes.data.filter(a => a.status === 'pending').length
          });
        }
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    // Initialize charts only when data is available and component is mounted
    if (!loading && usersData.length > 0 && appointmentsData.length > 0) {
      // Small delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        initializeCharts();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [loading, usersData, appointmentsData]);

  const initializeCharts = () => {
    // Check if canvas elements exist before initializing charts
    const usersCanvas = document.getElementById("users-chart");
    const appointmentsCanvas = document.getElementById("appointments-chart");
    
    if (!usersCanvas || !appointmentsCanvas) {
      console.warn("Chart canvas elements not found");
      return;
    }
    
    const usersCtx = usersCanvas.getContext("2d");
    const appointmentsCtx = appointmentsCanvas.getContext("2d");
    
    if (!usersCtx || !appointmentsCtx) {
      console.warn("Could not get 2D context for charts");
      return;
    }

    // Destroy existing charts if they exist
    if (window.usersChart) {
      window.usersChart.destroy();
    }
    if (window.appointmentsChart) {
      window.appointmentsChart.destroy();
    }

    // Initialize Users Chart
    window.usersChart = new Chart(usersCtx, {
      type: "bar",
      data: {
        labels: ["Patients", "Doctors", "Admins"],
        datasets: [
          {
            label: "User Distribution",
            backgroundColor: ["#10B981", "#3B82F6", "#EF4444"],
            borderColor: ["#10B981", "#3B82F6", "#EF4444"],
            data: [
              usersData.filter(u => u.role === "patient").length,
              usersData.filter(u => u.role === "doctor").length,
              usersData.filter(u => u.role === "admin").length
            ],
            fill: false,
            barThickness: 40,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawBorder: false,
              color: "rgba(0,0,0,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              fontColor: "rgba(0,0,0,0.5)",
              fontSize: 12,
            },
          }],
          yAxes: [{
            gridLines: {
              drawBorder: false,
              color: "rgba(0,0,0,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              fontColor: "rgba(0,0,0,0.5)",
              fontSize: 12,
              beginAtZero: true,
              callback: function(value) {
                if (Number.isInteger(value)) {
                  return value;
                }
              }
            },
          }],
        },
      },
    });

    // Initialize Appointments Chart
    window.appointmentsChart = new Chart(appointmentsCtx, {
      type: "line",
      data: {
        labels: ["Pending", "Confirmed", "Cancelled", "Completed"],
        datasets: [
          {
            label: "Appointments by Status",
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            borderColor: "#10B981",
            pointBackgroundColor: "#10B981",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#10B981",
            data: [
              appointmentsData.filter(a => a.status === "pending").length,
              appointmentsData.filter(a => a.status === "confirmed").length,
              appointmentsData.filter(a => a.status === "cancelled").length,
              appointmentsData.filter(a => a.status === "completed").length
            ],
            fill: true,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawBorder: false,
              color: "rgba(0,0,0,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              fontColor: "rgba(0,0,0,0.5)",
              fontSize: 12,
            },
          }],
          yAxes: [{
            gridLines: {
              drawBorder: false,
              color: "rgba(0,0,0,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              fontColor: "rgba(0,0,0,0.5)",
              fontSize: 12,
              beginAtZero: true,
              callback: function(value) {
                if (Number.isInteger(value)) {
                  return value;
                }
              }
            },
          }],
        },
      },
    });
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
          onClick={() => window.location.reload()}
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
            <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
            {/* Stats Grid - Made responsive for all devices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Users Card */}
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                    <i className="fas fa-users text-xl"></i>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <p className="text-2xl font-bold">{stats.users}</p>
                  </div>
                </div>
              </div>

              {/* Appointments Card */}
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                    <i className="fas fa-calendar-alt text-xl"></i>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Appointments</p>
                    <p className="text-2xl font-bold">{stats.appointments}</p>
                  </div>
                </div>
              </div>

              {/* Pending Appointments Card */}
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                    <i className="fas fa-clock text-xl"></i>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Pending Appointments</p>
                    <p className="text-2xl font-bold">{stats.pendingAppointments}</p>
                  </div>
                </div>
              </div>

              {/* Contact Messages Card */}
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                    <i className="fas fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Contact Messages</p>
                    <p className="text-2xl font-bold">{stats.contacts}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        {/* Charts Section */}
        <div className="flex flex-wrap mt-8">
          <div className="w-full lg:w-6/12 px-4 mb-6">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h6 className="uppercase text-green-400 mb-1 text-xs font-semibold">
                      Users Overview
                    </h6>
                    <h2 className="text-green-700 text-xl font-semibold">
                      User Distribution
                    </h2>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-auto">
                {/* Chart */}
                <div className="relative h-350-px">
                  <canvas id="users-chart"></canvas>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-6/12 px-4 mb-6">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h6 className="uppercase text-green-400 mb-1 text-xs font-semibold">
                      Appointments Overview
                    </h6>
                    <h2 className="text-green-700 text-xl font-semibold">
                      Appointment Status
                    </h2>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-auto">
                {/* Chart */}
                <div className="relative h-350-px">
                  <canvas id="appointments-chart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Navigation */}
        <div className="flex flex-wrap mt-8">
          <div className="w-full px-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Navigation</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a 
                  href="/admin/users" 
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-4 sm:p-6 text-center transition duration-300"
                >
                  <i className="fas fa-users text-2xl mb-2"></i>
                  <h3 className="font-bold text-lg">User Management</h3>
                  <p className="text-sm mt-1">Manage all registered users</p>
                </a>
                <a 
                  href="/admin/appointments" 
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-4 sm:p-6 text-center transition duration-300"
                >
                  <i className="fas fa-calendar-check text-2xl mb-2"></i>
                  <h3 className="font-bold text-lg">Appointments</h3>
                  <p className="text-sm mt-1">View and manage appointments</p>
                </a>
                <a 
                  href="/admin/contact-messages" 
                  className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-4 sm:p-6 text-center transition duration-300"
                >
                  <i className="fas fa-envelope-open-text text-2xl mb-2"></i>
                  <h3 className="font-bold text-lg">Contact Messages</h3>
                  <p className="text-sm mt-1">View and respond to messages</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}