
// "use client";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useSession } from "next-auth/react";
// import { useAuth } from "../context/page";

// export default function App() {
//   const { data: session } = useSession();
//   const { login } = useAuth();
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [userdoesntexit, setuserdoesntexit] = useState(false);
//   const [userexists, setuserexists] = useState(false);
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   const onSubmit = async (data) => {
//     setuserdoesntexit(false);
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     let r = await fetch("/api/log", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     let res = await r.json();
//     console.log(res);
//     if (res.ok) {
//       console.log("Token in localStorage: ", localStorage.getItem("token"));
//       setuserexists(!userexists);
//       setTimeout(() => {
//         localStorage.setItem("token", res.token);
//         console.log(
//           "Token after timeout in localStorage: ",
//           localStorage.getItem("token")
//         );
//       }, 1000);

//       // Decode the JWT token (this assumes it's a valid JWT)
//       const user = JSON.parse(atob(res.token.split(".")[1]));
//       console.log("Logged in as:", user.email);
//       login(res.token,user);
//       // Optional: Redirect to another page after successful login
//       router.push("/counter");
//     } else {
//       setuserdoesntexit(!userdoesntexit);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center w-full h-full">
//       <div className="">
//         {isSubmitting && (
//           <div className="bg-500 text-black p-2 text-center">Loading...</div>
//         )}

//         {userdoesntexit && <div>User doesn't exist</div>}

//         {/* Title */}
//         <h1 className="text-center text-white font-semibold text-3xl mb-6">
//           Login
//         </h1>

//         {/* Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Email Input */}
//           <div>
//             <input
//               {...register("email", { required: true })}
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Email"
//               className="w-96 p-3 rounded-lg border border-gray-700 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//             />
//             {errors.email && (
//               <span className="block text-twilight text-sm mt-1">
//                 Email is required!
//               </span>
//             )}
//           </div>

//           {/* Username Input */}
//           <div>
//             <input
//               {...register("name", { required: true })}
//               id="name"
//               name="name"
//               type="name"
//               placeholder="Username"
//               className="w-96 p-3 rounded-lg border border-gray-700 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//             />
//             {errors.name && (
//               <span className="block text-twilight text-sm mt-1">
//                 Pick a username, Nerd!
//               </span>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               className="w-full mt-4 text-black font-bold py-3 rounded-[50px] hover:bg-blue-500 transition duration-200 border border-black border-x-2 text-center bg-white"
//               disabled={isSubmitting}
//             >
//               Login
//             </button>
//           </div>
//         </form>

//         {/* Google Login Button */}
//         <button
//           onClick={() => signIn("google", { callbackUrl: "/counter" })}
//           className="w-full mt-4 text-black font-bold py-3 rounded-[50px] hover:bg-blue-500 transition duration-200 border border-black border-x-2 text-center bg-white"
//         >
//           <div className="flex justify-center gap-2">
//             <img src="/google.png" alt="" className="w-7 h-7" />
//             Login with Google
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// }

// // export default function App() {
// //   const { data: session } = useSession();
// //   const { login } = useAuth();
// //   const [email, setemail] = useState("");
// //   const [password, setpassword] = useState("");
// //   const [userdoesntexit, setuserdoesntexit] = useState(false);
// //   const [userexists, setuserexists] = useState(false);
// //   const router = useRouter();

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors, isSubmitting },
// //   } = useForm();

// //   const onSubmit = async (data) => {
// //     setuserdoesntexit(false);
// //     await new Promise((resolve) => setTimeout(resolve, 2000));
// //     let r = await fetch("/api/log", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(data),
// //     });
// //     let res = await r.json();
// //     console.log(res);
// //     if (res.ok) {
// //       console.log("Token in localStorage: ", localStorage.getItem("token"));
// //       setuserexists(!userexists);
// //       setTimeout(() => {
// //         localStorage.setItem("token", res.token);
// //         console.log(
// //           "Token after timeout in localStorage: ",
// //           localStorage.getItem("token")
// //         );
// //       }, 1000);

// //       // Decode the JWT token (this assumes it's a valid JWT)
// //       const user = JSON.parse(atob(res.token.split(".")[1]));
// //       console.log("Logged in as:", user.email);
      
// //       // Pass the token and user to the login function
// //       login(res.token, user);

// //       // Optional: Redirect to another page after successful login
// //       router.push("/counter");
// //     } else {
// //       setuserdoesntexit(!userdoesntexit);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center w-full h-full">
// //       <div className="">
// //         {isSubmitting && (
// //           <div className="bg-500 text-black p-2 text-center">Loading...</div>
// //         )}

// //         {userdoesntexit && <div>User doesn't exist</div>}

// //         {/* Title */}
// //         <h1 className="text-center text-white font-semibold text-3xl mb-6">
// //           Login
// //         </h1>

// //         {/* Form */}
// //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //           {/* Email Input */}
// //           <div>
// //             <input
// //               {...register("email", { required: true })}
// //               id="email"
// //               name="email"
// //               type="email"
// //               placeholder="Email"
// //               className="w-96 p-3 rounded-lg border border-gray-700 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
// //             />
// //             {errors.email && (
// //               <span className="block text-twilight text-sm mt-1">
// //                 Email is required!
// //               </span>
// //             )}
// //           </div>

// //           {/* Username Input */}
// //           <div>
// //             <input
// //               {...register("name", { required: true })}
// //               id="name"
// //               name="name"
// //               type="name"
// //               placeholder="Username"
// //               className="w-96 p-3 rounded-lg border border-gray-700 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
// //             />
// //             {errors.name && (
// //               <span className="block text-twilight text-sm mt-1">
// //                 Pick a username, Nerd!
// //               </span>
// //             )}
// //           </div>

// //           {/* Submit Button */}
// //           <div>
// //             <button
// //               type="submit"
// //               className="w-full mt-4 text-black font-bold py-3 rounded-[50px] hover:bg-blue-500 transition duration-200 border border-black border-x-2 text-center bg-white"
// //               disabled={isSubmitting}
// //             >
// //               Login
// //             </button>
// //           </div>
// //         </form>

// //         {/* Google Login Button */}
// //         <button
// //           onClick={() => signIn("google", { callbackUrl: "/counter" })}
// //           className="w-full mt-4 text-black font-bold py-3 rounded-[50px] hover:bg-blue-500 transition duration-200 border border-black border-x-2 text-center bg-white"
// //         >
// //           <div className="flex justify-center gap-2">
// //             <img src="/google.png" alt="" className="w-7 h-7" />
// //             Login with Google
// //           </div>
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useAuth } from "../context/page";

