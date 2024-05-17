import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import UserProfile from "./pages/user/UserProfile";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          {/* <PrivateRoute exact path="/user/profile">
            <Route element={<UserProfile />} />
          </PrivateRoute> */}

          {/* <PrivateRoute exact path="/user/profile" element={<UserProfile />} /> */}
          <Route
            path="/user/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          {/* <Route exact path="/user/profile" element={<UserProfile />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
