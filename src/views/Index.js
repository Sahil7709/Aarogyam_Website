import React, { useState, useEffect, useRef } from "react";
import "./layers.css";

// Import assets (replace with your actual paths)
import Medical_Video from "../assets/img/Medical_Video.mp4";
import img1 from "../assets/img/Banner1.jpg";
import redefineImg1 from "../assets/img/Redefine1.png.jpg";
import redefineImg2 from "../assets/img/Redefine2.png.jpg";
import redefineImg3 from "../assets/img/Redefine3.png.jpg";
import redefineImg4 from "../assets/img/Redefine4.png.jpg";
import scrollBackground from "../assets/img/17973908.jpg";
import backgroundLayer from "../assets/img/dna-representation-concept.png";
import Navbar from "components/Navbars/IndexNavbar";
import Footer from "components/Footers/Footer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import our_philoshophy from "../assets/img/our_philosophy.png";
import redefine from "../assets/img/Redefine.png";
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import Poster1 from "../assets/img/Poster/Poster1.png";
import Poster2 from "../assets/img/Poster/Poster2.png";
import Poster3 from "../assets/img/Poster/Poster3.png";
import Poster4 from "../assets/img/Poster/Poster4.jpg";
import Poster5 from "../assets/img/Poster/Poster5.png";
import Poster6 from "../assets/img/Poster/Poster6.png";
import Poster7 from "../assets/img/Poster/Poster7.png";
import Poster8 from "../assets/img/Poster/Poster8.png";
import Poster9 from "../assets/img/Poster/Poster9.png";
import Poster10 from "../assets/img/Poster/Poster10.png";
import Poster11 from "../assets/img/Poster/Poster11.png";
import Poster12 from "../assets/img/Poster/Poster12.png";

