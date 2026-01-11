import { Routes, Route, Navigate } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/teacher" replace />} />
      <Route path="/teacher" element={<LandingPage type="teacher" />} />
      <Route path="/academy" element={<LandingPage type="academy" />} />
    </Routes>
  );
}

export default App;
