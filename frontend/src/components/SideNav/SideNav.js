import Link from "next/link";
import styles from "./SideNav.module.scss";
import useUserData from "@/hooks/useUserData";
import { useState, useEffect } from "react";

export default function SideNav() {
   const [user, setUser] = useState(null);

   useEffect(() => {
      let storedUserData = null;
      try {
         storedUserData = JSON.parse(localStorage.getItem("userData"));
      } catch (error) {
         console.error("Error parsing user data from local storage:", error);
      }

      setUser(storedUserData ? storedUserData : null);
   }, []);

   const handleLogout = () => {
      localStorage.removeItem("userData");
   };
   return (
      <>
         <div className={styles.sidenav}>
            <div className={styles.sidenavContent}>
               <Link href='/user-dashboard/my-profile'>My Profile</Link>
               <Link href='/user-dashboard/service'>Pet Services</Link>
               <Link href='/user-dashboard/book-service'>Book Services</Link>
               {user && user.user_role === "admin" && (
                  <>
                     <Link href='/user-dashboard/add-staff'>Add Staff</Link>
                     {/* <Link href='/user-dashboard/adoption-approval'>Adoption Approval</Link> */}
                  </>
               )}
               {user &&
                  (user.user_role === "admin" ||
                     user.user_role === "staff") && (
                     <Link href='/user-dashboard/pets'>Pets</Link>
                  )}
               <Link href='/' onClick={handleLogout}>
                  Log Out
               </Link>
            </div>
         </div>
      </>
   );
}
