import express from "express";

import {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
  getMyReports,
} from "../controllers/report.controller";

import {
protect,
} from "../middleware/auth.middleware";

const router = express.Router();

router.post(
"/",
protect,
createReport
);

router.post("/", protect, createReport);

router.get("/", protect, getReports);

router.get("/my", protect, getMyReports);

router.get("/:id", protect, getReportById);

router.put("/:id", protect, updateReport);

router.delete("/:id", protect, deleteReport);

export default router;
