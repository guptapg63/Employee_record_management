import { Router } from "express";
import { addEmployee, deleteEmployee, getAllEmployees, updateEmployee, searchEmployees } from '../Controllers/EmployeeController.js';
import employeeValidation from "../Middlewares/EmployeeValidation.js";


const router = Router();

router.post('/', employeeValidation, addEmployee);
router.get('/', getAllEmployees);
router.put('/:id', employeeValidation, updateEmployee);
router.delete('/:id', deleteEmployee);
router.get('/search', searchEmployees);

export default router;

