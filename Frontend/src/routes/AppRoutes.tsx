import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProtectedRoute from "./ProtectedRoutes";
import InterviewRoom from "../pages/interview/interviewRoom";
import InterviewMode from "../pages/interview/interviewMode";
import PracticeSetup from "../pages/interview/practiseSetup";
import Courses from "../pages/courses/coursesPage";
import JoinInterview from "../pages/interview/joinInterview";
import SignupPage from "../pages/auth/SignupPage";
import OAuthSuccess from "../pages/auth/OAuthSuccess";
import Problems from "../pages/problems/problemPage";
import Leaderboard from "../pages/leaderboard/leaderBoardPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
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
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/problems"
        element={
          <ProtectedRoute>
            <Problems />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;