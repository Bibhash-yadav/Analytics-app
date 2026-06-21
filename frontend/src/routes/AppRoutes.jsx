import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import AdminReports from "../pages/admin/Reports";
import AdminAnalytics from "../pages/admin/Analytics";
import Settings from "../pages/admin/Settings";

import UserDashboard from "../pages/user/Dashboard";
import UserReports from "../pages/user/Reports";
import UserAnalytics from "../pages/user/Analytics";
import Profile from "../pages/user/Profile";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="ADMIN">
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute role="ADMIN">
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/reports"
          element={
            <ProtectedRoute role="USER">
              <UserReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/analytics"
          element={
            <ProtectedRoute role="USER">
              <UserAnalytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoute role="USER">
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}