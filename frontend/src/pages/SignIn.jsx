import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SignIn = () => {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signUser = await axios.post(
        "http://localhost:8000/api/signin",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      // Debugging data
      // console.log(signUser.data);
      if (signUser.data.success === true) {
        setValues({
          email: "",
          password: "",
        });
        toast.success("WELCOM BACK!");

        navigate("/user/profile");
      }
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data.error);
    }
  };

  return (
    <>
      <Header />
      <div className="container form-container pt-5">
        <h2 className="text-info">LOG IN</h2>
        <form action="" className="mt-5 signup-form">
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
            Log In
          </button>

          <hr />
          <p>
            Don't have an account yet ?{" "}
            <Link className="text-info" to="/signup">
              Register here
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
