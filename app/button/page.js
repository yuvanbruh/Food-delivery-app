"use client";

import React, { useEffect, useState } from "react";
// import { getUserFromToken } from "@/utils/auth";
import { getUserFromToken } from "../utils/tokenUtils";

const AnotherPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [username, setusername] = useState("")

  useEffect(() => {
    const user = getUserFromToken(); // Retrieve user info from token
    if (user) {
      setUserEmail(user.email);
      setusername(user.name)
    }
  }, []); // Runs once on component mount

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Another Page</h1>
      {userEmail ? (
        <p>Logged in as: {userEmail}
        name is {username}
        </p>
        // <p>the</p>
      ) : (
        <p>You are not logged in.</p>
      )}
      <button className="mt-4 p-2 bg-blue-500 text-white rounded">Click Me</button>
    </div>
  );
};

export default AnotherPage;
