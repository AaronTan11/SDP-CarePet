import { useState } from "react";
import axios from "axios";
import SideNav from "@/components/SideNav/SideNav";
import style from "@/styles/pages/AddStaff.module.scss";
import { useRouter } from "next/router";

export default function Pets({ petsData }) {
   const [searchTerm, setSearchTerm] = useState("");
   const [showCheckboxes, setShowCheckboxes] = useState(false);
   const router = useRouter();

   const [editedPet, setEditedPet] = useState({});

   const handleInputChange = (e, id, field) => {
      setEditedPet({
         ...editedPet,
         [id]: { ...editedPet[id], [field]: e.target.value },
      });
   };

   const handleSave = async (id) => {
      const pet = petsData.find((pet) => pet.petID === id);
      const payload = {
         ...pet,
         ...editedPet[id],
      };
      const response = await axios.put(
         `http://localhost:5000/api/pets/${id}`,
         payload
      );
      console.log(response.data);
      // you need to handle the response here
   };

   const handleDelete = async (id) => {
      const response = await axios.delete(
         `http://localhost:5000/api/pets/${id}`
      );
      console.log(response.data);
      // you need to handle the response here
   };

   const filteredData = petsData.filter(
      (pet) =>
         pet.pet_id.toString().includes(searchTerm) ||
         pet.petname.includes(searchTerm) ||
         pet.description.includes(searchTerm)
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
                     onClick={() => router.push("/user-dashboard/add-pet")}
                  >
                     Add Pet
                  </button>
                  <button onClick={handleSelect}>Select</button>
               </div>
               <div className={style.petList}>
                  {filteredData &&
                     filteredData.map((pet) => (
                        <div className={style.petRow} key={pet.petID}>
                           {showCheckboxes && <input type='checkbox' />}
                           <input
                              defaultValue={pet.pet_id}
                              onChange={(e) =>
                                 handleInputChange(e, pet.petID, "petID")
                              }
                           />
                           <input
                              defaultValue={pet.pet_name}
                              onChange={(e) =>
                                 handleInputChange(e, pet.petID, "petname")
                              }
                           />
                           <input
                              defaultValue={pet.description}
                              onChange={(e) =>
                                 handleInputChange(e, pet.petID, "description")
                              }
                           />
                           <button onClick={() => handleSave(pet.pet_id)}>
                              Save
                           </button>

                           <button onClick={() => handleDelete(pet.pet_id)}>
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
   const response = await axios.get("http://localhost:5000/api/pets");
   const petsData = response.data;

   return {
      props: {
         petsData,
      },
   };
}
