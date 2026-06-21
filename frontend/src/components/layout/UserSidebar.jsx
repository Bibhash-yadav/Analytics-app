import {
LayoutDashboard,
FileText,
BarChart3,
User,
LogOut,
} from "lucide-react";

import {
NavLink,
useNavigate,
} from "react-router-dom";

export default function UserSidebar() {
const navigate =
useNavigate();

const logout = () => {
localStorage.removeItem(
"token"
);

localStorage.removeItem(
  "role"
);

localStorage.removeItem(
  "user"
);

navigate("/");


};

const menuItems = [
{
name: "Dashboard",
icon: LayoutDashboard,
path: "/user/dashboard",
},
{
name: "My Reports",
icon: FileText,
path: "/user/reports",
},
{
name: "Analytics",
icon: BarChart3,
path: "/user/analytics",
},
{
name: "Profile",
icon: User,
path: "/user/profile",
},
];

return ( <aside className="w-64 bg-white border-r min-h-screen hidden lg:block"> <div className="p-6 border-b"> <h1 className="text-2xl font-bold">
Analytics User </h1> </div>


  <nav className="p-4">
    {menuItems.map(
      (item) => {
        const Icon =
          item.icon;

        return (
          <NavLink
            key={item.name}
            to={item.path}
            className={({
              isActive,
            }) =>
              `flex items-center gap-3 p-3 rounded-xl mb-2 ${
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
      }
    )}
  </nav>

  <div className="p-4">
    <button
      onClick={logout}
      className="w-full bg-red-500 text-white p-3 rounded-lg"
    >
      Logout
    </button>
  </div>
</aside>


);
}
