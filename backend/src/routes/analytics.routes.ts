import express from "express";

import {
getDashboardStats,
getRevenueTrend,
getMonthlyAnalytics,
} from "../controllers/analytics.controller";

import {
protect,
} from "../middleware/auth.middleware";

const router = express.Router();

router.get(
"/dashboard",
protect,
getDashboardStats
);

router.get(
"/revenue-trend",
protect,
getRevenueTrend
);

router.get(
"/monthly",
protect,
getMonthlyAnalytics
);

export default router;
