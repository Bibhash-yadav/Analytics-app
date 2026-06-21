export default function Navbar() {
const user = JSON.parse(
localStorage.getItem("user") ||
"{}"
);

return ( <header className="bg-white border-b px-6 py-4 flex justify-between items-center"> <div> <h2 className="font-semibold text-xl">
Welcome,
{" "}
{user?.name || "User"} </h2> </div>

  <div>
    <span className="px-3 py-1 bg-gray-100 rounded-full">
      {user?.role}
    </span>
  </div>
</header>


);
}
