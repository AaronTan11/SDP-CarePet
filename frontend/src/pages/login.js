import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.scss";
import axios from "axios";
import { useMutation } from "react-query";

function Login() {
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
         localStorage.setItem("user", JSON.stringify(data));
         router.push("/UserProfile");
      },
      onError: (error) => {
         console.error("Error during login:", error); // Handle error response, e.g., show an error message
      },
   });

   const handleClick = (event) => {
      event.preventDefault();
      mutation.mutate({ email, password });
   };

   return (
      <div className={styles.cover}>
         <div className={styles.inside}>
            <h1>Login</h1>
            <div className={styles.Bar}>
               <form>
                  <label>
                     Email:
                     <input
                        className={styles.input}
                        name="email"
                        type="email"
                        value={email}
                        placeholder="Please enter email"
                        onChange={(event) => setEmail(event.target.value)}
                     ></input>
                  </label>
                  <br />
                  <label>
                     Password:
                     <input
                        className={styles.input}
                        name="password"
                        type="password"
                        value={password}
                        placeholder="Please enter password"
                        onChange={(event) => setPassword(event.target.value)}
                     ></input>
                  </label>
                  <br />
               </form>
            </div>
            <button
               className={styles.btn}
               onClick={handleClick}
               type="submit"
               disabled={mutation.isLoading}
            >
               Log In
            </button>
            {mutation.isError && <p>Error: {mutation.error.message}</p>}
            {mutation.isSuccess && <p>User logged in successfully!</p>}
         </div>
      </div>
   );
}

export default Login;
