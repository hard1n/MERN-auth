import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  const [user, setUser] = useState("");
  // const { name, email, createdAt, role } = user;

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/api/getuser", {
      mode: "cors",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resJSON) => {
        // console.log("User: ", resJSON.user);
        setUser(resJSON.user);
      })
      .catch((err) => {
        console.log("Ocurió este error ", err);
      });
    if (token) {
      // You might want to decode the token or fetch user data here
      setAuthState({ isAuthenticated: true, user });
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem("token", token);
    setAuthState({ isAuthenticated: true, user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
