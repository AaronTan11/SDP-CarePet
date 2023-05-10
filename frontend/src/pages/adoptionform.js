import { useState } from "react";
import styles from "../styles/adoptionform.module.scss";

function apply() {
  const [username, setUsername] = useState("");
  const [contactnum, setcontactnum] = useState("");
  const [email, setemail] = useState("");
  const [petid, setpetid] = useState("");
  const [salary, setsalary] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username", username);
    console.log("ContactNum", contactnum);
    console.log("Email", email);
    console.log("Id", petid);
    console.log("Salary", salary);
  };

  const handleClick = (event) => {
    event.preventDefault();
    mutation.mutate({ username, contactnum, email, petid, salary });
  };

  return (
    <div className={styles.cover}>
      <div className={styles.inside}>
        <div className={styles.Bar}>
          <h1>Application Form</h1>

          <form onSubmit={handleSubmit}>
            <label>
              Username :
              <input
                className={styles.input}
                name="username"
                type="text"
                value={username}
                placeholder="Please enter username"
                onChange={(event) => setUsername(event.target.value)}
              ></input>
            </label>
            <br />
            <label>
              Contact Number :
              <input
                className={styles.input}
                name="contactnum"
                type="text"
                value={contactnum}
                placeholder="Enter contact number"
                onChange={(event) => setcontactnum(event.target.value)}
              ></input>
            </label>
            <br />
            <label>
              Email :
              <input
                className={styles.input}
                name="email"
                type="email"
                value={email}
                placeholder="Please enter your email"
                onChange={(event) => setemail(event.target.value)}
              ></input>
            </label>
            <br />
            <label>
              PetID :
              <input
                className={styles.input}
                name="petid"
                type="text"
                value={petid}
                placeholder="Please enter the pet ID"
                onChange={(event) => setpetid(event.target.value)}
              ></input>
            </label>
            <br />
            <label>
              Estimated Work Salary :
              <input
                className={styles.input}
                name="salary"
                type="text"
                value={salary}
                placeholder="Accurate Work Salary"
                onChange={(event) => setsalary(event.target.value)}
              ></input>
            </label>
            <br />
          </form>
        </div>
        <button className={styles.btn} onClick={handleClick} type="submit">
          Submit
        </button>
        {mutation.isError && <p>Error: {mutation.error.message}</p>}
        {mutation.isSuccess && <p>User logged in successfully!</p>}
      </div>
    </div>
  );
}
export default apply;
