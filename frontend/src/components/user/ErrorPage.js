import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 text-center">
          <h1 className="display-1">404</h1>
          <p className="lead">Page Not Found</p>
          <p className="text-muted">
            Sorry, the page you are looking for might be in another universe.
          </p>

          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
