import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Session from "./Page/Session"; // Import the Session component
import Login from "./Page/Login";
import Logout from "./Page/Logout";

function App() {
  return (
    <Router>
      <div className="overflow-hidden">
        <Routes>
          <Route path="/login" element={<Login />} /> 
          <Route path="/" element={<Session />} /> {/* Fetch session and redirect */}
          <Route path="/logout" element={<Logout />} /> {/* Fetch session and redirect */}
          <Route path="/chat/:sessionId" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
