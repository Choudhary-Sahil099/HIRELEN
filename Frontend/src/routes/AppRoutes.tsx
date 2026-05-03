import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProtectedRoute from "./ProtectedRoutes";
import InterviewMode from "../pages/interview/interviewMode";
import Courses from "../pages/courses/coursesPage";
import SignupPage from "../pages/auth/SignupPage";
import OAuthSuccess from "../pages/auth/OAuthSuccess";
import Problems from "../pages/problems/problemPage";
import Leaderboard from "../pages/leaderboard/leaderBoardPage";
import UserProfile from "../pages/profile/profilePage";
import CodeEditor from "../pages/problems/CodeEditor";
import AIInterviewSelector from "../pages/interview/AIInterviewSelector";

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
        path="/aiFeatures"
        element={
          <ProtectedRoute>
            <AIInterviewSelector />
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
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile/>
          </ProtectedRoute>
        }
      />
      <Route path="/problems/:id" 
      element={<CodeEditor/>} />
    </Routes>
  );
};

export default AppRoutes;