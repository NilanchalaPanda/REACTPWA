import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem("token");
        // console.log("Token:", token);
        const csrfToken = localStorage.getItem("csrfToken");
        // console.log("CSRF Token:", csrfToken);

        // Make request to server to get user data
        const response = await axios.get(
          "http://localhost/REACTPWA/server/user_data.php",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log("Response:", response);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchData();
  }, []);

  // console.log("UserData:", userData);

  const handleLogout = () => {
    // Remove JWT token and CSRF token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("csrfToken");
    localStorage.removeItem("csrfToken");

    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <>
      <Navbar />
      {userData && (
        <div>
          <h1 className="pt-10 px-2 text-2xl md:px-20 md:pt-16 md:text-4xl font-bold">
            Welcome {userData.name}
          </h1>
          <p>Email: {userData.email}</p>
          <p>Mobile: {userData.mobile}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
