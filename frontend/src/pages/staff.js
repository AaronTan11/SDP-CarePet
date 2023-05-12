import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Staff() {
   const [staffData, setStaffData] = useState([]);
   const [editId, setEditId] = useState(null);
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedStaff, setSelectedStaff] = useState([]);

   const getStaffData = async () => {
      const response = await axios.get("http://localhost:5000/api/staff"); // API endpoint to fetch staff data
      setStaffData(response.data);
   };

   useEffect(() => {
      getStaffData();
   }, []);

   const handleSearch = (event) => {
      setSearchTerm(event.target.value);
   };

   const handleCheck = (id) => {
      setSelectedStaff([...selectedStaff, id]);
   };

   const handleDelete = async () => {
      await axios.post("/api/deleteStaff", { staffIds: selectedStaff });
      getStaffData();
   };

   const handleDisable = async () => {
      await axios.post("/api/disableStaff", { staffIds: selectedStaff });
      getStaffData();
   };

   const handleEdit = (id) => {
      setEditId(id);
   };

   const handleSave = async (id, newData) => {
      await axios.post("/api/updateStaff", { id, newData });
      setEditId(null);
      getStaffData();
   };

   return (
      <>
         <input type="text" placeholder="Search..." onChange={handleSearch} />
         <Link
            href={{ pathname: "/signup/[type]", query: { type: "add-staff" } }}
         >
            <button>Add Staff</button>
         </Link>
         <button onClick={handleDelete}>Delete</button>
         <button onClick={handleDisable}>Disable</button>
         {staffData
            .filter(
               (staff) =>
                  staff.id?.toString().includes(searchTerm) ||
                  staff.name?.includes(searchTerm) ||
                  staff.email?.includes(searchTerm)
            )
            .map((staff) => (
               <div key={staff.id}>
                  <input
                     type="checkbox"
                     onChange={() => handleCheck(staff.id)}
                  />
                  {editId === staff.id ? (
                     <input
                        defaultValue={staff.name}
                        onBlur={(e) => handleSave(staff.id, e.target.value)}
                     />
                  ) : (
                     <div>
                        <span onClick={() => handleEdit(staff.id)}>
                           {staff.username}
                        </span>
                        <span onClick={() => handleEdit(staff.id)}>
                           {staff.email}
                        </span>

                        <span onClick={() => handleEdit(staff.id)}>
                           {staff.contact}
                        </span>
                     </div>
                  )}
               </div>
            ))}
      </>
   );
}
