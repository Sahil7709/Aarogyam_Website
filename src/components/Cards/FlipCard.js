import React, { useState } from "react";

const FlipCard = ({ programName, description, backgroundImage }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="flip-card"
      style={{
        perspective: "1000px",
        width: "100%",
        height: "100%",
        cursor: "pointer",
      }}
      onClick={handleFlip}
    >
      <div
        className="flip-card-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          textAlign: "center",
          transition: "transform 0.8s",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Side */}
        <div
          className="flip-card-front"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            boxSizing: "border-box",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "20px",
              borderRadius: "10px",
              width: "90%",
            }}
          >
            <h3
              style={{
                color: "white",
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {programName}
            </h3>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="flip-card-back"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            boxSizing: "border-box",
            backgroundColor: "#f8f9fa",
            transform: "rotateY(180deg)",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "90%",
              height: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                color: "#333",
                fontSize: "1.3rem",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              {programName}
            </h3>
            <p
              style={{
                color: "#666",
                fontSize: "0.9rem",
                lineHeight: "1.5",
                textAlign: "center",
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;