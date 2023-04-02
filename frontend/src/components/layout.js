import Header from "./header/header.js";

export default function Layout({ children }) {
   return (
      <>
         <Header />
         <main>{children}</main>
      </>
   );
}
