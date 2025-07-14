const express = require('express')
const router = express.Router();

const {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController.js");

// route for creating department
router.post('/', createDepartment);

// route for get all departments
router.get('/', getAllDepartments);

// Update department
router.put('/:id', updateDepartment);

// Delete department
router.delete('/:id', deleteDepartment);

module.exports = router;