import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProtectedRoute from "./ProtectedRoutes";
import InterviewRoom from "../pages/interview/interviewRoom";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interview"
        element={
            <ProtectedRoute>
              <InterviewRoom />
            </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;