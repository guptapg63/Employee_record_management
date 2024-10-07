import employeeModel from "../Models/Employee.js";

const addEmployee = async (req, res) => {
    try {
        const { name, address, dateOfBirth, skills, photo } = req.body;

        const newEmployee = new employeeModel({

            name,
            address,
            dateOfBirth,
            skills,
            photo,
        });

        const savedEmployee = await newEmployee.save();
        res.status(201).json({ message: "Employee added Successfully", success: true, savedEmployee });

    } catch (err) {
        console.error("Error while adding Employee", err.message);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.find();
        res.status(200).json({ employees, success: true });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const searchEmployees = async (req, res) => {
    const { query } = req.query;
    try {
        const employees = await employeeModel.find({
            $or: [
                {
                    name: { $regex: query, $options: 'i' }
                },
                {
                    skills: { $regex: query, $options: 'i' }
                }
            ]
        });
        res.status(200).json({ employees, success: true });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await employeeModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ message: "Employee not Found", success: false });

        }

        res.status(200).json({ message: "Employee Updated Successfully", employee, success: true });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        await employeeModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Employee deleted Successfully", success: true });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export { addEmployee, getAllEmployees, updateEmployee, deleteEmployee, searchEmployees };