import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";
import axios from "axios";
import * as ace from "ace-builds";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";

ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.4.14/src-noconflict");
ace.config.setModuleUrl("ace/mode/c_cpp_worker", "https://cdn.jsdelivr.net/npm/ace-builds@1.4.14/src-noconflict/worker-c_cpp.js");

const ProblemView = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("// Write your C++ code here");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/problems/${id}`)
      .then(res => setProblem(res.data))
      .catch(err => console.error("Error loading problem:", err));
  }, [id]);

  const handleRunCode = async () => {
    if (!problem || !problem.testCases) return;

    try {
      const response = await axios.post("http://localhost:5000/api/execute", {
        language: "c_cpp",
        code,
        testCases: problem.testCases.map(tc => ({
          input: tc.input,
          expectedOutput: tc.expectedOutput
        }))
      });

      setResults(response.data);
    } catch (err) {
      console.error("Error running code:", err);
    }
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{problem.title}</h2>
      <p>{problem.description}</p>
      <h4>Input Format:</h4>
      <pre>{problem.inputFormat}</pre>
      <h4>Output Format:</h4>
      <pre>{problem.outputFormat}</pre>

      <AceEditor
        mode="c_cpp"
        theme="monokai"
        value={code}
        onChange={setCode}
        name="code-editor"
        width="100%"
        height="300px"
      />

      {/* ✅ Run Code Button */}
      <button onClick={handleRunCode} style={{ marginTop: "10px", padding: "8px 16px" }}>
        Run Code
      </button>

      {/* ✅ Test Results Section */}
      <div style={{ marginTop: "20px" }}>
        {results.map((res, idx) => (
          <div key={idx} style={{ border: "1px solid #ccc", margin: "8px", padding: "6px" }}>
            <strong>Test Case {idx + 1}</strong><br />
            <b>Input:</b> {res.input}<br />
            <b>Expected:</b> {res.expectedOutput}<br />
            <b>Output:</b> {res.output}<br />
            <b>Status:</b>{" "}
            <span style={{ color: res.status.includes("Accepted") ? "green" : "red" }}>
              {res.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemView;
