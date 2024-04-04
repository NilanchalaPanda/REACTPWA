import React, { useState } from "react";
import Navbar from "../components/Navbar";

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

  const handleAddUser = () => {
    // Perform logic to add user here, such as sending data to a server
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Mobile:", mobile);
    console.log("Password:", password);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col px-52 mt-6">
        <h1 className="text-3xl font-bold mb-4">Add New User</h1>
        <form>
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
            type="button"
            onClick={handleAddUser}
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
