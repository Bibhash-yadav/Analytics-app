import {
LayoutDashboard,
Users,
FileText,
BarChart3,
Settings,
LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
const navigate = useNavigate();

const logout = () => {
localStorage.removeItem("token");
localStorage.removeItem("role");
localStorage.removeItem("user");


navigate("/");


};

const menuItems = [
{
name: "Dashboard",
icon: LayoutDashboard,
path: "/admin/dashboard",
},
{
name: "Users",
icon: Users,
path: "/admin/users",
},
{
name: "Reports",
icon: FileText,
path: "/admin/reports",
},
{
name: "Analytics",
icon: BarChart3,
path: "/admin/analytics",
},
{
name: "Settings",
icon: Settings,
path: "/admin/settings",
},
];

return ( <aside className="w-64 bg-white border-r min-h-screen hidden lg:block"> <div className="p-6 border-b"> <h1 className="text-2xl font-bold">
Analytics Admin </h1> </div>


  <nav className="p-4">
    {menuItems.map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl mb-2 transition ${
              isActive
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`
          }
        >
          <Icon size={20} />
          {item.name}
        </NavLink>
      );
    })}
  </nav>

  <div className="absolute bottom-5 left-4">
    <button
      onClick={logout}
      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg"
    >
      <LogOut size={18} />
      Logout
    </button>
  </div>
</aside>


);
}
