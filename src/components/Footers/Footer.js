import React, { useEffect } from "react";
import logo from "../../assets/img/PNG.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaYoutubeSquare } from "react-icons/fa";
import footerBackground from "../../assets/img/Footer_Background.png";
export default function Footer() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @media (max-width: 768px) {
        .footer-top {
        
          flex-direction: column !important;
          gap: 1rem !important;
        }
        .footer-left {
          order: 1 !important;
          text-align: center !important;
        }
        .footer-quick-links {
          order: 2 !important;
          width: 100% !important;
        }
        .footer-columns {
          flex-direction: column !important;
          gap: 1rem !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .footer-column {
          text-align: center !important;
          width: 100% !important;
        }
        .footer-cta {
          order: 3 !important;
          text-align: center !important;
        }
        .footer-cta h4 {
          font-size: 1rem !important;
        }
        .footer-button-cta {
          width: 100% !important;
          max-width: 200px !important;
        }
        .footer-links li {
          font-size: 0.9rem !important;
        }
        .social-icons {
          justify-content: center !important;
        }
        .footer-hr {
          margin: 1rem 0 !important;
        }
        .footer-copyright {
          font-size: 0.8rem !important;
          text-align: center !important;
        }
        .footer-logo img {
          width: 200px !important;
        }
        .footer-quick-links h4 {
          text-align: center !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <footer className="relative" style={{
        backgroundImage: `url(${footerBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#7f7878ff',
        padding: '2rem 1rem 1rem 1rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div className="footer-top" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <div className="footer-left" style={{ flex: 1 }}>
            <img
              alt="..."
              src={logo}
              className="footer-logo"
              style={{ width: '250px', marginBottom: '1rem' }}
            />
          </div>
          
          <div className="footer-quick-links">
           <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', textDecoration: 'underline' }}>Quick Links</h4>

          <div className="footer-columns" style={{
            display: 'flex',
            gap: '3rem',
            flex: 2
          }}>
            
            <div className="footer-column quick-links" style={{ minWidth: '150px' }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li className="footer-links" style={{ marginBottom: '0.5rem' }}><Link to="/" style={{ color: '#7f7878ff', textDecoration: 'none' }}>Home</Link></li>
                <li className="footer-links" style={{ marginBottom: '0.5rem' }}><Link to="/services" style={{ color: '#7f7878ff', textDecoration: 'none' }}>Our Services</Link></li>
              </ul>
            </div>
            <div className="footer-column resources" style={{ minWidth: '150px' }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li className="footer-links" style={{ marginBottom: '0.5rem' }}><Link to="/meet-our-team" style={{ color: '#7f7878ff', textDecoration: 'none' }}>Our Team</Link></li>
                <li className="footer-links" style={{ marginBottom: '0.5rem' }}><Link to="/faq" style={{ color: '#7f7878ff', textDecoration: 'none' }}>FAQ</Link></li>
              </ul>
            </div>
            <div className="footer-column company" style={{ minWidth: '150px' }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li className="footer-links" style={{ marginBottom: '0.5rem' }}><Link to="/contact-us" style={{ color: '#7f7878ff', textDecoration: 'none' }}>Contact Us</Link></li>
                </ul>
            </div>
          </div>
          </div>
          <div className="footer-cta" style={{ flex: 1, textAlign: 'center' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'left' }}>Ready to Transform Your Well-being?</h4>
            
            <Link to="/contact-us">
              <button className="footer-button-cta" style={{
                background: '#e1e1e1ff',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                color: '#f97316',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '200px'
              }}>
                Get Started
              </button>
            </Link>
            <div className="social-icons" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '1rem',
              fontSize: '1.2rem'
            }}>
              <FaFacebookSquare style={{ color: '#7f7878ff' }} size={24} />
              <FaInstagramSquare style={{ color: '#7f7878ff' }} size={24}  />
              <FaYoutubeSquare style={{ color: '#7f7878ff' }} size={24}  />
              <FaLinkedin style={{ color: '#7f7878ff' }} size={24}  />
            </div>
          </div>
        </div>
        <hr className="footer-hr" style={{ borderColor: '#7f78785d', margin: '1rem 0' }} />
        <div className="footer-copyright" style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          opacity: 0.8
        }}>
          Copyright © {new Date().getFullYear()} Aarogyam
        </div>
      </footer>
    </>
  );
}