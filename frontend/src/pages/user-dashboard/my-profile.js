import { useState, useEffect } from "react";
import useUserData from "@/hooks/useUserData";

import SideNav from "@/components/SideNav/SideNav";
import style from "../../styles/pages/Profile.module.scss";

export default function MyProfile() {
   const [userId, setUserId] = useState(null);
   const [username, setUsername] = useState(null);

   useEffect(() => {
      let storedUserData = null;
      try {
         storedUserData = JSON.parse(localStorage.getItem("userData"));
      } catch (error) {
         console.error("Error parsing user data from local storage:", error);
      }

      setUserId(storedUserData ? storedUserData.user_id : null);
      setUsername(storedUserData ? storedUserData.username : null);
   }, []);

   const { isError, data, error } = useUserData(userId);

   if (isError) {
      return <span>Error: {error.message}</span>;
   }

   return (
      <>
         <div className={style.superContainer}>
            <SideNav />
            <div className={style.container}>
               <div className={style.subContainer}>
                  <div className={style.FormContainer}>
                     <div className={style.UserAvatar}>
                        {data && (
                           <img src={data.profile_pic} alt='User avatar' />
                        )}
                     </div>

                     <form>
                        <div className={style.formGroup}>
                           <label htmlFor='email'>Your Email Address</label>
                           <input
                              type='email'
                              className='form-control'
                              id='emai1'
                              placeholder='Email'
                              defaultValue={data ? data.email : ""}
                           />
                        </div>

                        <div className={style.formGroup}>
                           <label htmlFor='username'>Username</label>
                           <input
                              type='text'
                              className='form-control'
                              id='username'
                              placeholder='Username'
                              defaultValue={username}
                           />
                        </div>

                        <div className={style.formGroup}>
                           <label htmlFor='password'>Password</label>
                           <input
                              type='password'
                              className='form-control'
                              id='password'
                              placeholder='Password'
                           />
                        </div>
                        <div className={style.formGroup}>
                           <label htmlFor='contact'>Contact Number</label>
                           <input
                              type='number'
                              className='form-control'
                              id='contact'
                              placeholder='Contact Number'
                              defaultValue={data ? data.contact : ""}
                           />
                        </div>
                        <div className={style.formGroup}>
                           <label htmlFor='financialProof'>Upload PDF</label>
                           <input
                              type='file'
                              className='form-control'
                              id='financialProof'
                              accept='.pdf'
                           />
                        </div>
                        <button className='btn btn-success'>
                           Update Account Details
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
