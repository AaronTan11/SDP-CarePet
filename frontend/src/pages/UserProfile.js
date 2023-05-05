import styles from "../styles/UserProfile.module.scss";
import User from "../components/User";

function UserProfile() {
   const storedUser = localStorage.getItem("user");
   const user = storedUser ? JSON.parse(storedUser) : null;

   if (!user) {
      // Redirect to the login page or show an error message
      return <div>User not logged in</div>;
   }

   return (
      <div className={styles.container}>
         <User />
         <div className={styles.myaccount}>
            <h1>Welcome, {user.username}</h1>
            <div className={styles.myaccountcontent}>
               <b>Fullname: {user.fullname}</b>
               <b>Email: {user.email}</b>
               <b>Contact Number: {user.contactNumber}</b>
            </div>
         </div>
      </div>
   );
}

export default UserProfile;
