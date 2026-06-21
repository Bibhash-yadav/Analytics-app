import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getAdminDashboard = async (
req: Request,
res: Response
) => {
try {
const totalUsers =
await prisma.user.count();


const totalReports =
  await prisma.report.count();

const reports =
  await prisma.report.findMany();

const totalRevenue =
  reports.reduce(
    (sum, report) =>
      sum + report.revenue,
    0
  );

const totalVisitors =
  reports.reduce(
    (sum, report) =>
      sum + report.visitors,
    0
  );

const totalConversions =
  reports.reduce(
    (sum, report) =>
      sum + report.conversions,
    0
  );

const latestUsers =
  await prisma.user.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

const latestReports =
  await prisma.report.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

res.json({
  totalUsers,
  totalReports,
  totalRevenue,
  totalVisitors,
  totalConversions,
  latestUsers,
  latestReports,
});


} catch (error) {
console.error(error);


res.status(500).json({
  message: "Server Error",
});


}
};
