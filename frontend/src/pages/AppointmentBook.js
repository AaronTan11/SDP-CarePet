import { useState } from "react";
import styles from "../styles/Booking.module.scss";

function Booking() {
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [date, setDate] = useState();

  const handleClick = (event) => {
    event.preventDefault();
    console.log("Name", name);
    console.log("Contact No", contact);
    console.log("Email", email);
    console.log("Date", date);
  };
  return (
    <div className={styles.cover}>
      <div className={styles.inside}>
        <h1>Book Appointment</h1>
        <div className={styles.Bar}>
          <form>
            <label>
              Name :
              <input
                className={styles.input}
                type="text"
                value={name}
                placeholder="Enter name"
                onChange={(event) => setName(event.target.value)}
              ></input>
            </label>
            <br />
            <label>
              Contact No :
              <input
                className={styles.input}
                type="tel"
                value={contact}
                placeholder="Enter Phone number"
                pattern={"[0-9]{3}-[0-9]{7}"}
                required
                onChange={(event) => setContact(event.target.value)}
              ></input>
            </label>
            <br />
            <label>
              Email :
              <input
                className={styles.input}
                type="email"
                value={email}
                placeholder="Enter Email"
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </label>
            <br />
            <label>
              Date :
              <input
                className={styles.input}
                type="date"
                onChange={(event) => setDate(event.target.value)}
              ></input>
            </label>
            <br />
          </form>
        </div>
        <button className={styles.btn} onClick={handleClick} type="submit">
          Book
        </button>
      </div>
    </div>
  );
}

export default Booking;
