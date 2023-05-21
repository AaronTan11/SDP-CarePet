import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useUserData(userId) {
   return useQuery({
      queryKey: ["userData", userId],
      queryFn: async () => {
         const response = await axios.get(
            `http://localhost:5000/api/user/${userId}`
         );
         return response.data;
      },
      enabled: !!userId,
   });
}
