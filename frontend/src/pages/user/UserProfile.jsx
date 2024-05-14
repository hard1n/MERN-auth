import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const UserProfile = () => {
  const [profile, setProfile] = useState("");
  const { name, email, createdAt, role } = profile;
  let navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated */
    const token = localStorage.getItem("token");

    // if (!token) {
    //   // If not authenticated, redirect to sign-in page
    //   navigate("/signin");
    //   return;
    // }

    fetch("http://localhost:8000/api/getuser", {
      mode: "cors",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resJSON) => {
        console.log("User: ", resJSON.user);
        setProfile(resJSON.user);
      })
      .catch((err) => {
        console.log("Ocurió este error ", err);
      });
  }, []);

  return (
    <>
      {/* <h1>User Profile</h1>
      <h1>{name}</h1>
      <h1>{email}</h1> */}

      <Header />

      <div className="container-fluid dashboard-container mt-4 mb-4">
        <div className="row">
          <div className="col-sm-4">
            <div className="card card_dashboard">
              <div className="card-header">
                <h3 className="title text-info">User Dashboard</h3>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b> {name}
                </li>
                <li className="list-group-item">
                  {" "}
                  <b>E-mail:</b> {email}
                </li>
                <li className="list-group-item">
                  {" "}
                  <b>Joined:</b> {new Date(createdAt).toLocaleDateString()}
                </li>
                <li className="list-group-item text-primary">
                  {" "}
                  {role === 1 ? "Admin" : "Registred User"}
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="col-sm-8">
            <h4>other col</h4>
          </div> */}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
