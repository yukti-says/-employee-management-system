const express = require('express')
const router = express.Router();

const {
    createEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');
const { route } = require('./departmentRoutes');


// add
router.post('/', createEmployee)

// get
router.get('/', getAllEmployees)

// update
router.put('/:id', updateEmployee)

// delete
router.delete('/:id', deleteEmployee)

module.exports = router;