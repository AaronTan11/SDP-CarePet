import styles from "../styles/UserProfile.module.scss";
import User from "../components/User";

function UserProfile() {
  return (
    <div className={styles.container}>
      <User />
      <div className={styles.myaccount}>
        <h1>Welcome, </h1>
        <div className={styles.myaccountcontent}>
          <b>Fullname:</b>
          <b>Email:</b>
          <b>Contact Number:</b>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
