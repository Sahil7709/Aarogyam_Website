import React from "react";

export default function MapExample() {
  return (
    <>
      <div className="relative w-full rounded h-600-px">
        <iframe
          title="Aarogyam Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.090305471495!2d77.37059331508219!3d28.628448982419884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce54029b8741d%3A0x2a8c1a0d9e4b4b4b!2sAarogyam%20Healthcare!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>
    </>
  );
}