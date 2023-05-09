import Layout from "../components/Layout";
import styles from "../styles/main.scss";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../components/Query/queryClient";

export default function App({ Component, pageProps }) {
   return (
      <Layout>
         <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
         </QueryClientProvider>
      </Layout>
   );
}