export default function App() {
  const { data: session } = useSession();
  const { login } = useAuth();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userdoesntexit, setuserdoesntexit] = useState(false);
  const [userexists, setuserexists] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setuserdoesntexit(false);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    let r = await fetch("/api/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await r.json();
    console.log(res);
    if (res.ok) {
      console.log("Token in localStorage: ", localStorage.getItem("token"));
      setuserexists(!userexists);
      setTimeout(() => {
        localStorage.setItem("token", res.token);
        console.log(
          "Token after timeout in localStorage: ",
          localStorage.getItem("token")
        );
      }, 1000);

      // Decode the JWT token (this assumes it's a valid JWT)
      const user = JSON.parse(atob(res.token.split(".")[1]));
      console.log("Logged in as:", user.email);
      login(res.token, user);
      // Optional: Redirect to another page after successful login
      router.push("/counter");
    } else {
      setuserdoesntexit(!userdoesntexit);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <div className="w-full max-w-md p-6 bg-white border border-gray-400 rounded-lg shadow-md">
        {isSubmitting && (
          <div className="bg-blue-500 text-white p-2 text-center">Loading...</div>
        )}

        {userdoesntexit && <div className="text-red-500 text-center">User doesn't exist</div>}

        {/* Title */}
        <h1 className="text-center text-gray-800 font-semibold text-3xl mb-6">Login</h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              {...register("email", { required: true })}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
            {errors.email && (
              <span className="block text-red-500 text-sm mt-1">Email is required!</span>
            )}
          </div>

          {/* Username Input */}
          <div>
            <input
              {...register("name", { required: true })}
              id="name"
              name="name"
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded-lg border border-gray-500 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
            {errors.name && (
              <span className="block text-red-500 text-sm mt-1">Pick a username, Nerd!</span>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full mt-4 text-black font-bold py-3 rounded-[50px] hover:bg-blue-500 transition duration-200 border border-black border-x-2 text-center bg-white"
              disabled={isSubmitting}
            >
              Login
            </button>
          </div>
        </form>

        {/* Google Login Button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full mt-4 text-black font-bold py-3 rounded-[50px] hover:bg-blue-500 transition duration-200 border border-black border-x-2 text-center bg-white"
        >
          <div className="flex justify-center gap-2">
            <img src="/google.png" alt="" className="w-7 h-7" />
            Login with Google
          </div>
        </button>
      </div>
    </div>
  );
}
