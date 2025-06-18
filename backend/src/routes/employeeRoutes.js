import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees." });
  }
});

// Get a employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: "employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employee." });
  }
});

// Create a new employee
router.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: "Failed to create employee." });
  }
});

// Update a employee
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: "employee not found" });

    await employee.update(req.body);
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: "Failed to update employee." });
  }
});

// Delete a employee
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: "employee not found" });

    await employee.destroy();
    res.json({ message: "employee deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete employee." });
  }
});

export default router;
