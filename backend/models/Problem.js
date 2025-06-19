const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: String,
  description: String,
  inputFormat: String,
  outputFormat: String,
  constraints: String,
  examples: [{ input: String, output: String }],
  testCases: [{ input: String, expectedOutput: String }],
  difficulty: String,
  topic: String,
  type: String,
  company: String,
  role: String,
  yoe: String,
});

module.exports = mongoose.model("Problem", problemSchema);
