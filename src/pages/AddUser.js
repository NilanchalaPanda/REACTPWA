import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

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
      console.log("Token:", token);

      console.log(name, mobile, email);
      if (!name || !mobile || !email) {
        console.log("Please enter all fields");
        return;
      }

      const url = "http://localhost/REACTPWA/server/add_user.php";
      const formData = new FormData();
      formData.append("name", name);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

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
              className="form-input mt-1 block w-full h-10 rounded-md border-gray-300 border-2"
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
              className="form-input mt-1 block w-full h-10 rounded-md border-gray-300 border-2"
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
              className="form-input mt-1 block w-full h-10 rounded-md border-gray-300 border-2"
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
              className="form-input mt-1 block w-full h-10 rounded-md border-gray-300 border-2"
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
