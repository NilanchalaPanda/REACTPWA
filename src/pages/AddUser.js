import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [online, setOnline] = useState(true);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []); // Empty dependency array ensures the effect runs only once during component mount and unmount

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("responses"));
    setResponses(storedData ? storedData : []);
  }, []);

  useEffect(
    function () {
      if (online) {
        toast.success("You are back online");
        responses?.map((response) =>
          submitResponse(response, navigator.onLine)
        );
        // setResponses([]);
      }
      if (!online) {
        toast.error("You're offline");
        return;
      }
    },
    [online, responses]
  );

  async function submitResponse(response, online) {
    try {
      const token = localStorage.getItem("token");
      const storedCsrfToken = localStorage.getItem("csrfToken");
      const url = "http://localhost/REACTPWA/server/add_user.php";

      // Create FormData object
      const formData = new FormData();
      formData.append("name", response.name);
      formData.append("mobile", response.mobile);
      formData.append("email", response.email);
      formData.append("password", response.password);
      formData.append("csrf_token", storedCsrfToken); 
      // if (!online) {
      //   toast.error("You're offline");
      //   toast.loading("Response recorded");
      //   return;
      // }

      // Send the form data with fetch
      const res = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          // Don't need Content-Type header for FormData
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // Enable sending cookies
      });

      const outPut = await res.text();
      const output = JSON.parse(outPut);
      if (res.ok) {
        // console.log(output);
        setResponses((responses) => {
          const filteredResponses = responses.filter(
            (resp) => resp.name !== response.name
          );
          return filteredResponses;
        });
        toast.success(output.message);
        localStorage.removeItem("responses");
      } else {
        // Handle error response
        toast.success(output.message);
        // console.error("Failed to add user:", await res.text());
      }
    } catch (error) {
      toast.success("Error occcured");
      console.error("Error:", error);
    }
  }

  async function onSubmit(data) {
    console.log(data);

    setResponses((responses) => {
      return [...responses, data];
    });
    toast.success("Response recorded");

    localStorage.setItem("responses", JSON.stringify(responses));
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = localStorage.getItem("token");
  //     const storedCsrfToken = localStorage.getItem("csrfToken");
  //     console.log(storedCsrfToken);
  //     if (!name || !mobile || !email || !storedCsrfToken) {
  //       console.log("Please enter all fields");
  //       return;
  //     }

  //     const url = "http://localhost/REACTPWA/server/add_user.php";
  //     const formData = new FormData();
  //     formData.append("name", name);
  //     formData.append("mobile", mobile);
  //     formData.append("email", email);
  //     formData.append("password", password);
  //     formData.append("csrf_token", storedCsrfToken); // Include CSRF token in form data
  //     const response = await axios.post(url, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(formData);

  //     alert(response.data);
  //     toast.success("New User Added");
  //   } catch (err) {
  //     console.log("ERROR - ", err);
  //     toast.error("Error occurred while registering");
  //   }
  // };

  return (
    <>
      <Navbar />
      <div className="flex flex-col px-4 md:px-52 mt-6">
        <h1 className="text-3xl font-bold mb-4">Add New User</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold">
              Name:
            </label>
            <input
              type="text"
              placeholder="Name"
              className="px-2 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
              {...register("name", {
                required: true,
                max: 20,
                min: 3,
                pattern: /^[a-zA-Z]+$/i,
              })}
              aria-invalid={errors["name"] ? "true" : "false"}
            />
            {errors["name"] && (
              <p className="text-red-600 font-semibold mt-1 text-sm font-mono">
                Name with no space
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold">
              Email:
            </label>
            <input
              type="email"
              placeholder="Email ID"
              className="px-2 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 font-semibold mt-1 text-sm font-mono">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="mobile" className="block font-bold">
              Mobile:
            </label>
            <input
              type="text"
              placeholder="Mobile Number"
              className="px-2 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
              {...register("mobile", {
                required: true,
                pattern: {
                  value: /^[0-9]{10}$/, // Regular expression to match exactly 10 digits
                  message: "Mobile number must be exactly 10 digits long",
                },
              })}
            />
            {errors.mobile && (
              <p className="text-red-600 font-semibold mt-1 text-sm font-mono">
                {errors.mobile.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-bold">
              Password:
            </label>
            <input
              type="password"
              placeholder="Password"
              className="px-2 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
              {...register("password", {
                required: true,
                max: 16,
                min: 8,
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                  message:
                    "Password should be atleast 8 to 16 characters, one uppercase letter, one lowercase letter, one number and a special character (@$!%*?&)",
                },
              })}
              aria-invalid={errors["password"] ? "true" : "false"}
            />
            {errors["password"] && (
              <p
                className="text-red-600 font-semibold mt-1 text-sm font-mono"
                role="alert"
              >
                {errors.password?.message}
              </p>
            )}
            {/* {errors.password && <p role="alert">{errors.password?.message}</p>} */}
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
