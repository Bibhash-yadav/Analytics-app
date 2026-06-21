import { Request, Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const createReport = async (
req: AuthRequest,
res: Response
) => {
try {
const {
title,
revenue,
visitors,
conversions,
} = req.body;


if (!req.user) {
  return res.status(401).json({
    message: "Unauthorized",
  });
}

const report = await prisma.report.create({
  data: {
    title,
    revenue,
    visitors,
    conversions,
    userId: req.user.id,
  },
});

res.status(201).json(report);

} catch (error) {
console.error(error);
res.status(500).json({
message: "Server Error",
});
}
};

export const getReports = async (
req: Request,
res: Response
) => {
try {
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;


const search =
  String(req.query.search || "");

const skip =
  (page - 1) * limit;

const reports =
  await prisma.report.findMany({
    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      user: true,
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

const total =
  await prisma.report.count({
    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

res.json({
  total,
  page,
  limit,
  reports,
});


} catch (error) {
console.error(error);


res.status(500).json({
  message: "Server Error",
});


}
};

export const getReportById = async (
req: Request<{ id: string }>,
res: Response
) => {
try {
const report =
await prisma.report.findUnique({
where: {
id: req.params.id,
},
include: {
user: true,
},
});


if (!report) {
  return res.status(404).json({
    message: "Report not found",
  });
}

res.json(report);


} catch (error) {
console.error(error);

res.status(500).json({
  message: "Server Error",
});


}
};

export const updateReport = async (
req: Request<{ id: string }>,
res: Response
) => {
try {
const {
title,
revenue,
visitors,
conversions,
} = req.body;


const report =
  await prisma.report.update({
    where: {
      id: req.params.id,
    },
    data: {
      title,
      revenue,
      visitors,
      conversions,
    },
  });

res.json(report);


} catch (error) {
console.error(error);


res.status(500).json({
  message: "Server Error",
});


}
};
export const getMyReports = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const reports =
      await prisma.report.findMany({
        where: {
          userId: req.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(reports);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const deleteReport = async (
req: Request<{ id: string }>,
res: Response
) => {
try {
await prisma.report.delete({
where: {
id: req.params.id,
},
});


res.json({
  message: "Deleted Successfully",
});


} catch (error) {
console.error(error);


res.status(500).json({
  message: "Server Error",
});


}
};
