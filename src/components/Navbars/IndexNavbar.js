import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/img/PNG.png"
import { RiMenuFold2Fill, RiMenuFoldFill } from "react-icons/ri";
import { FiUser, FiPhone, FiMail, FiCalendar, FiClock, FiMessageCircle, FiLoader } from "react-icons/fi";
import modalBackground from "../../assets/img/hospital_reception.jpg"
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const consultationTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, [showModal]);
  const previewEmailTemplate = (template) => {
    // Create a simple HTML page with your template embedded
    const previewHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Email Preview</title>
        <style>
          body { margin: 0; padding: 20px; background: #f0f0f0; font-family: Arial, sans-serif; }
          .email-container { max-width: 600px; margin: 0 auto; }
        </style>
      </head>
      <body>
        <div class="email-container">
          ${template}
        </div>
        <script>
          // Optional: Add console.log for debugging
          console.log('Email template rendered successfully');
        </script>
      </body>
    </html>
  `;

    // Open in a new tab for preview
    const newWindow = window.open('', '_blank');
    newWindow.document.write(previewHtml);
    newWindow.document.close();

    // Log the raw template to console for copy-paste if needed
    console.log('Raw Email Template:', template);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailTemplate = {
      name: fullName,
      gender: selectedGender,
      age: age,
      phone: phoneNumber,
      email: emailAddress,
      date: date,
      time: selectedTime,
      additionalMessage: message,
    };

    setLoading(true);
    try {
      // Use environment-based URL for the API endpoint
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/appointments/public`, emailTemplate);
      if (response.status === 200 || response.status === 201) {
        toastr.success('Appointment booked successfully!');
        setShowModal(false);
        // Reset form
        setFullName("");
        setAge("");
        setSelectedGender("");
        setPhoneNumber("");
        setEmailAddress("");
        setDate("");
        setSelectedTime("");
        setMessage("");
      }
    } catch (error) {
      toastr.error('Error booking appointment: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const modalStyles = {
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(8px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      animation: "fadeIn 0.3s ease-in-out",
    },
    container: {
      background: "rgba(255, 255, 255, 0.25)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      width: "95%",
      maxWidth: isMobile ? "95%" : "750px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      overflow: "hidden",
      position: "relative",
      animation: "slideUp 0.3s ease-in-out",
      height: isMobile ? "auto" : "auto",
      maxHeight: "90vh",
    },
    left: {
      flex: isMobile ? "none" : 1,
      width: isMobile ? "100%" : "auto",
      height: isMobile ? "200px" : "auto",
      backgroundImage: `url(${modalBackground})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    right: {
      flex: 1,
      padding: isMobile ? "0.75rem" : "0.8rem",
      background: "#ffffff84",
      overflowY: "auto",
    },
    title: {
      fontSize: isMobile ? "1.25rem" : "1.5rem",
      fontWeight: 600,
      color: "#fff",
      marginBottom: "0.5rem",
    },
    subtitle: {
      color: "#fff",
      fontSize: isMobile ? "0.9rem" : "1rem",
      marginBottom: "0.75rem",
      width: "80%",
      padding: isMobile ? "0 1rem" : 0,
    },
    image: {
      width: "100px",
      height: "100px",
      objectFit: "contain",
    },
    label: {
      fontSize: "0.75rem",
      fontWeight: 500,
      color: "#444",
      display: "block",
      marginBottom: "0.2rem",
    },
    inputWrapper: {
      position: "relative",
      width: "100%",
    },
    input: {
      width: "100%",
      border: "1px solid #ddd",
      borderRadius: "6px",
      padding: isMobile ? "5px 8px 5px 32px" : "6px 8px 6px 32px",
      fontSize: isMobile ? "0.75rem" : "0.8rem",
      outline: "none",
      transition: "all 0.2s ease-in-out",
      background: "rgba(255, 255, 255, 0.51)",
    },
    inputFocus: {
      borderColor: "#02694e",
      boxShadow: "0 0 4px rgba(2, 105, 78, 0.3)",
    },
    icon: {
      position: "absolute",
      left: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#999",
      fontSize: "0.9rem",
    },
    formGroup: {
      marginBottom: "0.5rem",
    },
    inlineGroup: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "0.5rem" : "0.5rem",
    },
    select: {
      width: "100%",
      border: "1px solid #ddd",
      borderRadius: "6px",
      padding: isMobile ? "5px 8px 5px 32px" : "6px 8px 6px 32px",
      fontSize: isMobile ? "0.75rem" : "0.8rem",
      background: "rgba(255, 255, 255, 0.51)",
    },
    textarea: {
      width: "100%",
      border: "1px solid #ddd",
      borderRadius: "6px",
      padding: isMobile ? "5px 8px 5px 32px" : "6px 8px 6px 32px",
      fontSize: isMobile ? "0.75rem" : "0.8rem",
      height: isMobile ? "50px" : "60px",
      resize: "none",
      background: "rgba(255, 255, 255, 0.51)",
    },
    submitBtn: {
      width: "100%",
      backgroundColor: "#02694e",
      color: "#fff",
      fontWeight: 600,
      border: "none",
      padding: isMobile ? "7px" : "8px",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background 0.3s ease",
      fontSize: "0.85rem",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    closeBtn: {
      position: "absolute",
      top: "10px",
      right: isMobile ? "10px" : "15px",
      fontSize: isMobile ? "18px" : "20px",
      color: "#fff",
      fontWeight: "bold",
      cursor: "pointer",
      zIndex: 10,
    },
  };


  return (
    <>
      <nav className="top-0 fixed z-50 w-full px-2 navbar-expand-lg bg-white shadow">
        <div className=" px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 whitespace-nowrap uppercase"
            >
              <img
                alt="..."
                src={logo}
                style={{ width: "120px" }}
              />
              {/* <div style={{ color: "#fa6904", fontSize: "0.7em", fontFamily: "Helvetica, sans-serif" }}>Decoding Age. Designing Longevity</div> */}

            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3  bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? (
                <RiMenuFoldFill size={40} />
              ) : (<RiMenuFold2Fill size={40} />)}


            </button>
          </div>

          {/* Menu Items */}
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block pb-0 lg:pb-0" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center ">
                <Link
                  to="/"
                  className="px-3 py-4 lg:py-2 text-xs uppercase font-bold"
                  style={{ color: "#02694e", transition: "color 0.3s ease", fontSize: isMobile ? "1rem" : "0.7rem" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6600")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#02694e")}
                >
                  Home
                </Link>
              </li>

              <li className="flex items-center ">
                <Link
                  to="/services"
                  className="px-3 py-4 lg:py-2 text-xs uppercase font-bold"
                  style={{ color: "#02694e", transition: "color 0.3s ease", fontSize: isMobile ? "1rem" : "0.7rem" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6600")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#02694e")}
                >
                  Our Services & Solutions
                </Link>
              </li>

              {/* <li className="flex items-center">
                <Link
                  to="/health-voyage"
                   className="px-3 py-4 lg:py-2 text-xs uppercase font-bold"
  style={{ color: "#02694e", transition: "color 0.3s ease" }}
  onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6600")}
  onMouseLeave={(e) => (e.currentTarget.style.color = "#02694e")}>
                  Health Voyage
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  to="/blogs"
                   className="px-3 py-4 lg:py-2 text-xs uppercase font-bold"
  style={{ color: "#02694e", transition: "color 0.3s ease" }}
  onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6600")}
  onMouseLeave={(e) => (e.currentTarget.style.color = "#02694e")}>
                  Blogs & Community
                </Link>
              </li> */}

              <li className="flex items-center">
                <Link
                  to="/meet-our-team"
                  className="px-3 py-4 lg:py-2 text-xs uppercase font-bold"
                  style={{ color: "#02694e", transition: "color 0.3s ease", fontSize: isMobile ? "1rem" : "0.7rem" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6600")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#02694e")}>
                  Our Team
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  to="/faq"
                  className="px-3 py-4 lg:py-2 text-xs uppercase font-bold"
                  style={{ color: "#02694e", transition: "color 0.3s ease", fontSize: isMobile ? "1rem" : "0.7rem" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6600")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#02694e")}>
                  FAQ
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/contact-us"
                  className="px-3 py-4 lg:py-2 text-xs uppercase font-bold"
                  style={{ color: "#02694e", transition: "color 0.3s ease", fontSize: isMobile ? "1rem" : "0.7rem" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6600")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#02694e")}>
                  Contact Us
                </Link>
              </li>
              {/* Book Appointment Button */}
              <li className="flex items-center">
                <button
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  onClick={() => setShowModal(true)}
                  style={{
                    position: "relative",
                    margin: "auto",
                    padding: "7px 12px 7px 22px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    transform: hovered ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  {/* Background Circle Animation */}
                  <span
                    style={{
                      content: "",
                      position: "absolute",
                      top: 0,
                      left: 10,
                      display: "block",
                      borderRadius: "50px",
                      background: "#ff66009c",
                      width: hovered ? "100%" : "30px",
                      height: "30px",
                      transition: "all 0.3s ease",
                      zIndex: 0,
                    }}
                  ></span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* Text */}
                    <span
                      style={{
                        position: "relative",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        color: "#02694e",
                        zIndex: 2,
                      }}
                    >
                      Book Appointment
                    </span>

                    {/* SVG Arrow */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15px"
                      height="10px"
                      viewBox="0 0 13 10"
                      style={{
                        position: "relative",
                        top: 0,
                        marginLeft: "10px",
                        fill: "none",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        stroke: "#234567",
                        strokeWidth: 2,
                        transform: hovered ? "translateX(0px)" : "translateX(-5px)",
                        transition: "all 0.3s ease",
                        zIndex: 2,
                      }}
                    >
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* === Modal === */}
      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.container}>
            {/* Left Section */}
            <div style={modalStyles.left}>
              <div style={{ backgroundColor: "#00000082", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h2 style={modalStyles.title}>Book an Appointment</h2>
                <p style={modalStyles.subtitle}>
                  Schedule your visit with our specialists easily and conveniently.
                </p>
                {/* <img
                src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
                alt="Doctor"
                style={modalStyles.image}
              /> */}
              </div>
            </div>

            {/* Right Section */}
            <div style={modalStyles.right}>
              <h3
                style={{
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  fontWeight: 600,
                  color: "#333",
                  marginBottom: "0.75rem",
                }}
              >
                Appointment Details
              </h3>

              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div style={modalStyles.formGroup}>
                  <label style={modalStyles.label}>Full Name</label>
                  <div style={modalStyles.inputWrapper}>
                    <FiUser style={modalStyles.icon} />
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      style={modalStyles.input}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Gender and Age */}
                <div style={modalStyles.inlineGroup}>
                  <div style={{ ...modalStyles.formGroup, flex: isMobile ? 1 : 1 }}>
                    <label style={modalStyles.label}>Gender</label>
                    <div style={modalStyles.inputWrapper}>
                      <FiUser style={modalStyles.icon} />
                      <select
                        style={modalStyles.select}
                        value={selectedGender}
                        onChange={(e) => setSelectedGender(e.target.value)}
                        disabled={loading}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ ...modalStyles.formGroup, flex: isMobile ? 1 : 1 }}>
                    <label style={modalStyles.label}>Age</label>
                    <div style={modalStyles.inputWrapper}>
                      <FiUser style={modalStyles.icon} />
                      <input
                        type="number"
                        placeholder="Enter Age"
                        style={modalStyles.input}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        min="0"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div style={modalStyles.formGroup}>
                  <label style={modalStyles.label}>Phone Number</label>
                  <div style={modalStyles.inputWrapper}>
                    <FiPhone style={modalStyles.icon} />
                    <input
                      type="tel"
                      placeholder="Enter Phone Number"
                      style={modalStyles.input}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Email */}
                <div style={modalStyles.formGroup}>
                  <label style={modalStyles.label}>Email Address</label>
                  <div style={modalStyles.inputWrapper}>
                    <FiMail style={modalStyles.icon} />
                    <input
                      type="email"
                      placeholder="Enter Email Address"
                      style={modalStyles.input}
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Date and Time */}
                <div style={modalStyles.inlineGroup}>
                  <div style={{ ...modalStyles.formGroup, flex: isMobile ? 1 : 1 }}>
                    <label style={modalStyles.label}>Date</label>
                    <div style={modalStyles.inputWrapper}>
                      <FiCalendar style={modalStyles.icon} />
                      <input
                        type="date"
                        style={{ ...modalStyles.input, padding: isMobile ? "5px 8px 5px 32px" : "8px 8px 7px 32px" }}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div style={{ ...modalStyles.formGroup, flex: isMobile ? 1 : 1 }}>
                    <label style={modalStyles.label}>Time</label>
                    <div style={modalStyles.inputWrapper}>
                      <FiClock style={modalStyles.icon} />
                      <select
                        style={modalStyles.select}
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        disabled={loading}
                      >
                        <option>Select Time</option>
                        {consultationTimes.map((time, index) => (
                          <option key={index}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>



                {/* Message */}
                <div style={modalStyles.formGroup}>
                  <label style={modalStyles.label}>Message</label>
                  <div style={modalStyles.inputWrapper}>
                    <FiMessageCircle style={modalStyles.icon} />
                    <textarea
                      placeholder="Enter any additional notes here..."
                      style={modalStyles.textarea}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...modalStyles.submitBtn,
                    backgroundColor: loading ? '#ccc' : "#02694e",
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? (
                    <FiLoader
                      className="spin"
                      style={{
                        fontSize: '1em',
                        color: 'white'
                      }}
                    />
                  ) : (
                    'Book Appointment'
                  )}
                </button>
              </form>
            </div>

            {/* Close Button */}
            <span
              style={modalStyles.closeBtn}
              onClick={() => setShowModal(false)}
            >
              ×
            </span>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </>
  );
}