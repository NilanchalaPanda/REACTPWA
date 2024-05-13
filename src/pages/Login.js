import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { Cookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //eslint-disable-next-line
  const cookies = new Cookies();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  async function handleOtpVerification() {
    const formData = new FormData();
    formData.append("otp", otp);

    try {
      const response = await axios.post(
        "http://localhost/REACTPWA/server/login.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Enable sending cookies
        }
      );

      console.log("handleOtpVerification : ", response.data);

      if (!response.data.success) {
        return toast.error(response.data.message);
      } else {
        navigate("/home");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Login error: ", error);
    }
  }

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost/REACTPWA/server/login.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Enable sending cookies
        }
      );

      console.log(response.data);

      if (!response.data.success) {
        return toast.error(`${response.data.message}`);
      }

      const { csrf_token, token } = response.data;
      cookies.set("myCookie", csrf_token, { path: "/" });

      isLoading && toast("Loading...");
      setIsLoading(false);

      localStorage.setItem("csrfToken", csrf_token);
      localStorage.setItem("token", token);

      if (response.data.success) {
        toast.success("OTP Sent");
        setShow(true);
      } else {
        toast.error("Please enter correct credentials");
      }
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://localhost/REACTPWA/server/login.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Enable sending cookies
        }
      );

      if (!response.data.success) {
        return toast.error("Network response was not ok");
      }

      const { csrf_token, token } = response.data;

      localStorage.setItem("csrfToken", csrf_token);
      localStorage.setItem("token", token);
      if (response.data.success) {
        toast.success("OTP Sent");
        setShow(true);
      } else {
        toast.error("Please enter correct credentials");
      }
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="flex flex-col px-3 md:px-52 mt-6 h-screen relative">
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

      {isLoading && (
        <div className="flex justify-center items-center gap-x-2">
          <PulseLoader size={10} color="blue" />
          <span className="text-bold">Loading OTP...</span>
        </div>
      )}

      {show && (
        <div className="mt-8">
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
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Verify otp
          </button>
          <span
            onClick={handleResend}
            className="ml-4 underline text-black cursor-pointer hover:text-blue-500"
          >
            Resend
          </span>
        </div>
      )}
    </div>
  );
};

export default Login;
