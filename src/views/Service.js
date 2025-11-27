import Footer from "components/Footers/Footer";
import Navbar from "components/Navbars/IndexNavbar";
import React, { useState, useEffect } from "react";

// Import your images
import img1 from "assets/img/1st_image.jpg";
import img2 from "assets/img/AI-Healthcare-1746x984.jpeg";
import img3 from "assets/img/AI-healthcare.png";
import first from "assets/img/image4.jpg";
import second from "assets/img/second.png";
import FlipCard from "components/Cards/FlipCard";
import timelessImg from "../assets/img/Functional_Precision_Medicine.png";
import prestigeImg from "../assets/img/Andrology_Sexual_Wellness.png";
import cellularImg from "../assets/img/Nutrition_Service.png";
import youthImg from "../assets/img/IV_Therapy.png";
import agelessImg from "../assets/img/Mental_Health.png";
import bg from "../assets/img/bg.jpg";

const Service = () => {
  const images = [img1, img2, img3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Inject keyframes using a style element
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes scrollCards {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
      @media (max-width: 768px) {
        @keyframes scrollCards {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
      }
      @media (max-width: 768px) {
        .intro-section {
          padding: 4rem 1rem !important;
          height: 60vh !important;
        }
        .intro-heading {
          font-size: clamp(24px, 5vw, 36px) !important;
          margin-bottom: 16px !important;
        }
        .intro-paragraph {
          font-size: clamp(16px, 3vw, 18px) !important;
        }
        .carousel-container {
          padding: 30px 0 !important;
        }
        .carousel-item {
          padding: 10px 15px !important;
          margin: 0 8px !important;
          font-size: clamp(12px, 2.5vw, 14px) !important;
        }
        .programs-heading {
          font-size: clamp(24px, 5vw, 28px) !important;
          margin-bottom: 10px !important;
        }
        .programs-container {
          gap: 2% !important;
          padding: 20px 10px 4rem 10px !important;
        }
        .diagnostics-section,
        .personalized-care-section {
          flex-direction: column !important;
          height: auto !important;
          margin-bottom: 40px !important;
        //   gap: 20px !important;
        }
        .diagnostics-image,
        .personalized-care-image {
          width: 100% !important;
          max-width: 100% !important;
        }
        .diagnostics-image img,
        .personalized-care-image img {
          width: 100% !important;
          height: auto !important;
          max-height: 50vh !important;
          object-fit: cover !important;
        }
        .diagnostics-content,
        .personalized-care-content {
          width: 100% !important;
          padding: 20px !important;
        }
        .diagnostics-heading,
        .personalized-care-heading {
          font-size: clamp(24px, 5vw, 32px) !important;
          margin-bottom: 12px !important;
        }
        .diagnostics-text,
        .personalized-care-text {
          font-size: clamp(14px, 3vw, 16px) !important;
        }
        .diagnostics-lists {
          flex-wrap: wrap !important;
          gap: 20px !important;
        }
        .diagnostics-lists ul {
          flex: 1 1 45% !important;
          font-size: clamp(12px, 2.5vw, 14px) !important;
        }
        .predictive-intervention-section {
          padding: 3rem 1rem !important;
        }
        .predictive-intervention-heading {
          font-size: clamp(20px, 5vw, 28px) !important;
        }
        .predictive-intervention-text {
          font-size: clamp(14px, 3vw, 16px) !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style); // Cleanup on unmount
  }, []);

  const doctors = [
    "Physician and Diabetologist",
    "Andrologist",
    "Nutritionist and Wellness Coach",
    "Mental Wellness Coach",
    "Yoga and Fitness Coach",
    // Repeat for smooth looping
    "Physician and Diabetologist",
    "Andrologist",
    "Nutritionist and Wellness Coach",
    "Mental Wellness Coach",
    "Yoga and Fitness Coach",
  ];

  const cardData = [
  {
    programName: "Functional & Precision Medicine",
    description: "Personalized, science-driven care focusing on prevention, diagnostics, and targeted therapies to optimize long-term health.",
    backgroundImage: timelessImg,
  },
  {
    programName: "Andrology & Sexual Wellness",
    description: "Comprehensive men’s health solutions addressing vitality, hormonal balance, and sexual wellness with tailored treatment plans.",
    backgroundImage: prestigeImg,
  },
  {
    programName: "Nutrition Service",
    description: "Evidence-based nutrition programs designed to enhance energy, support metabolic health, and promote overall wellness.",
    backgroundImage: cellularImg,
  },
  {
    programName: "IV Therapy",
    description: "Customized intravenous treatments to restore hydration, boost immunity, and replenish essential nutrients for peak performance.",
    backgroundImage: youthImg,
  },
  {
    programName: "Mental Health",
    description: "Holistic mental wellness programs integrating therapy, mindfulness, and lifestyle support to strengthen emotional resilience.",
    backgroundImage: agelessImg,
  },
];



  return (
    <>
      <Navbar transparent />
      <div
        style={{
            marginTop: "3.8rem",

          color: "#333",
          lineHeight: "1.6",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Intro Section with Carousel Background */}
        <div
          className="intro-section"
          style={{
            marginTop: "35px",
            padding: "8rem 10rem",
            color: "white",
            textAlign: "center",
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "background-image 1s ease-in-out",
            position: "relative",
            height: "80vh",
            width: "98.9vw",
            maxWidth: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              borderRadius: "8px",
            }}
          ></div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h1
              className="intro-heading"
              style={{
                fontSize: "42px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Our Services & Solutions
            </h1>
            <p
              className="intro-paragraph"
              style={{
                fontSize: "22px",
              }}
            >
              Our proprietary platform leverages AI-enabled diagnostics &
              data-driven insights to deliver a hyper-personalized, anticipatory
              health strategy. By decoding your unique biological markers, it
              identifies emerging needs before they manifest and formulates a
              precise, evidence-based protocol to enhance physical and cognitive
              performance.
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="carousel-container"
            style={{
              overflow: "hidden",
              width: "100%",
              padding: "50px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "max-content",
                animation: "scrollCards 50s linear infinite",
              }}
            >
              {doctors.map((doc, i) => (
                <div
                  key={i}
                  className="carousel-item"
                  style={{
                    flex: "0 0 auto",
                    padding: "12px 20px",
                    margin: "0 10px",
                    backgroundColor: "#ff660016",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    borderLeft: "4px solid #ff66006a",
                    color: "#ff6600",
                    whiteSpace: "nowrap",
                  }}
                >
                  {doc}
                </div>
              ))}
            </div>
          </div>

          <div
            className="programs-heading"
            style={{
              color: "#0e314c",
              fontSize: "30px",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "1px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Our Programs
          </div>

          <div
            className="programs-container"
            style={{
              display: "flex",
              gap: "5%",
              justifyContent: "center",
              flexWrap: "wrap",
              padding: "40px 20px 8rem 20px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {cardData.map((card, i) => (
              <FlipCard
                key={i}
                programName={card.programName}
                description={card.description}
                backgroundImage={card.backgroundImage}
                style={{
                  flex: "1 1 auto",
                  '@media (max-width: 768px)': {
                    flex: "1 1 clamp(250px, 45%, 350px)",
                    maxWidth: "100%",
                  },
                }}
              />
            ))}
          </div>
        </div>

        {/* Diagnostics Section */}
        <div
          className="diagnostics-section"
          style={{
            display: "flex",
            fontFamily: "Poppins, sans-serif",
            height: "71vh",
          }}
        >
          <div
            className="diagnostics-image"
            style={{
              width: "60vw",
            }}
          >
            <img
              src={first}
              alt="Diagnostics"
              style={{
                width: "100vw",
              }}
            />
          </div>
          <div
            className="diagnostics-content"
            style={{
              width: "55vw",
              padding: "20px 60px 60px 60px",
              backgroundColor: "#132828",
              color: "white",
            }}
          >
            <div
              className="diagnostics-heading"
              style={{
                fontSize: "40px",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              Diagnostics
            </div>
            <div
              className="diagnostics-text"
              style={{
                marginBottom: "16px",
              }}
            >
              No assumptions. No broad strokes. We use state-of-the-art diagnostics
              and sophisticated analytics to provide precise insights tailored to
              your body and biology, driving measurable results.
            </div>
            <div
              className="diagnostics-lists"
              style={{
                display: "flex",
                gap: "40px",
                fontSize: "0.9rem",

              }}
            >
              <ul
                style={{
                  paddingLeft: "20px",
                  lineHeight: "1.8",
                  listStyleType: "disc",
                }}
              >
                <li>Advanced blood tests</li>
                <li>Hormonal tests</li>
                <li>Sexual tests</li>
                <li>Immunogenetics</li>
                <li>Cancer Biomarkers</li>
                <li>Gut Metabolomics</li>
                <li>Coronary artery calcium score</li>
                
              </ul>
              <ul
                style={{
                  paddingLeft: "20px",
                  lineHeight: "1.8",
                  listStyleType: "disc",
                }}
              >
                <li>Dexa Scan</li>
                <li>Ultrasound</li>
                <li>Fibro Scan for Liver</li>
                <li>Mammography</li>
                <li>2D Echo/ECG</li>
                <li>Sleep Study</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Personalized Care Section */}
        <div
          className="personalized-care-section"
          style={{
            display: "flex",
            fontFamily: "Poppins, sans-serif",
            height: "71vh",
          }}
        >
          <div
            className="personalized-care-content"
            style={{
              width: "62vw",
              padding: "40px 60px 60px 60px",
              backgroundColor: "#0d493d",
              color: "white",
            }}
          >
            <div
              className="personalized-care-heading"
              style={{
                fontSize: "40px",
                fontWeight: "600",
                marginBottom: "16px",
              }}
            >
              Personalized Care
            </div>
            <div className="personalized-care-text">
              Human physiology exhibits significant inter-individual variability,
              shaped by genetics, epigenetics, environmental exposures, and behavioral
              patterns. Recognizing this complexity, we design highly individualized
              health protocols that integrate your unique biological markers, lifestyle
              dynamics, and personal health objectives.
            </div>
            <div
              className="personalized-care-text"
              style={{
                marginTop: "12px",
              }}
            >
              This evidence-based, precision approach enables not only measurable,
              long-term adaptation but also the cultivation of sustained physiological
              resilience, metabolic efficiency, and overall vitality.
            </div>
          </div>
          <div
            className="personalized-care-image"
            style={{
              width: "60vw",
            }}
          >
            <img
              src={second}
              alt="Personalized Care"
              style={{
                width: "100vw",
                height: "71vh",
              }}
            />
          </div>
        </div>

        {/* Predictive Intervention */}
        <div
          className="predictive-intervention-section"
          style={{
            background: "linear-gradient(to right, #6d546c, #00a3b1)",
            padding: "5rem 10rem",
            textAlign: "center",
            color: "white",
            minHeight: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              className="predictive-intervention-heading"
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Predictive Intervention
            </h2>
            <p
              className="predictive-intervention-text"
              style={{
                fontSize: "1rem",
                marginBottom: "20px",
              }}
            >
              Your health story begins long before symptoms appear. By decoding the
              intricate details of your molecular, genetic, and lifestyle data, we
              uncover risks that would otherwise remain hidden. These deep,
              personalized insights give you the clarity and confidence to make the
              right choices at the right time — helping you prevent illness,
              strengthen your body, and take control of your well-being so you can
              live fully, with energy and peace of mind every day. Every detail of
              your health data is carefully analyzed and translated into clear,
              predictive strategies designed just for you. By combining the speed
              and precision of advanced AI with the wisdom and oversight of medical
              experts, we turn complex information into practical guidance — helping
              you take the right steps, at the right time, to protect, improve, and
              sustain your health.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Service;