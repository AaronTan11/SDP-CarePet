import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";

export default function Header() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
   }, []);

   return (
      <>
         <header className={`${styles.header}`}>
            <div>
               <Link href={"/"}>
                  <Image
                     src="/Logo.svg"
                     alt="A Paw Logo of CarePet"
                     width="30"
                     height="30"
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
               {!isLoggedIn ? (
                  <>
                     <Link href={"/login"}>
                        <span className={`${styles.signIn}`}>Sign In</span>
                     </Link>
                     <Link href={"/signup"}>
                        <span className={`${styles.signUp}`}>Sign Up</span>
                     </Link>
                  </>
               ) : (
                  <Link href={"/UserProfile"}>
                     <Image
                        src="/Logo.svg"
                        alt="Profile picture"
                        width="30"
                        height="30"
                     />
                  </Link>
               )}
            </div>
         </header>
      </>
   );
}
