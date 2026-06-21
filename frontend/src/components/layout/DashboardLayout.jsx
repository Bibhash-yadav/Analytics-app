import AdminSidebar from "./AdminSidebar";
import UserSidebar from "./UserSidebar";

import Navbar from "./Navbar";

export default function DashboardLayout({
children,
}) {
const role =
localStorage.getItem("role");

return ( <div className="flex min-h-screen bg-gray-100">
{role === "ADMIN" ? ( <AdminSidebar />
) : ( <UserSidebar />
)}


  <div className="flex-1 flex flex-col">
    <Navbar />

    <main className="p-6">
      {children}
    </main>
  </div>
</div>


);
}
