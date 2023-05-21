import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import style from "../styles/pages/Login.module.scss";

export default function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const router = useRouter();

   const loginUser = async (userData) => {
      const response = await axios.post(
         "http://localhost:5000/api/login",
         userData
      );
      return response.data;
   };

   const mutation = useMutation(loginUser, {
      onSuccess: (data) => {
         console.log(data);
         localStorage.setItem("userData", JSON.stringify(data));
         // Retrieve and parse the stored user data
         const storedUserData = JSON.parse(localStorage.getItem("userData"));

         // Access the username property
         const username = storedUserData.username;

         router.push({
            pathname: "/user-dashboard/[username]",
            query: { username: username },
         });
      },
      onError: (error) => {
         console.error("Error during login:", error);
      },
   });

   const handleSubmit = (event) => {
      event.preventDefault();
      mutation.mutate({ email, password });
   };

   return (
      <>
         <div className={style.container}>
            <div className={style.subContainer}>
               <section className={style.section1}>
                  <h1>Welcome Back</h1>
                  <form>
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
                        Welcome Back
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
