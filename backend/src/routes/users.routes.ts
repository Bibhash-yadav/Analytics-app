import express from "express";

import {
  getUsers,
  deleteUser,
} from "../controllers/users.controller";

import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("ADMIN"),
  getUsers
);

router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  deleteUser
);

export default router;