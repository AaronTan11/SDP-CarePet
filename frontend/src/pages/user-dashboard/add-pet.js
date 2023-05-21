import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import style from "@/pages/signup/signup.module.scss";

export default function PetRegistration() {
   const [petname, setPetName] = useState("");
   const [description, setDescription] = useState("");

   const router = useRouter();

   const registerPet = async (petData) => {
      const response = await axios.post(
         "http://localhost:5000/api/add-pet",
         petData
      );
      return response.data;
   };
   const mutation = useMutation(registerPet, {
      onSuccess: (data) => {
         console.log(data);
         router.back();
      },
      onError: (error) => {
         console.error("Error during pet registration:", error);
      },
   });

   const handleSubmit = (e) => {
      e.preventDefault();

      mutation.mutate({ petname, description });

      console.log({ petname, description });
   };

   return (
      <>
         <div className={style.container}>
            <div className={style.subContainer}>
               <section className={style.section1}>
                  <h1>Register a Pet</h1>
                  <form>
                     <input
                        type='text'
                        placeholder='Pet Name'
                        value={petname}
                        onChange={(e) => setPetName(e.target.value)}
                        required
                     />
                     <input
                        type='text'
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                     />
                     <button
                        type='submit'
                        className={style.submitButton}
                        onClick={handleSubmit}
                     >
                        Register Pet
                     </button>
                  </form>
               </section>
               <section className={style.section2}>
                  <Image
                     src='/SignUp.svg'
                     alt='SignUp Dog Walking Picture'
                     width='350'
                     height='350'
                  />
               </section>
            </div>
         </div>
      </>
   );
}
