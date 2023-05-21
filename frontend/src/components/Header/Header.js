import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";
import useUserData from "@/hooks/useUserData";
import { useState, useEffect } from "react";

export default function Header() {
   const [userId, setUserId] = useState(null);
   const [username, setUsername] = useState(null);

   useEffect(() => {
      let storedUserData = null;
      try {
         storedUserData = JSON.parse(localStorage.getItem("userData"));
      } catch (error) {
         console.error("Error parsing user data from local storage:", error);
      }

      setUserId(storedUserData ? storedUserData.user_id : null);
      setUsername(storedUserData ? storedUserData.username : null);
   }, []);

   const { isError, data, error } = useUserData(userId);

   if (isError) {
      return <span>Error: {error.message}</span>;
   }

   return (
      <header className={`${styles.header}`}>
         <div>
            <Link href={"/"}>
               <Image
                  src='/Logo.svg'
                  alt='A Paw Logo of CarePet'
                  width='30'
                  height='30'
               />
               <span className={`${styles.logo}`}>
                  Care<span className={`${styles.logoTitle}`}>Pet</span>
               </span>
            </Link>
         </div>
         <nav>
            <Link href={"/"} className={`${styles.navItems}`}>
               Home
            </Link>
            <Link href={"/"} className={`${styles.navItems}`}>
               Adoption
            </Link>
            <Link href={"/"} className={`${styles.navItems}`}>
               Blog
            </Link>
            <Link href={"/"} className={`${styles.navItems}`}>
               Services
            </Link>
         </nav>
         <div>
            {!data ? (
               <>
                  <Link href={"/login"}>
                     <span className={`${styles.signIn}`}>Sign In</span>
                  </Link>
                  <Link
                     href={{
                        pathname: "/signup/[type]",
                        query: { type: "user" },
                     }}
                  >
                     <span className={`${styles.signUp}`}>Sign Up</span>
                  </Link>
               </>
            ) : (
               <>
                  <Link
                     href={{
                        pathname: "/user-dashboard/[username]",
                        query: { username: username },
                     }}
                  >
                     <Image
                        src={data.profile_pic}
                        alt='Profile picture'
                        width='30'
                        height='30'
                     />
                  </Link>
               </>
            )}
         </div>
      </header>
   );
}
