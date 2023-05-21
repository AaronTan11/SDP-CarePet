import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Services from "../components/PetServices/Services";
import styles from "../styles/pages/Home.module.scss";

export default function Home() {
   return (
      <>
         <Head>
            <title>CarePet</title>
            <meta name="description" content="CarePet's Official Website" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/Logo.svg" />
         </Head>
         <main className={styles.main}>
            <section className={styles.section1}>
               <div className={styles.welcome}>
                  Welcome to Care
                  <span className={styles.linearChar}>Pet</span>, Where Pets Are
                  Treated Like Family
               </div>
               <div className={styles.mainContent}>
                  This is your One-Stop Pet Care Destination for Everything You
                  need for Your Pet.
               </div>
               <Link href={"/signup"} className={styles.signUp}>
                  Sign Up Now
               </Link>
            </section>
            <section className={styles.section2}>
               <Image
                  src={"/GoldenRetriever.svg"}
                  width="410"
                  height="450"
               ></Image>
            </section>
         </main>

         <article className={styles.article1}>
            <div className={styles.atcContent1}>
               Malaysia's First{" "}
               <span className={styles.linearChar}>One-Stop</span> Pet Services
            </div>
            <div className={styles.services}>
               <Services
                  image={"/PetGroom.svg"}
                  title={"Pet Grooming"}
                  content="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
               />
               <Services
                  image={"/PetHome.svg"}
                  title={"Pet House"}
                  content="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
               />
               <Services
                  image={"/PetClinic.svg"}
                  title={"Pet Clinic"}
                  content="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
               />
               <Services
                  image={"/PetAdopt.svg"}
                  title={"Pet Adoption"}
                  content="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
               />
            </div>
         </article>

         <article className={styles.article2}></article>
      </>
   );
}
