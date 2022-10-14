import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="error-page">
      <div className="wrapper">
        <div className="error-image">
          <div className="error-image-container">
            <img
              src={require("../assets/error-page.png")}
              alt="Window browser with a sad face and error signs"
            />
          </div>
        </div>
        <div className="error-text">
          <h2>Oops!</h2>
          <h3>We can't seem to find the page you're looking for.</h3>
          <Link to="/" className="return-btn">
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;
