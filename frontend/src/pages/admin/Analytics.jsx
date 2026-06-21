import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../api/axios";

import {
ResponsiveContainer,
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
} from "recharts";

export default function Analytics() {
const [data, setData] =
useState([]);

useEffect(() => {
fetchData();
}, []);

const fetchData =
async () => {
try {
const res =
await API.get(
"/analytics/monthly"
);

   
    setData(res.data);
  } catch (error) {
    console.log(error);
  }
};
   

return ( <DashboardLayout> <h1 className="text-4xl font-bold mb-6">
Analytics </h1>

   
  <div className="bg-white p-6 rounded-xl border shadow">
    <div className="h-96">
      <ResponsiveContainer>
        <LineChart
          data={data}
        >
          <XAxis
            dataKey="month"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#000"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
</DashboardLayout>
   

);
}
