// _app.js
import { useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/main.scss";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../components/Query/queryClient";

function App({ Component, pageProps }) {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const loginHandler = () => {
      setIsLoggedIn(true);
   };

   const logoutHandler = () => {
      setIsLoggedIn(false);
   };

   return (
      <Layout
         authProviderProps={{
            value: {
               isLoggedIn: isLoggedIn,
               onLogin: loginHandler,
               onLogout: logoutHandler,
            },
         }}
      >
         <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
         </QueryClientProvider>
      </Layout>
   );
}

export default App;
