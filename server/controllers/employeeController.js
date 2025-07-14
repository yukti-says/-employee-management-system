const Employee = require("../models/employees.js");

// CREATE Employee
const createEmployee = async (req, res) => {
  try {
    const { name, role, email, phone, departmentId, dateJoined } = req.body;
    const employee = new Employee({
      name,
      role,
      email,
      phone,
      departmentId,
      dateJoined,
    });

    await employee.save();

    res.status(201).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// READ All Employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("departmentId", "name");
    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// UPDATE Employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, email, phone, departmentId, dateJoined } = req.body;

    const updated = await Employee.findByIdAndUpdate(
      id,
      { name, role, email, phone, departmentId, dateJoined },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE Employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Employee.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
