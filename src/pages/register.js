import React, { useState, useEffect } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const fetchCsrfToken = () => {
    axios
      .get("http://localhost/REACTPWA/server/csrf_token.php")
      .then((response) => {
        setCsrfToken(response.data.csrf_token);
        console.log(response.data.csrf_token);
      })
      .catch((error) => {
        console.error("Error fetching CSRF token: ", error);
      });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(name, mobile, email);
      if (!name || !mobile || !email) {
        console.log("Please enter all fields");
        return;
      }

      const url = "http://localhost/REACTPWA/server/register.php";
      const formData = new FormData();
      formData.append("name", name);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("csrf_token", csrfToken); // Include CSRF token

      axios
        .post(url, formData)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));

      alert("Successfully registered");
    } catch (err) {
      console.log("ERROR - ", err);
    }
  };

  return (
    <div className="flex flex-col px-4 md:px-52 mt-6 h-screen">
      <h1 className="text-3xl font-normal mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="csrf_token" value={csrfToken} />
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="px-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block font-bold">
            Mobile Number:
          </label>
          <input
            type="number"
            id="mobile"
            value={mobile}
            onChange={handleMobileChange}
            className="px-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold">
            Email ID:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="px-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
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
            className="px-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
          />
        </div>
        <div className="flex space-x-4 items-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            REGISTER
          </button>

          <p className="text-md">
            Already have an account?{" "}
            <span>
              <a className="text-black underline" href="/login">
                LOGIN
              </a>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
