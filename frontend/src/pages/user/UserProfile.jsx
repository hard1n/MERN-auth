import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState("");
  const { name, email } = profile;
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
      <h1>User Profile</h1>
      <h1>{name}</h1>
      <h1>{email}</h1>
    </>
  );
};

export default UserProfile;
