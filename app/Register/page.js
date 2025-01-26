"use client"
import { useForm } from "react-hook-form"
// import Router from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useSession,signIn,signOut } from "next-auth/react";
export default function App({ closeModal }) {
  const {data:session}= useSession()
  const [usercreated, setusercreated] = useState(false)
  const [userexists, setuserexists] = useState(false)
  const router = useRouter();
  // const goin = () => {
  //   // router.push("/google")

  //   closeModal() 
  // }
  const gothro = () => {
    router.push("/login")
    closeModal()
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()
  const onSubmit = async (data) => {
    setuserexists(false)
    console.log("form data",data)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    let r = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
   })
    let res = await r.json()
    console.log(res)
    if(res.ok){

      setuserexists(!userexists)
    }
    else{
      // alert(res.message)
      setusercreated(!usercreated)
    }

    //  closeModal();

  }


  //   console.log(watch("example")) // watch input value by passing the name of it


  return (
    <div className=" flex items-center justify-center bg-black w-full h-full ">
      <div className="">
        {isSubmitting && <div className="bg-gray-500 text-white p-2 text-center">Loading...</div>}
        {usercreated && (
          <div className="text-center">
            <p className="text-white font-semibold text-lg mb-4">
              User has been created successfully!
            </p>

          </div>

        )}
          {userexists && (
            <div className="text-white font-semibold text-lg mb-4">
            User already exists with the email 
            </div>
          ) }

        {/* Title */}
        <h1 className="text-center text-white font-semibold text-3xl mb-6">
          Create your account
        </h1>

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
              className="w-96 p-3 bg-black rounded-lg border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 "
            />
            {errors.email && (
              <span className="block text-twilight text-sm mt-1">
                Email is required!
              </span>
            )}
          </div>

          {/* Password Input */}
          <div>
            <input
              {...register("name", { required: true })}
              id="name"
              name="name"
              type="text"
              placeholder="Username"
              className="w-full p-3 bg-black rounded-lg border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
            {errors.name && (
              <span className="block text-twilight text-sm mt-1">
                pick a username , Nerd!
              </span>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-3 rounded-[50px] hover:bg-blue-500 transition duration-200" disabled={isSubmitting}
            // onClick={gothro}
            >
              Register
            </button>
          </div>
          {/* Submit Button */}
          {usercreated && (
             <div>
             <button
               onClick={gothro}
               className="w-full bg-blue-500 text-black font-bold py-3 rounded-[50px] hover:bg-blue-950 transition duration-200" 
             >
               Go to Login Page
             </button>
           </div>
          )}

        </form>
        <button
          className="w-full mt-4  text-black font-bold py-3 rounded-[50px]   hover:bg-blue-500 transition duration-200 border border-black border-x-2 text-center bg-white " onClick={()=> signIn("google", {callbackUrl:"/counter"})}
        >
          <div className="flex justify-center gap-2"><img src="/google.png" alt="" className="w-7 h-7" />
            Login with Google</div>
        </button>
        {/* Google Login Button */}
      </div>
    </div>
  )
}

