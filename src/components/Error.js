import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section>
      <div className="wrapper">
        <h2>Oops!</h2>
        <h3>We can't seem to find the page you're looking for.</h3>
        <Link to="/">Return to the main page.</Link>
      </div>
    </section>
  );
};

export default Error;
