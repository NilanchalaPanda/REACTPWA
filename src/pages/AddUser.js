import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
    setResponses(storedData);
  }, []);

  useEffect(
    function () {
      if (online) {
        responses.map((response) => submitResponse(response, navigator.onLine));
        // setResponses([]);
      }
    },
    [online, responses]
  );

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

  async function submitResponse(response, online) {
    try{
         const token = localStorage.getItem("token");
      const storedCsrfToken = localStorage.getItem("csrfToken");
      console.log(storedCsrfToken);
      // if (!name || !mobile || !email || !storedCsrfToken) {
      //   console.log("Please enter all fields");
      //   return;
      // }

      const url = "http://localhost/REACTPWA/server/add_user.php";
      const formData = new FormData();
      formData.append("name", response.name);
      formData.append("mobile", response.mobile);
      formData.append("email", response.email);
      formData.append("password", response.password);
      formData.append("csrf_token", storedCsrfToken); 
    if (!online) {
      alert("your're offline");
      return;
    }

    // const respo = response;
    let fr;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const output = await res.json();
    console.log(output);
    setResponses((responses) => {
      fr = responses.filter((resp) => {
        if (resp.Name != response.Name) return resp;
      });
      return fr;
    });
    localStorage.removeItem("responses");
  } catch(errors) {
    console.log(errors)
  }
  }

  async function onSubmit(data) {
    console.log(data);
    setResponses((responses) => {
      return [...responses, data];
    });
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
              placeholder="name"
              className="px-2 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
              {...register("name", {
                required: true,
                max: 20,
                min: 3,
                pattern: /^[a-zA-Z]+$/i,
              })}
              aria-invalid={errors["Name"] ? "true" : "false"}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold">
              Email:
            </label>
            <input
              type="email"
              placeholder="email"
              className="px-2 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
              {...register("email", {
                required: true,
              })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className="block font-bold">
              Mobile:
            </label>
            <input
              type="text"
              placeholder="mobile"
              className="px-2 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"
              {...register("mobile", { required: true })}
            />
            {/* <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={handleMobileChange}
            /> */}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold">
              Password:
            </label>
            <input
              type="password"
              placeholder="password"
              className="px-2 focus:outline-none focus:ring focus:ring-blue-300 block w-full h-10 rounded-md border-2 border-gray-300"

              {...register("password", {
                required: true,
                max: 16,
                min: 8,
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                  message:
                    "Password should be atleast 8 characters, it should contain one uppercase and a special character",
                },
              })}
              aria-invalid={errors["Password"] ? "true" : "false"}
            />
             {errors["Password"] && (
          <p role="alert">{errors["Password"]?.message}</p>
        )}
            {/* <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            /> */}
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
