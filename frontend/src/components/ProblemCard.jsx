import React from "react";
import { useNavigate } from "react-router-dom";

const ProblemCard = ({ problem }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/problems/${problem._id}`)} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{problem.title}</h3>
      <p>Difficulty: {problem.difficulty}</p>
      <p>Company: {problem.company}</p>
    </div>
  );
};

export default ProblemCard;
