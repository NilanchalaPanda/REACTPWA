import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState(""); // Define csrfToken state

  // useEffect(() => {
  //   const fetchCsrfToken = async () => {
  //     try {
  //       // Retrieve CSRF token from local storage
  //       const storedCsrfToken = localStorage.getItem("csrfToken");
  //       setCsrfToken(storedCsrfToken);
  //       console.log(storedCsrfToken);
  //     } catch (error) {
  //       console.error("Error fetching CSRF token:", error);
  //     }
  //   };
  //   fetchCsrfToken();
  // }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const storedCsrfToken = localStorage.getItem("csrfToken");
      console.log(storedCsrfToken);
      if (!name || !mobile || !email || !storedCsrfToken) {
        console.log("Please enter all fields");
        return;
      }

      const url = "http://localhost/REACTPWA/server/add_user.php";
      const formData = new FormData();
      formData.append("name", name);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("csrf_token", storedCsrfToken); // Include CSRF token in form data
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(formData);

      alert(response.data);
      toast.success("New User Added");
    } catch (err) {
      console.log("ERROR - ", err);
      toast.error("Error occurred while registering");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col px-4 md:px-52 mt-6">
        <h1 className="text-3xl font-bold mb-4">Add New User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              // className="form-input mt-1 active:border-blue-500 focus:border-red-600 block w-full h-10 rounded-md border-2"
              className="px-2 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="px-2 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className="block font-bold">
              Mobile:
            </label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={handleMobileChange}
              className="px-2 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="px-2 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            ADD USER
          </button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
