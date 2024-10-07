import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [formVisible, setFormVisible] = useState(false); //visibility toggle
    const [employeeData, setEmployeeData] = useState({
        name: '',
        address: '',
        dateOfBirth: '',
        skills: [],
        photo: ''
    });

    //Skills option one can choose from checkbox
    const skillsOptions = ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'];

    // to handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const copyEmployeeData = { ...employeeData };

        if (type === 'checkbox') {
            if (checked) {
                copyEmployeeData.skills = [...copyEmployeeData.skills, value];
            } else {
                copyEmployeeData.skills = copyEmployeeData.skills.filter(skill => skill !== value);
            }
        } else {
            copyEmployeeData[name] = value;
        }

        setEmployeeData(copyEmployeeData);
    };

    // to handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/employees', employeeData);
            toast.success(response.data.message); // success message 
            setEmployeeData({ name: '', address: '', dateOfBirth: '', skills: [], photo: '' }); // form get reset
            setFormVisible(false); // hide after submit
        } catch (error) {
            toast.error('Error adding employee'); // error message
        }
    };

    return (
        //user frontend
        <div className="dashboard">
            <h1>User Dashboard</h1>
            <button onClick={() => setFormVisible(!formVisible)}>
                Add Employee Record
            </button>

            {formVisible && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Employee Name:</label>
                        <input type="text" name="name" value={employeeData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input type="text" name="address" value={employeeData.address} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Date of Birth:</label>
                        <input type="date" name="dateOfBirth" value={employeeData.dateOfBirth} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Skills:</label>
                        {skillsOptions.map(skill => (
                            <div key={skill}>
                                <input
                                    type="checkbox"
                                    name="skills"
                                    value={skill}
                                    onChange={handleChange}
                                />
                                {skill}
                            </div>
                        ))}
                    </div>
                    <div>
                        <label>Photo URL:</label>
                        <input type="text" name="photo" value={employeeData.photo} onChange={handleChange} />
                    </div>
                    <button type="submit">Add Employee</button>
                </form>
            )}
        </div>
    );
};

export default Dashboard;
