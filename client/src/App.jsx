// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileUpdate from "./components/ProfileUpdate";
import Callback from "./pages/Callback";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleSelection from "./pages/RoleSelection";
import Navbar from "./components/Navbar";
import InstructorDashboard from "./pages/InstructorDashboard";
import InstructorCourses from "./pages/InstructorCourses";
import CourseContent from "./pages/CourseContent";
import CourseManage from "./pages/CourseManage";
import TitleContent from "./pages/TitleContent";
import StudentCourses from "./pages/StudentCourses";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileUpdate />} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/select-role" element={<RoleSelection />} />
        <Route path="/instructor/courses" element={<InstructorCourses />} />
        <Route path="/dashboard/instructor" element={<InstructorDashboard />} />
        <Route path="/course/:courseId" element={<CourseContent />} />
        <Route path="/manage-course/:courseId" element={<CourseManage />} />
        <Route path="/course/:courseId/timeline/:timelineId" element={<TitleContent />} />
        <Route path="/courses" element={<StudentCourses />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
