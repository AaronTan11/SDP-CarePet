import AdminSideNav from "../pages/AdminSideNav";
import styles from "../styles/AdminSideNav.module.scss";

function AdminAddDog() {
  return (
    <div className={styles.container}>
      <AdminSideNav />
      <div className={styles.formContainer}>
        <h1>Welcome,</h1>
        <b>Dog Adoption</b>
        <form>
          <div className={styles.row}>
            <div className={styles.add}>
              <label htmlFor="">Dog_ID</label>
              <input
                type="text"
                required
                name="Dog_ID"
                placeholder="Enter Category Name"
                className={styles.formcontrol}
              ></input>
            </div>

            <div className={styles.add}>
              <label htmlFor="">Name</label>
              <input
                type="text"
                required
                name="product_name"
                placeholder="Enter Category Name"
                className={styles.formcontrol}
              ></input>
            </div>

            <div className={styles.add}>
              <label htmlFor="">Price</label>
              <input
                type="text"
                required
                name="price"
                placeholder="Enter Price"
                className={styles.formcontrol}
              ></input>
            </div>

            <div className={styles.add}>
              <label htmlFor="">Image</label>
              <input
                type="text"
                required
                name="product_img"
                placeholder="insert Image"
                className={styles.formcontrol}
              ></input>
            </div>

            <div className={styles.add}>
              <label htmlFor="">Description</label>
              <textarea
                rows="3"
                required
                name="description"
                placeholder="Enter Description"
                className={styles.formcontrol}
              ></textarea>
            </div>

            <div className={styles.add}>
              <button
                type="submit"
                className={styles.btnSave}
                name="add_product_btn"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAddDog;
