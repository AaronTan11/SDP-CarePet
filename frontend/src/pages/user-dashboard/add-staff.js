import { useState } from "react";
import axios from "axios";
import SideNav from "@/components/SideNav/SideNav";
import style from "@/styles/pages/AddStaff.module.scss";
import { useRouter } from "next/router";

export default function AddStaff({ staffData }) {
   const [searchTerm, setSearchTerm] = useState("");
   const [showCheckboxes, setShowCheckboxes] = useState(false);
   const router = useRouter();

   const [editedStaff, setEditedStaff] = useState({});

   const handleInputChange = (e, id, field) => {
      setEditedStaff({
         ...editedStaff,
         [id]: { ...editedStaff[id], [field]: e.target.value },
      });
   };

   const handleSave = async (id) => {
      const staff = staffData.find((staff) => staff.id === id);
      const payload = {
         ...staff,
         ...editedStaff[id],
      };
      const response = await axios.put(
         `http://localhost:5000/api/staff/${id}`,
         payload
      );
      console.log(response.data);
      // you need to handle the response here
   };

   const handleDelete = async (id) => {
      const response = await axios.delete(
         `http://localhost:5000/api/staff/${id}`
      );
      console.log(response.data);
      // you need to handle the response here
   };

   const filteredData = staffData.filter(
      (staff) =>
         staff.id.toString().includes(searchTerm) ||
         staff.username.includes(searchTerm) ||
         staff.email.includes(searchTerm) ||
         staff.contact.includes(searchTerm)
   );

   const handleSearch = (e) => {
      setSearchTerm(e.target.value);
   };

   const handleSelect = () => {
      setShowCheckboxes(!showCheckboxes);
   };

   return (
      <>
         <div className={style.superContainer}>
            <SideNav />
            <div className={style.container}>
               <div className={style.searchBar}>
                  <input
                     type='text'
                     placeholder='Search...'
                     value={searchTerm}
                     onChange={handleSearch}
                  />
                  <button
                     onClick={() =>
                        router.push({
                           pathname: "/signup/[type]",
                           query: { type: "add-staff" },
                        })
                     }
                  >
                     Add Staff
                  </button>
                  <button onClick={handleSelect}>Select</button>
               </div>
               <div className={style.staffList}>
                  {filteredData &&
                     filteredData.map((staff) => (
                        <div className={style.staffRow} key={staff.id}>
                           {showCheckboxes && <input type='checkbox' />}
                           <input
                              defaultValue={staff.id}
                              onChange={(e) =>
                                 handleInputChange(e, staff.id, "id")
                              }
                           />
                           <input
                              defaultValue={staff.username}
                              onChange={(e) =>
                                 handleInputChange(e, staff.id, "username")
                              }
                           />
                           <input
                              defaultValue={staff.email}
                              onChange={(e) =>
                                 handleInputChange(e, staff.id, "email")
                              }
                           />
                           <input
                              defaultValue={staff.contact}
                              onChange={(e) =>
                                 handleInputChange(e, staff.id, "contact")
                              }
                           />
                           <button onClick={() => handleSave(staff.id)}>
                              Save
                           </button>
                           <button onClick={() => handleDelete(staff.id)}>
                              Delete
                           </button>
                        </div>
                     ))}
               </div>
            </div>
         </div>
      </>
   );
}

export async function getServerSideProps() {
   const response = await axios.get("http://localhost:5000/api/staff");
   const staffData = response.data;

   return {
      props: {
         staffData,
      },
   };
}
