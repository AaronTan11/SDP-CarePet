import styles from "../styles/AdminSideNav.module.scss";

function AdminSideNav() {
  return (
    <div className={styles.sidenav}>
      <img
        className={styles.userImage}
        src="images/user.png"
        alt="image user"
      ></img>
      <div className={styles.sidenavContent}>
        <a href="#">My Admin</a>
        <a href="#">Add Dog</a>
        <a href="#">Check Adoption Records</a>
        <a href="#">Check Records</a>
        <a href="#">Log Out</a>
      </div>
    </div>
  );
}

export default AdminSideNav;
