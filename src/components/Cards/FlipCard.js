import React, { useEffect } from "react";

const applyCardStyles = () => {
  const styleId = "flip-card-styles";
  if (document.getElementById(styleId)) return; // prevent duplicates

  const styles = `
    .flip-card-content {
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform 300ms;
      box-shadow: 0px 0px 10px 1px #000000ee;
      border-radius: 5px;
      position: relative;
    }
    .flip-card-container {
      overflow: visible;
      width: 190px;
      height: 254px;
      perspective: 1000px;
      margin-bottom: 20px;
    }
    .flip-card-container:hover .flip-card-content {
      transform: rotateY(180deg);
    }
    @keyframes floating {
      0% { transform: translateY(0px); }
      50% { transform: translateY(10px); }
      100% { transform: translateY(0px); }
    }
  `;

  const styleTag = document.createElement("style");
  styleTag.id = styleId;
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);
};

const FlipCard = ({ programName, description, backgroundImage }) => {
  useEffect(() => {
    applyCardStyles();
  }, []);

  console.log("Background Image:", backgroundImage);

  return (
    <div className="flip-card-container">
      <div className="flip-card-content">
        {/* Back side */}
        <div
          style={{
backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",            
backgroundSize: "cover",
backgroundPosition: "center",
            color: "white",
position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "95%",
              height: "95%",
              backgroundColor: `url(${backgroundImage})`,
              borderRadius: "5px",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              padding: "12px",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
          </div>
        </div>

        {/* Front side */}
        <div
          style={{
            transform: "rotateY(180deg)",
            backgroundColor: "#151515",
            color: "white",
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          {/* Floating circles background */}
          <div style={{ position: "absolute", width: "100%", height: "100%" }}>
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                backgroundColor: "#ffbb66",
                filter: "blur(15px)",
                animation: "floating 2600ms infinite linear",
              }}
            ></div>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#ff2233",
                position: "relative",
                left: "160px",
                top: "-80px",
                filter: "blur(15px)",
                animation: "floating 2600ms infinite linear -1800ms",
              }}
            ></div>
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                backgroundColor: "#ff8866",
                position: "relative",
                left: "50px",
                top: "0px",
                filter: "blur(15px)",
                animation: "floating 2600ms infinite linear -800ms",
              }}
            ></div>
          </div>

          {/* Title */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              padding: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;