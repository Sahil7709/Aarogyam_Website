import Footer from "components/Footers/Footer";
import Navbar from "components/Navbars/IndexNavbar";
import React, { useState, useEffect } from "react";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import FAQ1 from "../assets/img/FAQ1.png";
import FAQ2 from "../assets/img/FAQ.png";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(
    "Functional and Precision Medicine"
  );
  const [openQuestions, setOpenQuestions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const faqData = {
    "Functional and Precision Medicine": [
      {
        question: "What is functional or precision medicine at Aarogyam?",
        answer:
          "Functional Precision Medicine at Aarogyam is a holistic, patient-centered approach that looks for the root causes of chronic disease and designs personalized treatment using advanced diagnostics, nutrition, lifestyle, and medical interventions.",
      },
      {
        question: "How does Aarogyam personalize healthcare for each individual?",
        answer:
          "Aarogyam uses genetic, nutritional, and lifestyle assessments to create individualized plans, ensuring that treatment is tailored to each patient’s unique needs and health history.",
      },
      {
        question:
          "What types of conditions are addressed by the Functional Precision Medicine program?",
        answer:
          "The program addresses diabetes, metabolic disorders, thyroid issues, hormonal imbalances, gut health problems, PCOS, autoimmune conditions, cardiovascular health, stress, fatigue, and mental wellbeing.",
      },
      {
        question: "What is the process of receiving care through this program?",
        answer:
          "Patients undergo in-depth consultations, advanced testing, receive a personalized plan, and continuous monitoring to manage and prevent health conditions effectively.",
      },
      {
        question: "How does Aarogyam's approach differ from traditional medicine?",
        answer:
          "Unlike symptom management alone, Aarogyam's method focuses on prevention and treats the body as an interconnected system, integrating lifestyle, nutrition, and advanced diagnostics.",
      },
      {
        question:
          "Who can benefit from Aarogyam’s functional and precision medicine services?",
        answer:
          "Anyone seeking personalized, preventive care, especially for chronic and lifestyle-related conditions, can benefit from Aarogyam’s services.",
      },
    ],
    "Andrology and Sexual Wellness": [
      {
        question:
          "What is andrology, and who should consider andrology services at Aarogyam?",
        answer:
          "Andrology is a medical specialty focused on male reproductive health, sexual function, and urological concerns; men facing issues like infertility, erectile dysfunction, or hormonal imbalance should consider these services.",
      },
      {
        question:
          "What conditions does the Andrology and Sexual Wellness program treat?",
        answer:
          "The program treats erectile dysfunction, premature ejaculation, male infertility, low testosterone, prostate health issues, Peyronie’s disease, performance anxiety, and stress-related sexual concerns.",
      },
      {
        question: "How is patient confidentiality and privacy maintained?",
        answer:
          "Aarogyam provides confidential consultations in a safe, judgment-free environment, prioritizing empathy and privacy throughout the care process.",
      },
      {
        question:
          "What is included in a personalized care plan for men’s sexual wellness?",
        answer:
          "Plans may include medication, therapy, lifestyle changes, fitness and nutritional support, and ongoing counseling to address physical and emotional wellness.",
      },
      {
        question:
          "Does the program provide mental health and counseling support along with medical treatment?",
        answer:
          "Yes, Aarogyam combines medical care with counseling, nutrition guidance, and mental wellbeing strategies for complete wellness.",
      },
    ],
    "Nutrition Services": [
      {
        question:
          "Why is nutrition considered the cornerstone of the approach at Aarogyam?",
        answer:
          "Aarogyam regards nutrition as essential for cellular repair, renewal, and resilience, integrating ancient wisdom and modern science to promote sustainable health.",
      },
      {
        question:
          "What are the key benefits of personalized nutrition guidance offered by Aarogyam?",
        answer:
          "Benefits include strengthened cells, protection against degeneration, delayed Ageing, correction of metabolic and hormonal imbalances, and improved preventive health.",
      },
      {
        question:
          "How does Aarogyam address metabolic, hormonal, or gut-related imbalances through nutrition?",
        answer:
          "The platform uses personalized dietary strategies to correct root causes of these imbalances, supporting body function with essential nutrients and mindful eating.",
      },
      {
        question:
          "Can nutrition services help with preventive health and longevity?",
        answer:
          "Yes, Aarogyam’s nutrition strategies support longevity and preventive health by building resilience against lifestyle disorders through functional foods and nutrition counseling.",
      },
    ],
    "IV Therapy": [
      {
        question: "What is IV therapy, and what are its potential benefits?",
        answer:
          "IV therapy at Aarogyam delivers vitamins and nutrients directly into the bloodstream, helping boost immunity, increase energy, rehydrate the body, and potentially improve various symptoms.",
      },
      {
        question: "Who might consider IV vitamin therapy at Aarogyam?",
        answer:
          "People seeking an immunity boost, fast recovery from dehydration, allergy relief, or enhanced energy and wellbeing may consider IV therapy at Aarogyam.",
      },
      {
        question: "What makes IV therapy different from oral supplements?",
        answer:
          "IV therapy provides higher nutrient absorption and faster effects since nutrients are delivered directly to the bloodstream, bypassing digestion.",
      },
      {
        question:
          "Are there specific symptoms or conditions that IV therapy can help improve?",
        answer:
          "IV therapy may help with infections, fatigue, dehydration, certain allergies, and other symptoms like muscle spasms or eyesight issues, as reported by past recipients.",
      },
    ],
    "Mental Health": [
      {
        question: "What is Aarogyam’s philosophy on mental health and wellbeing?",
        answer:
          "Aarogyam focuses on holistic mental wellbeing, emphasizing self-awareness, emotional regulation, resilience, and building a healthy mindset for inner and outer growth.",
      },
      {
        question:
          "How do experts at Aarogyam address both inner and outer growth for mental wellness?",
        answer:
          "Specialized experts help rebuild personality, empower individuals, and support their emotional, social, and physical wellbeing through personalized psychological care.",
      },
      {
        question:
          "What kinds of mental health issues or disruptions are addressed by the platform?",
        answer:
          "Aarogyam helps with disruptions, disabilities, and challenges related to mindset, emotional regulation, resilience, confidence, and self-esteem.",
      },
      {
        question:
          "Does Aarogyam offer holistic psychological support, including self-awareness and resilience building?",
        answer:
          "Yes, the platform offers holistic psychological support aimed at fostering self-awareness, resilience, and personal growth, guided by expert human resilience psychologists.",
      },
    ],
  };

  const categories = Object.keys(faqData);

  const filteredFaqs =
    searchQuery.trim() === ""
      ? faqData[activeCategory]
      : categories.flatMap((category) =>
          faqData[category]
            .filter(
              (faq) =>
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((faq) => ({ ...faq, category }))
        );

  const toggleQuestion = (category, index) => {
    const key = `${category}-${index}`;
    setOpenQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div>
      <Navbar />

      {/* Hero */}
      <section
  style={{
    backgroundImage: `url(${FAQ2})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "#ffffffff", // fallback background
    paddingTop: isMobile ? "100px" : "180px",
    paddingBottom: isMobile ? "40px" : "60px",
    textAlign: "center",
    color: "white",
  }}
>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? "1.8rem" : "2.5rem",
              marginBottom: "20px",
              fontWeight: "bold",
              color: "white",
            //   backgroundColor: "#00000067",
              display: "inline-block",
              padding: isMobile ? "28px 16px" : "64px 24px",
              borderRadius: "12px",
            }}
          >
            {/* Frequently Asked Questions */}
          </h1>
          <div
            style={{
              maxWidth: isMobile ? "100%" : "600px",
              margin: "0 auto",
              position: "relative",
              marginTop: "20px",
            }}
          >
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 20px 14px 48px",
                borderRadius: "12px",
                border: "none",
                color: "white",
                fontSize: "16px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                background: "rgba(0, 0, 0, 0.5)",
                boxSizing: "border-box",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
              }}
            >
              <IoSearch size={20} />
            </span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: isMobile ? "30px 15px" : "60px 0", backgroundColor: "#fdf9f5" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          {/* Desktop: Sidebar | Mobile: Horizontal Tabs */}
          {searchQuery.trim() === "" && (
            <div
              style={{
                display: isMobile ? "block" : "flex",
                gap: isMobile ? "0" : "40px",
                marginBottom: isMobile ? "20px" : "0",
              }}
            >
              {isMobile ? (
                // Mobile: Horizontal scrollable tabs
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    overflowX: "auto",
                    paddingBottom: "12px",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  <style>{`
                    .hide-scrollbar::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  <div className="hide-scrollbar" style={{ display: "flex", gap: "12px" }}>
                    {categories.map((category) => (
                      <button
                        key={category}
                        style={{
                          whiteSpace: "nowrap",
                          padding: "10px 16px",
                          border: "none",
                          borderRadius: "8px",
                          background:
                            activeCategory === category ? "#ea580c" : "#fef7ed",
                          color: activeCategory === category ? "white" : "#574b42",
                          fontWeight: "600",
                          cursor: "pointer",
                          flex: "0 0 auto",
                        }}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // Desktop: Sidebar
                <div style={{ width: "220px", flexShrink: 0 }}>
                  {categories.map((category) => (
                    <button
                      key={category}
                      style={{
                        width: "100%",
                        padding: "14px",
                        border: "none",
                        borderRadius: "8px",
                        background:
                          activeCategory === category ? "#ea580c" : "#fef7ed",
                        color: activeCategory === category ? "white" : "#574b42",
                        fontWeight: "600",
                        textAlign: "left",
                        cursor: "pointer",
                        marginBottom: "8px",
                        transition: "all 0.2s",
                      }}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {/* FAQ Items */}
              <div style={{ flex: 1 }}>
                {filteredFaqs.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#6b7280" }}>No results found.</p>
                ) : (
                  filteredFaqs.map((faq, index) => {
                    const category = faq.category || activeCategory;
                    const key = `${category}-${index}`;
                    return (
                      <div
                        key={index}
                        style={{
                          background: "white",
                          borderRadius: "12px",
                          padding: isMobile ? "16px" : "20px",
                          marginBottom: "16px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          borderLeft: "4px solid #fde9d9",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: isMobile ? "1rem" : "1.1rem",
                            gap: "12px",
                          }}
                          onClick={() => toggleQuestion(category, index)}
                        >
                          <span style={{ flex: 1 }}>{faq.question}</span>
                          <span
                            style={{
                              fontSize: isMobile ? "1.1rem" : "1.2rem",
                              color: openQuestions[key] ? "#ea580c" : "#6b7280",
                              transform: openQuestions[key]
                                ? "rotate(180deg)"
                                : "rotate(0)",
                              transition: "transform 0.3s",
                              flexShrink: 0,
                            }}
                          >
                            {openQuestions[key] ? (
                              <IoIosArrowDropdownCircle size={isMobile ? 22 : 25} />
                            ) : (
                              <IoIosArrowDroprightCircle size={isMobile ? 22 : 25} />
                            )}
                          </span>
                        </div>
                        {openQuestions[key] && (
                          <div
                            style={{
                              marginTop: "16px",
                              color: "#4b5563",
                              paddingTop: "16px",
                              borderTop: "1px solid #f3f4f6",
                              fontSize: isMobile ? "0.9rem" : "0.95rem",
                              lineHeight: "1.6",
                            }}
                          >
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Search Results (when query exists) */}
          {searchQuery.trim() !== "" && (
            <div>
              {filteredFaqs.length === 0 ? (
                <p style={{ textAlign: "center", color: "#6b7280" }}>No results found.</p>
              ) : (
                filteredFaqs.map((faq, index) => {
                  const key = `${faq.category}-${index}`;
                  return (
                    <div
                      key={index}
                      style={{
                        background: "white",
                        borderRadius: "12px",
                        padding: isMobile ? "16px" : "20px",
                        marginBottom: "16px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        borderLeft: "4px solid #fde9d9",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: isMobile ? "1rem" : "1.1rem",
                          gap: "12px",
                        }}
                        onClick={() => toggleQuestion(faq.category, index)}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ color: "#ea580c", fontWeight: "bold", marginBottom: "4px" }}>
                            {faq.category}
                          </div>
                          {faq.question}
                        </div>
                        <span
                          style={{
                            fontSize: isMobile ? "1.1rem" : "1.2rem",
                            color: openQuestions[key] ? "#ea580c" : "#6b7280",
                            transform: openQuestions[key]
                              ? "rotate(180deg)"
                              : "rotate(0)",
                            transition: "transform 0.3s",
                            flexShrink: 0,
                          }}
                        >
                          {openQuestions[key] ? (
                            <IoIosArrowDropdownCircle size={isMobile ? 22 : 25} />
                          ) : (
                            <IoIosArrowDroprightCircle size={isMobile ? 22 : 25} />
                          )}
                        </span>
                      </div>
                      {openQuestions[key] && (
                        <div
                          style={{
                            marginTop: "16px",
                            color: "#4b5563",
                            paddingTop: "16px",
                            borderTop: "1px solid #f3f4f6",
                            fontSize: isMobile ? "0.9rem" : "0.95rem",
                            lineHeight: "1.6",
                          }}
                        >
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          backgroundImage: `url(${FAQ1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: isMobile ? "40px 20px" : "60px 0",
          textAlign: "center",
          color: "white",
        }}
      >
        <div style={{ maxWidth: isMobile ? "90%" : "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: isMobile ? "1.6rem" : "2.2rem",
              marginBottom: "12px",
              fontWeight: "700",
              lineHeight: "1.4",
            }}
          >
            Still have questions?
          </h2>
          <p
            style={{
              fontSize: isMobile ? "0.95rem" : "1.1rem",
              marginBottom: "24px",
              lineHeight: "1.6",
              fontWeight: "500",
            }}
          >
            Our care team is ready to assist you.
          </p>
          <Link
            to="/contact-us"
            
          >
            <button
            style={{
              background: "white",
              color: "#ea580c",
              border: "2px solid white",
              padding: isMobile ? "10px 24px" : "12px 32px",
              borderRadius: "8px",
              fontSize: isMobile ? "1rem" : "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Contact Us
          </button>
          </Link>
          
          
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;