// backend/routes/execute.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const isWindows = process.platform === "win32";
const WORKSPACE = path.join(__dirname, "../temp");
if (!fs.existsSync(WORKSPACE)) fs.mkdirSync(WORKSPACE);

const LANG_CONFIG = {
  c_cpp: {
    file: "Main.cpp",
    compile: isWindows ? "g++ Main.cpp -o Main.exe" : "g++ Main.cpp -o Main",
    run: isWindows ? "Main.exe" : "./Main",
  }
};

router.post("/", async (req, res) => {
  const { language, code, testCases = [] } = req.body;
  const lang = LANG_CONFIG[language];
  if (!lang) return res.status(400).json({ error: "Unsupported language" });

  const filePath = path.join(WORKSPACE, lang.file);
  fs.writeFileSync(filePath, code);

  try {
    console.log("🔧 Compiling:", lang.compile);
    if (lang.compile) {
      await new Promise((resolve, reject) => {
        exec(lang.compile, { cwd: WORKSPACE }, (err, stdout, stderr) => {
          if (err) {
            console.error("❌ Compilation error:", stderr);
            return reject(stderr);
          }
          resolve(stdout);
        });
      });
    }

    console.log("✅ Compilation done. Running test cases...");

   const results = await Promise.all(
  testCases.map(tc => {
    return new Promise(resolve => {
      const process = exec(lang.run, { cwd: WORKSPACE }, (err, stdout, stderr) => {
        resolve({
          input: tc.input,
          expectedOutput: tc.expectedOutput.trim(),
          output: stdout.trim(),
          status: stdout.trim() === tc.expectedOutput.trim() ? "✅ Accepted" : "❌ Failed"
        });
      });

      // ✅ Correct: feed each test case's input individually
      if (process.stdin) {
        process.stdin.write(tc.input);
        process.stdin.end();
      }
    });
  })
);


    res.json(results);
  } catch (error) {
    console.error("❌ Execution error:", error);
    res.status(500).json({ error: "Code execution failed", details: error.toString() });
  }
});

module.exports = router;