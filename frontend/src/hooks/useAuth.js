import { useState, useEffect } from "react";
import axios from "axios";

export function useAuth() {
   const [user, setUser] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchUser = async () => {
         const user_id = localStorage.getItem("user_id");
         if (user_id) {
            try {
               const response = await axios.get(
                  `http://localhost:5000/api/user/${user_id}`
               );
               setUser(response.data);
            } catch (error) {
               console.error("Error fetching user data:", error);
            }
         }
         setIsLoading(false);
      };
      fetchUser();
   }, []);

   return { user, isLoading };
}
