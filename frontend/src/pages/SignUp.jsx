import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = values;

  const [errorMessage, setErrorMessage] = useState("");

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
      // handleError(error);
      toast.error(err.response.data.error);
      setErrorMessage(err.response.data.error);
      // if (err.response && err.response.data && err.response.data.error) {
      // } else {
      //   setErrorMessage("An unexpected error occurred.");
      // }
    }
  };

  return (
    <>
      <div className="container form-container pt-5">
        <h2 className="text-primary">JOIN TODAY</h2>
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
            className="btn btn-primary btn-block mb-4"
          >
            Register
          </button>
          {/* <input
            type="submit"
            className="btn btn-primary btn-block mb-4"
            value="Register"
          /> */}
        </form>
      </div>
    </>
  );
};

export default SignUp;
