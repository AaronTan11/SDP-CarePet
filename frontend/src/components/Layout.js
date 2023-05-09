// components/Layout.js
import { useRouter } from "next/router.js";
import Header from "./Header/Header.js";
import HeadMeta from "./HeadMeta.js";

export default function Layout({ children, authProviderProps }) {
   const router = useRouter();

   const showHeader = router.pathname === "/" ? true : false;

   return (
      <>
         <HeadMeta />

         {showHeader && <Header />}
         <main>{children}</main>
      </>
   );
}
