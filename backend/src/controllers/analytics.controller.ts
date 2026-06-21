import { Request, Response } from "express";
import prisma from "../config/prisma";
import { Report } from "@prisma/client";

export const getDashboardStats = async (
req: Request,
res: Response
) => {
try {
const reports: Report[] =
await prisma.report.findMany();


const totalRevenue = reports.reduce(
  (sum: number, report: Report) =>
    sum + report.revenue,
  0
);

const totalVisitors = reports.reduce(
  (sum: number, report: Report) =>
    sum + report.visitors,
  0
);

const totalConversions = reports.reduce(
  (sum: number, report: Report) =>
    sum + report.conversions,
  0
);

const conversionRate =
  totalVisitors > 0
    ? Number(
        (
          (totalConversions /
            totalVisitors) *
          100
        ).toFixed(2)
      )
    : 0;

res.json({
  totalReports: reports.length,
  totalRevenue,
  totalVisitors,
  totalConversions,
  conversionRate,
});


} catch (error) {
console.error(error);


res.status(500).json({
  message: "Server Error",
});


}
};

export const getRevenueTrend = async (
req: Request,
res: Response
) => {
try {
const reports: Report[] =
await prisma.report.findMany({
orderBy: {
createdAt: "asc",
},
});


const data = reports.map(
  (report: Report) => ({
    id: report.id,
    title: report.title,
    revenue: report.revenue,
    date: report.createdAt,
  })
);

res.json(data);


} catch (error) {
console.error(error);


res.status(500).json({
  message: "Server Error",
});


}
};

export const getMonthlyAnalytics = async (
req: Request,
res: Response
) => {
try {
const reports: Report[] =
await prisma.report.findMany({
orderBy: {
createdAt: "asc",
},
});


const monthlyData: Record<
  string,
  {
    revenue: number;
    visitors: number;
    conversions: number;
  }
> = {};

reports.forEach((report: Report) => {
  const month = report.createdAt
    .toISOString()
    .slice(0, 7);

  if (!monthlyData[month]) {
    monthlyData[month] = {
      revenue: 0,
      visitors: 0,
      conversions: 0,
    };
  }

  monthlyData[month].revenue += report.revenue;
  monthlyData[month].visitors += report.visitors;
  monthlyData[month].conversions += report.conversions;
});

const result = Object.entries(
  monthlyData
).map(([month, data]) => ({
  month,
  ...data,
}));

res.json(result);


} catch (error) {
console.error(error);


res.status(500).json({
  message: "Server Error",
});


}
};
