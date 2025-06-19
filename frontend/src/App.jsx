import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProblemView from "./pages/ProblemView";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/problems/:id" element={<ProblemView />} />
    </Routes>
  </Router>
);

export default App;
