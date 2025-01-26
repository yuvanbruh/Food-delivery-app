"use client"
import { useForm } from "react-hook-form"
// import Router from "next/navigation"
import { useRouter } from "next/navigation"
// import <Register></Register>
// import <Register></Register>

export default function App() {
    const router= useRouter();
    const goin=()=>{
      router.push("/username")
    }
    const gothro=()=>{
        router.push("/login")
    }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors ,isSubmitting },
  } = useForm()


  const onSubmit = async(data)=>{
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
   let r= await fetch("/api/registers", {method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
   })
   let res = await r.json()
   console.log(res)
   
  }


//   console.log(watch("example")) // watch input value by passing the name of it


  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
      {isSubmitting && <div className="bg-gray-500 text-white p-2 text-center">Loading...</div>}
        {/* Title */}
        <h1 className="text-center text-blue-600 font-semibold text-3xl mb-6">
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
              className="w-full p-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.email && (
              <span className="block text-red-500 text-sm mt-1">
                Email is required!
              </span>
            )}
          </div>

          {/* Password Input */}
          <div>
            <input
              {...register("password", { required: true })}
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.password && (
              <span className="block text-red-500 text-sm mt-1">
                Password is required!
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-500 transition duration-200" onClick={goin} disabled={isSubmitting}
          >
            Next
          </button>
        </form>

        {/* Google Login Button */}
        <button
          className="w-full mt-4  text-dark font-bold py-2 rounded-lg hover:bg-red-500 transition duration-200 border border-black border-x-2 text-center" onClick={gothro}
        >
            <div className="flex justify-center gap-2"><img src="/google.png" alt="" className="w-7 h-7" />
            Login with Google</div>
            
        </button>
      </div>
    </div>

  )
}