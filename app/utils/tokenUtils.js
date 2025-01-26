export const getUserFromToken = () => {
  if (typeof window === "undefined") return null; // Ensure it runs only on the client side

  const token = localStorage.getItem("token");
  if (!token) {
    return null; // Handle case where token doesn't exist
  }
  
  try {
    const user = JSON.parse(atob(token.split(".")[1])); // Decode the token
    return user; // Return user object
  } catch (error) {
    console.error("Invalid token:", error);
    return null; // Handle decoding errors
  }
};
