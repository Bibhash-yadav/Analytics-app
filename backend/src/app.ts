import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import analyticsRoutes from "./routes/analytics.routes";
import reportRoutes from "./routes/report.routes";
import adminRoutes from "./routes/admin.routes";
import exportRoutes from "./routes/export.routes";
import userRoutes from "./routes/users.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Analytics API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/users", userRoutes);
export default app;