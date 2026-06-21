import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../api/axios";

export default function UserDashboard() {
const [stats, setStats] = useState({
reports: 0,
visitors: 0,
conversions: 0,
revenue: 0,
});

const [loading, setLoading] =
useState(true);

useEffect(() => {
loadDashboard();
}, []);

const loadDashboard =
async () => {
try {
const res =
await API.get(
"/reports/my"
);

   
    const reports =
      Array.isArray(
        res.data
      )
        ? res.data
        : [];

    const totalVisitors =
      reports.reduce(
        (
          sum,
          report
        ) =>
          sum +
          Number(
            report.visitors
          ),
        0
      );

    const totalConversions =
      reports.reduce(
        (
          sum,
          report
        ) =>
          sum +
          Number(
            report.conversions
          ),
        0
      );

    const totalRevenue =
      reports.reduce(
        (
          sum,
          report
        ) =>
          sum +
          Number(
            report.revenue
          ),
        0
      );

    setStats({
      reports:
        reports.length,
      visitors:
        totalVisitors,
      conversions:
        totalConversions,
      revenue:
        totalRevenue,
    });
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
   

if (loading) {
return ( <DashboardLayout> <div className="text-xl">
Loading... </div> </DashboardLayout>
);
}

return ( <DashboardLayout> <h1 className="text-4xl font-bold mb-8">
User Dashboard </h1>

   
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
    <div className="bg-white p-6 rounded-xl shadow border">
      <h3 className="text-gray-500">
        My Reports
      </h3>

      <p className="text-3xl font-bold mt-2">
        {stats.reports}
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow border">
      <h3 className="text-gray-500">
        Revenue
      </h3>

      <p className="text-3xl font-bold mt-2">
        ₹
        {stats.revenue}
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow border">
      <h3 className="text-gray-500">
        Visitors
      </h3>

      <p className="text-3xl font-bold mt-2">
        {stats.visitors}
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow border">
      <h3 className="text-gray-500">
        Conversions
      </h3>

      <p className="text-3xl font-bold mt-2">
        {stats.conversions}
      </p>
    </div>
  </div>

  <div className="bg-white mt-8 p-6 rounded-xl shadow border">
    <h2 className="text-2xl font-semibold mb-4">
      Quick Overview
    </h2>

    <p>
      Total Reports:
      {" "}
      {stats.reports}
    </p>

    <p>
      Total Revenue:
      {" "}
      ₹
      {stats.revenue}
    </p>

    <p>
      Total Visitors:
      {" "}
      {stats.visitors}
    </p>

    <p>
      Total Conversions:
      {" "}
      {stats.conversions}
    </p>
  </div>
</DashboardLayout>
   

);
}
