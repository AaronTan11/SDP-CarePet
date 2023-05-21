import { useRouter } from "next/router.js";
import Header from "./Header/Header.js";
import HeadMeta from "./HeadMeta.js";

export default function Layout({ children }) {
   const router = useRouter();

   const pathsToShowHeader = ["/", "/about", "/contact"];

   return (
      <>
         <HeadMeta />

         {pathsToShowHeader.includes(router.pathname) && <Header />}
         <main>{children}</main>
      </>
   );
}
