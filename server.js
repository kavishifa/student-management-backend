const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Error:", err));

// Student Schema
const Student = mongoose.model("Student", {
  name: String,
  email: String,
  department: String,
  marks: Number
});

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Working ✅");
});

// Create Student
app.post("/students", async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
});

// Get Students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Delete Student
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted Successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));