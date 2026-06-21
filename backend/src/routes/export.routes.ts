import express from "express";

import {
exportReportsCSV,
} from "../controllers/export.controller";

import {
protect,
} from "../middleware/auth.middleware";

const router = express.Router();

router.get(
"/reports/csv",
protect,
exportReportsCSV
);

export default router;
