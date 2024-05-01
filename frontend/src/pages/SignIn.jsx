import React from "react";

const SignIn = () => {
  return (
    <>
      <div className="container form-container pt-5">
        <h2>LOG IN</h2>
        <form action="" className=" coll-sm-6  mt-5 signin-form">
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
        </form>
      </div>
    </>
  );
};

export default SignIn;
