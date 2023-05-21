import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import style from "../../styles/pages/BookService.module.scss";
import useUserData from "@/hooks/useUserData";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BookService() {
   const [form, setForm] = useState({
      id: null,
      name: "",
      contact: "",
      email: "",
      date: "",
      service_type: "",
      pet_breed: "",
   });

   const router = useRouter();

   const [userId, setUserId] = useState(null);
   const [username, setUsername] = useState(null);

   const { data } = useUserData(userId);
   useEffect(() => {
      let storedUserData = null;
      try {
         storedUserData = JSON.parse(localStorage.getItem("userData"));
      } catch (error) {
         console.error("Error parsing user data from local storage:", error);
      }

      if (storedUserData) {
         setUserId(storedUserData.user_id);
         setUsername(storedUserData.username);
      }
   }, []);

   useEffect(() => {
      if (data && userId && username) {
         setForm({
            id: userId,
            name: username,
            contact: data.contact,
            email: data.email,
            date: form.date,
            service_type: form.service_type,
            pet_breed: form.pet_breed,
         });
      }
   }, [data, userId, username]);

   const handleChange = (e) => {
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      });
   };

   const createBooking = async (bookingData) => {
      const response = await axios.post(
         "http://localhost:5000/api/booking",
         bookingData
      );
      return response.data;
   };
   const bookingMutation = useMutation(createBooking, {
      onSuccess: (data) => {
         console.log(data);
         router.push({
            pathname: "/user-dashboard/[username]",
            query: { username: username },
         });
      },
      onError: (error) => {
         console.error("Error during booking", error);
      },
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      bookingMutation.mutate(form);
   };

   return (
      <>
         <div className={style.container}>
            <div className={style.subContainer}>
               <section className={style.section1}>
                  <h1>Book a Service</h1>
                  <form>
                     <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={form.name}
                        onChange={handleChange}
                        required
                     />
                     <input
                        type='text'
                        name='contact'
                        placeholder='Contact'
                        value={form.contact}
                        onChange={handleChange}
                        required
                     />
                     <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={form.email}
                        onChange={handleChange}
                        required
                     />
                     <input
                        type='date'
                        name='date'
                        placeholder='Date'
                        value={form.date}
                        onChange={handleChange}
                        required
                     />
                     <select
                        name='service_type'
                        value={form.serviceType}
                        onChange={handleChange}
                        required
                     >
                        <option value=''>--Please choose a service--</option>
                        <option value='Grooming'>Grooming</option>
                        <option value='Boarding'>Boarding</option>
                        <option value='Training'>Training</option>
                        <option value='Veterinary'>Veterinary</option>
                     </select>
                     <input
                        type='text'
                        name='pet_breed'
                        placeholder="Pet's Breed"
                        value={form.petBreed}
                        onChange={handleChange}
                        required
                     />
                     <button
                        type='submit'
                        className={style.submitButton}
                        onClick={handleSubmit}
                     >
                        Submit
                     </button>
                  </form>
               </section>
               <section className={style.section2}>
                  <Image
                     src='/DatePick.svg'
                     alt='SignUp Dog Walking Picture'
                     width='500'
                     height='500'
                  />
               </section>
            </div>
         </div>
      </>
   );
}
