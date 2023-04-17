import Head from "next/head";

export default function HeadMeta() {
   return (
      <>
         <Head>
            <title>CarePet</title>
            <meta
               name="description"
               content="This is a One-Stop Platform for Pets"
            />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/Logo.svg" />
         </Head>
      </>
   );
}
