import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import API from "../../api/axios";

export default function AdminDashboard() {
const [stats, setStats] =
useState(null);

useEffect(() => {
fetchStats();
}, []);

const fetchStats =
async () => {
try {
const res =
await API.get(
"/analytics/dashboard"
);

   
    setStats(res.data);
  } catch (error) {
    console.log(error);
  }
};
   

if (!stats) {
return ( <DashboardLayout> <h1>Loading...</h1> </DashboardLayout>
);
}

return ( <DashboardLayout> <h1 className="text-4xl font-bold mb-8">
Admin Dashboard </h1>

   
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
    <div className="bg-white p-6 rounded-xl shadow">
      <h3>Total Reports</h3>

      <p className="text-3xl font-bold">
        {stats.totalReports}
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow">
      <h3>Total Revenue</h3>

      <p className="text-3xl font-bold">
        ₹{stats.totalRevenue}
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow">
      <h3>Total Visitors</h3>

      <p className="text-3xl font-bold">
        {stats.totalVisitors}
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow">
      <h3>Total Conversions</h3>

      <p className="text-3xl font-bold">
        {stats.totalConversions}
      </p>
    </div>
  </div>
</DashboardLayout>
   

);
}
