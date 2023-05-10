import { useState, useEffect } from "react";
import styles from "../styles/Booking.module.scss";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

function Booking() {
   const { user, isLoading } = useAuth();
   const [user_id, setUserID] = useState("");
   const [name, setName] = useState("");
   const [contact, setContact] = useState("");
   const [email, setEmail] = useState("");
   const [date, setDate] = useState("");
   const [service_type, setService_type] = useState("");
   const [pet_breed, setPet_breed] = useState("");
   const router = useRouter();

   useEffect(() => {
      if (user) {
         setUserID(user.id);
         setName(user.username);
         setContact(user.contact);
         setEmail(user.email);
      }
   }, [user]);

   const createBooking = async (bookingData) => {
      const response = await axios.post(
         "http://localhost:5000/api/Booking",
         bookingData
      );
      return response.data;
   };

   const bookingMutation = useMutation(createBooking, {
      onSuccess: (data) => {
         console.log(data);
         router.push("/");
      },
      onError: (error) => {
         console.error("Error during booking", error);
      },
   });

   const handleFormSubmit = (event) => {
      event.preventDefault();
      bookingMutation.mutate({
         user_id,
         name,
         contact,
         email,
         date,
         service_type,
         pet_breed,
      });
   };

   if (isLoading) return <p>Loading...</p>;

   return (
      <div className={styles.cover}>
         <div className={styles.inside}>
            <h1>Book Appointment</h1>
            <div className={styles.Bar}>
               <form>
                  <input type="hidden" name="user_id" value={user_id} />

                  <label>
                     Name :
                     <input
                        className={styles.input}
                        type="text"
                        name="name"
                        required
                        value={name}
                        placeholder="Enter name"
                        onChange={(event) => {
                           setName(event.target.value);
                        }}
                     ></input>
                  </label>
                  <br />
                  <label>
                     Contact No :
                     <input
                        className={styles.input}
                        type="tel"
                        name="contact"
                        required
                        value={contact}
                        placeholder="Enter Phone number"
                        onChange={(event) => {
                           setContact(event.target.value);
                        }}
                     ></input>
                  </label>
                  <br />
                  <label>
                     Email :
                     <input
                        className={styles.input}
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter Email"
                        onChange={(event) => {
                           setEmail(event.target.value);
                        }}
                     ></input>
                  </label>
                  <br />
                  <label>
                     Date :
                     <input
                        className={styles.input}
                        type="date"
                        name="date"
                        onChange={(event) => {
                           setDate(event.target.value);
                        }}
                     ></input>
                  </label>
                  <br />
                  <label>
                     Service Type :
                     <select
                        className={styles.input}
                        name="service_type"
                        required
                        value={service_type}
                        onChange={(event) => {
                           setService_type(event.target.value);
                        }}
                     >
                        <option value="">Select Service Type</option>
                        <option value="Grooming">Grooming</option>
                        <option value="Boarding">Boarding</option>
                        <option value="Training">Training</option>
                        <option value="Veterinary">Veterinary</option>
                     </select>
                  </label>
                  <br />
                  <label>
                     Pet Breed :
                     <input
                        className={styles.input}
                        type="text"
                        name="pet_breed"
                        required
                        value={pet_breed}
                        placeholder="Enter Pet Breed"
                        onChange={(event) => {
                           setPet_breed(event.target.value);
                        }}
                     ></input>
                  </label>
                  <br />
                  <button
                     className={styles.btn}
                     onClick={handleFormSubmit}
                     type="submit"
                     disabled={bookingMutation.isLoading}
                  >
                     Book
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Booking;
