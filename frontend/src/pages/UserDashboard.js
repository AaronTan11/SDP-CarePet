import UserSideNav from "../components/SideNav/UserSideNav";
import styles from "../styles/UserDashboard.module.scss";

function UserDashboard() {
   return (
      <div className={styles.container}>
         <UserSideNav />
         <div className={styles.myaccount}>
            <h1>Welcome, </h1>
            <div className={styles.myaccountcontent}>
               <b>Fullname: </b>
               <b>Email: </b>
               <b>Contact Number: </b>
            </div>
         </div>
      </div>
   );
}

export default UserDashboard;
