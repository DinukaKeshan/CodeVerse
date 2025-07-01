import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProfileUpdate from './components/ProfileUpdate';
import Callback from './pages/Callback';
import Login from './pages/Login';
import Register from './pages/Register';
import RoleSelection from './pages/RoleSelection';
import Navbar from './components/Navbar';
import FindMentor from './pages/FindMentor';
import Chat from './pages/Chat';
import InstructorMessages from './pages/InstructorMessages';

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
        <Route path="/mentors" element={<FindMentor />} />
        <Route path="/chat/:receiverId" element={<Chat />} />
        <Route path="/instructor-messages" element={<InstructorMessages />} />
      </Routes>
    </Router>
  );
}

export default App;
