import React, { useEffect, useState } from "react";
import Footer from "components/Footers/Footer";
import Navbar from "components/Navbars/IndexNavbar";
import img1 from "assets/img/Our_team1.jpg";
import img4 from "assets/img/hmn11.jpg";
import avatar from "assets/img/avatar.jpg";
import manoj_agarwal from "assets/img/Dr_Manoj_Agarwal.jpg";
import swati_singh from "assets/img/Dt_Swati_Singh.jpg";
import waseem_sir from "assets/img/Waseem_Sir.png";
import aastha_mam from "assets/img/Dr_Aastha.png";
import haider_ali from "assets/img/Haider_Ali.png";
import varsha_agarwal from "assets/img/Dr_Varsha_Agarwal.jpg";

const teamMembers = [
  { name: "Haider Ali", title: "Vice President of Growth and Strategy", image: `${haider_ali}` },
  { name: "Dt. Swati Singh", title: "Chief Nutritionist", image: `${swati_singh}` },
  { name: "Bhavna Pant", title: "Head-Corporate Business", image: `https://avatar.iran.liara.run/username?username=Bhawna+Pant` },
  { name: "Dr. Aastha Raina", title: "Chief Mental Expert", image: `${aastha_mam}` },
  { name: "Mohd. Wasim Saifi", title: "Manager of Brand & Digital", image: `${waseem_sir}` },
    { name: "Prabhneet Kaur", title:"Lead Patient Experience", image: `https://avatar.iran.liara.run/username?username=Prabhneet+Kaur`}

  ]


const founders = [
  {
    name: "Dr. Manoj Agarwal",
    title: "CEO & Founder",
    description: "Dr. Manoj Agarwal envisioned a patient-centric healthcare model. His leadership guides our commitment to innovative care and community health initiatives, striving for accessible, quality medical services for all. He believes in empowering every individual with the tools and knowledge to take charge of their health.",
    quote: '"Our mission is to empower individuals to live healthier, fuller lives through compassionate and cutting-edge medical care."',
    image: `${manoj_agarwal}`  
  },
  {
    name: "Dr. Varsha Agarwal",
    title: "Co-founder",
    description: "Dr. Varsha Agarwal, a respected physician, founded the clinic with a deep passion for integrated medicine. Her clinical expertise ensures our services are evidence-based and tailored to individual needs, promoting patient empowerment and holistic well-being.",
    quote: '"Healthcare should be a collaborative journey, where patients are active partners in their well-being."',
    image: `${varsha_agarwal}`
  },
  {
    name: "Mr. Saurabh Mukim",
    title: "Co-founder & CTO",
    description: "Saurabh Mukim, a visionary technologist, co-founded the clinic to integrate cutting-edge technology with compassionate care. His expertise in IT transformation ensures seamless digital health solutions, enhancing patient experiences and operational efficiency.",
    quote: '"Technology should bridge the gap between patients and providers, making healthcare smarter, faster, and more accessible."',
    image: `${avatar}`
  }
];

