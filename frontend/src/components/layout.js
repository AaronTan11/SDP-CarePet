import Header from "./Header/Header.js";
import HeadMeta from "./HeadMeta.js";

export default function Layout({ children }) {
   return (
      <>
         <HeadMeta />
         <Header />
         <main>{children}</main>
      </>
   );
}
