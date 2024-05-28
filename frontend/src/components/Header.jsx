import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [session, setSession] = useState(false);
  let navigate = useNavigate();

  /** Checking Session **/
  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setSession(true);
    }
  }, []);

  console.log(session);

  const logOut = () => {
    axios
      .get("http://localhost:8000/api/logout")
      .then((res) => {
        localStorage.removeItem("token");
        toast.success("Log Out succesfully!");
        setSession(false);
        navigate("/");
      })
      .catch((err) => console.log("Ocurió este error ", err));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand mt-2 mt-lg-0" to="/">
            MERN APP
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
            {session ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home{" "}
                    </Link>
                  </li>
                </ul>
                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Account
                  </button>
                  <ul className="dropdown-menu menu__custom">
                    <li>
                      <Link
                        className="dropdown-item text-info nav-link"
                        to="/user/profile"
                      >
                        Profile{" "}
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li onClick={logOut}>
                      <Link className="dropdown-item text-danger nav-" to="">
                        Log out{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
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
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
