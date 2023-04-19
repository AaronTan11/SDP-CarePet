import { useState } from "react";
import styles from "../styles/Login.module.scss";

function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    console.log("Username", username);
    console.log("Password", password);
  };

  return (
    <div className={styles.cover}>
      <div className={styles.inside}>
        <h1>Login</h1>
        <div className={styles.Bar}>
          <form>
            <label>
              Username :
              <input
                className={styles.input}
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
                className={styles.input}
                type="password"
                value={password}
                placeholder="Please enter password"
                onChange={(event) => setPassword(event.target.value)}
              ></input>
            </label>
            <br />
          </form>
        </div>

        <div className={styles.btn} onClick={handleClick}>
          <button type="submit">Log In</button>
        </div>
      </div>
    </div>
  );
}
export default login;
