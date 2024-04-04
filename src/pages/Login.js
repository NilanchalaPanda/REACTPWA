import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Perform login logic here, such as sending data to a server
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex flex-col px-3 md:px-52 mt-6 h-screen">
      <h1 className="text-3xl font-normal mb-4">Login</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold">
            Email ID:
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
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
