import { useState } from "react";
import AdminSideNav from "../pages/AdminSideNav";
import styles from "../styles/AdminSideNav.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

function AdminAddDog() {
  const [petID, setpetID] = useState();
  const [Dogname, setProductname] = useState();
  const [Image, setProductImg] = useState();
  const [description, setDescription] = useState();

  const [petIDError, setpetIDError] = useState();
  const [DognameError, setProductnameError] = useState();
  const [ImageError, setProductImgError] = useState();
  const [descriptionError, setDescriptionError] = useState();

  const router = useRouter;

  const add = async (addData) => {
    const response = await axios.post(
      "http://localhost:5000/api/AdminAddDog",
      addData
    );
    return response.data;
  };

  const mutation = useMutation(add, {
    onSuccess: (data) => {
      console.log(data);
      router.push("");
    },
    onError: (error) => {
      console.error("Error add dog", error);
    },
  });

  const handleClick = (event) => {
    event.preventDefault();
    console.log("petID", petID);
    console.log("Dogname", Dogname);
    console.log("Image", Image);
    console.log("description", description);

    if (!petID) {
      setpetIDError("Please enter petID");
      return;
    } else if (!Dogname) {
      setProductnameError("Please enter name");
      return;
    } else if (!Image) {
      setProductImgError("Please insert Image");
      return;
    } else if (!description) {
      setDescriptionError("Please write description");
      return;
    }

    mutation.mutate({ petID, Dogname, Image, description });
  };

  return (
    <div className={styles.container}>
      <AdminSideNav />

      <div className={styles.formContainer}>
        <h1>Welcome,</h1>
        <b>Dog Adoption</b>
        <form>
          <div className={styles.row}>
            <div className={styles.add}>
              <label htmlFor="">Pet_ID</label>
              <input
                type="text"
                required
                name="petID"
                placeholder="Enter Category Name"
                className={styles.formcontrol}
                onChange={(event) => {
                  setpetID(event.target.value);
                  setpetIDError("");
                }}
              ></input>
              {petIDError && <p className={styles.error}>{petIDError}</p>}
            </div>

            <div className={styles.add}>
              <label htmlFor="">Name</label>
              <input
                type="text"
                required
                name="Dogname"
                placeholder="Enter Category Name"
                className={styles.formcontrol}
                onChange={(event) => {
                  setProductname(event.target.value);
                  setProductnameError("");
                }}
              ></input>
              {DognameError && <p className={styles.error}>{DognameError}</p>}
            </div>

            <div className={styles.add}>
              <label htmlFor="">Image</label>
              <input
                type="text"
                required
                name="Image"
                placeholder="insert Image"
                className={styles.formcontrol}
                onChange={(event) => {
                  setProductImg(event.target.value);
                  setProductImgError("");
                }}
              ></input>
              {ImageError && <p className={styles.error}>{ImageError}</p>}
            </div>

            <div className={styles.add}>
              <label htmlFor="">Description</label>
              <textarea
                rows="3"
                required
                name="description"
                placeholder="Enter Description"
                className={styles.formcontrol}
                onChange={(event) => {
                  setDescription(event.target.value);
                  setDescriptionError("");
                }}
              ></textarea>
              {descriptionError && (
                <p className={styles.error}>{descriptionError}</p>
              )}
            </div>

            <div className={styles.add}>
              <button
                type="submit"
                className={styles.btnSave}
                name="add_product_btn"
                onClick={handleClick}
                disabled={mutation.isLoading}
              >
                Save
              </button>
              {mutation.isError && (
                <p>Error: {mutation.error.response.data.error}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAddDog;
