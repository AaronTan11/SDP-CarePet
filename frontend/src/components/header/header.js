import Link from "next/link";
import Image from "next/image";
import HeaderStyles from "../../styles/components/Header.module.scss";

export default function Header() {
   return (
      <>
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
         <div>Home About Support Blog</div>
         <div>Sign In</div>
      </>
   );
}
