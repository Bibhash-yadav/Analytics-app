import express from "express";

import {
getAdminDashboard,
} from "../controllers/admin.controller";

import {
protect,
} from "../middleware/auth.middleware";

const router = express.Router();

router.get(
"/dashboard",
protect,
getAdminDashboard
);

export default router;
