// import React from 'react'
// import Link from 'next/link'
// const gettopics=async()=>{
//   const res= await fetch("http://127.0.0.1:3000/api/user/",{cache:"no-store"})

//   if(!res.ok){
//     throw new Error("failed to fetch topics")
//   }
//   return res.json()

// }
// const page = async() => {
//   const {topics}= await gettopics()

//   return (
// <>
// {topics.map((t)=>(
//    <div>
//     {/* hi ther */}

//    {t.name}
//    {t.password}

//  </div>
// ))}
// </>
//   )
// }
// export default page

import React from 'react'

const page = () => {
  return (
    <div>
      this is counter
    </div>
  )
}

export default page

