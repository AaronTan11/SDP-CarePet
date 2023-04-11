import Link from "next/link";
import Image from "next/image";
import HeaderStyles from "../../styles/components/Header.module.scss";

export default function Header() {
   return (
      <>
         <nav className={HeaderStyles.heroNav}>
            <div>
               <Link href={"/"}>
                  <Image
                     src="/Logo.png"
                     alt="A Paw Logo of CarePet"
                     width="30"
                     height="30"
                  />
                  <span className={HeaderStyles.logo}>
                     Care<span className={HeaderStyles.logoTitle}>Pet</span>
                  </span>
               </Link>
            </div>
            <div>
               <Link href={"/"} className={HeaderStyles.navItems}>
                  Home
               </Link>
               <Link href={"/"} className={HeaderStyles.navItems}>
                  About
               </Link>
               <Link href={"/"} className={HeaderStyles.navItems}>
                  Blog
               </Link>
               <Link href={"/"} className={HeaderStyles.navItems}>
                  Services
               </Link>
            </div>
            <div>
               <span className={HeaderStyles.navButtons}>Sign In</span>
               <button className={HeaderStyles.navButtons}>Sign Up</button>
            </div>
         </nav>
      </>
   );
}
