import React, { useEffect, useState } from "react";
import axios from "axios";
import ProblemCard from "../components/ProblemCard";

const Dashboard = () => {
  const [problems, setProblems] = useState([]);

 useEffect(() => {
  axios.get("http://localhost:5000/api/problems")
    .then(res => {
      console.log("Fetched problems:", res.data);  // Add this
      setProblems(res.data);
    })
    .catch(err => console.error("Failed to fetch problems:", err));
}, []);

  return (
    <div>
      <h1>Problem Dashboard</h1>
      {problems.map(p => <ProblemCard key={p._id} problem={p} />)}
    </div>
  );
};

export default Dashboard;
