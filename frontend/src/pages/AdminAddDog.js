import { useState } from "react";
import AdminSideNav from "../pages/AdminSideNav";
import styles from "../styles/AdminSideNav.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

function AdminAddDog() {
  const [petid, setpetid] = useState();
  const [product_name, setProductname] = useState();
  const [product_img, setProductImg] = useState();
  const [description, setDescription] = useState();

  const [petidError, setpetidError] = useState();
  const [product_nameError, setProductnameError] = useState();
  const [product_imgError, setProductImgError] = useState();
  const [descriptionError, setDescriptionError] = useState();

  const router = useRouter;

  const add = async (addData) => {
    const response = await axios.post(
      "http://localhost:5000/api/AdminAddDog",
      addData
    );
    return response.data;
  };

  const mutation = useMutation(AdminAddDog, {
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
    console.log("petid", petid);
    console.log("product_name", product_name);
    console.log("product_img", product_img);
    console.log("description", description);

    if (!petid) {
      setpetidError("Please enter PetID");
      return;
    } else if (!product_name) {
      setProductnameError("Please enter name");
      return;
    } else if (!product_img) {
      setProductImgError("Please insert Image");
      return;
    } else if (!description) {
      setDescriptionError("Please write description");
      return;
    }

    mutation.mutate({ petid, product_name, product_img, description });
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
                name="petid"
                placeholder="Enter Category Name"
                className={styles.formcontrol}
                onChange={(event) => {
                  setpetid(event.target.value);
                  setpetidError("");
                }}
              ></input>
              {petidError && <p className={styles.error}>{petidError}</p>}
            </div>

            <div className={styles.add}>
              <label htmlFor="">Name</label>
              <input
                type="text"
                required
                name="product_name"
                placeholder="Enter Category Name"
                className={styles.formcontrol}
                onChange={(event) => {
                  setProductname(event.target.value);
                  setProductnameError("");
                }}
              ></input>
              {product_nameError && (
                <p className={styles.error}>{product_nameError}</p>
              )}
            </div>

            <div className={styles.add}>
              <label htmlFor="">Image</label>
              <input
                type="text"
                required
                name="product_img"
                placeholder="insert Image"
                className={styles.formcontrol}
                onChange={(event) => {
                  setProductImg(event.target.value);
                  setProductImgError("");
                }}
              ></input>
              {product_imgError && (
                <p className={styles.error}>{product_imgError}</p>
              )}
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
              {product_imgError && (
                <p className={styles.error}>{product_imgError}</p>
              )}
            </div>

            <div className={styles.add}>
              <button
                type="submit"
                className={styles.btnSave}
                name="add_product_btn"
              >
                Save
              </button>
              {mutation.isError && <p>Error: {mutation.error.message}</p>}
              {mutation.isSuccess && <p>User logged in successfully!</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAddDog;
