import { useState } from "react";
import styles from "../styles/Booking.module.scss";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function Booking() {
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [date, setDate] = useState();

  const [nameError, setNameError] = useState("");
  const [contactError, setContactError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dateError, setDateError] = useState("");

  const router = useRouter;

  const Booking = async (bookingData) => {
    const response = await axios.post(
      "http://localhost:5000/api/Booking",
      bookingData
    );
    return response.data;
  };

  const mutation = useMutation(Booking, {
    onSuccess: (data) => {
      console.log(data);
      router.push("");
    },
    onError: (error) => {
      console.error("Error during booking", error);
    },
  });

  const handleClick = (event) => {
    event.preventDefault();
    console.log("Name", name);
    console.log("Contact No", contact);
    console.log("Email", email);
    console.log("Date", date);

    if (!name) {
      setNameError("Please enter name.");
      return;
    } else if (!contact) {
      setContactError("Please enter Contact Number.");
      return;
    } else if (!email) {
      setEmailError("Please enter email.");
      return;
    } else if (!date) {
      setDateError("Please select date.");
      return;
    }

    mutation.mutate({ name, contact, email, date });
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
                name="name"
                required
                value={name}
                placeholder="Enter name"
                onChange={(event) => {
                  setName(event.target.value);
                  setNameError("");
                }}
              ></input>
              {nameError && <p className={styles.error}>{nameError}</p>}
            </label>
            <br />
            <label>
              Contact No :
              <input
                className={styles.input}
                type="tel"
                name="contact"
                required
                value={contact}
                placeholder="Enter Phone number"
                onChange={(event) => {
                  setContact(event.target.value);
                  setContactError("");
                }}
              ></input>
              {contactError && <p className={styles.error}>{contactError}</p>}
            </label>
            <br />
            <label>
              Email :
              <input
                className={styles.input}
                type="email"
                name="email"
                value={email}
                placeholder="Enter Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError("");
                }}
              ></input>
            </label>
            {emailError && <p className={styles.error}>{emailError}</p>}
            <br />
            <label>
              Date :
              <input
                className={styles.input}
                type="date"
                name="date"
                onChange={(event) => {
                  setDate(event.target.value);
                  setDateError("");
                }}
              ></input>
            </label>
            {dateError && <p className={styles.error}>{dateError}</p>}

            <br />
          </form>
        </div>
        <button
          className={styles.btn}
          onClick={handleClick}
          type="submit"
          disabled={mutation.isLoading}
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default Booking;
