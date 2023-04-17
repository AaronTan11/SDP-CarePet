import { useState } from "react";

function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username", username);
    console.log("Password", password);
  };

  return (
    <div className="cover">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username :
          <input
            type="text"
            value={username}
            placeholder="Please enter username"
            onChange={(event) => setUsername(e.target.value)}
          ></input>
        </label>
        <br />
        <label>
          Password :
          <input
            type="password"
            placeholder="Please enter password"
            value={password}
            onChange={(event) => setPassword(e.target.value)}
          ></input>
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
export default login;
