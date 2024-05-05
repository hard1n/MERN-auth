import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand mt-2 mt-lg-0" to="/">
            MERN STACK
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home{" "}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign Up{" "}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Log In{" "}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="">
                  Log out{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
