import Footer from 'components/Footers/Footer'; 
import Navbar from 'components/Navbars/IndexNavbar';
import React, { useState } from 'react';
import axios from "axios";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { FiMapPin, FiPhone, FiMail, FiClock, FiLoader } from 'react-icons/fi';
import hospitalReception from '../assets/img/hospital_reception.jpg'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };
    
    setLoading(true);
    try {
      // Use environment-based URL for the API endpoint
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/contact`, contactData);
      if (response.status === 200 || response.status === 201) {
        toastr.success('Message sent successfully!');
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      toastr.error('Error sending message: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#ffaa6438',
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        color: '#333',
        marginTop: '100px',
        marginBottom: '40px',
        borderRadius: '18px'
      }}>
        {/* Header Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h1 style={{
              fontSize: '2em',
              color: '#333',
              margin: '0 0 10px 0',
              fontWeight: 'bold'
            }}>
              Get in Touch with Us
            </h1>
            <p style={{
              fontSize: '0.9em',
              color: '#666',
              margin: 0
            }}>
              We're here to help. Reach out to us for any inquiries, or support. Your well-being is our priority.
            </p>
          </div>
          <div style={{
            flex: 1,
            minWidth: '300px',
            height: '400px',
            backgroundColor: '#e0e0e0',
            borderRadius: '8px',
            backgroundImage: `url(${hospitalReception})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
        </div>

        {/* Form and Details Section */}
        <div style={{
          display: 'flex',
          gap: '40px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          {/* Contact Form */}
          <form onSubmit={handleSubmit} style={{
            flex: 1,
            minWidth: '300px',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '1.2em', color: '#666', marginBottom: '20px' }}>
              Send us a Message
            </h2>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.8em'
                }}
                disabled={loading}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.8em'
                }}
                disabled={loading}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.8em'
                }}
                disabled={loading}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.8em',
                  resize: 'vertical'
                }}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: loading ? '#ccc' : '#458a77',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.8em',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
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
                'Send Message'
              )}
            </button>
          </form>

          {/* Clinic Details */}
          <div style={{
            flex: 1,
            minWidth: '300px',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}>
            <h2 style={{ fontSize: '1.2em', color: '#666', marginBottom: '20px' }}>
              Our Clinic Details
            </h2>
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '5px' }}>
                <FiMapPin style={{ marginRight: '10px', color: '#4caf50', fontSize: '1.2em' }} />
                <div style={{ fontSize: '0.8em' }}>
                  <div style={{fontWeight: 'bold'}}>Address</div>
D-80, Block-D, Sector-51, Noida, UP-201301
                </div>

              </div>
            </div>
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '5px' }}>
                <FiMail style={{ marginRight: '10px', color: '#4caf50', fontSize: '1.2em' }} />
                <div style={{ fontSize: '0.8em' }}> <div style={{fontWeight: 'bold'}}>Email</div>care@aarogyam.io</div>
              </div>
            </div>
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '5px' }}>
                <FiPhone style={{ marginRight: '10px', color: '#4caf50', fontSize: '1.2em' }} />
                <div style={{ fontSize: '0.8em' }}><div style={{fontWeight: 'bold'}}>Phone</div>+91 - 98701 20120</div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '25px' }}>
                <FiClock style={{ marginRight: '10px', color: '#4caf50', fontSize: '1.2em' }} />
                <div style={{ fontSize: '0.8em' }}><div style={{fontWeight: 'bold'}}>Working Hours</div>09:00 am - 09:00 pm</div>
              </div>
              {/* <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <FiClock style={{ marginRight: '10px', color: '#4caf50', fontSize: '1.2em' }} />
                <div style={{ fontSize: '0.8em' }}><div style={{fontWeight: 'bold'}}>Saturday</div>--:-- a.m. - --:-- p.m.</div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.5em', color: '#666', marginBottom: '20px' }}>
            Find Our Location
          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.804057!2d77.37510667266251!3d28.580440751561266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzQ5LjYiTiA3N8KwMjInMzAuNCJF!5e0!3m2!1sen!2sus!4v1728200000000!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <Footer />
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
};

export default ContactUs;