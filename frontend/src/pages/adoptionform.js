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

  return (
    <div className={styles.cover}>
      <div className={styles.inside}>
        <div className={styles.Bar}>
          <h1>Application Form</h1>
          <h2>Please Fill In The Form</h2>
          <h5>You are required to fill in accurate work salary of yours</h5>
          <form onSubmit={handleSubmit}>
            <label>
              Username :
              <br />
              <input
                type="text"
                value={username}
                placeholder="Please enter username"
                onChange={(event) => setUsername(event.target.value)}
              ></input>
            </label>
            <br />
            <label>
              Contact Number :
              <br />
              <input
                type="text"
                value={contactnum}
                placeholder="Enter contact number"
                onChange={(event) => setcontactnum(event.target.value)}
              ></input>
            </label>
            <br />
            <label>
              Email :
            <br />
              <input
                type="text"
                value={email}
                placeholder="Please enter your email"
                onChange={(event) => setemail(event.target.value)}
              ></input>
            </label>
            <br />
            <label>
              PetID :
            <br />
              <input
                type="text"
                value={petid}
                placeholder="Please enter the pet ID"
                onChange={(event) => setpetid(event.target.value)}
              ></input>
            </label>
            <br />
            <label>
              Estimated Work Salary :
            <br />
              <input
                type="text"
                value={salary}
                placeholder="Accurate Work Salary"
                onChange={(event) => setsalary(event.target.value)}
              ></input>
            </label>
            <br />
            <div className={styles.btn}>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default apply;