const Index = () => {
  // Data for carousel
  const images = [
    {
      src: redefineImg1,
      
    },
    {
      src: redefineImg2,
      
    },
    {
      src: redefineImg3,
      
    },
    {
      src: redefineImg4,
      
    },
  ];

  // Data for quotes marquee
  const quotes = [
    { image: Poster1 },
    { image: Poster2 },
    { image: Poster3 },
    { image: Poster4 },
    { image: Poster5 },
    { image: Poster6 },
    { image: Poster7 },
    { image: Poster8 },
    { image: Poster9 },
    { image: Poster10 },
    { image: Poster11 },
    { image: Poster12 },
  ];

  // Data for layers and cards
  const services = [
    {
      id: "personalized-protocols",
      title: "Personalized Longevity Protocols",
      description:
        "Each plan begins with deep diagnostics genomic, metabolic, hormonal, and cellular ensuring every recommendation is crafted for your body’s unique blueprint. Our AI-enabled insights help analyze multiomic data and devise a customized health plan journey for you.",
      bgColor: "#a33e7a",
    },
    {
      id: "elite-team",
      title: "Our Specialists and Super Specialists Doctors",
      description:
        "Our board certified anti ageing specialists, aesthetic physicians, and longevity researchers bring global experience and precision into every client journey.",
      bgColor: "#bec989",
    },
    {
      id: "luxury-innovation",
      title: "Luxury Meets Innovation",
      description:
        "From state-of-the-art therapies like red-light rejuvenation and HBOT support to nutritional optimization and advanced aesthetics we offer world-class interventions in tranquil, private spaces.",
      bgColor: "#b77e5a",
    },
    {
      id: "complete-discretion",
      title: "Complete Discretion",
      description:
        "We work exclusively with a select clientele who value privacy, performance, and premium care.",
      bgColor: "#c94c4e",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [aboutCurrentIndex, setAboutCurrentIndex] = useState(0);
  const [selectedLayer, setSelectedLayer] = useState(services[0]);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState(null);

  const firstRowRef = useRef(null);
  const secondRowRef = useRef(null);

  // Typing effect for title
  useEffect(() => {
    setDisplayedTitle('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < selectedLayer.title.length) {
        setDisplayedTitle((prev) => prev + selectedLayer.title[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust speed as needed

    return () => clearInterval(interval);
  }, [selectedLayer.title]);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          } else {
            entry.target.classList.remove("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (firstRowRef.current) {
      observer.observe(firstRowRef.current);
    }
    if (secondRowRef.current) {
      observer.observe(secondRowRef.current);
    }

    return () => {
      if (firstRowRef.current) {
        observer.unobserve(firstRowRef.current);
      }
      if (secondRowRef.current) {
        observer.unobserve(secondRowRef.current);
      }
    };
  }, []);

  // Carousel effect for header
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Carousel effect for about section
  useEffect(() => {
    const interval = setInterval(() => {
      setAboutCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleLayerClick = (layer) => {
    setSelectedLayer(layer);
  };

  const handlePosterClick = (image) => {
    setSelectedPoster(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPoster(null);
  };

  const renderCurvedText = (text) => {
    return (
      <span className="curved-text">
        {text.split("").map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </span>
    );
  };

  return (
    <div>
      <Navbar />
      <main>
        {/* Header Section */}
        <section
          className="header-section"
          style={{
            backgroundImage: `url(${img1})`,
          }}
        >
          <div className="header-overlay"></div>
          {/* <div className="header-content">
            <h1 className="header-heading">
              {images[currentIndex].text.heading === "Rediscover The New You"
                ? renderCurvedText(images[currentIndex].text.heading)
                : images[currentIndex].text.heading}
            </h1>
            <p
              className={`header-paragraph ${
                images[currentIndex].text.paragraph === "#Swasth #Santulan #Kalyan"
                  ? "hashtag-text"
                  : ""
              }`}
            >
              {images[currentIndex].text.paragraph}
            </p>
          </div> */}
        </section>

        {/* About Us Section */}
        <section className="about-section">
          <div className="about-heading">About Us</div>
          <div className="about-content" style={{paddingBottom:"20px"}}>
            <div className="row first-row" ref={firstRowRef} style={{backgroundColor:"#027f3023", borderRadius:"20px", padding:"50px 20px" }}>
              <div className="text-column">
                <h1 className="main-heading">Redefining the Future of Ageing</h1>
                <p className="subtitle">At Aarogyam, we believe Ageing is no longer a destiny. it’s a choice. Built on the pillars of medical innovation, bespoke care, and integrated healthcare experience, we offer the most advanced anti ageing and longevity solutions hyper personalized exclusively for those who demand the very best.</p>
                <p className="subtitle">Our mission is to elevate the Ageing experience by integrating cutting edge diagnostics, precision medicine, and holistic wellness all delivered in a discreet, luxurious environment tailored to your lifestyle.</p>
                {/* <Link to="/contact-us"><button className="journey-button">Begin Your Journey</button></Link> */}
              </div>
              <div className="image-column">
                <div className="carousel-containers">
                  <div 
                    className="carousel-inner" 
                    style={{ 
                      transform: `translateX(-${aboutCurrentIndex * 100}%)`,
                      transition: 'transform 0.5s ease-in-out'
                    }}
                  >
                    {images.map((image, index) => (
                      <div key={index} className="carousel-items">
                        <img 
                          src={image.src} 
                          alt={`About ${index + 1}`} 
                          className="about-image" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="row second-row" ref={secondRowRef} style={{backgroundColor:"#027f3023", borderRadius:"20px", padding:"50px 20px", marginTop:"50px"}}>
              <div className="image-column">
                <img 
                  src={our_philoshophy} 
                  alt="Woman in forest" 
                  className="about-image" 
                />
              </div>
              <div className="text-column">
                <h2 className="secondary-heading">Our Philosophy</h2>
               <p className="description">
                We don’t treat symptoms. <br />
                We decode your biology, optimize your healthspan, and craft a path
                to lifelong vitality as unique as your DNA. From cellular
                rejuvenation to hormonal balance, from aesthetic refinement to
                deep rooted wellness, our approach is comprehensive,
                evidence backed, and always personal.
              </p></div>
            </div>
          </div>
        </section>

        {/* What Sets Us Apart Section */}
        {/* <section
          className="sets-apart-section"
          style={{ backgroundImage: `url(${scrollBackground})` }}
        >
          <video
            className="sets-apart-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={Medical_Video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="sets-apart-content">
            <h2 className="sets-apart-heading">What Sets Us Apart</h2>
            <div className="sets-apart-carousel">
              <div className="sets-apart-carousel-containers">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="sets-apart-card"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 20px rgba(0, 0, 0, 0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 10px rgba(0, 0, 0, 0.08)";
                    }}
                  >
                    <div
                      className="sets-apart-card-icon"
                      style={{ backgroundColor: service.bgColor }}
                    >
                      {service.icon || service.title[0]}
                    </div>
                    <h3 className="sets-apart-card-title">{service.title}</h3>
                    <p className="sets-apart-card-description">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* Biological Age Section */}
        <section
          className="biological-age-container"
          style={{ backgroundImage: `url(${backgroundLayer})`,backgroundColor:"rgba(136, 132, 132, 0.42)" }}
        >
          
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.31)", padding:"3rem" }}>
          <div className="sets-apart-heading">What Sets Us Apart</div>
          
          <div className="two-part-layout">
            <div className="layers-container">
              
              <div className="layers">
                {services.map((layer, index) => (
                  <div
                    key={layer.id}
                    className={`layer ${
                      selectedLayer.id === layer.id ? "active" : ""
                    }`}
                    style={{ zIndex: services.length - index }}
                    onClick={() => handleLayerClick(layer)}
                  >
                    <div className="layer-text">{layer.title}</div>
                    {layer.id == "complete-discretion" ? <TiArrowUpOutline size={20} style={{ animation: 'blink 2s infinite', marginLeft: '8px', color: '#fff'}} />:<TiArrowDownOutline size={20} style={{animation: 'blink 2s infinite', marginLeft: '8px', color: '#fff'}} />}
                  </div>
                ))}
              </div>
              {/* <div className="click-hint">
                <TiArrowDownOutline size={20}/>
              </div> */}
            </div>
            <div className="content-container">
              {selectedLayer && (
                <div className="content-inner">
                  <h3 className="glowing-title">{displayedTitle}</h3>
                  <p className="layer-content">{selectedLayer.description}</p>
                </div>
              )}
            </div>
          </div>
          </div>
        </section>

        {/* Quotes Marquee Section */}
        <section className="quotes-section">
          <div style={{ color: "#f4a261", fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", textShadow: "0 0 5px #f4a261, 0 0 10px #e9e9e9ff, 0 0 20px #e9e9e9ff, 0 0 40px rgba(244, 162, 97, 0.5)" }}>Tips for a Healthy Life</div>
          <div className="marquee-container">
            <div className="marquee">
              {quotes.map((quote, index) => (
                <div key={index} className="quote-card" onClick={() => handlePosterClick(quote.image)}>
                  <img src={quote.image} alt="Quote" className="quote-image" />
                </div>
              ))}
              {/* Duplicate for seamless infinite loop */}
              {quotes.map((quote, index) => (
                <div key={`dup-${index}`} className="quote-card" onClick={() => handlePosterClick(quote.image)}>
                  <img src={quote.image} alt="Quote" className="quote-image" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && selectedPoster && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img src={selectedPoster} alt="Poster" className="modal-image" />
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;