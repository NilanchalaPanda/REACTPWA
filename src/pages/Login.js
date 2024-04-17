import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  async function handleOtpVerification(){
    const formData = new FormData();
    formData.append('otp',otp);

    const res = await fetch("http://localhost/REACTPWA/server/verify_otp.php",{
      method:"POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    const output = await res.json();
    console.log(output)
  }

  const handleLogin = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("http://localhost/REACTPWA/server/login.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        const { csrf_token, token } = response.data;
        toast.success("Logged In");
        // Store CSRF token in local storage
        localStorage.setItem("csrfToken", csrf_token);
        // Store JWT token in local storage
        localStorage.setItem("token", token);
        // Redirect to home page
        // window.location.href = "/home";
        setShow(true)
      })
      .catch((error) => {
        console.error("Login error: ", error);
      });
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
            name="email"
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
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="px-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
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
      {show &&
      <div>
      <label htmlFor="otp" className="block font-bold">
            One time password
      </label>
      <input
            type="test"
            name="otp"
            value={otp}
            onChange={handleOtpChange}
            className="px-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
          />
      <button
          type="button"
          onClick={handleOtpVerification}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Verify otp
        </button>
      </div>}
    </div>
  );
};

export default Login;
