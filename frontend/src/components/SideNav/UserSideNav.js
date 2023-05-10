import Link from "next/link";
import styles from "./SideNav.module.scss";

function UserSideNav() {
   const handleLogout = () => {
      localStorage.removeItem("user_id");
   };
   return (
      <div className={styles.sidenav}>
         <img
            className={styles.userImage}
            src="images/user.png"
            alt="image user"
         ></img>
         <div className={styles.sidenavContent}>
            <Link href="/profile">My Profile</Link>
            <Link href="/booking-appointment">Pet Services</Link>
            <Link href="#">Check Records</Link>
            <Link href="/" onClick={handleLogout}>
               Log Out
            </Link>
         </div>
      </div>
   );
}

export default UserSideNav;
