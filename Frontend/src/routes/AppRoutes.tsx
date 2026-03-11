import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProtectedRoute from "./ProtectedRoutes";
import InterviewRoom from "../pages/interview/interviewRoom";
import InterviewMode from "../pages/interview/interviewMode";
import PracticeSetup from "../pages/interview/practiseSetup";
import JoinInterview from "../pages/interview/joinInterview";

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
            <InterviewMode />
          </ProtectedRoute>
        }
      />
      <Route
        path="/practice-setup"
        element={
          <ProtectedRoute>
            <PracticeSetup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/join-interview"
        element={
          <ProtectedRoute>
            <JoinInterview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interview-room"
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