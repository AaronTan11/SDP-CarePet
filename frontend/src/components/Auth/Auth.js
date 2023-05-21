import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Auth(WrappedComponent, roles) {
   return function (props) {
      const router = useRouter();

      useEffect(() => {
         const storedUser = JSON.parse(localStorage.getItem("userData"));
         if (!storedUser || !roles.includes(storedUser.user_role)) {
            router.replace("/login");
         }
      }, []);

      const storedUser = JSON.parse(localStorage.getItem("userData"));
      if (storedUser && roles.includes(storedUser.user_role)) {
         return <WrappedComponent {...props} />;
      } else {
         return null;
      }
   };
}
