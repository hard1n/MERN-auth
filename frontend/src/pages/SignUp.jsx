import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const signUser = await axios.post("http://localhost:8000/api/signup", {
        name,
        email,
        password,
      });

      // Debugging data
      console.log(signUser);

      if (signUser.data.success === true) {
        setValues({
          name: "",
          email: "",
          password: "",
        });
        toast.success("Sign up successfully!");
      }
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data.error);
      // if (err.response && err.response.data && err.response.data.error) {
      //   setErrorMessage(err.response.data.error);
      // } else {
      //   setErrorMessage("An unexpected error occurred.");
      // }
    }
  };

  return (
    <>
      <Header />
      <div className="container form-container pt-5">
        <h2 className="text-info">JOIN TODAY</h2>
        <form action="" className="mt-5 signup-form">
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="input-name"
              placeholder="Username"
              onChange={handleChange("name")}
              value={name}
            />
            <label htmlFor="input-name" className="form-label">
              Name
            </label>
            {/* {errorMessage && (
              <div className="invalid-feedback">{errorMessage}</div>
            )} */}
          </div>

          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control"
              id="input-email"
              placeholder="name@example.com"
              onChange={handleChange("email")}
              value={email}
            />
            <label htmlFor="input-email" className="form-label">
              E-Mail
            </label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="input-password"
              placeholder="Password"
              onChange={handleChange("password")}
              value={password}
            />
            <label htmlFor="input-password" className="form-label">
              Password
            </label>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-info btn-block mb-4 fs-6"
          >
            Register
          </button>
          <hr />
          <p>
            Already have an account ?{" "}
            <Link className="text-info" to="/signin">
              Log In
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
