const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch problems" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: "Problem not found" });
  }
});

module.exports = router;
