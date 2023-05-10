import Layout from "../components/Layout";
import styles from "../styles/main.scss";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
   return (
      <QueryClientProvider client={queryClient}>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </QueryClientProvider>
   );
}

export default App;
