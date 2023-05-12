import { useAuth } from "@/hooks/useAuth";
import styles from "./ProfileCard.module.scss";

const ProfileCard = () => {
   const { user, isLoading } = useAuth();
   if (isLoading) {
      return <p>Loading...</p>;
   }
   return (
      <div className={styles.profileCard}>
         <div className={styles.profileImageSection}>
            <img
               className={styles.profileImage}
               src={user.profile_pic}
               alt="Profile"
            />
            <div className={styles.additionalInfo}>
               <p>Member Since {user.username}</p>
               <p>{user.postsCount} Posts</p>
            </div>
         </div>
         <div className={styles.userInfo}>
            <h2 className={styles.username}>{user.username}</h2>
            <p>Email: {user.email}</p>
            <p>Password: ****</p>
            <p>Location: idk</p>
            <p>Interests: idk</p>
         </div>
      </div>
   );
};

export default ProfileCard;
