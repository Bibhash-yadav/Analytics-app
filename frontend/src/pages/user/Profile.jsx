import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Profile() {
const [user, setUser] =
useState(null);

useEffect(() => {
const storedUser =
JSON.parse(
localStorage.getItem("user")
);

   
setUser(storedUser);
   

}, []);

if (!user) {
return ( <DashboardLayout>
Loading... </DashboardLayout>
);
}

return ( <DashboardLayout> <h1 className="text-4xl font-bold mb-6">
My Profile </h1>

   
  <div className="bg-white p-6 rounded-xl shadow border max-w-xl">
    <div className="mb-4">
      <h3 className="font-semibold">
        Name
      </h3>

      <p>{user.name}</p>
    </div>

    <div className="mb-4">
      <h3 className="font-semibold">
        Email
      </h3>

      <p>{user.email}</p>
    </div>

    <div>
      <h3 className="font-semibold">
        Role
      </h3>

      <p>{user.role}</p>
    </div>
  </div>
</DashboardLayout>
   

);
}
