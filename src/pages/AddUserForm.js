import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { json } from "react-router-dom";

export default function AddUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [online, setOnline] = useState(true);
  const [responses , setResponses]= useState([]);



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
   const storedData =JSON.parse(localStorage.getItem("responses"));
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

  async function submitResponse(response, online) {
    if (!online) {
      alert("your're offline");
      return;
    }

    const respo = response;
    let fr;
    const res = await fetch("http://127.0.0.1:5000/test", {
      method: "POST",
      body: JSON.stringify({ respo }),
      headers: {
        "Content-Type": "application/json",
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
    localStorage.removeItem('responses');
  }

  async function onSubmit(data) {
    console.log(data);
    setResponses((responses) => {
      return [...responses, data];
    });
    localStorage.setItem("responses", JSON.stringify(responses));
  }
  // console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Name"
        {...register("Name", {
          required: true,
          max: 20,
          min: 3,
          pattern: /^[a-zA-Z]+$/i,
        })}
        aria-invalid={errors["Name"] ? "true" : "false"}
      />
      <input
        type="email"
        placeholder="Email"
        {...register("Email", {
          required: true,
        })}
      />
      <input
        type="number"
        placeholder="Mobile no."
        {...register("Mobile no.", { required: true })}
      />
      <label>
        <span>Password</span>
        <input
          type="password"
          placeholder="Password"
          {...register("Password", {
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
      </label>

      <button type="submit">Add User</button>
    </form>
  );
}

// import { useForm } from "@beekai/react";

// export function AddUserForm() {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     formId: "16a71358-564c-4a45-be81-5a9485bf78c0",
//     defaultValues: {
//       name: "",
//       email: "",
//       mobile: "",
//     },
//   });

//   const onSubmit = data => console.log(data);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <h1>untitled</h1>

//       {errors.root?.serverError && (
//         <p>Something went wrong, and please try again.</p>
//       )}

//       <div>
//         <label>
//           <span>Name</span>
//           <input
//             {...register("name", {
//               maxLength: {
//                 value: 20,
//                 message: "Please reduce this text to less.",
//               },
//             })}
//             aria-invalid={errors["name"] ? "true" : "false"}
//             placeholder="Enter your name"
//             type="text"
//           />
//         </label>
//         {errors["name"] && <p role="alert">{errors["name"]?.message}</p>}
//       </div>

//       <div>
//         <label>
//           <span>Email</span>
//           <input
//             {...register("email", {
//               pattern: {
//                 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                 message: "Please match the format requested.",
//               },
//             })}
//             aria-invalid={errors["email"] ? "true" : "false"}
//             placeholder="Enter your email"
//             type="email"
//           />
//         </label>
//         {errors["email"] && <p role="alert">{errors["email"]?.message}</p>}
//       </div>

//       <div>
//         <label>
//           <span>Mobile no.</span>
//           {/* <input
//             {...register("mobile", {
//               required: "Please fill in this field.",
//               min: {
//                 value: 9,
//                 message: "Must be 10-digit",
//               },
//               max: {
//                 value: 12,
//                 message: "Must be 10-digit",
//               },
//             })}
//             aria-invalid={errors["mobile"] ? "true" : "false"}
//             type="number"
//           /> */}
// //       <input type="number" placeholder="Mobile no." {...register("Mobile no.", {required: true})} />

//         </label>
//         {errors["mobile"] && <p role="alert">{errors["mobile"]?.message}</p>}
//       </div>
//       <div>
//         <label>
//           <span>Password</span>

//           <input
//             type="password"
//             placeholder="Password"
//             {...register("Password", {
//               required: true,
//               max: 16,
//               min: 8,
//               pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
//             })}
//           />
//         </label>
//       </div>

//       <button type="submit" >Submit</button>
//     </form>
//   );
// }
