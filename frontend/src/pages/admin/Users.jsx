import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../api/axios";

export default function Users() {
const [users, setUsers] =
useState([]);

const [loading, setLoading] =
useState(true);

useEffect(() => {
fetchUsers();
}, []);

const fetchUsers =
async () => {
try {
const res =
await API.get(
"/users"
);

   
    if (
      Array.isArray(
        res.data
      )
    ) {
      setUsers(
        res.data
      );
    } else {
      setUsers([]);
    }
  } catch (error) {
    console.error(error);
    setUsers([]);
  } finally {
    setLoading(false);
  }
};
   

const deleteUser =
async (id) => {
const confirmDelete =
window.confirm(
"Delete this user?"
);

   
  if (!confirmDelete)
    return;

  try {
    await API.delete(
      `/users/${id}`
    );

    fetchUsers();
  } catch (error) {
    console.error(error);
    alert(
      "Unable to delete user"
    );
  }
};
   

return ( <DashboardLayout> <div className="flex justify-between items-center mb-6"> <h1 className="text-4xl font-bold">
Users Management </h1> </div>

   
  <div className="bg-white rounded-xl shadow border overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50 border-b">
          <th className="p-4 text-left">
            Name
          </th>

          <th className="p-4 text-left">
            Email
          </th>

          <th className="p-4 text-left">
            Role
          </th>

          <th className="p-4 text-left">
            Created
          </th>

          <th className="p-4 text-left">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td
              colSpan="5"
              className="text-center p-6"
            >
              Loading...
            </td>
          </tr>
        ) : users.length ===
          0 ? (
          <tr>
            <td
              colSpan="5"
              className="text-center p-6"
            >
              No Users Found
            </td>
          </tr>
        ) : (
          users.map(
            (user) => (
              <tr
                key={
                  user.id
                }
                className="border-b"
              >
                <td className="p-4">
                  {
                    user.name
                  }
                </td>

                <td className="p-4">
                  {
                    user.email
                  }
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.role ===
                      "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {
                      user.role
                    }
                  </span>
                </td>

                <td className="p-4">
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      deleteUser(
                        user.id
                      )
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )
        )}
      </tbody>
    </table>
  </div>
</DashboardLayout>
   

);
}
