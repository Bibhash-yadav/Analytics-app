import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../api/axios";

export default function UserReports() {
const [reports, setReports] = useState([]);
const [loading, setLoading] = useState(true);

const [form, setForm] = useState({
title: "",
revenue: "",
visitors: "",
conversions: "",
});

useEffect(() => {
loadReports();
}, []);

const loadReports = async () => {
try {
const res = await API.get("/reports/my");

   
  console.log("MY REPORTS:", res.data);

  if (Array.isArray(res.data)) {
    setReports(res.data);
  } else if (Array.isArray(res.data.reports)) {
    setReports(res.data.reports);
  } else {
    setReports([]);
  }
} catch (error) {
  console.error(error);
  setReports([]);
} finally {
  setLoading(false);
}
   

};

const createReport = async (e) => {
e.preventDefault();

   
try {
  await API.post("/reports", {
    title: form.title,
    revenue: Number(form.revenue),
    visitors: Number(form.visitors),
    conversions: Number(form.conversions),
  });

  setForm({
    title: "",
    revenue: "",
    visitors: "",
    conversions: "",
  });

  await loadReports();
} catch (error) {
  console.error(error);
}
   

};

return ( <DashboardLayout> <h1 className="text-4xl font-bold mb-6">
My Reports </h1>

   
  <form
    onSubmit={createReport}
    className="bg-white p-6 rounded-xl border shadow mb-6"
  >
    <div className="grid md:grid-cols-2 gap-4">
      <input
        className="border p-3 rounded"
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
        required
      />

      <input
        type="number"
        className="border p-3 rounded"
        placeholder="Revenue"
        value={form.revenue}
        onChange={(e) =>
          setForm({
            ...form,
            revenue: e.target.value,
          })
        }
        required
      />

      <input
        type="number"
        className="border p-3 rounded"
        placeholder="Visitors"
        value={form.visitors}
        onChange={(e) =>
          setForm({
            ...form,
            visitors: e.target.value,
          })
        }
        required
      />

      <input
        type="number"
        className="border p-3 rounded"
        placeholder="Conversions"
        value={form.conversions}
        onChange={(e) =>
          setForm({
            ...form,
            conversions: e.target.value,
          })
        }
        required
      />
    </div>

    <button
      type="submit"
      className="mt-4 bg-black text-white px-6 py-3 rounded-lg"
    >
      Create Report
    </button>
  </form>

  {loading ? (
    <div>Loading...</div>
  ) : reports.length === 0 ? (
    <div className="bg-white p-6 rounded-xl border text-center">
      No Reports Found
    </div>
  ) : (
    <div className="grid gap-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-white p-6 rounded-xl border shadow"
        >
          <h3 className="text-xl font-bold">
            {report.title}
          </h3>

          <p>
            Revenue: ₹{report.revenue}
          </p>

          <p>
            Visitors: {report.visitors}
          </p>

          <p>
            Conversions: {report.conversions}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            {new Date(
              report.createdAt
            ).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )}
</DashboardLayout>
   

);
}
