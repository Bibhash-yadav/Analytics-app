import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../api/axios";

export default function Analytics() {
const [reports, setReports] =
useState([]);

useEffect(() => {
loadReports();
}, []);

const loadReports =
async () => {
try {
const res =
await API.get(
"/reports/my"
);

   
    setReports(res.data);
  } catch (error) {
    console.log(error);
  }
};
   

const totalRevenue =
reports.reduce(
(sum, report) =>
sum +
report.revenue,
0
);

const totalVisitors =
reports.reduce(
(sum, report) =>
sum +
report.visitors,
0
);

const totalConversions =
reports.reduce(
(sum, report) =>
sum +
report.conversions,
0
);

return ( <DashboardLayout> <h1 className="text-4xl font-bold mb-6">
My Analytics </h1>

   
  <div className="grid md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl border shadow">
      <h3>Total Revenue</h3>

      <p className="text-3xl font-bold">
        ₹
        {totalRevenue}
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl border shadow">
      <h3>Total Visitors</h3>

      <p className="text-3xl font-bold">
        {totalVisitors}
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl border shadow">
      <h3>Total Conversions</h3>

      <p className="text-3xl font-bold">
        {totalConversions}
      </p>
    </div>
  </div>
</DashboardLayout>
   

);
}
