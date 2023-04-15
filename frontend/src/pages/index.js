import Head from "next/head";
import Image from "next/image";
import Services from "../components/PetServices/Services";
import homeStyle from "../styles/Home.module.scss";

export default function Home() {
   return (
      <>
         <Head>
            <title>CarePet</title>
            <meta name="description" content="Generated by create next app" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/Logo.png" />
         </Head>
         <main className={homeStyle.main}>
            <section className={homeStyle.section1}>
               <div className={homeStyle.welcome}>
                  Welcome to Care
                  <span className={homeStyle.linearChar}>Pet</span>, Where Pets
                  Are Treated Like Family
               </div>
               <div className={homeStyle.mainContent}>
                  This is your One-Stop Pet Care Destination for Everything You
                  need for Your Pet.
               </div>
               <div className={homeStyle.signUp}>Sign Up Now</div>
            </section>
            <section className={homeStyle.section2}>
               <Image src={"/HeroPic.png"} width="410" height="450"></Image>
            </section>
         </main>

         <article className={homeStyle.article1}>
            <div className={homeStyle.atcContent1}>
               Malaysia's First{" "}
               <span className={homeStyle.linearChar}>One-Stop</span> Pet
               Services
            </div>
            <div className={homeStyle.services}>
               <Services
                  image={"/PetGroom.png"}
                  title={"Pet Grooming"}
                  content="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
               />
               <Services
                  image={"/PetGroom.png"}
                  title={"Pet Grooming"}
                  content="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
               />
               <Services
                  image={"/Veterinary.png"}
                  title={"Pet Grooming"}
                  content="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
               />
               <Services
                  image={"/PetGroom.png"}
                  title={"Pet Grooming"}
                  content="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
               />
            </div>
         </article>
      </>
   );
}
