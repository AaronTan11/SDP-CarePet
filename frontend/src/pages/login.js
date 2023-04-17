import { useState } from "react";
import styles from "../styles/Login.module.scss";

function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username", username);
    console.log("Password", password);
  };

  return (
    <div className={styles.cover}>
      <div className={styles.inside}>
        <div className={styles.Bar}>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Username :
              <input
                type="text"
                value={username}
                placeholder="Please enter username"
                onChange={(event) => setUsername(event.target.value)}
              ></input>
            </label>
            <br />
            <label>
              Password :
              <input
                type="password"
                value={password}
                placeholder="Please enter password"
                onChange={(event) => setPassword(e.target.value)}
              ></input>
            </label>
            <br />
            <div className={styles.btn}>
              <button type="submit">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default login;
