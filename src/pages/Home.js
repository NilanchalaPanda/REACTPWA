import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    // Make request to server to get user data
    axios
      .get("http://localhost/REACTPWA/server/user_data.php", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, []);

  console.log("UserData:", userData);

  return (
    <div className="px-3 md:px-52 mt-6 h-screen">
      <h1 className="text-3xl font-normal mb-4">Home</h1>
      {userData && (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Mobile: {userData.mobile}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
