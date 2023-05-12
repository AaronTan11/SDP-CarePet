import { useState } from "react";
import styles from "../styles/Login.module.scss";
import axios from "axios";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

function SignUp() {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [contact, setContact] = useState("");

   const [usernameError, setUsernameError] = useState("");

   const router = useRouter();
   const { type } = router.query;

   const apiEndpoint =
      type === "add-staff"
         ? "http://localhost:5000/api/add-staff"
         : "http://localhost:5000/api/register";
   const formHeading = type === "add-staff" ? "Add Staff" : "Sign Up";

   const registerUser = async (userData) => {
      const response = await axios.post(apiEndpoint, userData);
      return response.data;
   };

   const mutation = useMutation(registerUser, {
      onSuccess: (data) => {
         console.log(data); // Handle successful registration, e.g., show a success message or redirect to another page
         router.push("/");
      },
      onError: (error) => {
         console.error("Error during registration:", error); // Handle error response, e.g., show an error message
      },
   });

   const handleClick = (event) => {
      event.preventDefault();
      if (!username) {
         setUsernameError("Please enter a username.");
         return;
      }
      mutation.mutate({ username, email, password, contact });
   };

   return (
      <div className={styles.cover}>
         <div className={styles.inside}>
            <h1>{formHeading}</h1>
            <div className={styles.Bar}>
               <form>
                  <label>
                     Username :
                     <input
                        className={styles.input}
                        name="username"
                        type="text"
                        value={username}
                        placeholder="Please enter username"
                        onChange={(event) => {
                           setUsername(event.target.value);
                           setUsernameError("");
                        }}
                     ></input>
                     {usernameError && (
                        <p className={styles.error}>{usernameError}</p>
                     )}
                  </label>
                  <br />
                  <label>
                     Email :
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
                     Contact :
                     <input
                        className={styles.input}
                        name="contact"
                        type="text"
                        value={contact}
                        placeholder="Please enter contact"
                        onChange={(event) => setContact(event.target.value)}
                     ></input>
                  </label>
                  <br />
                  <label>
                     Password :
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
               Sign Up
            </button>
            {mutation.isError && (
               <p>Error: {mutation.error.response.data.error}</p>
            )}
            {mutation.isSuccess && <p>User registered successfully!</p>}
         </div>
      </div>
   );
}

export default SignUp;
