import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../api/axios";

export default function Reports() {
const [reports, setReports] =
useState([]);

const [loading, setLoading] =
useState(true);

useEffect(() => {
fetchReports();
}, []);

const fetchReports =
async () => {
try {
const res =
await API.get(
"/reports"
);

   
    console.log(
      "REPORTS:",
      res.data
    );

    if (
      Array.isArray(
        res.data
      )
    ) {
      setReports(
        res.data
      );
    } else if (
      Array.isArray(
        res.data.reports
      )
    ) {
      setReports(
        res.data.reports
      );
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
   

const deleteReport =
async (id) => {
const confirmDelete =
window.confirm(
"Delete this report?"
);

   
  if (!confirmDelete)
    return;

  try {
    await API.delete(
      `/reports/${id}`
    );

    fetchReports();
  } catch (error) {
    console.error(error);
  }
};
   

return ( <DashboardLayout> <div className="flex justify-between items-center mb-6"> <h1 className="text-4xl font-bold">
Reports </h1> </div>

   
  <div className="bg-white rounded-xl border shadow overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b bg-gray-50">
          <th className="p-4 text-left">
            Title
          </th>

          <th className="p-4 text-left">
            Revenue
          </th>

          <th className="p-4 text-left">
            Visitors
          </th>

          <th className="p-4 text-left">
            Conversions
          </th>

          <th className="p-4 text-left">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td
              colSpan="5"
              className="p-6 text-center"
            >
              Loading...
            </td>
          </tr>
        ) : reports.length ===
          0 ? (
          <tr>
            <td
              colSpan="5"
              className="p-6 text-center"
            >
              No Reports Found
            </td>
          </tr>
        ) : (
          reports.map(
            (report) => (
              <tr
                key={
                  report.id
                }
                className="border-b"
              >
                <td className="p-4">
                  {
                    report.title
                  }
                </td>

                <td className="p-4">
                  ₹
                  {
                    report.revenue
                  }
                </td>

                <td className="p-4">
                  {
                    report.visitors
                  }
                </td>

                <td className="p-4">
                  {
                    report.conversions
                  }
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      deleteReport(
                        report.id
                      )
                    }
                    className="bg-red-500 text-white px-3 py-2 rounded"
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
