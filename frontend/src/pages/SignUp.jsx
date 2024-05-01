import React from "react";

const SignUp = () => {
  return (
    <>
      <div className="container form-container pt-5">
        <h2>JOIN TODAY</h2>
        <form action="" className="mt-5 signup-form">
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="input-name"
              placeholder="Username"
            />
            <label htmlFor="input-name" className="form-label">
              Name
            </label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control"
              id="input-email"
              placeholder="name@example.com"
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
            />
            <label htmlFor="input-password" className="form-label">
              Password
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
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
