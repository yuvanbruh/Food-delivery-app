// "use client"
// import React, { useEffect , useState} from 'react'

// const Profile = () => {
//   const [profile, setprofile] = useState([])
//   useEffect(()=>{
//    const fetchpro= async()=>{
//     const response = await fetch("/api/log")
//     const data = await response.json()
//     console.log("fetched data", data)
//     setprofile(data)
//    }
//    fetchpro()
//   },[])
//   return (
//     <div className=''>
//       {profile.map((e)=>(
//         <article key={e._id}>
//           <h2 className='font-dark font-semibold'>{e.name}</h2>
//         </article>
//       ))}
//     </div>
//   )
// }
// export default Profile
import React from 'react'

const Profile = () => {
  return (
    <div>
      this is profile
    </div>
  )
}

export default Profile
