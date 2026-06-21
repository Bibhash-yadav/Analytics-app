import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Settings() {
return ( <DashboardLayout> <h1 className="text-4xl font-bold mb-6">
Settings </h1>

   
  <div className="bg-white p-6 rounded-xl border shadow">
    <h2 className="text-xl font-semibold mb-4">
      Application Settings
    </h2>

    <p>
      Future settings:
    </p>

    <ul className="list-disc ml-6 mt-3">
      <li>
        Theme Management
      </li>

      <li>
        Notifications
      </li>

      <li>
        Account Security
      </li>

      <li>
        Email Preferences
      </li>
    </ul>
  </div>
</DashboardLayout>
   

);
}
