import Link from "next/link";
import styles from "../styles/AdminSideNav.module.scss";

function UserSideNav() {
   return (
      <div className={styles.sidenav}>
         <img
            className={styles.userImage}
            src="images/user.png"
            alt="image user"
         ></img>
         <div className={styles.sidenavContent}>
            <Link href="#">My Profile</Link>
            <Link href="#">Check Records</Link>
            <Link href="/">Log Out</Link>
         </div>
      </div>
   );
}

export default UserSideNav;
