/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { BASE_URL } from '../main';
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  // console.log(user); 

  useEffect(() => {
    const fetchUser = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const result = await response.json();
        setUser(result.user); 
        // console.log(result); 
        

      } catch (error) {
        // console.error("Failed to fetch user:", error);  
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="flex flex-1 items-center justify-center text-[30px] font-bold mt-12"><p className="">  Loading...</p></div>; // Or a proper loading indicator
  }

  if (user && (user.user_type === "ADMIN" || user.user_type === "SUPER ADMIN")) {
    return children;
  }
  return <Navigate to="/auth/login" state={{ from: location }} />;
};

export default PrivateRoute;
