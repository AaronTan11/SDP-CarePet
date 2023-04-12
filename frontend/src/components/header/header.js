import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/components/Header.module.scss";

export default function Header() {
   return (
      <>
         <nav className={`${styles.heroNav}`}>
            <div>
               <Link href={"/"}>
                  <Image
                     src="/Logo.png"
                     alt="A Paw Logo of CarePet"
                     width="30"
                     height="30"
                  />
                  <span className={`${styles.logo}`}>
                     Care<span className={`${styles.logoTitle}`}>Pet</span>
                  </span>
               </Link>
            </div>
            <div>
               <Link href={"/"} className={`${styles.navItems}`}>
                  Home
               </Link>
               <Link href={"/about"} className={`${styles.navItems}`}>
                  About
               </Link>
               <Link href={"/"} className={`${styles.navItems}`}>
                  Blog
               </Link>
               <Link href={"/"} className={`${styles.navItems}`}>
                  Services
               </Link>
            </div>
            <div>
               <span className={`${styles.navButtons} ${styles.logoTitle}`}>
                  Sign In
               </span>
               <span className={`${styles.navButtons}`}>Sign Up</span>
            </div>
         </nav>
      </>
   );
}
