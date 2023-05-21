import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import style from "./signup.module.scss";

export default function Signup() {
   const [username, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [contact, setContact] = useState("");

   const router = useRouter();
   const { type } = router.query;

   const apiEndpoint =
      type === "add-staff"
         ? "http://localhost:5000/api/add-staff"
         : "http://localhost:5000/api/register";
   const formHeading = type === "add-staff" ? "Add Staff" : "Create an account";
   const buttonHeading =
      type === "add-staff" ? "Create Staff Account" : "Create Account";

   const registerUser = async (userData) => {
      const response = await axios.post(apiEndpoint, userData);
      return response.data;
   };
   const mutation = useMutation(registerUser, {
      onSuccess: (data) => {
         console.log(data);
         if (type === "add-staff") {
            router.back();
         } else {
            router.push("/");
         }
      },
      onError: (error) => {
         console.error("Error during registration:", error);
      },
   });

   const handleSubmit = (e) => {
      e.preventDefault();

      mutation.mutate({ username, email, password, contact });

      console.log({ username, email, password });
   };

   return (
      <>
         <div className={style.container}>
            <div className={style.subContainer}>
               <section className={style.section1}>
                  <h1>{formHeading}</h1>
                  <form>
                     <input
                        type='text'
                        placeholder='Name'
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        required
                     />
                     <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                     <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                     <button
                        type='submit'
                        className={style.submitButton}
                        onClick={handleSubmit}
                     >
                        {buttonHeading}
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