const MeetOurTeam = () => {
  const [activeMember, setActiveMember] = useState(teamMembers[0]);
  const images = [img1];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [images.length]);

  const chunkSize = isMobile ? 1 : 2;
  const chunks = React.useMemo(() => {
    const ch = [];
    for (let i = 0; i < founders.length; i += chunkSize) {
      ch.push(founders.slice(i, i + chunkSize));
    }
    return ch;
  }, [founders, chunkSize]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @media (max-width: 768px) {
        .intro-section {
          padding: 7rem 1rem !important;
          min-height: 50vh !important;
          width: 100% !important;
        }
        .intro-heading {
          font-size: clamp(2rem, 2.5vw, 1.5rem) !important;
          margin-bottom: 10px !important;
        }
        .intro-paragraph {
          font-size: clamp(1rem, 1.5vw, 1rem) !important;
          overflow: visible;
          text-overflow: unset;
          display: block;
          -webkit-line-clamp: unset;
          -webkit-box-orient: unset;
        }
      }
      @media (min-width: 769px) and (max-width: 1199px) {
        .intro-heading {
          font-size: clamp(1.5rem, 1.5vw, 2rem) !important;
        }
        .intro-paragraph {
          font-size: clamp(0.9rem, 0.9vw, 1.2rem) !important;
        }
        .team-section > div:first-child {
          font-size: clamp(1.2rem, 1.2vw, 1.8rem) !important;
        }
        .team-section > div:nth-child(2) {
          font-size: clamp(1rem, 0.9vw, 1.5rem) !important;
        }
        .team-member-name {
          font-size: clamp(0.8rem, 0.8vw, 1rem) !important;
        }
        .team-member-title {
          font-size: clamp(0.6rem, 0.6vw, 0.9rem) !important;
        }
        .active-member-name {
          font-size: clamp(1.2rem, 1.2vw, 1.8rem) !important;
        }
        .active-member-title {
          font-size: clamp(1rem, 1vw, 1.5rem) !important;
        }
      }
      @media (min-width: 1200px) and (max-width: 1919px) {
        .intro-heading {
          font-size: clamp(1.8rem, 1.2vw, 2.5rem) !important;
        }
        .intro-paragraph {
          font-size: clamp(1.1rem, 0.8vw, 1.3rem) !important;
        }
        .team-section > div:first-child {
          font-size: clamp(1.8rem, 1.2vw, 2.2rem) !important;
        }
        .team-section > div:nth-child(2) {
          font-size: clamp(1.3rem, 0.9vw, 1.8rem) !important;
        }
        .team-member-name {
          font-size: clamp(1.1rem, 0.8vw, 1.3rem) !important;
        }
        .team-member-title {
          font-size: clamp(0.9rem, 0.6vw, 1.1rem) !important;
        }
        .active-member-name {
          font-size: clamp(1.3rem, 1.1vw, 2.0rem) !important;
        }
        .active-member-title {
          font-size: clamp(1.1rem, 0.8vw, 1.6rem) !important;
        }
      }
      @media (min-width: 1920px) {
        .intro-heading {
          font-size: clamp(4rem, 1vw, 2.8rem) !important;
        }
        .intro-paragraph {
          font-size: clamp(1.8rem, 0.7vw, 1.5rem) !important;
        }
        .team-section > div:first-child {
          font-size: clamp(2rem, 1vw, 2.5rem) !important;
        }
        .team-section > div:nth-child(2) {
          font-size: clamp(1.5rem, 0.8vw, 2rem) !important;
        }
        .team-member-name {
          font-size: clamp(1.2rem, 0.7vw, 1.5rem) !important;
        }
        .team-member-title {
          font-size: clamp(1rem, 0.5vw, 1.2rem) !important;
        }
        .active-member-name {
          font-size: clamp(2rem, 1vw, 2.5rem) !important;
        }
        .active-member-title {
          font-size: clamp(1.5rem, 0.8vw, 2rem) !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <Navbar />
      {/* Headers Sections */}
      <div
        className="intro-section"
        style={{
            marginTop: "3.8rem",
          padding: isMobile ? "2rem 1rem" : "8rem 4rem",
          color: "white",
          textAlign: isMobile ? "center" : "center",
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "background-image 1s ease-in-out",
          position: "relative",
          minHeight: isMobile ? "50vh" : "80vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: "rgba(0, 0, 0, 0.38)",
            borderRadius: isMobile ? "4px" : "8px",
          }}
        ></div>
        <div style={{ position: "relative", zIndex: "1", maxWidth: "1400px", width: isMobile ? "100%" : "100%", paddingLeft: isMobile ? "1rem" : "0rem" }}>
          <div style={{ display: "block", alignItems: "center" }}>
            <div>
              <h1
                className="intro-heading"
                style={{
                  fontSize: isMobile ? "clamp(1rem, 2.5vw, 1.5rem)" : "clamp(1.8rem, 1.2vw, 2.5rem)",
                  fontWeight: "bold",
                  marginBottom: isMobile ? "10px" : "20px",
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                Our Team
              </h1>
              <p
                className="intro-paragraph"
                style={{
                  fontSize: isMobile ? "clamp(0.8rem, 1.5vw, 1rem)" : "clamp(1.1rem, 0.8vw, 1.3rem)",
                  lineHeight: "1.6",
                  textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                  maxWidth: "100%",
                }}
              >
                At the heart of our mission to advance health and scientific innovation is our diverse and dedicated team. Comprised of leading researchers, clinicians, and industry experts, our team combines deep scientific knowledge with practical experience to tackle some of the most pressing challenges in healthcare. Each member brings a unique perspective, from groundbreaking laboratory research to clinical applications, ensuring that our work translates into meaningful solutions for patients and communities.
              </p>
            </div>
          </div>
        </div>
      </div>
            {/* Our Team Sections */}
      <div className="team-section" style={{ padding: isMobile ? "2rem 1rem" : "3rem 4rem", fontFamily: "Arial, sans-serif", margin: "0 auto", backgroundImage: `url(${img4})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", color: "#333", textAlign: isMobile ? "left" : "left" }}>
        <div style={{ fontSize: isMobile ? "clamp(1.2rem, 2.5vw, 1.8rem)" : "clamp(2rem, 1vw, 2.5rem)", fontWeight: "bold", color: "#333" }}>
          Our Team
        </div>
        <div style={{ fontSize: isMobile ? "clamp(1rem, 2vw, 1.5rem)" : "clamp(1.5rem, 0.8vw, 2rem)", fontWeight: "normal", color: "#666", marginBottom: "1rem" }}>Inspired by leaders in science and industry</div>

        <hr style={{ margin: "1rem 0", borderColor: "#ccc", borderWidth: "1px" }}/>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "1rem" : "3rem", marginTop: "1rem", justifyContent: "center", alignItems: "stretch" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))",
              gap: isMobile ? "1rem" : "2rem",
              flex: isMobile ? "100%" : "2",
              width: "100%",
              height: "70%",
            }}
          >
            {teamMembers.map((member, index) => (
              <div
                key={index}
                style={{
                  cursor: "pointer",
                  color: activeMember === member ? "white" : "#ea5a0c",
                  backgroundColor: activeMember === member ? "#ea5a0c" : "#f9f9f9",
                  padding: isMobile ? "0.3rem" : "0.8rem",
                  borderRadius: "8px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  boxShadow: activeMember === member ? "0 4px 8px rgba(0,0,0,0.1)" : "none",
                }}
                onMouseEnter={() => setActiveMember(member)}
              >
                <p className="team-member-name" style={{ fontWeight: "bold", marginBottom: isMobile ? "0.1rem" : "0.3rem", fontSize: isMobile ? "clamp(1.2rem, 2.5vw, 1.8rem)" : "clamp(1.2rem, 0.7vw, 1.5rem)" }}>
                  {member.name}
                </p>
                <p className="team-member-title" style={{ fontSize: isMobile ? "clamp(0.8rem, 1vw, 1.2rem)" : "clamp(1rem, 0.5vw, 1.2rem)", color: "#666" }}>{member.title}</p>
              </div>
            ))}
          </div>

          <div style={{ flex: isMobile ? "100%" : "1", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", marginTop: isMobile ? "1rem" : "0" }}>
            <img
              src={activeMember.image}
              alt={activeMember.name}
              onError={(e) => { e.target.src = activeMember.fallbackImage; }}
              style={{
                width: isMobile ? "clamp(100px, 20vw, 150px)" : "clamp(200px, 20vw, 400px)", // Responsive width
                height: isMobile ? "clamp(100px, 20vw, 150px)" : "clamp(200px, 20vw, 400px)", // Responsive height
                objectFit: "cover",
                borderRadius: "15px",
                marginBottom: isMobile ? "0.5rem" : "1.5rem",
                border: "2px solid #ea5a0c",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
                padding: isMobile ? "0.3rem" : "0.3rem",
              }}
            />
            <div className="active-member-name" style={{ fontSize: isMobile ? "clamp(1.2rem, 2.5vw, 1.8rem)" : "clamp(1.8rem, 0.8vw, 2.5rem)", fontWeight: "bold", marginBottom: isMobile ? "0.3rem" : "0rem", color: "#333" }}>
              {activeMember.name}
            </div>
            <p className="active-member-title" style={{ color: "#444", fontSize: isMobile ? "clamp(1rem, 2vw, 1.5rem)" : "clamp(1.5rem, 0.8vw, 2rem)", maxWidth: "100%", wordWrap: "break-word", wordBreak: "break-word" }}>{activeMember.title}</p>
          </div>
        </div>
      </div>
      {/* Our Visionary Founders */}
      <div style={{
        padding: isMobile ? "1.5rem 1rem" : "0rem 0rem 0rem rem",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        backgroundColor: "white",
        margin: "0 auto 0",
        maxWidth: "1200px",
        fontFamily: "Arial, sans-serif",
        border: "1px dotted #e1bee7",
        borderRadius: "16px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "2rem",
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: isMobile ? "1.0rem" : "1.4rem",
          padding: isMobile ? "1rem" : "2rem",
          borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
          marginBottom: "2rem",
          color: "#333",
          fontWeight: "bold",
          backgroundColor: "#f8f9fa",
        }}>
          Our Visionary Founders
        </h2>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "1rem" : "1.5rem",
          paddingBottom: isMobile ? "1rem" : "1rem",
        }}>
          {chunks.map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: isMobile ? "1rem" : "1.5rem",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {chunk.map((founder, index) => {
                const isSingle = chunk.length === 1;
                const cardFlex = isMobile ? "1 1 100%" : (isSingle ? "0 0 auto" : "1 1 calc(50% - 0.75rem)");
                const cardMaxWidth = isMobile ? "100%" : (isSingle ? "calc(50% - 0.75rem)" : "calc(50% - 0.75rem)");
                return (
                  <div
                    key={founder.name}
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                      border: "1px solid #e9ecef",
                      flex: cardFlex,
                      maxWidth: cardMaxWidth,
                      width: "100%",
                    }}
                  >
                    <div style={{
                      flex: isMobile ? "100%" : "0 0 35%",
                      backgroundColor: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: isMobile ? "200px" : "auto",
                    }}>
                      <img
                        src={founder.image}
                        alt={founder.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          maxHeight: "100%",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                      />
                    </div>
                    <div style={{
                      flex: 1,
                      padding: isMobile ? "1rem" : "1.5rem",
                      display: "flex",
                      flexDirection: "column"
                      
                    }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          margin: "0 0 0.25rem 0",
                          fontSize: isMobile ? "1rem" : "1.1rem",
                          color: "#333",
                          fontWeight: "bold",
                          lineHeight: "1.2"
                        }}>
                          {founder.name}
                        </h3>
                        <p style={{
                          fontSize: isMobile ? "0.85rem" : "0.9rem",
                          color: "#666",
                          margin: "0 0 0.75rem 0",
                          fontWeight: "500",
                          lineHeight: "1.4"
                        }}>
                          {founder.title}
                        </p>
                        <p style={{
                          fontSize: isMobile ? "0.8rem" : "0.7rem",
                          color: "#555",
                          lineHeight: "1.5",
                          marginBottom: "1rem"
                        }}>
                          {founder.description}
                        </p>
                      </div>
                      <div style={{
                        backgroundColor: "#fdece3ff",
                        borderLeft: "4px solid #d26619ff",
                        padding: isMobile ? "0.75rem 1rem" : "1rem 1.25rem",
                        borderRadius: "0 4px 4px 0",
                        fontSize: isMobile ? "0.75rem" : "0.7rem",
                        lineHeight: "1.4",
                        fontStyle: "italic",
                        color: "#d27f19ff"
                      }}>
                        <p style={{ margin: 0 }}>{founder.quote}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MeetOurTeam;