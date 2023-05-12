import { useRouter } from "next/router";

import SignUp from "../signup";

function UserTypePage() {
   const router = useRouter();
   const { type } = router.query;
   const isAddStaff = type === "add-staff";
   // const title = isAddStaff ? "Add Staff" : "Sign Up";

   // Pass the type prop to the form component
   return (
      <div>
         {/* <h1>{title}</h1> */}
         <SignUp />
      </div>
   );
}

export default UserTypePage;
